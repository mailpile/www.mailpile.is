Subject: Multiple PGP Key Support!
Date: June 8, 2015
Author: Bjarni
Type: blog

Quite a lot got done last week:

1. Admin: Paid salaries, filed bi-monthly VAT, sorted books.
2. Accounts: [Documented the design](https://github.com/mailpile/Mailpile/wiki/Accounts)
3. IMAP: Improved UI feedback, download scheduling and tag creation
4. GnuPG: More settings, multiple key support
5. Security: Master key storage can now be independent of PGP keys.
5. Add Account works!
6. Short Setup Flow works!

The GPG changes may break backwards compatibility, so I am holding off
on pushing up my changes until I've tested things further and either
documented or implemented work-arounds.

The good news is, Mailpile can now both generate and use multiple
private PGP keys!

This emerged as a priority from the Account and Home Page work; it just
didn't make sense to improve the app's support for multiple identities,
but then force the user to use just one key for all accounts. This could
actually have resulted in rather serious security problems for some
users; Caitlyn needs to be able to control when and how she tells the
world that she and Bruce are actually the same person. That sort of
information should not be leaked prematurely by an overly broad public
key...


### Plans for this week

1. Test and iterate further on the GPG and Accounts changes.
2. Upgrade the Add Account code so it also functions as Edit Account.
3. Make the Edit button work correctly on tag views.
4. Start merging the new storage code required for Fast Startup.

It looks like IMAP browsing may not be ready for Beta III after all; I'm
reaching the cut-off point for that if I want to be able to include the
reworked crypto storage in Beta III. We'll see!

