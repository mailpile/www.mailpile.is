Subject: The DCSS Conference in Cardiff
Date: June 22, 2015
Author: Bjarni
Type: blog

This weekly report covers two weeks of work, because last week's post was
dedicated to community feedback on the licensing debate. Here are some of
the tech issues that got resolved in the meantime:

1. IMAP: Improved download speed and Dovecot compatibility
2. Security: Fixed serious bug in local data encryption
3. Security: Implemented basic PGP passphrase manager
4. Fast setup: Editing accounts now works
5. Fast setup: Usability tests at DCSS, found and fixed some issues
6. UI: Tag creation and editing were revamped
7. Composer: Fixed bugs, started refactor to handle key discovery
8. Packaging: Prepared the packaging robot for Beta III builds

Last week I took some much needed days off and then attended the [Digital
Citizenship and Surveillance Society](http://www.dcssproject.net/)
conference in Cardiff.  It was a very inspiring conference and the
organizers' goal of getting techies to rub shoulders with academics and
usability people was, as far as Mailpile goes, a complete success.

The first day was mainly dedicated to presentations and interesting
conversations, including a well received lightning talk about Mailpile
itself.

On the second day I performed two small usability tests with non-technical
volunteers from the conference and discussed overall UI strategy with some
of the experts from [Head London](https://www.headlondon.com/). Actionable
results were filed as [issues in our bug
tracker](https://github.com/mailpile/Mailpile/issues).

On both days I did a fair bit of brainstorming with developers from the
[Leap](https://leap.se/) and [Pixelated](https://pixelated-project.org/)
projects, in particular helping them get up to speed with the e-mail header
protection work that was done at [April's GnuPG e-mail
summit](2015-04-20_OpenPGP_Email_Summit.html). I summarized those
discussions in [a post to the GnuPG-devel mailing
list](https://lists.gnupg.org/pipermail/gnupg-devel/2015-June/030036.html).

All in all, it was an excellent conference. I had fun and came home
feeling inspired and motivated.

Just what the doctor ordered!


### Plans for this week

1. Finish refactoring the composer and key discovery code
2. Migrate metadata index to new storage format

