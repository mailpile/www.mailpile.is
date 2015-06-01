Subject: Roadmap Reality Check
Date: June 1, 2015
Author: Bjarni
Type: blog

First, an announcment:

### Invitations to the voting page have been sent!

All 3015 of them!

If you donated $23 USD (or more) to the project and haven't yet received
an invitation, please **check your spam**. If nothing's there, please
[get in touch](mailto:team@mailpile.is?subject=Community+Site). We might
not have a valid e-mail address for you on file, or it may be that
things just got lost in the shuffle.

Voting on the license will continue **until July 1**, at which point I will
call the results.

Hooray!


### Roadmap Distractions

In addition to getting the invitations sent out this last week has been
[very productive on a the code
front](https://github.com/mailpile/Mailpile/commits/master)... just not
entirely on the stuff I was *supposed* to be working on.

Distractions included:

1. Going over the settings of our Twitter and Facebook accounts
2. Making the app less pretty (temporarily, to manage expectations)
3. Adding in-app instructions on how best to report bugs
4. Responding to some Github issues, fixed some buglets
4. Implementing working proxy support (HTTP, SOCKS and Tor)
5. Implementing "select all matching this search"

The last two in particular are both awesome milestones in their own
right, things which had been languishing at 90% in our code-base for
*months* now.

The proxy support allows us to start testing some of the main points
from [the security
roadmap](https://github.com/mailpile/Mailpile/wiki/Security-roadmap),
with respect to anonymous access to SMTP, IMAP servers and Gravatar.

Being able to "select all" makes the app an order of magnitude more
powerful when it comes to organizing and extracting value from e-mail.
Basic operations like "[mark all messages as
read](https://github.com/mailpile/Mailpile/issues/1027)" depend on this,
as did more advanced use cases, such as using
[Datadig](2015-05-18_Digging_for_Data.html) to convert hundreds of
PayPal notifications into a spreadsheet of Mailpile backers...


### Why you no focus?

So this is the third week in a row with some pretty major, exciting
distractions. Great progress, but not necessarily on things which were
due according to the roadmap. What's going on?

I would hate to be my manager, but this is relatively normal; business
as usual.

I don't know if this works the same way for other software developers,
but after 20 years of coding for fun and profit I have learned that I am
most productive if I have goals and deadlines, balanced with the freedom
to frequently give in to inspiration and obsession. The above work falls
squarely into the latter category; I got inspired and could visualize
exactly how to solve each problem. Rather than put it off, I harnessed
that creative energy and just *got things done*.

It's all necessary, useful work. It's just not happening in the order
laid out in the original plan.

But that does beg the question: how is [the roadmap
itself](2015-04-27_Roadmap_to_v1.html) holding up?


### Roadmap Reality Check

According to the roadmap, the "Short Setup Flow" theme should be complete now.
It is not, I *am* behind schedule. This is roughly where various
roadmap-related tasks stand at the moment:

1. **90%** - Browse FS: Works! Is a bit ugly.
2. **90%** - Accounts: The design is now pretty solid (in my head).
3. **80%** - Key discovery: results need to be injected back into the composer.
4. **80%** - Browse Mailboxes: mail can be read without being added to the
             search index first, but is buggy.
5. **75%** - Account creation: almost works! This replaces the crypto,
             profile, route and source setup pages.
6. **60%** - Simplified UI: More cleanup is needed.
7. **40%** - Home Page: is live, but unfinished.
8. **10%** - Browsing IMAP/POP3: should be easy, but barely started.

All in all, I figure I'm about a week or two behind.

Could be worse, releasing Beta III in about a month's time is still
feasible. A bit crazy, but feasible...


### Plans for this week

1. Admin work: Taxes and pay my own salary.
2. Finish the Add Account tool.
3. Upgrade the Add Account code so it also functions as Edit Account.
4. Either IMAP browsing work or start merging the new storage code
   required for faster startup.

