Subject: Choosing a License for Mailpile 1.0
Author: Bjarni
Date: May 8, 2015
Type: blog

Dear Mailpile backers and supporters!

The time has come for us to make a decision. Back when the project first
got off the ground, we had some difficulty deciding which Open Source
license we should use for our work. We narrowed it down to two licenses:

1. [The GNU Affero General Public License,
    version 3](https://www.gnu.org/licenses/agpl-3.0.txt)
2. [The Apache License, version
    2.0](https://www.apache.org/licenses/LICENSE-2.0.html)

The Mailpile development code, the Alphas and the Betas have all been
released under *both* of these licenses. This was a legal hack to avoid
having to choose right away, without having to ask contributors to sign
copyright waivers before sharing code with the project.

However, before the 1.0, we need to make a decision and settle upon one
license or the other.

We have decided to let our community decide, and are in the process of
sending out invitations to [our community governance page](/roadmap/).


### Why do licenses matter?

Although a bit boring, licensing is actually very important.

The license is what grants exemptions from the rule of international
copyright law. Without a free and open license, our backers would not be
guaranteed the right to download, use, modify and share the results of
our work - the work they paid for.

The license also helps define the community around the software, and
this is where things get tricky.

Some licenses, especially those championed by our friends at the [Free
Software Foundation](https://www.fsf.org/), are designed to protect the
rights of the end-user and ensure that community efforts remain with the
community. The AGPLv3 is the most modern and powerful such license,
designed for software like Mailpile.

Other licenses (such as the Apache license) are more permissive,
allowing corporations to make use of community code in traditional,
commercial software products. This fosters collaboration and motivates
companies to contribute valuable time and effort, but does so at the
expense of end-user freedom since many users of the software will end up
using proprietary derivitives.


### Permissive licensing: Webkit

An excellent example of permissive licensing, is the Webkit project.

Webkit is based on KHTML, which was published under a relatively
permissive license (the GNU Lesser General Public License). I say
relatively permissive, because although the LGPL allows use within
proprietary products it does require that motifications to KHTML itself
be given back to the community. This balance allowed Apple to create
Safari, a proprietary browser, while forcing them to publish the engine
they derived from KHTML - an engine which we know today as Webkit.

Webkit was then chosen by Google for use in their Chrome project, and
the rest is history: Webkit, daughter of KHTML and Apple, has taken the
lead as the world's fastest and most powerful HTML5 rendering engine. It
is now not only at the heart of both Safari and Chrome, but is used in a
wide range of other smaller browsers and open source projects.

This is a fantastic open source success story, and it's worth
remembering that this would probably never have happened if KHTML had
been licensed using a more permissive license, such as MIT, BSD or
Apache - those license would have allowed Apple to keep their
improvements to themselves.

But there are more lessons to be learned here!

Today Safari and Chrome are both provided free of charge, but they are
proprietary programs and the community does not have access to their
inner workings. Amongst other things, this means **the community cannot
easily inspect or audit** how and when these browsers "phone home" and
share private data with the companies that wrote them.

It can also be argued Webkit's license **perpetuates the status quo**
and unfairly skews the market against truly free software. Compared with
these truly free alternatives, Chrome and Safari will always have a head
start because Google and Apple can keep some of their innovations to
themselves.

Of course the counter-argument is, that without the motivation for big
companies to collaborate, Webkit probably wouldn't exist at all.


### What about Mailpile?

Although there are lessons to be learned, Mailpile is different from
Webkit. Webkit is a technical tool, one building block of many that
developers use when writing a browser. Mailpile on the other hand, is a
stand-alone end-user application, and (when it is finished) Mailpile can
be used directly to provide service online.

Theoretically, a company could use Mailpile's code to build a service
which competes directly with GMail and Hotmail - but if Mailpile's
license does not require they share their changes, the users of these
competing services will be no more free than they were before. There is
also no guarantee that these companies will contribute to the community
version of Mailpile.

On the other hand, many companies (and some individuals) strongly
dislike the AGPL and avoid all software which uses it. These people will
be excluded from our community and will not help us improve Mailpile if
we use that license.

So that becomes the crux of the question.

Do we want to compell companies to share their changes to our code,
which is what the AGPL does, or do we want to take a more trusting
approach and rely on enlightened self interest and good-will - by
releasing under the Apache license?

For some, this is an idealogical question, a matter of *right* or
*wrong*. Is it morally acceptable to allow people to benefit from
Mailpile's work without contributing back? Is it morally acceptable for
Mailpile's authors to tie the hands of other businesses?

For others, this is merely a matter of strategy and tactics. What is
most likely to improve end-user freedom in the long run? What is most
likely to help Mailpile itself develop and thrive? Will chosing a
restrictive license marginalize the project and prevent us from
affecting wide-spread improvements to how people use e-mail? Will a
permissive license make it easier for abusive companies to launch new
webmail services as honey-pots to harvest and collect private e-mail
data?

Those are the questions we need to answer!

If you have an opinion, one way or another, I encourage you to write
blog post explaining your position (or send links you feel are
relevant). If you prefer to publish yourself I'll be happy to link to
your website - or we can publish guest posts here on this blog.

Hopefully a few people will express their opinions and help our
community [vote](/roadmap/) one way or another.

Thanks!
