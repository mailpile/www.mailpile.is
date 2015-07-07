Subject: License: The Python's Tongue
Date: July 2, 2015
Author: Bjarni
Type: blog

It has been an interesting month!

I finally put the team's original plan into action, launching a vote
on our new [roadmap site](/roadmap/), asking our community of backers
to help us choose a single license for the project.

There were discussions on Twitter, [thoughtful blog posts and insightful
e-mails](2015-06-15_Community_License_Feedback.html). And people voted.

Finally, while I was fast asleep my trusty robots disabled the voting
and made a snapshot of the voting database at midnight
California-time, July 1st. I got up the next morning and before making
breakfast I ran a quick *grep* to get a hint of the results. I was not
happy with what I saw.

*Not happy at all...*


## Raw, Cooked and Baked Results

This is what I saw:

* 51.39% in 258 votes for the GNU AGPL v3
* 48.61% in 244 votes for the Apache License 2.0

So we have a winner! Sort of. Barely...

I mulled it over for most of the day and recalculated that evening, this
time weighing each ballot by the USD amount donated by the voter,
excluding the project founders because putting a dollar amount on our
contributions is not trivial math. This balloting method led to Apache
winning by a surprisingly large margin. However, when I dug into the
results, it turns out the difference was down to a single four-figure
backer who voted for Apache.

Reversing the results on the basis of one man's generosity would not
seem right at all... particularly when I had just excluded the
founding team (whose opinions I know quite well) and I know for a fact
that very vocal advocates of the winning license backed us by just as
much but neglected to cast their votes.

So I recalculated a third time, this time using the natural logarithm of
USD amounts. This rewards generosity while recognizing that wealth is
not evenly distributed. This time the AGPLv3 won again, albeit by an
even smaller margin than before: 50.81% vs 49.19%

I gave up.


## The Python's Tongue

On the surface of it, this is the worst possible outcome of our
license elections.

The whole point of the vote was to reach a consensus. Licensing tends to
be very divisive in the Free and Open Source Software community and the
Mailpile Team hoped that by using a transparent, open and fair process
we could reach a conclusion everyone could abide by.

Although these results clearly don't really meet that bar, all we can do
is look for a silver lining.

The fact is, voter participation in this election was quite low. 3041
people in total were eligible for voting, but we only had about 16.5% turnout.
Considering the subject matter (licensing, how dull!), it seems quite
reasonable to assume this means most of our backers just don't care, one
way or another. Even Stallman himself [commented](2015-06-15_Community_License_Feedback.html)
that both licenses were acceptable, although he of course prefers the
AGPL.

With that interpretation, the results look like this:

* 8.5% in 258 votes for the GNU AGPL v3
* 8.0% in 244 votes for the Apache License 2.0
* 83.5% don't care enough to vote or were unaware of the elections

So our community is indeed divided. But it's not divided right down the
middle, it's divided like a python's tongue. Mostly united in just
wanting Mailpile to exist, with an small split at the tip regarding the
license.

That's not too bad!


## Choosing a License

So, what's next?

We could extend the deadline, hope more people vote and a stronger
consensus emerges... but I don't really think that will work. The ratios
haven't really changed much since the first few days of the campaign.
I know, I've been peeking.

Since we really can't live with two licenses forever, a choice has to be
made. I am writing the bulk of the code these days and have no-one but
the community to answer to, so ultimately the decision sits with me.
Without a clear mandate from the election, I am going to have to take
responsibility and make the choice myself. People who don't like it will
know exactly who to blame...

That's a scary thought, but what the heck.

**I choose the GNU Affero General Public License. Version 3.**

That will be the license I apply to all future code I commit to the
Mailpile project and that is the license future contributors to the main
repo will have to agree to as well.

Sorry Apache backers, I really hope we can still be friends! If you're
really bummed you do have the right to fork yesterday's code and carry
on without me. But I would much rather we worked together.


## But... why?

I choose the AGPLv3, because I think it is the right license for this
project.

Not because it won the elections by a tiny margin, although that was of
course a factor. Not because my co-conspirators, Smári and Brennan, both
prefer it, although that also matters. I choose the AGPLv3 because I
think it fits.

Mailpile is a project about freedom. It is not a popularity contest or a
startup, it's not "industry infrastructure", nor does it aim to be.
Mailpile is a political project which aims to improve the privacy and
digital independence of individuals everywhere.

The Apache License is a wonderful thing, an open, generous, pragmatic,
apolitical license. The AGPLv3 on the other hand, is a political and
ethical line in the sand.

And so is Mailpile.
