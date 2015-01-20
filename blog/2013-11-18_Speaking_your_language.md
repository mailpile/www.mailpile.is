Subject: Speaking Your Language
Author: Smári
Date: November 18, 2013
Type: blog

<img src='/files/internationalization.jpg'>

About a week ago, we sneakily pushed out i18n support for Mailpile, in the hopes that nobody would pay it much attention until after the alpha release - or at least until it stopped crashing. But as is sometimes the case when working on free software, people pick up on the darnedest things. A little over a day after we pushed the super-breaky half-hacked together i18n code that still needed fixing up and reviewing, we had our first translations coming in - Dutch, French and Swedish. Now, a week later, we've got Italian, German, and partial Danish translations as well.

In short: We're flabberghasted. Thank you, everybody!

Translating software is a fairly difficult and slow task. In order to do it well, it requires a lot of skill and a lot of understanding of the context in which the various strings are used and the way users are going to understand them. But translation is also very important - it helps make software accessible and useful to people who don't understand the language the application is originally developed in. For many people all over the planet who don't speak English, these translation efforts are vital to the viability of Mailpile, so we take this very seriously.

### A panoply of errors

One of the things early translators have noticed is that the vast majority of the messages are error messages. This isn't very surprising really. Mailpile isn't very chatty software. Most of the text content of the application comes from people's e-mail, contacts and such, not from Mailpile itself. The little bits that are textual are normally quite simple things, like "E-mail address" (mailpile/defaults.py:55), "To:" (static/default/html/message/index.html:18), and "Contacts" (static/default/html/partials/sub_nav_contacts.html:3). Aside from that, there's error reporting.

Most of Mailpile's error reporting only happens when you turn on higher log levels on the command line interface, because we're trying to build Mailpile with the philosophy of having sensible defaults and failing gracefully. So while "Invalid hostname: %s" (mailpile/config.py:126) and "Mailbox ID too large: %s" (mailpile/config.py:876) are rather ominous-looking messages, in reality they should only ever be seen by power users who are trying to do strange things manually. Nevertheless, it is important to translate these strings too, since there are lots of power users in the world who don't speak English and might be put off by strange garbled weirdness in a language they don't know.

### More languages!

These design choices have resulted in the current i18n translation base being relatively small, but as we noted in our issue tracker (https://github.com/pagekite/Mailpile/issues/73), the messages in Mailpile are not stable and are likely to change a lot in coming months. This mostly means that new messages will be added, but it's entirely possible that some messages might go away and never come back. We tried at first to discourage people from starting to translate just yet on the basis that there might be a lot of fluctuation, but realistically 90% of the messages that are there now are likely to continue to be used and things are stabilizing faster than we really expected anyway.

That is all to say that we hope you enjoy Mailpile in whichever language you speak - and if your native language isn't supported yet, feel free to contribute. To enable a translation, at the moment, you need to either set your environment variables appropriately or set the prefs.language variable in the command line interface: "set prefs.language = nl_NL" for instance, to switch to Dutch.

We have designated a translation freeze for our first alpha release for January 2nd, 2014. Any translations arriving after that date will not be included in the alpha, although they will be merged in after the alpha version ships.

### Getting Involved

If you're interested in contributing language translations to Mailpile, checkout the project [on Transifex](https://www.transifex.com/projects/p/mailpile/) and submit a pull request to our [GitHub](http://github.com/pagekite/mailpile) or get in touch with [Ovnicraft](http://github.com/Ovnicraft) who has been awesomely spearheading the endeavor.

Thanks again!
