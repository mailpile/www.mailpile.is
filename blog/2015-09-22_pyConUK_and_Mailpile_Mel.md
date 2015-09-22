Subject: PyCon UK and Mailpile Mel
Date: September 22, 2015
Author: Bjarni
Type: blog

For the last four days (Friday-Monday) I have been enjoying the [UK
Python Conference](http://www.pyconuk.org/), here in Coventry.

The conference itself was fantastic; big enough to support a wide range
of topics and activities, small enough to foster a sense of community,
mature enough to have a code of conduct and recognize the importance of
diversity, while still retaining an informal, laid-back and friendly
vibe. The organizers and volunteers should all pat themselves on the
back!

I was a little bit too disorganized to propose a proper talk about
Mailpile in time for the conference deadline, but I made up for it by
presenting at their Saturday poster session and hosting a Mailpile
sprint on the Monday.


### Introducing Mailpile Mel

A recurring theme of the usability studies we have done with
non-technical Mailpile users, has been an element of confusion about
where Mailpile sits in relation to the rest of the e-mail ecosystem.
This is understandable, as web-mail, "the cloud" and mobile apps have
all blurred the lines between local and remote computing. I think these
days *most* of us, techies included, are bit confused and uncertain
about where our data really lives and what that means.

Since the Mailpile approach to networking and data storage underpins how
we hope to improve end-user privacy, answering this question is key to
helping users decide whether Mailpile is right for them or not.

The PyCon UK poster session was a perfect opportunity to finally do
something about this; I commissioned drawings which can be used to
illustrate some of the expected use-cases of Mailpile, where data
resides and what paths the information follows.

The main character of these illustrations is a young viking woman named Mel,
who had her debut on [the Mailpile PyCon UK
poster](/files/2015-09-PyConUK-Poster.jpg). These illustrations (and more)
will be re-used over time on the web-site and in the app itself, as Mel
tells us stories about e-mail privacy and how Mailpile can help.

<a title="Click for full poster" href="/files/2015-09-PyConUK-Poster.jpg">
  <img src="/files/2015-09-Mailpile-Mel.jpg" border=0>
</a>

I'd like to thank the talented [Emilia Telese](http://www.telese.net/)
for creating Mailpile Mel.


### The Monday Sprint

On Monday morning I bicycled in the rain to the conference venue,
arriving a bit soaked and a bit late - just barely on time to pitch the
Mailpile sprint to a room full of eager Pythonistas.

By 10am I had a team of 5 volunteers, all eager to give Mailpile a try
and lend a hand. Since my cardboard box of swag had disintegrated in the
rain, I kicked off the session by giving each sprinter a Mailpile
t-shirt and dumping a mountain of stickers in the middle of the table.
After trying on shirts and getting to know each other a bit, we got to
work.

These are the tasks I had proposed for the sprint:

<ul class="square">
<li>Check out the code and get it up and running for development
<li>Identify bugs in our "getting started" documentation
<li>Impromptu usability tests: your confusion can make Mailpile better!
<li>Explore the fledgeling Mailpile plug-in API
</ul>

These are the things that got done:

<ul class="square">
<li>The Windows package was tested: it worked
<li>The OS X package was tested: <b>it failed</b>
<li>Mailpile on a Raspberry PI was tested: it worked
<li>A plugin for libravatar (a free Gravatar replacement) was completed
<li>A plugin for speed-reading of e-mail was prepared
<li>A script for building Debian packages was written
<li>Our automated tests were fixed; they had been broken by the release of
    Coverage 4.0.
<li>Our getting-started docs were fixed and updated to recommend use of
    virtualenv
</ul>

In addition, I collected the following feedback from impromptu usability
testing and discussions:

<ul class="square">
<li>During Account setup: "what password is this?"
<li>Editing settings during key generation may cause problems
<li>It is confusing when a new Account does not start downloading mail
    right away
<li>When e-mailing oneself as a brand-new user, the encryption policy
    chooser is overly optimistic about whether to encrypt or not
<li>The CLI prompt is invisible in some terminals
<li>On a Raspberry PI, the default of only listening for HTTP requests
    on localhost is confusing
<li>We should probably use Python logging instead of rolling our own
<li>Developers find submodules and capitalized repo names annoying
</ul>

By my count, we accomplished every task I proposed and then some! It was
a fantastic session and I learned a lot about how both Mailpile and my
Python skills could improve. The only disappointment was not getting to
present our results to the conference; proceedings were cut short by the
discovery of [a one-ton unexploded WWII
bomb](http://www.coventrytelegraph.net/news/wwii-bomb-unexploded-device-found-10107192)
next door...

I would like to thank Ed Singleton, Duncan Sneddon, Matthew Power,
Padraic Harley and the nice Raspberry PI hacker/web developer whose name
I neglected to write down (get in touch if you read this!) for their
awesome contributions and excellent company. I will consider us very
fortunate indeed if they continue participating in the Mailpile
community!


## Plans for this week

1. Fix (some) issues identified in the pyConUK sprint
2. Carry on refactoring the Mailpile web interface

