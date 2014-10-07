Subject: A Rough Budget and Alpha Roadmap
Author: Bjarni
Date: September 11, 2013
Type: blog

Brennan, Smári and I had a longish meeting in London last Friday to
discuss our next steps, now that the campaign is finished.  We discussed
budgets and development plans and came up with a rough road-map for what
we are going to work on during the next few months.

In the interest of transparency, we would like to share the highlights
with the community.

## The Budget ##

As this is written, our budget looks like this:

   * $151,000 (IndieGoGo: $163,192 minus handling fees) 
   * $1,000 (from PayPal)
   * $6,600 (54.77 Bitcoins)
   * **$158,000 TOTAL** (= 19,230,180 [ISK](https://en.wikipedia.org/wiki/Icelandic_kr%C3%B3na))

The numbers above are estimates, as we are currently unsure of both the
bitcoin exchange rates and the final combined handling fees of
IndieGoGo, PayPal, credit card companies and banks. But it's safe to assume
we'll have about $158,000 dollars to work with.

As discussed in [Turning Money into
Code](2013-08-20_Turning_Money_Into_Code.html), we are for the first few
months going to pretend we raised exactly $100,000 USD and spend that on
salaries. Although we would rather keep the exact split private, we can
say that the salaries are calculated based on our needs and personal
circumstances, rather than "fairness" or seniority. Our goal is to make
sure each member of the team is as happy and productive as possible.

This leaves roughly $58,000 USD (after handling fees, taxes and other
overhead) for rainy days, for attending conferences and to hire
contractors for specific tasks (such as packaging, or dealing with our
[font licensing complications
](2013-08-30_Fonts_and_Copyright_Licenses.html)). This also gives us
the leeway to raise our salaries a bit if poverty starts to interfere
with our productivity.

As a minor implementation detail, we will be founding an Icelandic
company around the project named **Mailpile ehf** which will be run in
the spirit of a minimal overhead non-profit. The company will mostly be
responsible for managing the project funds and fullfilling our local
regulatory obligations.


## The Road-Map ##

The second result of our Friday marathon-meeting was a more detailed
road-map for the next few months and a clearer definition of what we are
going to do now and what we are going to do later.

### September ###

Primary goals:

   * Prepare campaign perks
   * Select a platform for the Mailpile Community
   * Bring the Mailpile code-base to "dogfooding" status

The final point is worth elaborating on slightly. By "dogfooding", we
mean we want to get Mailpile to the point where the three of us (and
other sufficiently motivated developers) can use the software to read
and write e-mail.  The main feature points we need to complete for that
to be possible are:

   * Reading Mac Mail.app mailboxes
   * Working IMAP and POP3 support
   * The ability to compose and send e-mail
   * A working address book

### October-November ###

Primary goals:

   * Mail campaign perks, wrap up the campaign
   * Community forum in place
   * 1st draft of crypto functionality
   * Prepare for Open Source contributions (dev docs, testing, etc.)

Sub-tasks:

   * Launch community forum
   * Use community forum to choose a license
   * OpenPGP encryption/decryption and UI
   * OpenPGP Key Management
   * Code Testing
   * Code Documentation
   * Plugin Architecture
   * Internationalization / Localization support
   * APIs

### December ###

Primary goals:

   * Handle spam
   * Support multiple personalities/identities
   * Polish the UI

Sub-tasks:

   * Tag management
   * Sender Identities
   * Keybindings
   * Integrate spam filtering

### January ###

Primary goals:

   * Alpha release!
   * Draft a new 3-4 month road-map

We are pretty comfortable with this plan. We feel it is realistic and
has measurable results at regular intervals, which will help both us and
you gauge how well the project is doing.

