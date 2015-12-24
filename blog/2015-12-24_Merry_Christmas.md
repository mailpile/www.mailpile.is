Subject: Merry Christmas, Hello 32c3!
Date: December 24, 2015
Author: Bjarni
Type: blog

<img src="/files/2015-12-Merry-Xmas.jpg">

Merry Christmas, Mailpile people!

And for those of you who don't happen to celebrate Christmas: please
also have a happy solstice and a happy new year! :-)

My gift to everyone (aside from this amazing clip-art christmas e-card)
is that I have now cleared my back-log of pending Mailpile
user-interface changes and bugfixes. Some of the highlights are
discussed below. If people want to give me gifts in return, I've listed
and linked some of the low hanging fruit issues relating to this push...

Also, please find a short note Mailpile's presence at 32c3 (the Chaos
Communication Congress in Hamburg) at the end of this post.


## Revamped message display

The way individual messages are displayed has been reworked. Messages
are now displayed inline in the search results and include details about
conversation threading.

The new approach is a little less "elegant" than the old one, from a
visual point of view, but it has the following benefits which I believe
more than justify the change:

1. Conversation structure is now visible, including forks and subject changes
   and message snippets (on hover)
2. All e-mail addresses of senders and recipients are visible and copy-paste
   friendly
3. Next/Previous buttons are available for navigating between messages
4. The context of the message within the search remains visible, so there
   is no confusion about what Next/Previous means (as it depends on the
   search)
5. It is now possible to tag and untag a message or draft while reading/writing
6. HTML works! See below for details.
7. Encryption/signature status for headers is now discoverable (on hover),
   which paves the way for implementing Memory Hole header protection
8. Any message within a thread can be easily replied to, not just the last one

**Unfinished work:** The old composer was shoe-horned in, it needs to be
redesigned to match the new layout (and rewritten to get rid of
select2).

**Known issues:** [messy wrap/overflow in From/To/CC lists](https://github.com/mailpile/Mailpile/issues/1477)


## HTML support

Mailpile now has decent support for HTML mail, including the ability to
load remote images (and warn the user about the risks of doing so) and
the ability to remember display settings by sender.

**Unfinished work:** Tor support will make loading images over the
network a bit more privacy preserving. The default style (fonts etc) of
the HTML frame could use some work.

**Known issues:** [inline images (attachments) are not displayed](https://github.com/mailpile/Mailpile/issues/1476)


## Apache integration and admin tool

I have created the first draft of a Mailpile administration tool:
**mailpile-admin.py** (located in **scripts/**).

The main feature of this tool is the ability to automatically configure
Apache for multi-user Mailpile hosting, by leveraging **mod_rewrite**
and **mod_proxy**.  The tool itself then functions as a CGI script which
takes care of launching Mailpile for users, as long as they type in
their username and password.

**Unfinished work:** Support for other web servers, such as nginx. More
useful admin ops; more useful login/mailpile creation options. Support
for setting the $MAILPILE_PROFILE environment variable, support for
multiple mailpiles per person.

**Known issues:** [rewriting .htaccess is a bad idea](https://github.com/mailpile/Mailpile/issues/1478)


## 32c3

Sadly, [due to fatherhood](2015-12-03_Why_so_Quiet.html) I will be
unable to attend 32c3 myself this year.

However, Daniel Yeow has been helping me with various community related
tasks lately, and he will be there. We are probably going to try and put
together a small informal hackathon, where we'll give away t-shirts and
stickers in exchange for feedback and pull requests. If possible I will
join in using some sort of futuristic robotic telepresence (a.k.a. a
smartphone on a stick).

Watch this space (and [Twitter](https://twitter.com/MailpileTeam)) for
updates.

Happy holidays and happy hacking, everyone!

