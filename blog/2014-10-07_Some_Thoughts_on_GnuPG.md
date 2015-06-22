Subject: Some thoughts on working with GnuPG
Author: Smári 
Date: October 7, 2014
Type: blog

A lot of people have complained about OpenPGP for a number of valid cryptographical reasons[1],[2]. It doesn't change the fact that it is widely used, and wildly useful. It urgently needs to be replaced with something more sensible, but for now we're stuck with it. In practice, this also means that we are stuck with GnuPG, the most common and by far the best implementation of OpenPGP.

GnuPG is the one and only reference implementation of [RFC 4880][7], and despite thousands of companies making use of OpenPGP in their infrastructre there is for all intents and purposes a solitary dude in Germany trying to keep it all together. [Werner Koch][8] is an absolute hero for managing to do that, and deserves our respect and support. Financially supporting the GnuPG project is also something people should be doing. 

The following is however neccessary and hopefully constructive criticism of GnuPG.

One of the things I'm largely to blame for in Mailpile is the GnuPG interface. It's a chunk of Python code that executes the GnuPG binary, tosses information at it, and figures out what to do with the output. There are lots of libraries for doing this, but after a great deal of exploration I found that all of the Python libraries that did this were insufficient for our needs, and the only thing crazier than manually forking out GnuPG in our situation would be to use the PGPME library.

PGPME is almost as confusing and annoying as calling GnuPG directly, but it also requires us to ship architecture-specific libraries to everybody, something we're actively avoiding. Having to ship GnuPG binaries to Windows and MacOS users is bad enough, but dependency hell is a place we want to stay out of. If we were writing Mailpile in, say, C or C++, then PGPME would definitely be the library of choice, but we're not, so it isn't. On top of that, the available [Python bindings for PGPME][6] are very flaky (last updated in 2008!), and not developed or maintained by the GnuPG team.

As a result, we've got a roughly 1200 line chunk of code in Mailpile that has the fun and useful task of chatting with GnuPG, and the stupifyingly annoying task of working around all of GnuPG's inconsistencies.

The problems with GnuPG seem to fall roughly into two broad categories: inconsistent output structure, inconsistent interfaces. These are both ripe with surprising behaviour and confusing failure modes. In addition to these categories, it appears that the larger meta problem is that no single statement about its problems is going to remain a stable statement, as these problems disappear and reappear at odd intervals as new versions are being built. The number of moving parts essentially leads to a lot of confusion about whether a particular bug exists in a particular version or not, and whether it is affected by wind speed. To wit, I have over the course of Mailpile development added, removed, and readded a workaround for a bug, although I think I'm safe to say that it does not exist post GnuPG 2.1. The comment of that workaround in the code illustrates the issue perfectly:

<pre class="add-bottom">
def list_secret_keys(self):
       #
       # Note: The "." parameter that is passed is to work around a bug
       #       in GnuPG < 2.1, where --list-secret-keys does not list
       #       details about key capabilities or expiry for
       #       --list-secret-keys unless a selector is provided. A dot
       #       is reasonably likely to appear in all PGP keys, as it is
       #       a common component of e-mail addresses (and @ does not
       #       work as a selector for some reason...)
       #
       #       The downside of this workaround is that keys with no e-mail
       #       address or an address like alice@localhost won't be found.
       #       Therefore, this paramter should be removed when GnuPG >= 2.1
       #       becomes commonplace.
       #
       #       (This is a better workaround than doing an additional
       #       --list-keys and trying to aggregate it though...)
       #
       #       BRE: Put --fingerprint at the front and added selectors
       #            for the worlds MOST POPULAR LETTERS!  Yaaay!
       #
       retvals = self.run(["--fingerprint",
                           "--list-secret-keys", ".",
                           "--list-secret-keys", "a",
                           "--list-secret-keys", "e",
                           "--list-secret-keys", "i",
                           "--list-secret-keys", "p",
                           "--list-secret-keys", "t",
                           "--list-secret-keys", "k"])
       return self.parse_keylist(retvals[1]["stdout"])
</pre>

This bug exists in the first category:

### Inconsistent output structure

GnuPG *generally* accepts command line parameters, uses these to perform actions, and returns output. The output generally takes two forms:

 1. Line by line descriptive output, such as when listing keys
 2. Bulk output, such as when encrypting, decrypting, or signing

The line-by-line output has two modes, the normal mode where the data is tabulated with spaces into mostly nice, if somewhat confusing columns, and the `--with-colons` mode, where the spaces are replaced with colons, for easy parsing. This is quite clever and good. The problem arises when one intends to start parsing this data.

First, a word on discoverability. If you ever intend to do anything with GnuPG, you first need to read and internalize a document aptly titled `DETAILS`, which contains a lot of the details about what's going on with GnuPG output. I have dutifully read, memorized chunks of, and bookmarked this file for posterity. It is immensely helpful. For example, it gives an example of GnuPG's output:

<pre class="add-bottom">
$ gpg --with-colons --list-keys \
      --with-fingerprint --with-fingerprint wk@gnupg.org
pub:f:1024:17:6C7EE1B8621CC013:899817715:1055898235::m:::scESC:
fpr:::::::::ECAF7590EB3443B5C7CF3ACB6C7EE1B8621CC013:
uid:f::::::::Werner Koch <wk@g10code.com>:
uid:f::::::::Werner Koch <wk@gnupg.org>:
sub:f:1536:16:06AD222CADF6A6E1:919537416:1036177416:::::e:
fpr:::::::::CF8BCC4B18DE08FCD8A1615906AD222CADF6A6E1:
sub:r:1536:20:5CE086B5B5A18FF4:899817788:1025961788:::::esc:
fpr:::::::::AB059359A3B81F410FCFF97F5CE086B5B5A18FF4:
</pre>

In order to decipher what this all means, you need to refer to rest of the document. This shows the `--with-colons` format, which is the way we want to be working with it.

Now here comes issue the first: this is essentially a colon separated value (CSV!) data structure, but the data being provided is a) inconsistent, and b) structured.

Notably, the first output line says "there is a public key," and the line after it says "here is a fingerprint." Naively one might think that these are unrelated. But in fact, all of the lines from the one starting with `pub` up to the next one that starts with either `pub` or `sec` are actually details about the nature of the public key mentioned in the `pub` line - although to make things worse, the `fpr` lines after the `sub` lines refer to the `sub` line but not the `pub` line. Confused yet?

In reality, parsing this isn't too terrible, but it can only be done in a reasonable way if you understand the structure of PGP keys and the output format of GnuPG. These are *not* reasonable assumptions for GnuPG to be making. Even armed with knowledge about the structure of keys and the handy `DETAILS` document, my first version of a parser was overly generic and terribly inefficient, because I kept trying to avoid inconsistencies.

Now, the inconsistencies start to get exciting around about here.

Notice these two lines:

<pre class="add-bottom">
pub:f:1024:17:6C7EE1B8621CC013:899817715:1055898235::m:::scESC:
fpr:::::::::ECAF7590EB3443B5C7CF3ACB6C7EE1B8621CC013:
</pre>

These both follow the same output format, according to `DETAILS`. But look what happens when I add spaces to align the columns:

<pre class="add-bottom">
pub:f:1024:17:6C7EE1B8621CC013:899817715:1055898235::m:                                        ::scESC:
fpr: :    :  :                :         :          :: :ECAF7590EB3443B5C7CF3ACB6C7EE1B8621CC013:
</pre>

Some of the columns are meaningless for some of the output lines, but more shockingly, some of the columns are MISSING sometimes. Three of the columns just simply evaporate if the line is an `fpr`-type line. On top of that, there's no really good reason why the fingerprint needs to be a separate output line rather than just being added in at the right place. According to the `DETAILS` file, field 10 is for "User ID" - which is to say, the name, e-mail address, and comment associated with the key. Things that the fingerprint emphatically is not.

It this point you'll notice that field 5 contains the Key ID. And for added pain, the key ID is variously the last 8 or the last 16 nibbles (hexadecimal digits) of the fingerprint.

Frustrated yet? Me too. But let's just wave the rest of this category away, and move on to the next:


### Inconsistent interfaces

So let's imagine you want to generate a key. Sounds like a reasonable thing to do, right? So we're all hip and cool and want to do so programatically with our shiny command line interface to GnuPG, so naturally we think it'll look something like:

<pre class="add-bottom">
$ gpg --gen-key --name Smári McCarthy --email smari@mailpile.is --algorithm RSA --keysize 4096 --expires 2017-10-06
</pre>

... or something to that effect. And have sensible defaults for any parameters that are skipped, or otherwise make them required. Right?

Wrong.

GnuPG does have a `--gen-key` flag, but when you call it you are dropped into an interactive interface where you are forced to answer questions, one at a time. In varying order, depending on the version, it seems.

The only sensible programmatic way to deal with this is to use "expect" style scripts, where your script captures the output and provides programmatic input depending on what the application last said. These used to be used a lot in the 80's, but have fallen out of favour because: a) they make internationalization a nightmare, b) they make changing versions of software a nightmare, and c) they are almost never the right way to do anything.

They do work though. Kind of. Until they break, and it'll be hell to debug them.

Now, avid users of GnuPG will at this point mention the `--batch` option, which allows in this case for providing options to the key generator in yet another format. Except, of course, that if you want to do something entirely reasonable like add more than one UID (for instance if you have multiple e-mail addresses) to a new key, you can't. `--batch` just doesn't support it.

So your options are to either painfully generate through using expect-style scripts, or use batch and then edit the key afterwards to add uids. Except that the `--edit-key` also relies on an interface which requires the use of expect-style scripts, so you just gained nothing.

Another thing that frequently happens when using encryption software with slow algorithms (such as secure pseudorandom number generation or RSA) is that you have to wait a long time for things to happen. When you're making software with nice user interfaces, you sometimes start thinking that showing some kind of intermediate progress would be a nice thing to do. This is where we get to GnuPG's wonderful status file descriptor.

Really, the status descriptor is awesome. It gives me lots of information that is valuable and can make life a lot better. There are however a few shortcomings. First, contrary to all other file descriptors that you may work with in GnuPG, the status descriptor is not guaranteed to give you a newline character at the end of a status, which renders a bunch of sensible methods of reading input from it unreliable and requires that I handle that descriptor with special magic. Nor are you strictly guaranteed to only get statuses. I have on occasion run into blank lines and other weirdness that needs to be stripped. Once those quirks are all managed, the status descriptor is actually invaluable and should not be overlooked -- specially when mixed with the `--enable-progress-filter` flag.

The biggest complaint about the status descriptor is that it cannot be relied upon as a flow control mechanism. It does not always give output, or indicate the appropriate sequence of things, so an interface can use it for the purpose of increasing their information about the current situation, but not as a replacement for constant reading and parsing of the STDOUT and STDERR handles, and certainly not as a replacement for in-depth understanding of which order things happen in.

Actually, it should also be mentioned that as nice as it is to have all these descriptors, heavy use of descriptors turns into a world of problems on Windows. Windows is finicky enough as it is. Our solution was passing the status through to STDERR, which really works kind of fine.

Speaking of order, consider this handling of the passphrase descriptor -- a special descriptor for accepting a passphrase sent by the user as part of a wrapper-mediated communication (because nobody ever uses pipes like that on the command line), from GnuPG's `gpg.c`:

<pre class="add-bottom">
	...
    if( pwfd != -1 )  /* Read the passphrase now. */
    read_passphrase_from_fd( pwfd );
	...
    switch (cmd)
      {
      case aPrimegen:
      case aPrintMD:
      ...
</pre>

The interesting thing (aside from the annoying and dangerous lack of indentation on that if statement) is the way in which the passphrase is read from the password descriptor before the commands are managed. Which is to say, the passphrase *must* be sent, and, due to the way read_passphrase_from_fd is written, that descriptor closed on the sending end, before *anything* else happens. Which means that you need to know at the time of execution of the GnuPG binary that you need to send a passphrase, if you are going to do so programatically. This gives you three options: a) Send it every single time (requires storing the passphrase on the calling side, typically in insecure memory), b) Be willing to execute the same command twice, capturing potential errors on the first try and figuring out that they are due to a lack of passphrase -- something the error message will not always be clear about, or c) keep track of the entirety of GnuPG's internal state, which would be absolutely insane, even if it weren't version dependent. 

This behaviour is not obvious, or particularly reasonable, let alone documented. Figuring this out took a long time. 

If you've seen Mailpile's Windows and MacOS releases, you'll have noticed that we are shipping slightly old versions of GnuPG. The reason for this is that we figured out pretty late that the passphrase-fd is not the correct way to do things and has been disabled in more recent versions of GnuPG in favour of expanded use of things that implement the gpg-agent mechanism. So Mailpile should be a gpg-agent. 

(It is notable that several distributions still have GnuPG 1.4 as the default instead of GnuPG 2.x...)

The reason for this is that Mailpile provides a web interface, and in some of its use cases, it will do so from a server which is not necessarily capable of rendering a GTK window or provide a terminal prompt on the user's device. So despite all of the reasons why people might not want to shift a PGP passphrase over a SSL connection, it might still be something people will want to do, and we need to be ready for that contingency. So we need to accept the passphrase through a web form, and pass it back to GnuPG one way or another. (Note: the generic case is Mailpile running on localhost, which is always a fine thing to do. Even over HTTP. Normal threat model limitations apply.)

All of this is weird and annoyingly inconsistent. This category of problems probably doubled our interface in size and complexity, and made error handling an absolute nightmare. 


### The Error Handling Issue

When writing a library like this, we need to be able to anticipate errors from GnuPG and respond appropriately. The number of different and confusing ways of receiving information also means that there are a number of different and confusing ways to receive error statuses and such. Sometimes the return value is useful, but frequently it is not. Sometimes there is something on the status descriptor, or on STDERR. Often both, sometimes neither. The entire thing is maddening.

The approach we've had to take is the opposite of what would be preferable. It is simply to check if the positive output we're getting from GnuPG is roughly of the sort that we were expecting, and assume that if it isn't, an error has occurred. As a general error handling strategy this is idiotic, we know, and we'd like it to stop.


### What can be done?

The short answer is the same as [Matt Green's answer][1]: It is time for PGP to die -- or rather, RFC 4880 needs to be cleaned up, simplified, and replaced. PGP in its current form needs to evolve. There are a lot of very good reasons why, which [Carlos has neatly catalogued][2]. But realistically, PGP is what people use for e-mail, and until we have widespread adoption of crypto in e-mail *at all*, trying to replace PGP is just going to cause painful fragmentation. Since one of Mailpile's goals is to get millions of people encrypting their e-mail by default, we can't risk this fragmentation right now. If we round to the closest [lakh][3], zero people currently encrypt their e-mail. This is [scary][4] and [bad][5]. The way forward is not to throw PGP out, but to start thinking seriously about what replaces RFC 4880.

But we're stuck with RFC 4880. For now. A standard that is, for better or worse, being maintained entirely by one man.

Which gives us four options:

 1. Stick with GnuPG and improve it substantially.
 2. Fork GnuPG and improve it substantially.
 3. Replace GnuPG with something simpler and more consistent.
 4. Give up.

None of those approaches is good. I'm going to take option four off the table immediately because we're not going to give up.

Option two is essentially the hostile version of option one, so I'll write it off immediately. The people who've been developing GnuPG are great and we really like them. So we won't be forking GnuPG anytime soon -- heck, even if we did want to do that, we'd still not have any time to actually work on it.

Option three sounds most sensible long-term. Cruft is unavoidable, but Google's End-to-End might potentially serve as the basis for "minimum viable PGP". But End-to-End is also written in Javascript, and while people are entirely free to call me old-fashioned, I'd like the GnuPG replacement to be written in a compiled systems language.

But long term is long term. Short term, the only option is to stick with GnuPG.

I'd therefore like to propose the following:


### GnuPG JSON Mode

As I mentioned, a lot of GnuPG's output is actually structured a lot more than the output format supports. In our work so far, we've managed to build reasonable JSON structures out of that output for a lot of things. Completing that work and expanding on it, it would be possible to support something like this:

<pre class="add-bottom">
 $ gpg --json '{query}'
 {response1}
 {response2}
 ...
 {responseN}
</pre>

This would be relatively easy to build atop of GnuPG's current source code, making the `--json` flag preempt all else in the way `--batch` currently does. Then it uses a well supported library to parse the query, figure out what it is doing, call the appropriate internal functionality, and return the right data structures, also JSON encoded.

In order to support intermediate results, status descriptor style, an arbitrary number of results is allowed. They need not be comma separated, because we want our input parser to be able to pick them up one by one. Rather, just end each response block with a newline.

Have GnuPG exit after the last response.

With this, anybody implementing a GnuPG interface will be able to do all the magic relatively easily. The data structures can be well documented. Everything can become easy. I will stop losing my hair.

Somebody might ask, what about PGPME? Frankly, PGPME is great for a particular subset of GnuPG users. They can keep using it if they want. But if `--json` exists and is consistent and comprehensive, everybody will use that. Trust me.


### Conclusion

GnuPG is important and great in many ways, but it is also deeply broken and downright dangerous. The sooner it becomes a consistent tool, the sooner it will become something other than a fool's errand to attempt to interface with it. I'm happy to be on the caravan of fools for now, but only if there is something worthwhile at the end of this quest.

Software is hard. Security software is harder. Werner is doing great at managing a very shit situation, created by RFC 4880. I think there is a real possibility to make GnuPG way better. For now, we need JSON mode. I'm sure crowdfunding this work is possible, because we need it. I for one will put some cash down for this bounty. Join me?

**Update:** [We have written a follow-up
post](/blog/2015-02-26_Revisiting_the_GnuPG_discussion.html).

**Update II:** Note that the GnuPG project is somewhat stuck between a rock and a hard place with respect to the interface of the gpg tool; because other tools rely on GnuPG, many of these interfaces cannot easily be fixed without breaking other things. The official recommendation from the authors of GnuPG, is for developers to use the GPGME library. GPGME is itself a wrapper around gpg that glosses over or works around many of these problems. If it works for you, you should probably use it.


 [1]: http://blog.cryptographyengineering.com/2014/08/whats-matter-with-pgp.html
 [2]: http://secushare.org/PGP
 [3]: http://en.wikipedia.org/wiki/Lakh
 [4]: http://smarimccarthy.is/blog/2014/05/27/big-silos-small-privacy/
 [5]: http://smarimccarthy.is/blog/2014/05/28/engineering-our-way-out-of-fascism/
 [6]: http://pyme.sourceforge.net/
 [7]: http://tools.ietf.org/html/rfc4880
 [8]: http://werner.eifelkommune.de/
