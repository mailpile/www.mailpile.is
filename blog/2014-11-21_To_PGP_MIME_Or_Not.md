Subject: To PGP/MIME or not to PGP/MIME
Author: Bjarni
Date: November 11, 2014
Type: blog

The world of e-mail encryption can be surprisingly complicated and
convoluted. Today I am worrying about attachments.

The two standards that we have concentrated on the most in Mailpile, are
OpenPGP ([RFC4880](https://tools.ietf.org/html/rfc4880)) and the
PGP/MIME ([RFC3156](https://tools.ietf.org/html/rfc3156)) standard which
describes how to encrypt multi-part e-mail messages using OpenPGP.

In addition to PGP/MIME, there is also the older "ad-hoc" way of sending
encrypted content, which is to simply attach PGP-encrypted files as
attachments or to paste ASCII-armored blobs of encrypted text into the
message body itself.

The Beta release of Mailpile included a relatively decent implemetation
of most of these things. It could read and write PGP/MIME, and it
attempted to make sense of ad-hoc encryption as well. We need to improve
our ad-hoc attachment handling somewhat, but aside from that, the
Mailpile Beta's support for PGP was actually pretty good.

However, one question has been nagging at us for months now. What is the
best format for outgoing, encrypted e-mail?  Ad-hoc or PGP/MIME?

This is not an easy question:

1. Very few e-mail clients support the PGP/MIME standard, and the standard
   itself does not degrade gracefully. This means if Mailpile sends PGP/MIME
   formatted mail to someone whose mail client does not support it, the
   recipient won't be able to access the contents at all without serious
   geek skills - even if they have GnuPG or some other PGP application
   installed. It's important to note that the first drafts of promising
   tools like Google's End-to-End, [do not support
   PGP/MIME](https://code.google.com/p/end-to-end/#Which_RFCs_does_End-To-End_support?).
2. On the other hand, if we used the ad-hoc method for encrypting mail,
   then critical metadata, such as the file names of attachments, will
   either be lost or transmitted in the clear, unprotected by Mailpile's
   encryption.

So at first glance, it appears that for attachments, we are forced to
choose between security (1) and compatibility (2). No matter which we
choose, it will be the wrong choice for some of our users.

Since usable crypto is our target, and Mailpile users need to be able to
communicate with people using other mail clients, we feel that
real-world compatibility is marginally more important than dogmatically
adhering to standards and protocols. So the question becomes - can we
make ad-hoc PGP encryption as convenient and secure as PGP/MIME?

We think maybe we can.

Although it is by no means decided, we are currently considering a
default outgoing encrypted mail format that looks something like this:

* A clear-text RFC2822 / MIME message with:
   * 1 plain-text part with a ASCII armored PGP message
   * 1 PGP encrypted ZIP file, containing all attachments (and metadata)
   * Optionally, our public PGP encryption key

If we add the ability to Mailpile to look inside a ZIP file for
attachments, the current user interface and experience can stay
unchanged.

Mail clients with no support for PGP will still give the user the option
of downloading the encrypted .ZIP archive and processing it by hand or
even offline, on another computer.

The losers in this scheme are recipients that are using PGP/MIME aware
mail clients: they will have to go through the extra step of extracting
files from the .ZIP archive by hand. But since most modern operating
systems make that relatively easy, maybe this is a worthwhile trade-off?

We are excited by this idea, but not yet convinced it's the right way to
go. We would like to get feedback from people who work with encrypted
e-mail on a day to day basis, security trainers and such folks. What do
you think? Please mail us at [team@mailpile.is](mailto:team@mailpile.is)
or tweet at [@MailpileTeam](https://twitter.com/MailpileTeam) if you have
insights to share.

Thanks!
