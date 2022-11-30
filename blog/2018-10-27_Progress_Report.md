Subject: Progress Report: events, packages, 1.0
Author: Bjarni Rúnar
Date: 27 October, 2018
Type: blog

Hello world! How are you?

I'm writing this, sitting on a bus in Luxembourg, realizing that we have
been very quiet for quite some time. Our last posts were in May, first a
report on [the results of our first round of desktop package usability
testing](2018-05-03_Desktop_Usability_Tests.html), quickly followed by a
[statement on how the EFail flaw impacted
Mailpile](2018-05-14_PGP_Security_Alert.html).

Since then we may have been quiet, but we have not been idle:

<ul class="square">
 <li>Many, many bugs have been found and fixed
 <li>The first round of our desktop packaging project is complete,
     we have packages and very basic desktop integration for both
     Windows and the Mac
 <li>Mailpile's multi-user Apache integration
     (<a href="https://github.com/mailpile/Mailpile/tree/master/shared-data/multipile"
         target=_blank>Multipile</a>)
     has been simplified and reworked
 <li>Mailpile's internal (in-memory) master security key is now
     protected against memory corruption
 <li>Mailpile is now <i>compatible</i> with
     <a target=_blank href="https://autocrypt.org/">Autocrypt Level 1</a>,
     but not yet fully compliant
 <li>I attended the OpenPGP e-mail summit in Brussels
</ul>

I would like to publicly thank Alex and Pétur for their hard work on the
Mailpile Desktop packages, and in particular for how they took delays and slow
responses from my end graciously and in stride.

Read on to learn a bit more about the OpenPGP E-mail Summit, our CCC plans, the
state of the desktop packaging work, and of course the elusive 1.0 release.


## The OpenPGP Summit and 35c3

Last weekend I visited the [Mailfence](https://mailfence.com/) office in
Brussels, to attend the annual OpenPGP E-mail Summit.

The OpenPGP E-mail Summit is one of my favourite community events. Just
two days long, it is an informal event focused on getting people from
the world of e-mail encryption to exchange knowledge and collaborate. 

This year there were (by my rough guesstimate) about 50 people from over
20 projects present, including Phil Zimmermann himself, the creator of
PGP. I was very happy to meet him and shake his hand. We ended up having
about 20 different sessions, discussing topics ranging from key server
management, to user interfaces, to updating the OpenPGP standard itself.

[Notes from all the sessions have been published.](https://wiki.gnupg.org/EmailSummit2018Notes)

There was also a dinner and plenty of socializing, the value of which is
not to be understated. Meeting people face-to-face almost always makes
collaboration online easier and more productive.

For Mailpile, the main outcomes of the summit were the following:

   1. There seems to be potential for partnerships with 2-3 other businesses in
      the OpenPGP space, which we look forward to exploring further.
   2. The Web Key Directory specification is still evolving in ways which may
      require we re-evaluate how we use it in Mailpile.
   3. Mailpile will aim for Autocrypt Level 1 compliance, soon! Our aim is to
      get a member of the community to review and confirm our implementation
      at the [35c3](https://events.ccc.de/2018/09/11/35c3-call-for-participation-and-submission-guidelines/)
      conference. We have a volunteer to perform the review.
   4. I have a voucher and will be representing Mailpile at 35c3. Come say hi!

It was a productive weekend!


## When will Mac and Windows packages be available?

If you've e-mailed me asking this question; my apologies for not
answering. I haven't replied, because I don't know! If I did, our
download page would just say so.

There are three main tasks we need to complete before we make the
desktop packages available to the wider Internet:

   1. A short private beta, to reassure ourselves the packages
      don't have any blindingly obvious bugs.
   2. Launch a Discourse forum, so our users have a venue to help
      each other out.
   3. Finish our "build robot" so packaging becomes an automated
      process without any human bottlenecks.

I am not going to commit to a time-line for getting this done, but this
work is all in progress and won't take forever. This year? This year.

It's worth mentioning that some important tasks have been postponed and
will not be blocking the availability of packages - so these packages
will not be "Mailpile 1.0". But they're close.


## So, what about Mailpile 1.0?

Our current release is 1.0.0rc4, tagged and pushed earlier today.

At times it feels like we're chasing [the tortoise from one of Zeno's
paradoxes](https://en.wikipedia.org/wiki/Zeno%27s_paradoxes#Achilles_and_the_tortoise),
always getting closer but never able to catch up. For every issue we
close, others are opened...

But in spite of that, my to-do list for the elusive "Mailpile 1.0"
release really is starting to get shorter and the issues that remain are
not as complex as the ones we've resolved. I've updated the [GitHub
Milestone](https://github.com/mailpile/Mailpile/milestone/4) to reflect
the current priority issues. It's not a long list, mostly relatively
minor bugfixes.

The two big items left on my 1.0 roadmap are:

   1. Fully implement Autocrypt Level 1
   2. Implement easy remote access (PageKite and Tor Hidden Services)

The former is necessary for an interoperable and complete implementation
of "PGP for everyone", and the latter is needed so people can access
their Mailpiles remotely - in particular to access their Mailpile from
their smart-phones.

Again, I'm not going to make any promises about when these will get
done.

But this mini roadmap is still worth sharing, because if you liked the
vision behind Mailpile and those two issues aren't critical for your
use-case... then maybe Mailpile is already ready for you. Maybe!

One-point-oh is an important label, but it's not everything.

Mailpile is already a great e-mail client. Give it a try!
