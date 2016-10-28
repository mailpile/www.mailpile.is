Subject: Search as a Core Feature
Date: October 26, 2016
Author: Bjarni Rúnar
Type: blog

One of the main differences between Mailpile and most other Free
Software e-mail clients has to do with the approach we take to handling
e-mail.

The first generation of e-mail clients focused on the e-mail itself and
provided mailboxes or folders as places to store it. Organizing your
e-mail meant moving it around, from one mailbox to another. This is how
most desktop e-mail clients work today.

Mailpile's approach is different. Inspired by GMail, we decided to make
search the central metaphor. Organizing mail in Mailpile then became a
matter of labeling messages in such ways that they could easily be
searched for; this is how Mailpile's tags work.

Tags are much more flexible and powerful than mailboxes; once the search
engine has indexed all your mail it no longer matters in which mailbox
or folder the mail is stored since you can access and organize any
combination of messages using a mixture of tags and search terms.
Searching a well designed index is actually faster (both for the human
and the computer) than finding and opening the right mailbox.

So Mailpile is a search engine first and foremost. Most of the other
features it has are built on top of that foundation.


## What About Mailboxes?

This is all well and good.

But the fact remains that sometimes we need to open a mailbox and look inside;
after all, that is where the mail is!

Mailpile has struggled with this from the beginning. Being built around
a single search engine meant Mailpile couldn't really do much with the
contents of a mailbox until it had all been processed and added to the
search index.

This led to usability problems. If Mailpile was given a large number of
mailboxes to process it could take quite some time before it got to the
one the user was interested in. If the background indexing process had
a problem, mail would just never appear. Users coming from traditional
mail clients had expectations which Mailpile could not meet. And last
but not least, it made troubleshooting very difficult because there were
so many layers of code, each introducing potential bugs or delays, that
an e-mail had to travel through before it appeared (or failed to appear)
in the user interface.

Sometimes you just want to open up a mailbox and look inside, without
having to add all the mail to your Mailpile.


## Embracing Search

The solution I have found to this problem wasn't to stop treating
search as a core feature. It was to embrace it and take it a step
further: who says there should *only be one way to search*?

Many IMAP servers offer search features. We should be able to make use
of them. Similarly, searching a raw mailbox is relatively
straightforward - it may not be elegant or as fast as Mailpile's native
index, but running "grep" or the equivalent very often gives useful
results. It turns out there are many ways to search mailboxes that
haven't been fully processed and added to the main Mailpile index.

So Mailpile now internally supports **multiple search indexes**. At the
moment it only searches one at a time, and some search indexes are not
very good at searching yet... but the code is elegant and clean, works
well and has interesting potential for the future.

Maybe someday we'll have hybrid search, which searches both remote IMAP
servers and the local index. Maybe someday we'll be able to pull in
results from notmuch or some alternate index.

But for now, at least this approach makes it easy and quick for Mailpile
to look inside raw mailboxes. That alone clears a major roadblock out of
the way for a 1.0 release.

I am still mulling over how best to expose this in the user interface.
At the very least, it will be the default behaviour when accessing
mailboxes from the browsing tool. I may also make it accessible via the
per-mailbox tags in the sidebar; doing so is likely to match user
expectations better than using Mailpile's internal index. But I'm not
entirely sure.

I'll be pushing this up for review once I've finished a few more test.
