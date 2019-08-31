Subject: CCCamp19 and further EFail mitigations
Type: blog
Author: Bjarni Rúnar
Date: 31 August, 2019

Hello world!

As I write this, I have mostly recovered from the amazing Chaos
Communication Camp in Germany. I attended the camp mostly as a holiday,
but there were of course quite a few Mailpile related discussions.

The most interesting of those related to EFail. I spent a couple of
afternoons sitting in the shade with researchers and developers who
work on OpenPGP related things. We discussed [EFail](https://efail.de/).

For those of you who haven't heard of EFail, it was one of the most
serious vulnerabilities the OpenPGP community has ever had to deal with:
by combining flaws in e-mail clients with flaws in legacy PGP (and
S/MIME) implementations, EFail described multiple ways an attacker could
turn a vulnerable e-mail client into a decryption oracle and steal the
cleartext of previously secured communications. Cryptosystem flaws don't
get much worse than that.

This was such a serious issue that the EFF recommended people disable
PGP entirely, at least for a little while. This triggered a rather
emotional backlash from the PGP community, and unfortunately a lot of
misinformation and misunderstandings were published. Some of which
still have not been corrected.

As a community, we're still coming to terms with some of the
implications. Those of us who aren't in denial (which is disturbingly
common) are still mulling over ways to secure our tools and defend
against similar flaws in the future.

I have written before about [Mailpile and
EFail](2018-05-14_PGP_Security_Alert.html): there were a few issues that
needed fixing, but overall Mailpile weathered EFail relatively well.
Exfiltrating cleartext from Mailpile was possible, but it was not fully
automated and required social engineering.

The social engineering aspects are still quite serious, and some are
easier to exploit than others. The most trivial EFail exploit is to
send someone a message they're likely to reply to, with the ciphertext
you want to exfiltrate appended to the end after a long boring
boilerplate signature or quoted message. If the mail client decrypts,
and the recipient replies without reading and pruning their response...
hey presto, you've exfiltratrated the secret message.

One of the outcomes of these discussions at camp, were some concrete
recommendations on how Mailpile could make such social engineering less
likely to succeed. The guiding principle I ended up with, was:

> If the user is probably not going to see the content, do not decrypt.

On the plane home from Germany, I implemented this strategy. So for the
first time, Mailpile will deliberately decline to decrypt parts of
incoming e-mail, if the message structure is such that it might might
provide cover for EFail social engineering attacks.

The change wasn't huge, but the security impact is significant. We
welcome any and all feedback: [the code is here](https://github.com/mailpile/Mailpile/commit/79551b17928a9f990ac5e1336386caab8b183323).
This patch is already in [the nightly packages](/download/linux.html)
and will hit the release branch next time I update it - which should be
soon, we've got quite a few important fixes queued up by now.

Many thanks to [Sebastian](https://sebastian-schinzel.de/) and
[Vincent](https://twitter.com/valodim) for helping me figure out how to
improve Mailpile on this front. And thanks to [CCC](https://www.ccc.de/)
for providing venues for these conversations to take place.

Please feel free to [discuss this post in our Community
Forum](https://community.mailpile.is/t/blog-post-about-cccamp-19-and-efail/243).
