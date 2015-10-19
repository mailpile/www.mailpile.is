Subject: UI Updates, OTF news
Author: Bjarni
Date: October 19, 2015
Type: blog

I have good news and I have bad news... let's start with the good news
first.

And screen shots!

<img src="/files/2015-10-Mailpile-Mobile.jpg" border=0>

### The Good: Progress on the Mailpile UI

Sunday a week ago was a big day for the Mailpile github repository.

Finally, after months of work, I published a bunch of improvements to
the Mailpile web interface. Many of the changes were under the hood, but
two visible ones stand out:

1. Most of the full-page reloads have been eliminated
2. The interface now scales down to smart-phone and tablet sizes

Both are still a work in progress (and a bunch of things are [still
broken](https://github.com/mailpile/Mailpile/issues/1429)), but both
represent major steps towards our ultimate goal of providing a fast,
friendly, cross-device user experience.

Note that the new incremental page updates have to be enabled by
hand still; at the **mailpile>** prompt run the following command:

<code>
plugins/load autoajax
</code>

That will enable the "AJAX" UI enhancements, making Mailpile much more
responsive and pleasant to use. To check out the interface scaling, just
resize your browser or look at the screenshots above.

Work continues...


### The Bad: No OTF Money

We did not get the OTF grant.

This was quite upsetting, not because we need the money (which we do),
but because the rejection was justified by an incredibly flawed
interpretation of our application. I am obviously not impartial enough
to accurately judge whether that was our fault for communicating poorly,
or their fault for not reading it carefully enough - but being rejected
based on a misunderstanding is incredibly frustrating.

In any case, rather than complain in public I have shared my concerns
and disappointment with them privately.

The silver lining: Mailpile continues to *not be funded* by the US
government, or any government for that matter. It is [funded by you and
me](/donate/), the community and the stubborn developer who pays for
things out of his own pocket.

Mailpile remains independent.


## Plans for this week

1. Fix Mailpile's message threading algorithms
2. Draft a new message view which handles complex conversations better
3. Carry on fixing [the UI bugs](https://github.com/mailpile/Mailpile/issues/1429)
4. [Wait for baby](2015-10-06_Fall_FAQ.html)

