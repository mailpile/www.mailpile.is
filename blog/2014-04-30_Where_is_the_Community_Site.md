Subject: Where is the Community Site?
Author: The Team
Date: April 30, 2014
Type: blog

<img src="/files/No-Community.png">

Us Mailpilers have been feeling a bit guilty of late. We promised to
launch the Mailpile Community over a month ago, and so far we have
failed to do so. We feel you guys deserve an explanation and a status
update.

In short, we underestimated the complexity of the task and overestimated
the maturity of the tools we had planned to use for the site.

We have been evaluating two really interesting Free Software projects,
[Loomio](https://www.loomio.org) and
[Your Priorities](https://www.yrpri.org). The latter is local to
Iceland, the former is from as far away as possible without leaving our
lovely blue planet: New Zealand, which incidentally also happens to be
an island nation with volcanos!  Both projects are doing amazing work
and both software solutions look like they would be excellent tools to
communicate with our community, foster discussion and build consensus.
We know there are a lot of other great tools out there, such as Ad
Hocracy, Agora Voting, Wasa2il, and Liquid Feedback, but none of them
quite fit our requirements as well as those two.

Unfortunately, Loomio and Your Priorities are not quite ready yet. Both
are written in Ruby on Rails and have a heavy slant towards supporting
their own on-line services and their own existing users. As a result,
neither are really ready for third parties to install their software and
just use them without spending a significant amount of time and effort
customizing and tweaking. Our Mailpile development schedule is so tight
we don't really feel we have time for that - in particular because none
of us are Rails developers and getting this done right would mean at
least one of us would have to take time to learn an entire new
programming language and framework.

We would rather be writing Mailpile. That is what most of our backers
want from us anyways, and that is our number one priority.

So we're putting the Community site back on ice for a little longer...

However! If you are a Ruby on Rails developer and you would like to both
help Mailpile and improve the world of Open Source discussion tools, we
do have a pretty good idea of what needs to be done. If you're
interested in helping out, please find us on the #mailpile IRC channel
on Freenode or <a href="mailto:team@mailpile.is">email us</a>. At the end of this post, we go into some of the technical
details about our requirements and where we feel the two projects fall
short at the moment.

In the meantime, we're going to launch something far simpler and less
ambitious soon. We have questions for our community that
need to be answered, and we're not going to let some technicalities get
in the way of us having a conversation. So stay tuned...

## What needs to be done

As mentioned above, we felt we were pretty close to having both Loomio
and Your Priorities working, but both projects fell short in a few
critical ways. To clarify what needs to be done, these are the
characteristics we are looking for:

   1. Clean, easy-to-understand user interface
   2. The ability for community members to make proposals, debate and
      reach a consensus
   3. Read-only access for the general public
   4. Limited account signups (access is restricted to people who donated
      to the project)
   5. Privacy friendly (hosted by us, not leaking data to Facebook,
      Google, etc.)
   6. Easy to administer and upgrade (well documented, stable development)
   7. Easy to customize and brand with our own look and feel

After our evaluation, both Loomio and Your Priorities fulfill the first
two requirements better than anything else we have seen. They both need
varying amounts work on the other points though and although we know
roughly what needs to be done, we lack the skills and time to do them.
If you think you can help, please get in touch!

[UPDATE]
A handful of people have got in touch asking if we have considered <a href="http://www.discourse.org" target="_blank">Discourse</a>. The short answer is, yes, we considered Discourse quite a bit. While the maturity of Discourse was a very attractive reason to use it- the core features were not quite what we were looking for. Specifically, Discourse is focused purely on discussion, it has a beautiful user interface & experience that provides a much needed update to the forums of yesteryear. But, what we need is a platform that helps us bring ideas & features to vote so that we can reach a clear consensus.
