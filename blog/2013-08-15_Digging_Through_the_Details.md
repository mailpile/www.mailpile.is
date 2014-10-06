Subject: Digging Through the Details
Author: Smári
Date: August 15, 2013
Type: blog

Hello Internets!

Over the last 9 days we've been overwhelmed with support for our new project, 
Mailpile, but also with a lot of questions, suggestions and great ideas for what more to do. 
We really love all the feedback!

Through these conversations, we've noticed a bunch of technical questions that a 
lot of people ask, so we've tried to roll them all into a bit of a technical 
overview. 

Warning: The following is kind of geeky.


<h4>Just a Mail Client</h4>

Mailpile is a <a href="http://wikipedia.org/wiki/Email_client" target="_blank">Mail User Agent</a> (MUA - commonly called a "mail client") 
under early development that currently knows how to read mail from Mbox, Maildir 
and (experimentally) IMAP. There are designs to support POP3 and perhaps other 
transports. Mailpile is written in Python, and has very few external dependencies that 
are not packaged with Python's standard library. The most notable of these is 
GnuPG, which is called from the system path, if it is available.

To unravel that for slightly less technical people, a <strong>mail client</strong> is 
the software that lets you view, compose, receive and send mail. It's the thing 
you see. But on the backend, there are two other types of bits that make e-mail 
work: Mail Transfer Agents (MTA), which the MUA connect to when they want to send 
an e-mail to somebody, and relay the messages through the Internet to the 
recipient, and Mail Delivery Agents (MDA), which manage the final step of getting 
the e-mail into a user's Inbox.

Still following? Good!


<h4>Is Mailpile a Mail Server?</h4>

Mailpile is <em>not</em> a <a href="http://wikipedia.org/wiki/Message_transfer_agent" target="_blank">Mail Transfer Agent</a> (MTA commonly "mail server" or MDA , Mail Delivery Agent). 
MTAs and MUAs, are often bundeled together in the case of Gmail. This 
is kind of important to understand. At the moment, Mailpile is not a mail server (MTA or MDA).

As you can imagine, e-mail <strong>does not work if it does not have an MTA or MDA</strong>. For 
now, we're going to rely on traditional e-mail infrastructure, but eventually we 
may decide to try and have a go at that too. Currently, setting up and 
maintaining a <strong>mail server</strong> is painful and difficult- we'd like to fix 
that too, but not until we've gotten the mail client aspect taken care of first.


<h4>The Many APIs of Mailpile</h4>

When run, Mailpile provides the user with a number of different API's. At 
the base, it is possible to load Mailpile as a Python module and interact with it 
entirely programmatically. Run from the command line, Mailpile provides its own 
CLI. It also provides a built-in HTTP server which provides access to a few other 
formats, such as a HTML+Javascript interface for novice users, and JSON, XMLRPC 
and RSS interfaces for programmatic interactions over HTTP. On the Javascript 
side, we are trying to avoid implementing features, but are keeping all 
Javascript for usability and visuals, incorporating JQuery and D3.


<h4>Mailpile's Architectural Differences</h4>

There is no external database, but rather Mailpile relies entirely on an internal 
data structure format. The search index is stored in memory locally, providing 
quite a lot of speed on searches, which for any term on a modest laptop generally 
returns well within 0.2 seconds. The search index can be optionally hashed (for 
instance with SHA256). For further security, the settings folder, including the 
search index and other configuration items, can be GPG encrypted when it is not 
in use (Mailpile will handle those details for the user).

Mailpile is different from most MUAs predominantly in that its architectural 
paradigm is not "list mail from folders", focusing on fetching, listing, viewing, 
writing and sending mail, with features like search and tagging as an 
afterthought, but rather a "search engine for mail" with a focus on searching and 
tagging, with fetching, viewing, writing and sending as necessary but in terms of 
workflow, secondary actions. This changes a lot of how people interact with mail, 
and more closely models how most people use e-mail nowadays.


<h4>A Killer Combo</h4>

This speed, plus the user-friendly interface, means that Mailpile effectively 
manages to provide the same base functionality as GMail, except that it is free 
software.

Due to the speed of Mailpile's search engine, it is possible to do various things 
that generally have not been possible in MUAs before - speed prohibitive - and 
we're starting to be able to mine for potential functionality that Google has 
not, such as graphing search results in various ways, making attachment browsers, 
managing local mailing list groups, and so on.

One thing a lot of people have mentioned to us is providing a different kind of 
mail transport than traditional SMTP, such as STEED. We'd really like to do that, 
and we've got some pretty crazy and interesting ideas about where to go with 
that, but first we've got to get all the other bits working really well.


As you can see, we've got a lot of details down, but there's a lot of work to do. 
First though, we've got to raise the cash to do the work without starving. Thanks 
for helping us get there!
