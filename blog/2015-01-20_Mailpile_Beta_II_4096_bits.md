Subject: Mailpile Beta II - the 4096 bit release
Author: The Team
Date: January 20, 2015
Type: blog

<img src="/files/Beta-II.jpg" border="0">

Hello world and Happy New Year!

The Mailpile team is happy to announce our second Beta release:
**Mailpile Beta II** (version 0.4.2). We're still not at 1.0 (sorry...),
but much progress has been made and it is high time to update our public
offerings again.

There was also a little security bug in the Beta, that we need to talk
about and address... but first, the good stuff!


## Where Can You Get It?

The new release is availble from [the Mailpile download
page](/download/), and the source is [on
github](https://github.com/mailpile/Mailpile/releases) as always.

Please read [the release
notes](https://github.com/mailpile/Mailpile/wiki/Release-Notes-201501-Beta-II)
and check our [security
roadmap](https://github.com/mailpile/Mailpile/wiki/Security-roadmap) so
you know what to expect.

**Note:** People upgrading from the older Mac or Windows packages may
want to uninstall the old Mailpile Beta before installing Beta II. Your
data should all remain intact.


## What's New?

Since our last beta, work has been focused on three things: fixing bugs,
improving the usability of PGP and speeding up the web interface.

We have made great progress on all of these fronts.

In particular, many of the bugs in our IMAP implementation have been
ironed out, as has the notorious bug whereby `openssl` processes stick
around consuming large amounts of CPU after Mailpile had supposedly been
shut down. Most of the bugs that made the command line interface
unusable were fixed and of course that security issue which we'll
discuss at the end of this post.

The usability of our PGP interface was given some serious scrutiny, with
the help of our friends at the Open Internet Tools project. The amazing
[Gus Andrews](https://openitp.org/sup/) conducted a series of usability
studies with various types of users, the results of which were [posted
on the OpenITP's
blog](https://openitp.org/field-notes/user-tests-mailpile-features.html).
Brennan has been working on solutions based on this feedback and many
improvements in Mailpile Beta II are a result of this work. Thank you
Gus and OpenITP! We hope to work more with them in the future - this is
just the beginning!

Finally, Bjarni went into hiding in Italy to focus on improving the
performance of our web interface. As a result the Beta II release is
noticably snappier than the first Beta, and we expect more improvements
on this front in the near future.

Many other things are still in progress, including a more "AJAXy" user
interface, a way to safely read HTML mail, a redesign of the way
Mailpile stores its data, reductions in Mailpile's RAM requirements and
code cleanups to make Mailpile more amenable to Linux distro packaging.
Those features may not be visible in the Beta II user interface, but
people who look under the hood will find traces in the code.

## Our PGP key size bug

That brings us to the security issue which forced us to get our act
together and push this release out the door:

*The Mailpile Beta was misconfigured to generate weak PGP keys during
setup.*

To be exact, if a user installed Mailpile and did not already have a PGP
key in their GnuPG keychain, then Mailpile would automatically generate
a new key. Instead of generating a 4096 bit encryption key as we had
planned, we actually generated a 1024 bit key. Oops!

* **How did this happen?**  
  Human error. The key size was lowered to facilitate debugging, and we forgot to raise it again.
* **Who is affected?**  
  People who did not already have a PGP key and installed the Mailpile Beta, or installed from github before Jan 5, 2015.
* **What is the impact?**  
  Unless you have powerful enemies, a 1024 bit key is still probably okay. See below for more details.
* **How does one fix it?**  
  Generate a new key, revoke the old one. We have added code to Mailpile to assist with this process. Details below...

We'd like to give special thanks to Matt Drollette for sending us a pull
request on github to fix the issue.


### So how bad is it really?

Realistically, there still aren't many organizations in the world that
can factor 1024 bit keys within a reasonable amount of time. The NSA
certainly can. Its partners probably. Some other large organizations
maybe. There are some attacks that have worked to reduce the keyspace,
but they're more common on SSL than PGP. So unless your attacker is a
large powerful government, 1024 is probably okay-ish at the moment. And
using a 1024 bit key is certainly far, far better than not using
encryption at all.

On the other hand, PGP encrypted data tends to stay encrypted that way
for long periods of time, so there is a possibility that somebody could
intercept the encrypted message, store it until factoring 1024 bit RSA
keys is easy, and then decrypt it. That could be anything between years
or decades.

A lot of people still use 1024 bit RSA keys, but [Certificate
Authorities stopped selling new 1024 bit certificates at the end of
2013](http://www.symantec.com/page.jsp?id=1024-bit-migration-faq),
because they're simply not good enough.

Long story short: This isn't the end of the world, but we recommend you
upgrade your keys as soon as possible.


### How do you fix it?

For that matter, how do you even know if you have a weak key?

These two questions are closely related, and just writing instructions
for all the different operating systems out there seemed like a daunting
task. So, in order to simplify the process, the Mailpile Beta II
includes code which will evaluate your keychain and suggest improvements
if it finds problems.

These problems are not limited to weak 1024 bit keys, the checker will
also detect other problems, such as using a key that is scheduled to
expire in the near future, or neglecting to create a key for one of your
outgoing e-mail addresses.

To give the tool a try, visit the Mailpile command-line interface and
run the `crypto/gpg/check_keys` command. It should produce output
similar to this:

<pre class="add-bottom">
mailpile> crypto/gpg/check_keys

Sanity checked: 4 keys in GPG keyring, 1 profiles.
 - 61A015763D28D410A87B197328191D9B3B4199B4: OK: 4096 bits, looks good!
 - 85EE5D9223806DFCBA630E39EABBE96FD521D78C: --- Disabled.
 - 20FF41634DF6F90ECA4452203CAC6CA6E4D9C373: Bad: expired on 2015-01-16
 - 9858665AC3CA84FEAE2BCAD1E623001E05CE8B43: --- Disabled.

Proposed fixes:
 - Revoke bad keys:
    * Run: `gpg --gen-revoke 20FF41634DF6F90ECA4452203CAC6CA6E4D9C373`
    * Follow the instructions given
    * A block of text will be shown on your screen.
    * Send that block to contacts that have your key.
    * You can search for `is:encrypted to:me` to find people who have it.
- Disable bad keys:
    * Run: `gpg --edit-key 20FF41634DF6F90ECA4452203CAC6CA6E4D9C373`
    * Type `disable`
    * Type `save`
    * You're done!
</pre>

The recommended `gpg` commands can be run either from a bash shell (or
C: prompt on Windows), or from within Mailpile itself - in order to
allow the instructions to work cross-platform we provide direct access
to `gpg` from within the Mailpile command-line itself.

We are sorry this is not more user friendly, but we had to strike a
balance between making things easy, and getting the word out as soon as
posible. Future versions of Mailpile will hopefully automate more of
this process, detect more problems, and make our "GPG keychain Doctor"
more accessible to people not used to using the command-line.

It's a start!


## Conclusion

Thanks for reading this far, and thank you again for all of your
support.

Now go [check out Mailpile Beta II](https://github.com/mailpile/Mailpile/wiki/Release-Notes-201501-Beta-II)!

