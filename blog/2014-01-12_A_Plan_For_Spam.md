Subject: A Plan For Spam ... and Bacon!
Date: January 12, 2014
Author: Bjarni
Type: blog

<img src="/files/Spam-og-Bacon.jpg" border="0">

In August 2002, Paul Graham (of Y Combinator fame) published an essay
entitled "[A Plan For Spam](http://www.paulgraham.com/spam.html)". This
essay is generally credited with inventing, or at least popularizing,
the idea of using statistical analysis (bayesian filters) to identify
spam in e-mail.

Although over 11 years old now, Paul's idea has proven to be the most
effective and flexible way to deal with the flood of junk mail that has
been e-mail's biggest flaw since the late 90s. Statistical analysis is
at the heart of most modern e-mail clients spam filters, and Mailpile
will be no different: the first spam filtering solution we will ship,
will be based on the excellent
[spambayes](http://spambayes.sourceforge.net/) Python package.

However, we are not satisfied to just match the competition - as usual,
we plan to take things a step further. If you find this sort of thing
interesting, please read on!


### Training the Filters

When using statistical analysis, quality of the filters depends on the
quality of the input data. Somehow you need to teach the spam filter
what mail you like and what mail you consider to be junk. The higher the
quality of the training set, the better the filter will work. So all
statistical spam filters need a reasonably large set of "spam" and "ham"
to work with, and which messages belong in each category will vary from
person to person and will also gradually change over time.

This poses a slight conundrum. When a user imports thousands of existing
messages from his existing e-mail accounts, how do we know which ones to
use for training? We could just ask the user to sort all his mail... but
that sounds pretty tedious.

To a certain extent, manual training will be inevitable and is a
required feature: you need a way to tell the spam filter when it makes
a mistake, whether it let a message through by accident or flagged
something it shouldn't have.

But beyond that, ideally the user shouldn't have to interact with the
spam filter much. It should just get out of the way and do its job. At
this early stage, we do not have a complete solution to this problem,
but it is an interesting one for sure and we do have a bunch of ideas:

   1. Shipping a small collection of recent spam with Mailpile may make
      it easy to "bootstrap" the filter when Mailpile is first installed.

   2. When importing mail from another app, we can seed the "spam" corpus
      with data from that application's Spam folder, if it has one.

   3. Behavior tracking within the app can then be used to select the
      most interesting messages for subsequent training. When you read a
      message or reply to one, that is a strong signal that you consider
      the message to be "interesting". If you then place it in the spam 
      folder, it is interesting spam which the filter should pay particular
      attention to - if not, then it is probably the kind of message we
      should add to the "ham" corpus. In fact, just the act of organizing
      your mail tells us that some messages are interesting enough to be
      manually sorted!

   4. People in your address book and people you communicate with on a
      regular basis are almost certainly not spammers. Special care should
      be taken never to misclassify their messages as spam, no matter how
      much they go on about Viagra and large inheritances.


### Spam that isn't Spam

A lot of us get so much e-mail, that we think of even legitimate mail as
a form of "spam".

Newsletters, Twitter notifications, Github issues, messages from our
banks... e-mail is the only real standard for delivering messages to
people over the Internet and it is used for literally everything.
Flagging those messages as spam would be wrong, but it would still be
nice if our mail clients could reduce the clutter in our inboxes
somehow.

After implementing the first rough draft of the Mailpile spam filter, I
realized that none of the code I had written was actually specific to
spam. It was just a generic classifier that learned that some messages
should be tagged in a particular way, and others should not.

So why not make statistical analysis a feature of all tags, not just the
magical "spam" tag?  What about bacon and salami and other ham?

It should be possible to automatically populate a "notifications" tag
with updates from social media, another one for mail from the government
or your bank... and maybe a third or fourth for messages from your
coworkers or loved ones. A statistical engine that can recognize
unimportant mail should also be able to recognize *important* messages
and highlight them in some way, much like GMail's Priority Inbox or Mac
Mail's VIP folder.

The user interface for this feature will be as simple as enabling
"auto-tagging" for some tag and then organizing your mail as usual. You
decide which tags exist and you decide what you put in them. Over time,
Mailpile will learn to automatically tag messages for you. Once it has
become accurate enough, you will be able to flip another switch and ask
the auto-tagger to bypass the Inbox entirely.

Down the line, combining auto-tagging with other plugins has the
potential to automate all sorts of common tasks, from replying to
"frequently asked questions" to sending receipts and invoices directly
to your printer.

Hopefully all that spam which isn't really spam will finally stop
getting in your way as Mailpile helps you navigate your personal pile of
mail.


### The Current State

The first draft of this was implemented in mid-December and we have been
testing it since then. It seems to work reasonably well even though only
some of the above features have been implemented.

#### What Works Today:

   * Autotagging of any tag (an autotagger for spam is created by default)
   * A plugin API for implementing and training autotaggers based on other classifiers.
   * Behavioral tracking to record which messages are read, replied to, forwarded or manually tagged.
   * Logic which uses the above signals to periodically retrain the filter and keep it up to date.

#### What Doesn't Work Yet:

   * We don't have importing logic or any clever tricks to bootstrap the spam filter yet.
   * White-listing based on your contacts
   * The user interface is still a work in progress

All in all, we feel we're off to a pretty good start!

