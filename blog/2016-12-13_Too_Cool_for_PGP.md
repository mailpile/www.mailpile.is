Subject: Too Cool for PGP
Date: 12 December, 2016
Author: Bjarni Rúnar
Type: blog

Some kids are just too cool for school.

And some security experts are too cool for OpenPGP.

It's almost become a rite of passage for security folks: work in the
trenches, build a reputation, climb the ivory tower, write a
[detailed](https://blog.cryptographyengineering.com/2014/08/13/whats-matter-with-pgp/)
[epiphany](https://moxie.org/blog/gpg-and-me/) about
[why](http://secushare.org/PGP) you've
[given up on PGP](https://blog.filippo.io/giving-up-on-long-term-pgp/).
Suggest we all [buy an iPhone](https://www.lawfareblog.com/iphones-fbi-and-going-dark)
and use Signal, start giving people phone numbers instead of e-mail
addresses...

Wait, what?

Please take a moment to go ask any young woman if she thinks giving random
strangers her phone number will improve her security. I'll wait.

...

Of course, the experts are right about many things. OpenPGP is *old* and
more recent tools with more modern designs have a lot going for them. But
I still think they're mostly wrong.

The experts, by and large, have yet to offer any credible replacements for
PGP. And when they suggest abandoning PGP, what they're really saying is we
should give up on secure e-mail and just use something else. That doesn't
fly. Many people *have to use e-mail*. E-mail is *everywhere*. Not improving
the security of e-mail and instead expecting people to just use other tools
(or go without), is the security elite proclaiming from their ivory tower:
"[Let them eat cake!](https://en.wikipedia.org/wiki/Let_them_eat_cake)"

Furthermore, if that "something else" also requires people use their phone
number for everything... well, that's the messaging world's equivalent of
the widely despised [Facebook Real Name
Policy](https://en.wikipedia.org/wiki/Facebook_real-name_policy_controversy).
If you ever needed a clear example of why the lack of diversity (and
empathy) in tech is a problem, there it is!

Compartmentalization, presenting different identities in different contexts,
is a fundamental, necessary part of human behaviour. It's one of the basics.
If you think taking that away and offering fancy crypto, forward secrecy,
deniability instead is a win... well, I think your threat models need some
work! You have failed and people will just keep on using insecure e-mail for
their accounting, their work, their hobbies, their doctor visits and their
interaction with local government. Because people know their needs better
than you do.

But I digress.

The ridiculous phone number thing aside, I also take issue with the fact
that when our opinionated experts do suggest replacements, the things they
recommend are proprietary, centralized and controlled by for-profit
companies. Some of them (mostly the underdogs) may be open source, but even
[the best of those use a centralized design and are hostile to
federation](https://whispersystems.org/blog/the-ecosystem-is-moving/). In
pursuit of security and convenience (and, let's be honest, control, power
and money), openness has been hung out to dry.

This is short-sighted at best.

These cool new apps may be secure today. But what about tomorrow? Odds
are, they will be [compromised](https://www.wired.com/2007/11/encrypted-e-mai/) by
[government mandate](http://www.theregister.co.uk/2016/11/30/investigatory_powers_act_backdoors/),
[blocked](https://www.theguardian.com/technology/2015/dec/17/whatsapp-blocked-brazil-48-hours-facebook)
or [shut down](https://www.theguardian.com/commentisfree/2014/may/20/why-did-lavabit-shut-down-snowden-email).
Or just dead because messaging is a cut-throat business and the money
runs out. Anyone remember ICQ? MSN? GChat? Sprinkling these new messaging
apps in security pixie dust doesn't make them qualified to replace e-mail.

But what if I'm wrong? What if one of these businesses succeeds, e-mail dies
and all our comms become dependent on proprietary protocols mediated by
for-profit monopolies? Is that a problem?

Here, [let me google that for you](https://lmgtfy.com/?q=why+are+monopolies+bad). 

I really hope it doesn't happen.


## Interlude

Please, if you are at risk, if you have powerful adversaries, follow the
advice of the cool kids. The experts are absolutely right when they say PGP
is too confusing and messy *today* for most people to use safely. It takes
training, practice and diligence.

So sure, get an iPhone if you can afford it. Use Signal or iMessage. Use
Tor, [carefully](https://www.hackerfactor.com/blog/index.php?/archives/721-TOR-and-Trust.html).
For e-mail, create as many GMail accounts as you need to blend in with the
crowd and not draw attention to yourself; their security team is the best in
the world, let them protect you! Enable two-factor auth, use HTTPS.

But most importantly; if you can avoid digitizing incriminating
information, *do that*. [Rubber hose cryptanalysis is
real](https://en.wikipedia.org/wiki/Rubber-hose_cryptanalysis) and it's
much easier to avoid creating data in the first place, than it is to
keep it secure after the fact.


## Mental Models and Deniability

A rule of thumb for creating usable software, is *don't make me think*.

What this means in practice, is software should match the mental models of
its users as closely as possible. If it doesn't, users will inevitably make
mistakes. If your tool is a security tool, those mistakes may compromise
their security.

PGP in e-mail has failed this on many fronts. The lack of protection for
message headers (the subject line) is one, as is pretty much anything to do
with encryption keys (too much math). But it's not all bad! OpenPGP gets
other things right, and actually *corrects* some of the things insecure
e-mail gets wrong.

One of the most vexing things about e-mail, is people actually think e-mail
is *already secure*. They just assume e-mail is like regular mail, in an
opaque envelope that will prevent tampering and keep postal workers from
reading it. Encryption and signatures bring e-mail closer to user
expectations, which means if we can get it working smoothly, users won't
have to think as much to make good security choices.

One thing people *don't* expect from e-mail, is deniability. Deniability
means after a message has been delivered, it can no longer be strongly
linked to the sender. It's like an anti-signature... which most sane people
would consider a horrible misfeature in any communication system. Explicitly
designing a system so people can disavow their statements and go back on
their word? What is this, a system for assholes??

And yet, all the cool kids in the security world seem to want exactly that.
They keep bringing up the lack of deniability (and forward secrecy) in PGP
as if it were some sort of fatal flaw.

Why? Are security people all assholes? I don't *think* that's it.

I think they're quite enamoured with the elegant math, and really, really
pissed off with certain Three Letter Agencies. There is good reason to
believe major governments plan to, or already have been [recording all our
encrypted communications](https://www.wired.com/2012/03/ff_nsadatacenter/)
in the hope of being able to decrypt them later. Forward secrecy
(deniability's more attractive twin sister) prevents that sort of thing. But
OpenPGP doesn't need to provide forward secrecy to thwart mass surveillance.
If we just use TLS (with the right ciphers) for SMTP, IMAP and web-mail then
that does the job just fine.

So I agree forward secrecy in transit is a good thing. Let's do that!

Let's put our mail in secure envelopes, and let's *also* drive it from place to
place in nice, secure vehicles. Users don't expect the cops to routinely stop
the mailman and photocopy all the mail, so let's make sure that doesn't happen
to e-mail either. Let the mental models be our guide.

But we don't need or want deniability. Deniability for individual messages
is, quite simply, a horrible misfeature to be avoided. People already assume
e-mail is **on the record**; trying to change that means going against their
mental models and setting them up for failure in new and exciting ways. The
fact that OpenPGP wasn't designed to empower assholes is a feature, not a
bug.

*(Yes, there are other arguments for forward secrecy and deniability. They
are in my oh-so-humble opinion, mostly bunk. And this post is already too
long...)*


## Making Progress

Anyway, like it or not, e-mail is important.

E-mail is the most successful open messaging standard we've got and OpenPGP
is the best tech we have to secure our mail. OpenPGP may be dated and a bit
clunky, but *[it's a hell of a lot better than
nothing](http://www.theverge.com/2014/12/28/7458159/encryption-standards-the-nsa-cant-crack-pgp-tor-otr-snowden)*.

Folks like myself, implementors who are not cryptographers, have long been
admonished to not invent our own crypto. Over and over again, we are told to
use tried and tested solutions. OpenPGP is that. It may have baggage, it may
not be perfect, but it is mature and it solves certain problems. Most of the
flaws can be avoided and worked around. If the security community really wants
us to use something else, you're going to have to step up and provide something
a bit more tangible than rants on the Internet.

OpenPGP is also not standing still, OpenPGP is still developing. The
community is well aware that the technology is flawed and needs work. An
[update to the standard is in the works](https://tools.ietf.org/html/draft-ietf-openpgp-rfc4880bis-00)
and there are multiple projects working on improving both the
[security](http://modernpgp.org/memoryhole/) and
[usability](https://inbome.readthedocs.io/) side of things.

[Mailpile](/) is one such project, but we're in good company:
[PEP](https://pep.foundation/),
[LEAP](https://leap.se/),
[OpenKeychain for Android](https://www.openkeychain.org/),
[Mailvelope](https://www.mailvelope.com/), and more.
Even [Google](https://github.com/google/end-to-end) and
[Yahoo](https://github.com/yahoo/end-to-end) are developing solutions
based on OpenPGP. There's actually quite a lot going on!

As an industry, we should be
[supporting these efforts](https://gnupg.org/donate/), not writing
and promoting self indulgent posts on how we've given up and moved on.

Oh, and stay in school kids! It's worth it!
