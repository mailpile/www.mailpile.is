Subject: Digging for Data
Date: May 18, 2015
Author: Bjarni
Type: blog

Last week mostly went according to plan: backers e-mails were found,
invitations were sent, VFS work commenced.

Not quite as many invitations got sent out as I had hoped though,
because I was overcome by a debilitating bout of productive
procrastionation. Inspired by the need to compile a list of backers on
the one hand, and a desire to refresh my memory on front-end development
work on the other, I ended up creating a new plugin that makes it easy
to run custom data mining operations on your own e-mail.

This is what the result looks like:

<img src="/files/2015-05-Datadig-Demo.jpg" border="0">

The text is all blurry, because data is being extracted so fast it
makes your head spin! Right?

If you follow the S-shaped path of the green arrows, starting in the
upper right-hand corner, the tool works like this:

1. Search and select messages
2. Click the grid icon (top-right arrow)
3. Add columns describing the desired data
4. Click the Preview button to see if it works
5. Download the results as a CSV file
6. Profit!

If you want to extract information which has already been defined as one
of the built-in recipes, this kind of personal data-mining becomes a
mere matter of pointing and clicking (the rows of the *Data Source*
table are clickable). If the pre-existing recipes do not suffice, clever
geeks can search for virtually anything by using regular expressions.

Hopefully, over time, Mailpile community members will create and share
recipes for common things like invoice amounts or flight itineraries,
bank statements or stock market alerts... if you've ever wanted to graph
the frequency of your Twitter mentions, this plugin (combined with any
old spreadsheet application) makes that easy to do.

The plugin is named **Datadig**, and to give it a try you will need to
pull the latest Mailpile from Github and run the following command on
the Mailpile CLI, `mailpile> plugins/load datadig` - and yes, a GUI for
this is in the works.  Quit Mailpile, restart and the Datadig grid icon
should now appear whenever you select messages!

It seems only fitting that Mailpile will not only protect privacy, but
will also help people datamine their own e-mail for their own personal
benefit. The tabular spreadsheet format is universal and widely
understood, making this sort of thing potentially useful to a very wide
audience - not just hackers and coders.

Who would have thought CSV files could be so exciting?

The code lives in [.../mailpile/contrib/datadig/](https://github.com/mailpile/Mailpile/tree/master/mailpile/contrib/datadig)
and I look forward to your pull requests. ;-)

In other news...


### Plans for this week

1. Continue sending out invitations to [the voting page](/roadmap/)
2. More work on the VFS layer
3. Take part in the [Localization Lab's 2nd
   AMA](https://twitter.com/L10nLab/status/597827047654842369),
   this Thursday!
4. Mystery meetings with mysterious people

