Subject: Containing the Spectre
Author: Bjarni Rúnar
Date: January 7, 2018
Type: blog

Hello everybody!

The year 2018 started with a bit of a bang, for those of us who are
concerned with computer and Internet security. By now you have probably
heard of the [Spectre and Meltdown attacks](https://spectreattack.com/).
These security holes are big news, because they represent a new class of
security vulnerability - and almost everybody is potentially vulnerable. The
industry is still working through the implications.

Quoting [the official site](https://spectreattack.com/):

> Meltdown and Spectre exploit critical vulnerabilities in modern
> processors. These hardware vulnerabilities allow programs to steal
> data which is currently processed on the computer. While programs are
> typically not permitted to read data from other programs, a malicious
> program can exploit Meltdown and Spectre to get hold of secrets stored
> in the memory of other running programs.

And quoting [Bruce
Schneier](https://www.schneier.com/blog/archives/2018/01/spectre_and_mel_1.html):

> ... there's no patch for Spectre; the microprocessors have to be
> redesigned to prevent the attack, and that will take years. [...] This
> is bad, but expect it more and more. Several trends are converging in
> a way that makes our current system of patching security
> vulnerabilities harder to implement.

So that's the bad news. Is there any good news?

Well, all is not lost: Spectre, Meltdown and similar as-yet-undiscovered
CPU bugs are only a problem when a malicious person can run code on a
computer you rely on. This happens more than you might think, but this
limitation does tell us how we can protect ourselves today, tomorrow and
next week.

The most important advice is standard. You've heard it before, but it
bears repeating: prompty install any available updates to your browser
and operating system, and avoid installing software (including mobile
apps) from untrusted sources. Let the professionals help you.

But almost as important, is to **run an ad blocker or disable
Javascript** entirely (I use [NoScript](https://noscript.net/) to do
exactly that). Malicious ads on the web, and to a lesser degree entire
malicious websites, are the most immediate risk to the general public.

Although the mainstream browsers have already released updates that make
exploiting Spectre from Javascript more difficult, it is worth
remembering that attacks always get better and new ones are discovered
all the time. Blocking Javascript by default (and then selectively
re-enabling it on sites you trust) is a bit like washing your hands - it
takes a bit of time and effort, but it's an invaluable first line of
defense.

Finally, if you really want to defend against Meltdown, Spectre and
whatever the next big bug will be: **Avoid shared hardware.**

That means avoid VPS servers. Avoid cloud services. If privacy and
confidentiality of your data matters to you, you may want to keep it on
hardware directly under your control (and make sure you have good
backups).

It so happens that this is Mailpile's driving philosophy.

We want to empower everyone, not just techies, to store their e-mail on
devices under their control. This is very difficult today. Our primary
goal is, and always has been, to make it much easier. *For everyone.*

If you would like to support our work, we accept [donations](/donate/),
[code contributions](https://github.com/mailpile/Mailpile) and
[translations](https://www.transifex.com/otf/mailpile/). Or just keep an
eye on this blog and help spread the word! 

If you would rather support something more immediately related to the
problem at hand, the [NoScript](https://noscript.net/) team also accepts
donations. They are absolutely worth supporting.

Thanks, and stay safe!

