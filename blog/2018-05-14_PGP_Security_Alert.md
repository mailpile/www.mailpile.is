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

## Second (and 3rd) Update

The actual [research is now public](https://efail.de/).

As far as I can tell, Mailpile is [mostly] not vulnerable to these flaws and
the table of tested mail clients in
[the paper itself](https://efail.de/efail-attack-paper.pdf) is misleading
in that regard. This is unfortunate.

There are some exceptions though, see below.


#### Why is Mailpile [mostly] not vulnerable?

Because of defense in depth.

1. Mailpile does not display HTML content by default
2. Before displaying HTML, Mailpile cleans up malformed and incomplete tags.
3. When displaying HTML, Mailpile does not load remote content by default.
4. Mailpile respects the GnuPG error messages which warn of invalid data.
5. Mailpile never sends auto-replies to incoming mail.

The direct exfiltration attack is completely thwarted by #2, and would be
mitigated in any case by #1, #3 and #5.

The CBC/CFB Gadget Attack is mostly thwarted by #4, and would also be
mitigated in any case by #1, #3 and #5.

As far as I can tell, most Mailpile users will not be vulnerable to
EFail. Don't let the red mark in the PDF deceive you! Also, it's worth
mentioning that this isn't a lucky accident - this is a direct
validation of how we approach security.

Part of that approach is simply taking these things seriously. If anyone
disagrees with my analysis or finds other flaws in Mailpile, we want to know
about it and will do our best to remedy things as quickly as possible.


#### Wait.. mostly? When is Mailpile vulnerable?

Mailpile is vulnerable to the CBC/CFB Gadget Attack in the following
cases:

<ol>
<li>Something is obsolete, either:<ol>
   <li>Mailpile is configured to use an out-of-date version of GnuPG, or
   <li>The encrypted data being exfiltrated is so old that GnuPG doesn't
       expect and require it to have a Modification Detection Code (MDC).
   </ol>
<li>And:<ol>
   <li>The user manually displays HTML and loads remote images, or
   <li>The user has previously enabled HTML and images for the sender
   </ol>
</ol>

In practical terms, this means even if you are running up-to-date
software, then old content (messages that are 10-20 years old, or more)
could potentially be stolen - but only with a bit of social engineering,
and only if you still have the keys on your keychain.

The risk is more serious if you have configured Mailpile to use an
obsolete version of GnuPG - use of GnuPG 1.4.x is still relatively
common, and our tests suggest it is probably vulnerable. In this case
more recent messages may be at risk, but the social engineering is still
required for attacks to succeed.

Fixes addressing both of these attack vectors have been pushed to our
GitHub repository and will be included in our next release candidate.


## First Update

Further details have emerged.

Werner, the lead developer of GnuPG, [claims that the flaw has to do
with an interaction between HTML mail and GnuPG error handling in common
e-mail clients and PGP
plugins](https://lists.gnupg.org/pipermail/gnupg-users/2018-May/060315.html).

If this is indeed the case, most Mailpile users are not vulnerable since
HTML messages are not rendered by default - and even when HTML is
rendered, loading of images and other remote assets are also disabled by
default.

If you would rather take the EFF's advice, in spite of Werner's update,
our original advice is included below.


## Disabling Automatic Decryption

*This advice is obsolete! It is preserved here for historic reasons.*

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

To re-enable indexing of encrypted messages, perform the same steps
again, except `set prefs.index_encrypted = true` at the end.


## What is going on?

*What follows is idle speculation. Please take it with an appropriately
sized grain of salt!*

<div style="text-decoration: line-through">

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

</div><br>

See updates from myself and Werner above. The situation is not as bad as
it first appeared - in fact, it appears Mailpile is not vulnerable to this
problem.

All the same, because we take these things seriously, I have filed issues
in our issue tracker for follow-up work and proactive improvements:
[#2072](https://github.com/mailpile/Mailpile/issues/2072),
[#2073](https://github.com/mailpile/Mailpile/issues/2073),
[#2074](https://github.com/mailpile/Mailpile/issues/2074),
[#2075](https://github.com/mailpile/Mailpile/issues/2075), and
[#2077](https://github.com/mailpile/Mailpile/issues/2077).

We will post updates as more information becomes available.
