Type: blog
Subject: Mailpile Beta III: WYSIWYG
Author: Bjarni
Date: July 20, 2015

Hello world!

We are proud to announce the our third Beta release:
**Mailpile Beta III** (v0.5.1)

This release's code name is "What You See Is What You Get - WYSIWYG".
The main focus of this release is simplicity and stability.


## Where Can You Get It?

The new release is availble from [the Mailpile download
page](/download/), and the source is [on
github](https://github.com/mailpile/Mailpile/releases) as always.

Please read [the release
notes](https://github.com/mailpile/Mailpile/wiki/Release-Notes-201507-Beta-III)
and check our [security
roadmap](https://github.com/mailpile/Mailpile/wiki/Security-roadmap) so
you know what to expect.


## What's New?

**Setup is simpler and multiple account support is much improved.**

Initial setup was slimmed down to a mere two steps: choose your language
and choose your password. We are a bit sad that this rendered obsolete
the quirky silly hints we provided while folks waited for their e-mail
to start downloading, but maybe we'll be able to make use of that
elsewhere.

In recognition of our users' need to manage multiple e-mail accounts
and play different roles, accounts are now a core feature and the app
sports a new "Home Page" which highlights which accounts you have
configured and provides shortcuts for reading or composing mail within
the scope of each one. When configuring a new account we now make use of
the Mozilla ISPDB (Internet Service Provider Database) to avoid the need
to manually enter settings for most larger e-mail providers. 

Finally, for the geeks in the room that already have piles of e-mail on
their local machines, we've added the **Browse** tool which lets you
find local mailboxes and interactively add them to your pile. Unix mbox,
Maildir and Mac Mail formats are currently supported out of the box.

**Key discovery works.**

Searching for encryption keys, both in local mail and on remote key
servers should now work reasonably well.

**What you see is what you get!**

Most of the unfinished and half-baked user-interface elements have been
removed. The dedicated Tags and Contacts pages are gone for now, as are
many buttons and links which seemed like good ideas but never quite
worked.

There are still some loose ends, but for the most part the Mailpile user
interface now keeps its implicit promises: what you see is what you get!


## What's still broken?

The app is still very slow to start up if you have a large amount of
e-mail or many contacts, and still relies on the external `openssl`
process which has proven buggy in some critical cases.

The web interface is slow.

Remote access to a running Mailpile still requires advanced tech skills.

The app's communiction with the outside world needs to be better
secured; SSL certificates need to be varified and our Tor integration
for anonymizing keyserver lookups is unfinished.

Starting the app is still a confusing experience for most Windows and
Mac users.

When preparing the Beta, we discovered that our translation teams on
Transifex hadn't received updated strings to work with in quite some
time, so most translations are woefully out of date.


## What's next?

Fixing all of the above!

This week I am going to update our [Roadmap to Version
1.0](2015-04-27_Roadmap_to_v1.html) and spend some time working with the
fine fellows from [Cloudfleet](https://cloudfleet.io/) who are coming to
visit Iceland.

One thing however has been decided: until the 1.0 is released, the Beta
III packages will be updated roughly once every two weeks. So watch
those version numbers!

Thanks and happy mailing!
