Subject: Python SSL Woes
Type: blog
Date: March 24, 2016
Author: Bjarni Rúnar

There's not much to say about progress this week; things have been slow,
but most of my hacking time has been spent getting frustrated by SSL and
Python.

So following in our Grand Tradition of biting the hand that feeds us and
publicly complaining about libraries and tools we rely upon, I am going to
write a few words about the state of SSL/TLS support in Python.

This rant was (sort of) requested by Christian, one of the maintainers
of the Python SSL module. Hi Christian, thanks for all your hard work! ;-)

### Why We Care

SSL (or TLS) is the technology used to secure how Mailpile communicates with
online mail servers, and is also used when downloading data from the web,
whether for key discovery or things like user avatars and icons.

The e-mail world is a bit different from the web, in that the use of encryption
is somewhat less mature. Self-signed certificates for mail servers are more
common than on the web and use of encryption for e-mail in transit tends to be
more opportunistic, so the "standard" SSL key management strategies employed by
web-servers and web-browsers don't really apply.

The current iteration of the Mailpile code-base doesn't validate SSL
certificate at all when connecting to SMTP or IMAP servers; this means any
motivated attacker can easily perform a man-in-the-middle attack to listen
in on, or modify, sent or downloaded e-mail.

Fixing this requires validating the server certificates somehow; for those
that have a certificate issued by one of the known certificate authorities,
this is largely the same process as on the web. However, a large number of
e-mail servers use self-signed certificates, particularly within the
enthusiast community which is a significant part of the people we expect
to adopt Mailpile. So we need to handle those certificates gracefully as
well.

While working on this, I yet again encountered limitations and bugs in
Python's standard ssl code.


### Issue 1: Python 2.6, 2.7.3, ...

It is incredibly frustrating that Python 2.7.9 was the first release of
Python that had semi-functional SSL support in the standard library.
Previous versions were almost completely insecure and did not expose the
API hooks required to improve the situation.

Since I'm pretty sure nobody in the Python community has a time machine,
there's not much the Python community can do about this.  All we can do
is thank the people that are working to fix things today - and get those
fixes used!

On that note: distributions that are shipping Python 2.7 but refuse to
issue a security fix to upgrade to the latest point release are
**failing to protect their users**. At least back-port the affected
modules, for crying out loud!


### Angry Tweeting

In a moment of drama, I tweeted the following:

> The more I use Python's ssl module, the more obvious it is that
> nobody ever used it for anything serious. Even the 2.7/3.x code
> just fails.

Those are fighting words and I'm sorry if they offended anyone.
Christian responded with a very level-headed request for details, which
in turn prompted this post.

The frustration I expressed there, was to a large degree related to
Issue 1 above, but the comment on 2.7 and 3.x needs explaining. I'll
talk about the big picture first, with critiques of individual methods
further down.

This should by no means be considered an exhaustive review of the Python
ssl module; but I hope at least some of my suggestions are actionable
and constructive.

One caveat: I haven't checked the Python 2.7.11 code, this critique is
based on reading the sources from 2.7.10 as installed by my distro's
package manager. Some of these issues may have been fixed, which would
bring me back to Issue 1.


### Issue 2: import ssl, poplib, smtplib, imaplib

I am going to charitably assume that the ssl backport in 2.7.9 took care
to preserve compatibility and that is why imaplib, poplib and smtplib
(all used by Mailpile) still make insecure SSLv3 connections.

Unless I am reading the code completely wrong, the more secure new
"default SSL contexts" are not actually used (see below for more
details). This is fixed in Python 3.x.

Fair enough, backwards compatibility is important! When forced to choose
between fixing a security hole and suddenly breaking apps that used to
work, it's not obvious that security should always come first.

Unless this was a mistake?

Either way, the backported ssl module provides **no mechanism for
changing this behaviour**, short of monkey-patching. That seems like a
pretty serious oversight, and one easily corrected with a global module
variable or two.

More generally, the ssl module would benefit greatly from an API that
would allow an app to specify default behaviours and callbacks or hooks
for "interesting events"; allow more control and more introspection
without forcing all the other libraries to complicate their APIs.


### Issue 3: Certificate Management

An e-mail client needs to be able to manage SSL certificates, including
self-signed ones.

Showing my ignorance here, I couldn't figure out how to do this with the
Python ssl module until I got some helpful replies to my angry tweet.
Even then, the APIs I will need to work with if I stick with the
standard python ssl module are very awkward.

I think it would be time very well spent to improve both the
documentation and the APIs (see below) for this use-case.

Googling for Python ssl examples will in the vast majority of cases show
people disabling certificate verification entirely.  Surely that is not
what we want people to do!  The official API documentation is the most
effective place to combat these bad examples.


### Issues 4..N

These are random warts in the ssl API. Some major, some minor.


#### pydoc ssl

A typo: the method "fetch_server_certificate" does not exist.


#### ssl.get_server_certificate

If asked to validate, this method may throw an exception instead
of returning the certificate. This is unhelpful.

The data returned by this method is a binary blob; the library
does not provide any utilities for decoding the contents.


#### ssl.SSLError

This exception is raised when a certificate fails to validate.
However, it doesn't tell you anything about the certificate
itself.

Including the certificate as an attribute of the exception would
allow for more nuanced and meaningful error handling.

Details as to why the validation failed would be nice too.


#### ssl.SSLSocket.getpeercert

As far as I can tell, this is the only method provided which
parses an SSL certificate, making any certificate handling code
reliant on the network. This is bad, but isn't the only problem
here.

Aside from crypto geeks, few consumers of this API are likely to
care about the details of a validated certificate. It's trusted,
let's get on with things! It's the certificate that fails to
validate that you need to know more about, so you can tell the
user something useful.

Unfortunately, this method completely refuses to return
structured information about a certificate unless it has been
validated first. And of course, if validation is enabled then an
exception will be thrown before this method can be called.

It appears the workaround is to first use
`ssl.get_server_certificate` and then provide the certificate as
CA to `ssl.SSLContext` or `ssl.wrap_socket`, so `getpeercert`
will return actual information.

This is both non-obvious and quite convoluted.

This method should always return structured data when requested,
but backwards compatibility concerns will probably preclude that.
:-(

Either way, an standalone method that just parses certificates
would be very nice to have.


#### ssl.create_default_context

This method confused me.

At first I thought this method would be used by various Python libraries
that support the SSL protocol... and wanted to figure out how to
customize the output of this so my app would have control over how SSL
was done.

Turns out I was completely wrong on all counts.

I read the ssl library source and found that the stdlib modules are
expected to use the undocumented variable `_create_stdlib_context` which
maps to the undocumented method named `_create_unverified_context`.
Except for http.client, which should use `_create_default_https_context`
which maps to `ssl.create_default_context` after all...

Feeling somewhat confused, I read the Python 2.7.10 sources for imaplib,
smtplib and poplib. Turns out none of them use SSL contexts at all! They
all just call `ssl.wrap_socket`, which in turn uses none of the above
methods...

Argh. Okay. :-(

It looks like those comments were just back-ported from 3.x, without the
libraries themselves getting updated. It's confusing, but the main
take-away is that the backport appears to have failed to secure any of
the standard libraries except for httplib (and ftplib).

I raise this issue to illustrate how hard it is for an app developer to
truly understand *how* SSL/TLS is being used within their app, let alone
have control over it. It's frustrating, to say the least.

My original wish, to be able to control the default context returned by
this method, would be a great feature request if this method were
actually used! It's not. However, I think the feature request still
makes sense - it's just more work!


### What is Mailpile Doing About it?

We are:

1. Talking to the Python devs (complaining)
2. Planning to publish a TOFU-for-TLS module
3. Planning to publish our monkey-patching magic

Step 1 is pretty much done; I submitted an early draft of this blog post
to the current maintainers of the Python ssl module. In spite of the
fact that it contained an extended and distracting rant about the SSL
community in general (which I in the end decided not to post), they
responded well to the technical points and gave constructive feedback.

The main take-away was that apps like Mailpile, that need control over
how SSL connections are made and want to implement non-standard
(non-web) certificate verification models, are not well served by the
standard Python modules. So we'll be using pyOpenSSL instead and
patching or subclassing the protocol libraries.

The TOFU code and policy management logic will be released separately
from Mailpile and under a liberal license, so the community can benefit
or point and laugh, whichever seems more appropriate. I don't know
whether this will happen before or after 1.0.

Stay tuned. :-)
