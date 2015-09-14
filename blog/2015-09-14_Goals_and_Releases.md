Author: Bjarni
Subject: Goals and Releases
Date: September 14, 2015
Type: blog

This past week I have finally got over my burnout-induced funk and
started enjoying Mailpile work again!

Daniel caught up with most of the conversations that were taking place
on Transifex, which is great. I will be taking the fruits of that and
updating our translation catalogue later this week.

In the meantime, I continued my on-going project to refactor the
Mailpile user interface for speed and flexibility. It's not quite ready
for pushing to the master branch yet, but I have made a lot of progress.

Using progressive enhancement, I have all but eliminated full-page loads
in my local branch. The search result, browser and tag views are now
fully "AJAXified". Notifications have been made both more comprehensive
and less spammy; more operations can now be undone. And key parts of the
underlying Javascript code have been cleaned up and simplified. It's
going well!


### On Roadmaps

I have been thinking a lot about roadmaps and releases and such things
of late, because of course the burnout was in part triggered by the
realization that yet again I am having trouble getting things in shape
for a the long overdue 1.0.

Part of the problem of course, is that a one-point-oh is such a nebulous
thing. For some, 1.0 means "rock-solid, stable and mature". For others,
it is simply a beginning. Considering the resources of the project and
it's almost infinite scope, the Mailpile approach has always been to
consider the 1.0 a beginning; the first release people can really use.

But that is easier said than done and even a beginning has to be *good
enough*. For a secure e-mail application, *good enough* is actually a
very high bar. Every time we feel we're getting close, user testing
shows us that we've overlooked something fundamental. The team is just
too small to get the job done all at once.

We need help. I need help.

The answer to this conundrum has been pretty obvious for a while, but
it's been hard to accept. Mailpile needs to solve a simpler problem
before it can solve the complicated one.

If I can get a decent release out the door that works for techies and
geeks and projects like [CloudFleet](https://cloudfleet.io/) and
[Sandstorm](https://sandstorm.io/) and the
[Freedombox](http://freedomboxfoundation.org/), then maybe those projects
can help polish things. Maybe that is one way to get the help we need.
Once that lesser milestone is reached, maybe I will have time to really
dig in to the [integration and packaging
work](https://glyph.twistedmatrix.com/2015/09/software-you-can-use.html)
needed to make Mailpile viable as a desktop application for non-techies.

If I move to this approach, that means we'll be aming for multiple "1.0"
releases, with Linux being the first target. To avoid confusion (and
because I'm frankly sick of the term "1.0"). I may end up calling them
something else though.

Mailpile .95, Mailpile .98, Mailpile NT, Mailpile/X ...

 ;-)


## Plans for this week

1. Prepare a poster for PyCon UK
2. Keep working on the web UI
3. Update Transifex translation catalogue
