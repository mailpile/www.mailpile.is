Subject: To PGP/MIME or not to PGP/MIME
Author: Bjarni
Date: November 11, 2014
Type: blog

**TL;DR**: PGP/MIME has some serious flaws. I propose specifying an
alternative method for PGP-encrypting e-mail (including attachments)
which improves security while being backwards compatible with legacy
ad-hoc PGP encryption, air-gaps and webmail plugins.


## How does e-mail encryption work?

The world of e-mail encryption can be surprisingly complicated and
convoluted.

The two standards that we have concentrated on the most in Mailpile, are
OpenPGP ([RFC4880](https://tools.ietf.org/html/rfc4880)) and the
PGP/MIME ([RFC3156](https://tools.ietf.org/html/rfc3156)) standard which
describes how to encrypt multi-part e-mail messages using OpenPGP.

In addition to PGP/MIME, there is also the older "ad-hoc" way of sending
encrypted content, which is to simply attach PGP-encrypted files as
attachments or to paste ASCII-armored blobs of encrypted text into the
message body itself.

To illustrate the difference, a PGP/MIME encrypted message with a single
attachment looks a bit like this:

    | From: Alice <a1234@wonderland.com>
    | To: Bob <b9973@builders.com>
    | Cc: Jar Jar Binks <omgwtf@lucasfilm.com>
    | Subject: I have a secret
    | Content-Type: multipart/encrypted;
    |               protocol="application/pgp-encrypted";
    |               boundary="==12345=="
    |
    | --==12345==
    | Content-Type: application/pgp-encrypted
    | Content-Disposition: attachment
    |
    | Version: 1
    |
    | --==12345==
    | Content-Type: application/octet-stream
    | Content-Disposition: attachment; filename="msg.asc"
    |
    | -----BEGIN PGP MESSAGE-----
    | Version: GnuPG v1
    |
    E Content-Type: multipart/mixed; boundary="==67890=="
    E
    E --==67890==
    E Content-Type: text/plain; charset='utf-8'
    E
    E I am not wearing any socks!!
    E
    E --==67890==
    E Content-Type: image/jpeg
    E Content-Disposition: attachment; filename="my-toes.jpg"
    E
    E [BASE64 ENCODED PICTURE OF NAUGHTY TOES]
    E --==67890==--
    | -----END PGP MESSAGE-----
    |
    | --==12345==--

The clear-text bits are preceded with a '|' and the contents of the
encrypted part with an 'E'. The same message, sent using ad-hoc
encryption, might look like this:

    | From: Alice <a1234@wonderland.com>
    | To: Bob <b9973@builders.com>
    | Cc: Jar Jar Binks <omgwtf@lucasfilm.com>
    | Subject: I have a secret
    | Content-Type: multipart/mixed; boundary="==12345=="
    |
    | --==12345==
    | Content-Type: text/plain; charset='utf-8'
    |
    | -----BEGIN PGP MESSAGE----
    | Digest: sha-1
    |
    E I am not wearing any socks!!
    | -----END PGP MESSAGE----
    |
    | --==67890==
    | Content-Type: application/octet-stream
    | Content-Disposition: attachment; filename="my-toes.jpg.pgp"
    |
    E [BASE64 ENCODED, PGP-ENCRYPTED PICTURE OF NAUGHTY TOES]
    | --==67890==--

There are noticable differences here:

1. The PGP/MIME encrypted data is formatted as a fragment of MIME data
2. The PGP/MIME encrypted message hides how many parts the message has
   and any metadata about them: an outsider cannot tell whether there
   is an attachment or not.
3. In the ad-hoc scheme, only the payloads are encrypted
4. The ad-hoc scheme loses the mime-type of the attachment
5. The ad-hoc scheme leaks the name of the attachment in the clear (or
   loses it, if it gives the attachment a nondescript name)
6. The ad-hoc scheme does not protect the integrity of the message, an
   attacher can inject parts or remove parts without Bob being able to
   detect that anything happened.


## What does this all mean?

When the technical characteristics of the two formats are compared, there
are two major considerations - security and compatibility.

For ad-hoc encryption, we find:

1. Ad-hoc encryption is not very secure: it leaks or loses metadata, and
   message integrity is not guaranteed.
2. Ad-hoc encryption is comptible with legacy mail clients, in that it
   allows the recipient to manually copy all the encrypted parts and
   decrypt "offline", giving them the opportunity to communicate with some
   security even though their mail client does not understand PGP.

Conversely:

1. PGP/MIME encryption protects attachment metadata and message structure,
   only the message header is sent in the clear.
2. In practice, PGP/MIME is not compatible with legacy mail clients. If
   a user saves and manually decrypts the payload, they will end up with
   a fragment of MIME-encoded data. Tools for working with fragments of
   MIME are not widely available, so for non-technical users the data is
   effectively worthless.

What does this mean for Mailpile?

When trying to design and deploy a user-friendly e-mail encryption tool,
we can't just consider the interface we present to our own users, we
also have to consider the experience of people receiving our mail. If
it's illegible, then we have a problem - and that is exactly what is
happening here. If we stick with the more secure PGP/MIME, then it's
guaranteed that our outgoing messages will be unreadable by a
significant number of users, even if they have PGP keys and know how to
use them.

Just to clarify, Mailpile absolutely needs to be able to receive and
correctly parse PGP/MIME formatted mail. That is not up for debate - all
secure mail clients should do this, just like all web browsers should
parse and display GIF images. But if better alternatives are available
to us, we probably should avoid creating new content using a format that
is known to have fundamental flaws.


## What is the impact?

Most desktop and some mobile mail clients do support PGP/MIME, but few
do so natively - most require a 3rd party plugin, which is a usability
concern in and of itself.

When we consider the vast number of webmail users, the situation is much
more grim - there a recipient's only option is a variation of the manual
download scenario; save attachments and decrypt offline. Webmail
encryption plugins, Mailvelope and Google's End-To-End being the most
promising at the moment, are merely automating that process and generally
[do not support PGP/MIME](https://code.google.com/p/end-to-end/#Which_RFCs_does_End-To-End_support?).
Although [Google's engineers have expressed interest in supporting
PGP/MIME eventually](https://code.google.com/p/end-to-end/issues/detail?id=32),
it is not an easy problem and they make no promises about when or
whether the user-experience will be acceptable.

Finally, there is a very small, but disproportionatly important, set of
users (whistle-blowers, activists, spies) who have a need to run their
Internet tools and their encryption tools on separate machines.  An "air
gap" is a low-tech, widely understood method of protecting secret key
material from being compromised. If we send PGP/MIME formatted mail,
air-gapping becomes inconvenient to the point of being infeasible.

Since usable crypto is our goal, and Mailpile users need to be able to
communicate with people using other mail clients, I feel that real-world
compatibility is marginally more important than dogmatically adhering to
standards and protocols.

And by that logic, the question changes...


## Can ad-hoc PGP encryption be made as secure as PGP/MIME?

I think maybe it can.

The problems with ad-hoc encryption (aside from the fact that it is
not very elegant), are as follows:

* Metadata is leaked or lost
* Message integrity is not guaranteed

Here are a couple strategies to deal with this:

1. Put all attachments in a ZIP archive, and encrypt that.
2. Add an encrypted "Email Manifest" which verifies message integrity
   and carries metadata.

These methods could be combined, or used separately. They are
complementary, but the Email Manifest is actually the more important of
the two.

Putting attachments in an archive would largely be a matter of
convenience for the recipient, as it allows us to stop transmitting
file-names in the clear, while allowing the user to use standard, well
understood tools to interact with the contents. Without such an archive,
we either have to transmit file names in the clear, or ask users to
rename files by hand.

The Email Manifest is the more interesting part of this proposal. It not
only allows us to verify the integrity of the message, it also gives us
the opportunity to correct some of the more egregious deficiencies of
PGP/MIME - namely the fact that PGP/MIME transmits the Subject, From,
To, CC and many other critical headers in the clear. PGP/MIME is also
annoyingly picky and ambiguous about how to treat white-space when
verifying signatures.

Mail clients implementing some sort of "Email Manifest protocol" could
agree to move critical headers out of the main message and into the
encrypted manifest as often as possible, and then reverse the same
process upon decryption. We can make sure the Email Manifest's
specification deals with white-space in a clear and easy to implement
manner.


## Another example

To revisit our example, an e-mail sent using an Email Manifest approach
might look like this:

    | From: a1234@wonderland.com
    | To: b9973@builders.com
    | Cc: omgwtf@lucasfilm.com
    | Subject: Encrypted Message
    | Content-Type: multipart/mixed; boundary="==12345=="
    |
    | --==12345==
    | Content-Type: text/plain; charset='utf-8'
    |
    | -----BEGIN PGP MESSAGE----
    | Digest: sha-1
    |
    E From: Alice
    E To: Bob
    E Cc: Jar Jar Binks
    E Subject: I have a secret
    E
    E I am not wearing any socks!!
    E
    E Note: this message should have 1 attachment and a manifest.
    | -----END PGP MESSAGE----
    |
    | --==67890==
    | Content-Type: application/octet-stream
    | Content-Disposition: attachment; filename="attachment-1.pgp"
    |
    E [BASE64 ENCODED, PGP-ENCRYPTED PICTURE OF NAUGHTY TOES]
    | --==67890==
    | Content-Type: application/pgp-manifest
    | Content-Disposition: attachment; filename="manifest.pgp"
    |
    E Manifest-Version: 1.0
    E From: Alice <a1234@wonderland.com>
    E To: Bob <b9973@builders.com>
    E Cc: Jar Jar Binks <omgwtf@lucasfilm.com>
    E Subject: I have a secret
    E
    E Inline: text/plain; sha2sum="..."; has-pgp; pgp-has-hints
    E Attachment-1: image/jpeg; filename="my-toes.jpg"; sha2sum="..."
    | --==67890==--

This sample demonstrates how both the message structure and sensitive
headers could be moved into the Email Manifest.

This example does not use a ZIP archive, so it leaks how many
attachments the mail has and how big they are; building an example
which does use a ZIP archive is left as an exercise for the reader.

For the benefit of PGP-enabled mail clients unaware of the Manifest,
some important header data and human readable integrity hints could be
injected into the text part itself, while an Email Manifest-aware
client could suppress the duplicate information automatically to avoid
clutter.


## What does the recipient see?

If a recipient's mail client understands Email Manifests, the message
can be rendered just as nicely as if it were sent using PGP/MIME, with
the added benefit that protected headers can be marked as secure.

A PGP-aware mail client that doesn't understand the Manifest will see
simplified headers, and the text-part of the e-mail will have some extra
clutter at the top, From, To, Subject etc, and a notice at the bottom.
The attachments may need to be renamed or extracted from a ZIP archive
before they are useful. They will also see the Email Manifest itself as
an attachment, which they can decrypt and read if they would like to
manually confirm the message was delivered intact.

A mail client with no support for PGP, will present the user with
encrypted text and attachments they can save to disk for offline
processing.

So compared to PGP/MIME, this approach improves the security of Mailpile
users (or others supporting Email Manifests), makes life somewhat less
convenient for the users of other PGP/MIME-aware mail software, and
dramatically improves interoperability with mail clients and plugins
that do not understand PGP/MIME, including webmail users.


## Conclusion

It is definitely possible to transmit PGP-encrypted messages and
attachments over e-mail in a way which is both more interoperable and
more secure than the PGP/MIME format.

The question remains - should we?

This is not a standard, but perhaps it could become one. Messages sent
this way have the potential to be more secure than PGP/MIME, but some of
the features of PGP/MIME will be lost; namely mail-client awareness of
attachment types and probably also support for HTML mail. However, that
may only be a short-term problem, until PGP plugins are upgraded to
understand Email Manifests.

Is the ZIP archive idea good or bad? It makes some things easier and
both hides and preserves more metadata, but it complicates
implementation and may add extra steps for the recipent. On the other
hand, manually renaming files is no fun and ZIP files may be the lesser
of two evils if we assume we are indeed abandoning PGP/MIME.

We would like to get feedback on this from people who work with
encrypted e-mail on a day to day basis, security trainers and such
folks, and from folks writing secure e-mail tools. What do you think?
Please mail us at [team@mailpile.is](mailto:team@mailpile.is) or tweet
at [@MailpileTeam](https://twitter.com/MailpileTeam) if you have
insights to share.

Thanks!
