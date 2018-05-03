Subject: Desktop Usability Tests
Date: 3 May, 2018
Author: Bjarni Rúnar
Type: blog

Last week was exciting!

The Mailpile desktop platform team got together for a miniature
developer summit in Reykjavík, Iceland. Alex, Pétur and myself all flew
in from our corners of the globe, and Oktavía welcomed us and made sure
everything went as smoothly as possible.

We spent some time working at Stofan, my favourite café, and some
time hanging out at the offices of [1984](https://www.1984.is/), who
graciously lent us desks and a meeting room. Thank you, 1984!

It was really nice to have the whole team together in one place.

We ate some traditional Icelandic food, tasted some Icelandic
hipster-beer, chatted and just gelled a bit as a team. I got a chance to
give everyone a bit more insight into Mailpile's background, discussing
everything from
[PayPal freezing our funds](/blog/2013-09-05_PayPal_Freezes_Campaign_Funds.html) to
[GnuPG integration challenges](/blog/2014-10-07_Some_Thoughts_on_GnuPG.html) to
[extracting spreadsheets from e-mail](/blog/2015-05-18_Digging_for_Data.html)
to introducing [Mailpile Mel](/blog/2015-09-22_pyConUK_and_Mailpile_Mel.html).

The main event though, was to get a bunch of helpful humans to come test
the Mailpile installers and desktop integration.

Usability testing!

<img src="/files/2018-04-Mailpile-Desktop-Usability.jpg" border="0">


## Why usability test?

The more familiar you are with something, the harder it can be to see it
clearly. You see what you expect to see.

In software, this means software developers quickly become blind to the
flaws of their own code. We literally cannot see them! Getting a fresh
pair of eyes is invaluable, especially if you are interested in
understanding which parts of an interface are confusing or unclear.

To compound matters even further, everyone uses their computer in a
slightly different way. The way I use Mailpile may work perfectly, but
if you do things in a different order, use a different mail server, run
on a different version of Linux ... any of those differences may trigger
a poorly tested code path and uncover a bug.

Usability tests can be as simple as asking a friend to try your thing
and just watching how they do and taking notes. It doesn't have to be
complicated to provide value and I encourage all software developers
to just grab a pen and some paper and watch people use their stuff. You
always learn something!

In our case, we had some quite specific goals, so we were a little bit
more methodical.


## How we tested, and why

For this round of tests, these were our main goals:

   1. To verify that our draft installers actually work.
   2. To check whether the software "makes sense" to a new user.

The first goal ws relatively straightforward, technical.

The latter was much more subtle, and relates to the fact that Mailpile is quite
complex and in many ways unusual software. The general public is not used to
running servers on their computers - Mailpile is a web server. The general
public is not used to interacting with local software using a web browser - but
that's how Mailpile works.

As a result, our installation sequence and the initial setup process needs
to gradually introduce these concepts. We wanted to get a feel for whether
it was actually succeeding.

Oktavía scheduled and recruited a moderately diverse group of volunteers
to come test. All told we had 3 men and 3 women, of mixed ages. Some were
Windows users, others Mac users. They were all tech-savvy enough to own
their own laptops, but not necessarily programmers themselves. Some
digital natives, some less so. Roughly our target demographic for our next
release.

The structure of the test itself was relatively simple.

We tested with one volunteer at a time. Each time we started with
introductions, explaining roughly what Mailpile was and what we expected
of our volunteers. We warned them we wouldn't help them much, asked them
to think out loud if they could. Made sure they understood that failures
and problems were *good*, that breaking things would help us identify
things to fix.

Next, each person was given a USB stick with an installer on it and
instructions to attempt to install Mailpile and go through the initial
setup until we told them to stop. Once stopped, they were to exit and shut
down the app. We watched over their shoulder and made notes. We tried to
resist the urge to answer any questions, to see if they could figure
things out themselves.

Finally Oktavia asked a few questions about the experience, we thanked
them, gave them stickers and chocolate and sent them on their way!

That was it.

Easy, right?


## What we learned

Even a simple, short test like this has many potential pitfalls.

  * Does the installer work?
  * Does the app run?
  * Does the tester successfully navigate from the installer to the app,
    and from the app to the browser?
  * Does the tester understand that shutting down Mailpile and logging out
    from the web UI are not the same things?
  * Is the process confusing or uncomfortable?

If the answer to any of these questions is "no", then we would like to
understand *why*, so we can fix the problem.

The answers in this case were mostly good news! Which is refreshing,
since last time we tested Mailpile in this environment, the result was
so many failures and so much confusion that we went back to the drawing
board.

We found some minor bugs, but everyone managed to install the app and
complete the first stage of the test. Good news! Nobody was frustrated,
most confusion was minor. Also good news!

Shutting down the app was the main failure; most of our participants
thought they were done when they had logged out of the web interface.
But, we have ways to address this. And worst-case, we need to make sure
Mailpile shuts down cleanly when the computer powers down anyway.

To sum up the main lessons:

   * The installers work!
   * The app runs!
   * People didn't read the text in the GUI: less is probably more here
   * Windows users expect the installer to launch the app when done
   * Our Mac build process created a broken GnuPG
   * Our Mac build was launching the in-browser UI prematurely
   * Our desktop notifications on the Mac were spammy
   * The logged-out page should explain that the app is still running
   * Nobody notices systray or status bar icons on first run
   * Our testers were comfortable and happy, most chose to keep the
     app installed so they could play more at home.

We learned a lot!

Watching people use the app and interact with our work was very
stimulating. The next day we had a (somewhat hung over) brainstorming
session, discussing how things could be different or better. In the end we
felt comfortable continuing with a mostly unchanged design. The issues
were mostly minor and felt fixable.

So, we're on track! The next step will be to fix the bugs and get some
"alpha" packages ready for wider testing.

Exciting!

