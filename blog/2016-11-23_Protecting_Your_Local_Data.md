Subject: Protecting Your Local Data
Author: Bjarni
Date: November 23, 2016
Type: blog

Everyone understands physical security.

Starting in play-school, we learn that if we don't want the other kids
to play with our favourite toys, then steps must be taken. Hopefully
most of us also learned to share and play nice, but that's another
matter...

Keeping physical objects safe is such a basic skill that it requires no
explanation. We all know the importance of keeping our wallets or our
phones safe, our jewellry, our keys. We may not do a great job all the
time, some of us are absent minded and maybe we live in a safe place and
don't worry too much - but we all understand the concept.

One of Mailpile's main goals is to bring this kind of intuitive security
to our digital lives, to e-mail. If a physical device in your possession
stores your mail, then you already know the basics of keeping your
e-mail secure, private and safe.

So far, so good!

But what happens when things go wrong? What happens when your Mailpile
machine gets lost or stolen? Or dropped on the floor?


### The Risks

When something goes wrong with your Mailpile device, there are two bad
things that are likely to happen:

   1. You lose access to your Mailpile data
   2. Someone who shouldn't gains access to your Mailpile data

The first case is more common; it can happen when a machine gets lost,
gets stolen, gets damaged in fire or flood, or malfunctions of its own
accord. Given enough time, it's almost inevitable.

The second case is much less common, but when it happens the
consequences can be dire. If your e-mail contains very sensitive
material (confidential documents, nude photos, incriminating evidence)
your job, your relationships or even your life may be at risk.

So those are the problems. How about some solutions?


### Avoiding Data Loss: Backups

Protecting you from losing access to your Mailpile is conceptually
simple. You just need backups. That's all.

Famous last words...

Making backups available and easy is actually quite hard, because it is
ultimately a physical problem. The data needs to be copied to another
device that won't be lost or damaged by the calamity that made you need
backups in the first place.

Any local physical solution ultimately relies on user education and user
action; which means our less skilled or more absent-minded users will
not end up with working backups. This is unacceptable.

A much better solution would be to use the network, automatically store
Mailpile users' backups somewhere else. But where? If Mailpile were to
directly provide an online backup solution, that would make us stewards
of your data (a role we would like avoid) and would also cost us a bunch
of money to do properly - money which the project simply does not have.

We also need to take care that the backups themselves don't become a
security risk - we don't want to create a backup solution that
accidentally grants unauthorized parties access to your mail!

Our current strategy is simple: we want to encrypt all your data and
then upload it right back to one of the IMAP servers you already have
access to.

Simple right? A mere matter of programming (this will take some time).


### Avoiding Data Loss part II: Keys, Keys, Keys

We have a plan for backups! But what about the encryption keys?

If those are lost, all is lost.

If those are stolen, all is stolen.

Currently, Mailpile requires users log in to their Mailpile with a
password (or passphrase). Internally, this passphrase unlocks a file
encrypted using GnuPG, a file which contains the actual encryption key
used for everything else.

If we trust GnuPG's security (which we do), it should be perfectly fine
to store this along with all the other data. Right?

Unfortunately, no. The problem is, our users may not choose strong
passwords. No matter how much we try to educate, some will end up using
the same password for their Mailpile as they used for the IMAP server
we're uploading the backups to. Since the operator of the IMAP server
can access that password with relative ease, that would leave the
backups exposed.

So this part of the plan requires more thought; the current strategy we
are leaning towards, is to create an unguessable "recovery key", made up
of 9-12 dictionary words. This recovery key will be used to encrypt the
keys to the kingdom, before they too are uploaded to the cloud.

Once backups are enabled, the app will do the following:

   1. Ask the user to print out or write down the recovery key, and keep
      it safe.
   2. Ask the user to nominate a few trusted friends or family members,
      and e-mail each of them a part of the recovery key.

The first option is for people who don't have any friends. The second
option is for everyone else!

When a user needs to restore their Mailpile from backups, they will
either fetch the printout from the shoebox under the bed (or from the
bank vault), or they will contact their friends asking for help. Either
way, it's a relatively simple procedure.

We think... [your feedback is most welcome](https://github.com/mailpile/Mailpile/issues/1691)!

There are of course lots of little details; the length of the recovery
key, the number of trusted friends who receive key details versus the
number of friends required to respond for successful recovery, the
wording of the key fragment e-mails. And so on! But I think the basic
idea is sound and the implementation should be able to adapt to the
needs of both casual users and users with strong security requirements.

Incidentally, this procedure can also serve as a decentralized "password
reset" feature for people who forget their Mailpile password. They just
have to remember who their trusted friends were...


### Keeping Your Data Private

The final piece of this puzzle, is keeping data private.

This is also conceptually simple: we encrypt everything!

Considering that strong cryptography is available "off the shelf" from
multiple mature libraries these days, our job is to choose one of the
industry-standard algorithms from one of the standard libraries, and
make use of it.

The main constraints are performance and reliability. We would like the
encryption to not slow things down *too much*, and we would like the
encryption to not increase the odds of data loss.

Given those two constraints, our current preference is to use [AES in
CTR (Counter) mode](https://en.wikipedia.org/wiki/Cipher_block_chaining#Counter_.28CTR.29),
with a SHA256-based MAC to detect data corruption and/or tampering.

Since CTR mode localizes any damage (unlike AES-CBC which we were
mistakenly using before), it can be argued that the encryption doesn't
reduce reliability. Of course in practice this will depend on the what
the app does when corruption is detected and how easy (and safe) it is
to recover - but as long as the data is mostly intact, our recovery
strategies can evolve and improve over time.

An alternative mode, GCM (Galois Counter Mode) would also be a good
candidate, but it's currently not as widely available as CTR mode. We
may switch to it in the future.

Another item for the long-term wishlist is use of [error correction
codes](https://en.wikipedia.org/wiki/Error_detection_and_correction) to
automatically recover from minor corruption; potentially making Mailpile
Encrypted Storage *more* resiliant than normal unencrypted files.


### Current State

This is all well and good. But we're not there yet!

Here is a summary of the current state of things in Mailpile and what we
expect for version 1.0:

1. Automated backups are not implemented yet and probably will not be
   ready by version 1.0. We have however laid the groundwork by defining
   an on-disk storage format which can be easily uploaded to IMAP servers
   (since the format looks like e-mail).

2. Key backups are not implemented, but are a goal for 1.0 due to their
   importance and the extreme risk of data loss if they are compromised.
   [Join the discussion here](https://github.com/mailpile/Mailpile/issues/1691).

3. Local data encryption is implemented. We are in [the process of
   switching encryption algorithms to AES-CTR](https://github.com/mailpile/Mailpile/pull/1684).

Thanks for reading!

