Subject: A Roadmap to Version 1.0
Date: April 27, 2015
Author: Bjarni
Type: blog

My dear Mailpile backers, I am going to go out on a limb here and
publish a Roadmap to Version 1.0. I feel it is important to share the
current direction of things.

I am hesitant, because I have drafted plans like this twice before and
in neither case did the plans work out. Project management and planning
is very hard! So please keep that in mind during the coming months and
as you read through this post. This roadmap is written with the best
intentions, but I may well have overlooked something critical or
something unforseen may come up.

That said, there are quite a few tasks on this list which volunteers
might be able to help out with. In particular, the Short Setup, Autoajax
and Security themes all contain multiple tasks which could be done in
parallel and may be relatively low hanging fruit. If something from this
list strikes your fancy, please get in touch on IRC and let me know!

So without further ado, I give to you... a GANTT chart:

<img src="/files/2015-Summer-Roadmap.jpg" border="0">

This chart shows the weeks ahead along the top, and the tasks I have
chosen to focus on along the left. Filled in boxes in the area below
show roughly when I expect to work on things. Not all the boxes have
been filled in, but all the top-level tasks have time allocated. I have
also labeled when I plan to be in Iceland for the summer, some of which
will be vacation time.

The tasks of course are the most important part of this roadmap. Why
these tasks, and not others? That is what the rest of this blog post is
about. The order of things and the timing are less important, but when
there are specific concerns they are mentioned.

The tasks fall into a few main themes: Website, Short Setup Flow,
Simplified UI, Fast Startup, Autoajax, Security 1.0 and the actual
releases. I will dedicate a few words to each of those themes.

Although there are admittedly quite a few new features in this plan, the
team has actually been working on most of these things for months
already. The intent is to not only address symptoms and fix shallow
bugs, but to actually fix some of the root causes of our previous
releases being so problematic. Our 1.0 will certainly not be bug-free,
but it would be nice to ship it without any major known design flaws.


### Website

The project website needs to be updated so it does a better job
answering the following main questions:

1. What is Mailpile?
2. Where can I get it?
3. How can I help?

A very basic community site, long promised as one of the initial
fundraising campaign perks, has actually been built! It just needs
updated content and a launch.

Also, our hosting provider GreenQloud [has announced that they are
shutting down their public cloud
service](https://www.greenqloud.com/truly-green-public-qloud/), so we
need to move before the end of the summer. Although not strictly a
1.0-related task, this is critical work that needs to be done before the
release.


### Short Setup Flow

Although the current setup flow is quite nice, this theme aims to
shorten it to only two steps:

1. Choose your language
2. Choose a password for your Mailpile

Although this is a very simple goal, making this possible requires
adding functionality elsewhere in the app, resulting in the largest
change planned for the summer.

After these two basic configuration steps, people would be taken
directly to the app's **home page**.

The home page is a new concept. It is the starting point whenever the
user logs on or start the app, presenting to the user an overview over
the current state of their Mailpile. This would include a list of
**accounts** and basic statistics about each, options to add or remove
accounts, and links to a **browsing interface**. There will probably
also be hints on this page, prompting the user towards the next steps
needed to configure and use their Mailpile.

The browsing interface allows the user to explore either Mailpile's
internal data, the local file system or the mailboxes and contacts
associated with a particular account. It will be possible to read mail
using this interface, but more importantly the user will be given the
option to enable (or disable) background copying, syncing or just
indexing of their mailboxes. When browsing other types of data, other
appropriate configuration options should be presented instead.

#### Technicalites

Most of the tasks in this theme have to do with implementing a way to
browse local mail or remote servers, adding the concept of **accounts**
and building a nice landing page.

Mailpile currently separates what most users think of as an account
into Mail Sources, Profiles and Sending Routes. This division will be
maintained internally, but does not necessarily need to be exposed to
the end user.

The browsing feature depends on another new internal concept: a "virtual
file system" (VFS) which abstracts away the differences between
different types of data sources, making them all browsable using the
same metaphors and same user interface.

#### Justification

This theme attempts to address a few key bits of feedback from early
adopters:

1. One of the first questions we got was: "Where is the home page?"
2. The current setup flow is rather long.
3. The setup UI for mapping IMAP folders to Mailpile tags is confusing.
4. There is no way to browse remote mail, short of importing it and
   adding to the search engine. This can take a very long time and
   discourages users.
5. Many reports of IMAP bugs were actually configuration problems, which
   speaks to poor visibility into what the app is doing. Fixing this is
   key to addressing point #2 in the
   [Beta Rejected](/blog/2015-03-06_Beta_Rejected.html) blog post.

Other concerns which may also benefit from the VFS concept include:

1. Some administrators would like to store data in a database instead
   of the local file system.
2. Mailpile will need to write data to the user's remote IMAP server to
   implement backups or key syncing.
3. A lot of Mailpile's internal data structures are hard to discover and
   configure at the moment; a browsable VFS is a very simple way to
   address this in the near term. This will be useful for debugging and
   will provide stop-gap functionality until more specialized user
   interfaces can be developed.

As this is a major change to the user experience, this theme is the 1st
priority on the roadmap. It is important to get it shipped to users as
soon as possible, so we can perform basic usability tests and get
feedback on whether it really is an improvement or not. If people don't
like (or understand) it, then there should still be time to respond to
their feedback before launching.


### Simplified UI

This theme is quite simply about removing unfinished elements from
Mailpile's current user interface.

Many such elements would benefit from being split out into external
plugins, so they can be developed outside the Mailpile core and have
their own independent release cycles. As an example, Mailpile 1.0 may
not include an address book. Instead, the current address book interface
should be moved to a plugin which users will be able to add to their
Mailpile without upgrading at a later date.

This theme addresses point #1 from our [Beta
Rejected](/blog/2015-03-06_Beta_Rejected.html) post.


### Fast Startup

This theme is about improving the startup-time and reducing the RAM
usage of Mailpile.

If a user has a lot of mail, it can take a few minutes to start Mailpile
on a slow computer. This is due to the fact that the metadata index
(information about subjects, senders, dates, etc.) has to be loaded into
RAM before the app can start up. In addition to annoying heavy users,
the resulting RAM requirements also causes problems for providers
interested in hosting Mailpile for other people.

This component of Mailpile has been largely rewritten already to use an
alternate strategy, but the work needs to be finished, published and a
migration process needs to be created for our existing users.

A side-benefit of this work will be to improve the encryption of the
search index, and reduce the risk of data loss when the app crashes or
is shut down uncleanly.

This is the most technically risky part of the roadmap, which is why it
is the 2nd theme after the simplified setup flow. Once this works, we
release Beta III and ask our users for testing and feedback.


### Autoajax

This theme is about improving the performance of the web interface.

Once everything is up and running, the single most annoying thing (IMHO)
about Mailpile is how slow the web interface is. This is embarrassing,
since from the start we've boasted about performance and being able to
outperform many cloud-based web-mail solutions.

This theme will:

1. Reduce the number of full-page loads
2. Slim down the templates so full pages load faster
3. Implement better in-app notifications and live updates

"Autoajax" is the internal code name for the progressive enhancement
work which has already been done on this front. It just needs to get
finished and shipped! A stretch goal for this theme is to make the web
interface more responsive, so it becomes more usable on larger monitors
or mobile devices.

This theme is very low risk; the worst that can happen is not all of
the app gets updated and the UI performance stays unchanged for those
pages.


### Security 1.0

This part of the roadmap is admittedly incomplete.

In general, this theme is about fixing as many issues as possible which
pertain to our published [Security
Roadmap](https://github.com/mailpile/Mailpile/wiki/Security-roadmap), as
well as addressing point #3 from the [Beta
Rejected](/blog/2015-03-06_Beta_Rejected.html) post.

The riskiest part of this theme will be to communicate the end result to
our users, so they know whether the software is "fit for purpose", given
their individual security needs.


### Releases

Finally, the roadmap has four releases on it:

1. Beta III
2. Linux 1.0
3. Windows 1.0
4. Mac OS X 1.0

The time allocated to each release will be used for bugfixes and fixes
not covered by the other themes; namely packaging work and OS integration.

The purpose of the Beta III release is to solicit feedback on the two
largest changes: Short Setup and Fast Startup. It should launch very
soon after as those two themes complete.

The 1.0 releases are of course contigent on tests giving positive
results and development going relatively smoothly over the course of the
summer. 

Unlike our previous releases, we are considering the idea of launching
on different platforms at different times. This reflects the fact that
although most of the code is shared, the packaging and OS integration
work is not. Making our Linux users wait while we finish fixing our
klunky OS X integration is probably undesirable, except perhaps from
a marketing oriented point of view.


### What do you think?

That's it! Mailpile's future, for the next few months at least.

Feedback is most welcome. Please find us on IRC (Freenode, #mailpile) or
[on Twitter](https://twitter.com/mailpileteam).

Thanks for reading!
