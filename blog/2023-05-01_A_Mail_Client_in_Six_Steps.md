Subject: A Mail Client in Six Steps
Type: blog2
Author: Bjarni Rúnar
Date: 1 May, 2023

Good news, friends!

Mailpile and the fine folks <a href="https://nlnet.net/">NLnet</a> are in the process of exchanging signed copies of a Memorandum of Understanding!

What's an MoU? So glad you asked.

What this means, is that NLnet are going to support the next few months of Mailpile work with a grant,
as part of the <a href="https://nlnet.nl/entrust/">NGI Zero Entrust</a> initiative.
The tag-line for NGI Zero Entrust is "Trustworthiness and data sovereignty",
and I'm pretty chuffed that NLnet agree Mailpile is on topic for that theme.

The Memorandum of Understanding is the final stage of our acceptance into this program;
it is a description of what work they are supporting with the grant.


## The Project

The work we are about to undertake is summarized
<a href="https://nlnet.nl/project/Mailpile2-Moggie/">on their website</a>
like so:

> Mailpile's mission is to empower users to be more autonomous and private in how they manage, store and communicate over e-mail,
> simplifying the use of relevant encryption technology (OpenPGP, Tor and encrypted local storage).
> Mailpile 2 will be an Open Source, secure web-mail application,
> usable and powerful enough to be a compelling alternative to both mainstream desktop e-mail clients and proprietary web-mail services.
> Mailpile 2 will offer both local and remote access to an elegant,
> mobile-friendly web interface, built on web-APIs exposed by Moggie.
> Moggie is the project's technical toolkit for searching and working with e-mail.
> This stage of the project is about developing Moggie to the point where it is useful as a stand-alone tool in its own right,
> and feature complete enough that work on the Mailpile 2 user-interface can commence.


## The Plan: ship moggie!

The MoU lays out further details.
It defines six milestones which take us from where we are now,
to a working terminal-mode (text based) e-mail client called moggie.
Moggie's back-end will have a documented API,
which can be used to build other e-mail clients or mail processing tools.

The milestones ([Github issue](https://github.com/mailpile/moggie/issues/7)):

   1. Deliver a read-only e-mail client ([done!](2023-07-13_A_Read_Only_Mail_Client.html))
   2. Add search-engine (search/filter/tag) functionality to the e-mail client
   3. Add writing capabilities to the e-mail client
   4. Add the ability to compose and send e-mail to the client
   5. Add user interfaces and documentation for configuration to the client
   6. Complete a security review cycle and make a public release

Security, autonomy and encryption (including OpenPGP) are part of every stage of this plan.

Each of these steps should take roughly one month,
and after each milestone code will be published on GitHub and there will be a blog post discussing how things went.
So stay tuned!

This means that in six months (give or take...),
we aim to ship a powerful new tool, *moggie*,
which provide a terminal-based e-mail client and toolkit for shell scripting and automating various e-mail related tasks.

But moggie is also designed to be the back-end for a much more user-friendly web-based e-mail client: **Mailpile version 2**.


## Backstory

This plan is, on its surface, a bit crazy.
Going from zero to mail client in six months
(with grand security ambitions and only one developer, myself)
would be a very tall order!

Luckily we aren't starting from zero.
This plan builts on almost two years of behind-the-scenes development.
We already have:

   * a working search engine,
   * a filtering system,
   * a configuration system,
   * support for multiple mailbox formats,
   * encrypted local storage, 
   * a powerful system for processing HTML-only e-mail,
   * <a href="https://passcrow.org/">a secure password recovery scheme</a>,
   * partial OpenPGP support,
   * a partial prototype for a text-mode mail client
   * ... built on a web-API back-end
   * ... which is exposed as a set of unix-style command-line tools

This has been a complete rewrite of Mailpile, from the ground up.
It is faster and more efficient,
it uses less RAM,
and it makes better use of modern multi-core CPUs.
And of course moggie is written in Python 3
- no more obsolete Python 2 dependencies.

A lot of inspiration
(and code fragments whenever possible)
were of course taken from the old app.
But moggie really is a new thing!

It's time to polish it off,
tie up the loose ends and share the results with the wider community.

Which is exacty what NLnet are going to help us do. :-)

*Please join the
[discussion about this post](https://community.mailpile.is/t/a-grant-from-nlnet-a-mail-client-in-six-steps/1054)
on our community forum.*
