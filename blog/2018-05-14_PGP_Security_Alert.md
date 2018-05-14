Subject: PGP Security Alert
Author: Bjarni Rúnar
Date: 14 May, 2018
Type: blog

Dear Mailpile users,

The [EFF have publicized advice from a group of security
researchers](https://www.eff.org/deeplinks/2018/05/attention-pgp-users-new-vulnerabilities-require-you-take-action-now),
who claim there is a serious problem with PGP encrypted e-mail. Users
are advised to disable automatic decryption of e-mail and exercise
caution or avoid decrypting e-mails entirely until the vulnerabilities
have been addressed.

Within Mailpile, the way to disable automatic decryption is as follows:

1. In the web interface, visit the **Settings** page
2. Open the **CLI**
3. Run the following command: `set prefs.index_encrypted = false`

This will disable automatic decryption of incoming mail. However, manual
decryption (decryption when messages are read) will still work and it is
advisable to not read any encrypted mail until we know more about the
attack and whether Mailpile is actually vulnerable.

If you **absolutely must read encrypted e-mail**, we recommend taking
your computer offline before doing so, so as to prevent network-based
side channels from leaking sensitive key material.


## What is going on?

**What follows is idle speculation. Please take it with an appropriately
sized grain of salt!**

I don't know what is going on. However, I trust the EFF. They would not
be advising we disable such an important tool unless it was of critical
importance.

The implications of the advisory, are that automatic e-mail decryption
can leak details of your private key material back to a malicious
attacker.

The mechanism is unknown, but the common denominator in the EFF's list
of vulnerable e-mail clients is use of GnuPG - which Mailpile also
relies upon.

My guess, is that there is a flaw in GnuPG which allows attackers to
craft encrypted messages that force GnuPG to leak key material back over
the network to an attacker.

We will post updates as more information becomes available.
