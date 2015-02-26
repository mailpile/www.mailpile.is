Subject: More thoughts on working with GnuPG
Date: February 26, 2015
Author: Bjarni
Type: blog

Smári's [blog post on working with
GnuPG](/blog/2014-10-07_Some_Thoughts_on_GnuPG.html) got a fair bit of
attention and continues to be referenced in various posts and
discussions online.

Responses have varied, from vehement agreement, to a [friendly and
thoughtful response from Werner
himself](https://lists.gnupg.org/pipermail/gnupg-users/2015-February/052401.html),
to random folks on the Internet people calling us incompetent for using
the GnuPG command-line tool directly instead of some library or other.

I would like to address that last group specifically:

1. If you think a command-line interface is not an API, then you are
   ignoring the millions of lines of shell scripts that keep the Internet
   running. You are wrong. Please consult your nearest sysadmin for an
   attitude readjustment.

2. Process separation is one of the cornerstones of good security
   design. Heartbleed and many other vulnerabilities are direct results
   of crypto and keys living the same process space as protocol and
   application logic. We initially chose to invoke GnuPG (and OpenSSL
   as well) as external tools for such security reasons, even though we
   knew it would cost us some performance.

3. We looked at the libraries, encountered an apalling lack of
   documentation and hoped the command-line interface would be nicer to
   work with. Learning one API beats having to learn two, and there was
   no way we could do this *without* the GnuPG CLI - if only for
   debugging and tech support reasons.

Phew.

Now that I've gotten that off my chest... let's move on to some more
productive discussions!


## Utility or Application?

Although I appreciated Werner's response to our post, I am afraid he
missed the forest for the trees. Probably because Smári wrote a lot
about some interesting, funky trees... :-)

Fundamentally, I think Mailpile's difficulties stem from the fact that
GnuPG was not written with automation in mind. The tool is not written
as a unix utility, it is very much written as a user facing application,
a tool for humans.

As such, it is a fantastic piece of engineering. If you understand how
public/private key encryption works and know what you want to do, odds
are GnuPG will help you get the job done. GnuPG's security track record
is solid and it is a tool people can rely on, as long as they take the
time to learn the basics and get used to the CLI.

However, as a result of this design focus, many of GnuPG's automation
interfaces appear to be an afterthought. They are incomplete and often
difficult to work with. Consider that "commands to create and sign keys
without any user interaction" were brand new [in GnuPG 2.1 last
November](http://lists.gnupg.org/pipermail/gnupg-announce/2014q4/000358.html).
GnuPG 2.1 is the development version of GnuPG and is not shipped by any
of the mainstream Linux distributions yet. I do applaud the fact that
these features are being added, but the fact that it happened 3 months
ago only supports my hypothesis: automation has to a great extent been
an afterthought to the GnuPG project.

This has gotten worse over time, not better. In GnuPG 2.0, use of
`gpg-agent` and `pinentry` became mandatory and the assumption that the
tool is running in a desktop environment under human oversight pervades.
This is why Linux distros still keep shipping GnuPG 1.4.x - they rely on
automated PGP processing for package verification and other things which
GnuPG 2.0 just isn't suitable for.

I worry that GnuPG 2.1 takes this even further still, [moving key
managment operations into the
agent](https://www.gnupg.org/faq/whats-new-in-2.1.html). Also, as far
as I can tell, it doesn't matter whether we use the `gpgme` library or
the command-line tool, those assumptions and behaviors are shared
throughout.

Much of this is understandable, given GnuPG's historic roots and the
fact that it inherits many things from it's predecessor, PGP, which
itself predated modern graphical desktops and web apps. It is also
understandable, given the culture around PGP, where keys and passphrases
are magical holy talismans, so special that you need to constantly ask
the user for permission before invoking them.  GnuPG enforces this
culture by preventing apps from interfering with the flow of this
critical information, refusing to work without trusted pinentry.

However, while GnuPG insists on controlling this part of the user
interface and treats automation as a 2nd class citizen, a side effect is
that the project actively thwarts efforts of others that want or need
alternate user interfaces.

Mailpile is one such project.


## Mailpile's pinentry woes

One of the cool things about Mailpile, is it functions not only in a
desktop environment, but also as a background process (receiving,
decrypting and indexing mail), and also as a remote web server which
allows the user to leave their mail and keys on a secure box in their
home, which they then access remotely over the network.

This flexibility is key to our overall goals of providing people with
something that can match "cloud based" e-mail providers on features,
without compromising privacy and security.

Unfortunately, the entire pinentry concept, where `gpg` (via the
`gnupg-agent`) displays a window prompting the user to enter a
passphrase, is completely and utterly incompatible with this. Popping up
a dialog on the user's Raspberry Pi, when the owner tries to read
encrypted mail from halfway across the world using his Android phone's
web browser, is never going to work.

And even if it somehow did work, using a side-channel to authenticate
has very serious problems of its own.

Consider the situation where a user wants to access Mailpile both
locally, and remotely: on the desktop, the "just use pinentry" dogma
tells us we should just trust GnuPG there (and GnuPG 2.x enforces this
policy).

Well, what then happens when Mailpile is accessed remotely?

Things fail.

The benign failure mode is the user can't read encrypted mail because
they can't see the pinentry dialog. This makes the app unusable, but the
bug is still "benign" because it doesn't leak confidential data.

There is another catastrophic (and real) failure mode: If the legitimate
user is logged on at the desktop and an attacker can access Mailpile's
web interface at the same time, then the attacker will be able to read
encrypted mail (or compose fraudulent signed mail) because the
`gpg-agent` has keys cached and Mailpile has no way to communicate to
GnuPG that the remote access is somehow different from what happens
locally.

This is really, really bad.

This is why Mailpile only supports GnuPG 1.4.x at the moment: we haven´t
figured out how to make GnuPG 2.x operate in a secure fashion, since it
won't let us disable the agent.

This whole issue has us scratching our heads and wondering what to do.
We've gone from frustration to righteous anger, to just being rather
worried. If the GnuPG project is moving aggressively in a direction
which is fundamentally incompatible with projects like ours, what should
we do?  Drop PGP and try to implement S/MIME? Switch to something
interesting but unproven, like
[reop](http://www.tedunangst.com/flak/post/reop)?

I just don't know.

I could come up with some clever hacks to work around GnuPG's core
design; I could implement my own agent, I could try to cripple GnuPG
with weird environment variables or a custom GNUPG_HOME and config, or I
could even fork the project - but those *all* feel like last resorts.

I am currently revisiting whether I can get `gpgme`-based code to avoid
the problems caused by the agent and side-channel auth. I am not too
optimistic. If that fails, then it's last resort time, or time to drop
PGP.


## Is this fixable?

For the record, Mailpile is not the only project having problems -
questions about related issues are common [on the GnuPG-users mailing
list](https://lists.gnupg.org/pipermail/gnupg-users/2015-February/052754.html)
and [elsewhere](https://stackoverflow.com/questions/8671099/how-to-bypass-pinentry-passphrase-screen-while-decrypting-a-file-using-gpgme).

However, I have yet to hear any of the GnuPG developers acknowledge that
this is even a concern, which is why I have taken the time to write this
post. I would like to humbly request that Werner and GnuPG consider
these issues, now that [they finally have a
budget](http://www.propublica.org/article/the-worlds-email-encryption-software-relies-on-one-guy-who-is-going-broke).
(Congrats, by the way, you deserve it!)

I really do think this can be fixed, if the GnuPG project agrees it is
worth doing. Some specific ideas that I think could help:

1. Clearly separate the user interface aspects of GnuPG from the crypto
   and keychain management, so projects can use one without the other.
   Do not assume all apps interacting with a particular keychain want the
   same UI for authentication.

2. Treat the command-line interface of `gpg` as if it were an API; keep
   it stable and machine friendly. There should be command-line
   alternatives to all of the interactive dialogs.

3. Make `gpgme-tool` (which implements an API very similar to the JSON
   API requested by Smári in his post) a mandatory 1st class citizen of
   all GnuPG bundles (instead of [doing this](https://lists.gnupg.org/pipermail/gnupg-devel/2014-December/029196.html)).
   We had no idea this tool existed, and I still can't find it for my
   distro (Ubuntu 14.04). Consider rolling this functionality into the
   `gpg` binary itself to facilitate scripting and automation.

There are probably more, but those are my top three!

Thanks for reading, I look forward to further discussions.
