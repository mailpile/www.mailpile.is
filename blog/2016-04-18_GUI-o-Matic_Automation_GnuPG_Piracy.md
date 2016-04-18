Subject: Delegate, Automate, Collaborate, Pirate
Type: blog
Author: Bjarni Rúnar
Date: April 18, 2016

Avast! Be welcome to this latest irregular Mailpile status update!

In this episode, I will discuss:

1. A Strategic Spin-Off Project
2. Deletion and Tag Automation
3. GnuPG Collaboration
4. Piracy in Iceland

Progress towards a release has been very slow. This is entirely due to
me being busy with other work - things that pay the bills, looking
after my lovely baby daughter, buying an apartment and moving to
Iceland. I'm swamped!

As I am often exhausted and pressed for time, I have had a hard time
sticking to anything resembling a schedule and have basically indulged
any vaguely productive impulses, rather than worry about roadmaps.

So if this doesn't look like progress towards a release, you're probably
right. I've been very distracted. But it's progress all the same!


## A Strategic Spin-Off Project

As mentioned before, Mailpile's desktop integration on Mac OS X and
Windows is currently unacceptable and needs a lot of work.

We do have some code, however, and [a rough
design](https://github.com/mailpile/Mailpile/issues/1514). In order to
encourage people to help out (and maximize the utility of the code
we've already written), I spun off the existing GUI code into a separate
project: [GUI-o-Matic](https://github.com/mailpile/gui-o-matic).

This should both lower the barrier to entry and encourage contributions;
You no longer need to check out all of Mailpile to hack on the
GUI-o-Matic. And because it's a stand-alone utility, it's more likely
that other projects will want to make use of it. We hope!

If you've ever wanted an easy way to add a cross-platform desktop
graphical user-interface to your code (not just Python!), take a look:
[GUI-o-Matic](https://github.com/mailpile/gui-o-matic) is a bit like
"[dialog](https://www.linuxjournal.com/article/2807)" for modern desktop
environments.

Old farts will understand.


## Deletion and Tag Automation

Did you know the current incarnation of Mailpile cannot actually delete
e-mail?  It's true. This was actually a deliberate, conservative choice
to avoid losing valuable data during development. It was never meant to
be permanent, but temporary hacks do tend to outstay their welcome...

In the context of shipping 1.0... well, a mail client isn't really a
mail client if it cannot delete mail, is it? More pressingly, a tool
which aims to safeguard user privacy has to support the most basic
privacy feature of all: deleting unwanted data.

So I decided to (yet again) break the feature freeze and implement
message deletion.

This had a knock-on effect. Mailpile's deletion strategy was supposed
to be similar to that of other webmail: once things have sat in the
Trash for a while, they get deleted automatically. Similarly, messages
should automatically move from Spam to Trash after a while and blank
drafts should get purged and deleted.

So Mailpile needed a way to a) detect messages had been untouched for a
period of time and b) a way to trigger actions once a) was satisfied for
a message carrying a particular tag.

So now Mailpile has exactly that!

The search-engine is used to keep a record of when a message tags were
last modified, and each tag now has an automation section which
specifies a number of days and an action to perform. A few times a day,
Mailpile will search for idle messages in tags with automation enabled
and either retag or delete the matching messages.

While I was implementing the configuration interface for this, I also
added an option to enable statistical auto-tagging for any tag, as
described in [A Plan for Spam ... and
Bacon!](2014-01-12_A_Plan_For_Spam.html), and exposed a few more of the
technical tag settings in the Tag settings editor. All features that
already existed, but weren't really accessible.

So there we go, tags now have automation and you don't need any
command-line black magic to create your own statistical tagging or
time-based workflows.

These capability are now available to all tags, including user-created
ones. Some of the potential use-cases include:

1. Deleting Trash after a while
2. Moving Spam to Trash
3. Moving untouched blank drafts to Trash
4. Creating statistical categories for promotions or paperwork
5. Creating a "Postponed" tag which hides mail from view for a few days

Now we just need an auto-responder and Mailpile will be able to
automatically recognize and reply to tech support requests that have
been unanswered for more than a week...

(In the process I also fixed bugs in the bayesian auto-trainer, the
periodic scheduler that triggers it and the tag editing tools the UI -
proper release work after all!)


## GnuPG Collaboration

I write this, sitting on a train back home from London.

I was in London today to meet with Neal of [the GnuPG
project](https://www.gnupg.org/). We discussed how the projects could
collaborate more closely in the future and some of the
[difficulties](2015-02-26_Revisiting_the_GnuPG_discussion.html) Mailpile
has had integrating with GnuPG.

It was an excellent meeting and I'm optimistic that once GnuPG 2.1 (or
2.2) becomes widespread, Mailpile will be able to make full use of it
without any horrible hacks.

Conversations will continue!


## Piracy in Iceland

Finally, some bad news.

[Iceland's government is
broken](http://grapevine.is/mag/column-opinion/2016/04/10/600-silver-lions-how-iceland-was-betrayed-again/)
and I feel an obligation to help fix it. I will be dedicating some time
this summer to helping [the local Pirate Party](http://www.piratar.is/)
prepare for our next elections. Mostly I'll be working behind the scenes
on internal party tools, but this inevitably means I will continue being
distracted from Mailpile work. But don't worry, I'm *not* running for a
seat in parliament. ;-)

If you can help out in some way to help pick up the slack, please get
in touch on #mailpile on Freenode.

That's it for now, thanks for reading.

Time to pack some boxes and move to Iceland!
