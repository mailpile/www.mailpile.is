Subject: Fast Startup and Key Discovery
Date: June 29, 2015
Author: Bjarni
Type: blog

Last week was a very successful one here in Mailpile-code-land.
A whole bunch of loose ends got tied off, so this week Mailpile
is actually leaps and bounds more powerful than it was just a few
days ago.

I've been a bit behind schedule working towards Beta III, but
this week has been so good that I am now mostly caught up.

The highlights are described below. Just please, don't expect me
to always be this productive!


#### Memory Hole

Discussions about "Memory Hole" picked up some steam this week.
Memory Hole is the proposal to extend PGP/MIME to sign and possibly
encrypt some e-mail message headers, the Subject being the most
obvious candidate. This is a collaborative effort between multiple
e-mail security tools, and this week test messages were exchanged
with the developers of Enigmail, R2Mail2, Lavaboom and gpg4o.

Although Memory Hole does not address all of [the issues I have with
PGP/MIME](2014-11-21_To_PGP_MIME_Or_Not.html), it is a massive step in
the right direction. The fact that it is already getting support from
so many projects is very encouraging!


#### Key Discovery and Crypto Policies

This week I completed the "Key Discovery" milestone from [the 1.0
roadmap](/roadmap/)! It is now possible to search for PGP keys,
import and use while composing a message.

This completes the work started by Brennan last October, which he
was unable to finish because the back-end (my domain) didn't
provide him with the data and APIs that he needed.

In the process of wrapping that up I also finished implementing
smart "crypto policies", whereby the app will suggest signing or
encrypting of outgoing mail depending on what we have received
from the recipients in the past. This is a critical part of
Mailpile's overall strategy to gradually ramp up the security of
e-mail without getting in people's way.

Once more user interface work has been done it will also be
possible to configure custom policies for individual contacts. So
you will be able to tell Mailpile that Alice always wants to
receive encrypted mail, but Bob hates digital signatures...


#### Fast Startup Progress

The Fast Startup milestone for 1.0 (and Beta III) involves
completely revamping how Mailpile stores metadata and the search
index.

This is a big and scary task, but luckily most of the research
and code was done last January. I spent a few days this week
dusting off the code and finished integrating it. The good news
is that it works: this weekend I started up a fully functioning
Mailpile using the new storage systems.

I have yet to migrate the contacts over and write a migration
tool to help existing users make the switch, but the riskiest
parts of the job are now done. Because this is not a backwards
compatible change, this code won't be merged with the main branch
until the migration tool is written but will instead live on a
branch of its own:
[features/metadata.ng](https://github.com/mailpile/Mailpile/tree/features/metadata.ng)


#### Working with Mailing Lists

Another small improvement made this week involves how Mailpile
handles mailing lists.

In response to some feedback (a.k.a. friendly complaints) on our
IRC channel (#mailpile), I've made the search keyword generation
for mailing lists both less spammy and more precise. The metadata
store now also records which mailing list a message came from.

Now that I'm a bit more used to working with Mailpile's user
interface, I was also able to make these improvements bubble all
the way up so people can make use of them! If you select a single
message in the search view, Mailpile's tool bar will now display
a link to search for other messages from the same person - or
from the same mailing list, based on these improved keywords.

This is an attempt to educate users on the possibility and syntax
of searching by sender or by mailing list.  But it is also
directly functional, because once you are looking at a search
result page dedicated to a particular mailing list, the "Save
Search" button makes it trivially easy to convert that into a
dedicated Tag with a behind-the-scenes Filter classifying future
e-mail automatically.

Powerful features, made discoverable and clickable...


### Plans for this week

1. Tally votes and announce our license!
2. Finish Fast Startup for contacts and migration
3. Find someone to review the crypto used by new storage systems
4. Begin work on Beta III packaging
