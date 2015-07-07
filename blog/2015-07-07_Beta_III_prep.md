Subject: Beta III preparations
Author: Bjarni
Date: July 6, 2015
Type: blog

Last week's big news was of course [the licensing
decision](2015-07-02_Licensing_Decision.html) - the vote completed and the
project's license is now officially the [GNU Affero General Public
License](https://www.gnu.org/licenses/agpl-3.0.en.html).

The vote was very close, but the slight majority from the community reflects
both the wishes of the original project founders and matches the political
goals of the project itself.

Thanks again to everyone who voted!

On the technical front, it was a slow week. I spent some time reflecting on the
original road-map and decided to make one major change to the Beta III plans:
the "Fast Startup" milestone will be postponed until later this summer.

The reason for this change is that although the code appears to work, it got
done too late to get reviewed by any 3rd parties. For many other aspects of
Mailpile that would be OK, but our encrypted on-disk storage is a bit different.
It's both difficult and error prone to change storage formats after the fact,
so it is of particular importance to get this done right the first time around.

Delaying Beta III is also not an option, because I need feedback on the
usability of all the new setup interfaces and composer improvements so the
worst problems can be fixed before 1.0.

This decision scuppered most of the technical plans for the week, so instead
I have been tying off loose ends and fixing bugs. The biggest milestone was
probably making it possible to browse remote IMAP servers using the Browse
tool, which paves the way for interactive configuration of import/index
policies when users don't want to rely on Mailpile's auto-detection (or need
to correct the auto-detector's mistakes).

## Plans for this week

1. Add missing configuration dialogues
2. Fix easy buglets, hide features too hard to fix
3. Tag and startg packaging Beta III

