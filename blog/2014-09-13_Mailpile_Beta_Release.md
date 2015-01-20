Subject: One Year Later: Mailpile Beta
Author: The Team
Date: September 13, 2014
Type: blog

<img src="/files/Beta-Time-Icons.png" border="0">

It's been almost exactly a year since our crowdfunding campaign ended and we realized that building Mailpile really would become our full time job. We are very grateful to be given this chance and have been working hard ever since.

It's been a busy year, with ups and downs, highs and lows, stickers and t-shirts and hackathons and conferences. If you've been following Mailpile's development over the past year, you'll have seen the codebase mature from a rough prototype into a usable app, the protocol support grow and expand, and the UI mature by leaps and bounds. You'll also have seen blog posts about delays and long stretches of silence as we doubled down and immersed ourselves in hard work.

Since we started development last fall, we've released two Alpha versions. The first one was a very rough technology preview focusing on the basic capabilities - our built in webserver, the core Mailpile commands, a REST API, the search engine, and basic support for sending and reading encrypted email. We released an updated Alpha II this summer, which featured advanced UI, support for mail sources, and more.

Now, it's time for our Beta release!

### What's in a Beta?

We believe in the old-fashioned kind of beta-release - a release that has most of the features of a 1.0, but may lack polish and maturity. Polish and maturity can only come from exposure to a wider range of users than the core team of developers and our friends. So although we are a little bashful about how many bugs remain and how many exciting features didn't make the cut-off, we feel it is time to share our work with a wider audience.

So please give it a try and let us know how it works. But please understand that this is still not a finished product.

Our [Release Notes](https://github.com/pagekite/Mailpile/wiki/Release-Notes-201409-Beta) cover some of the technicalities, as does our [Security Roadmap](https://github.com/pagekite/Mailpile/wiki/Security-roadmap). Please read them!  In particular, it's worth taking a look at the list of known issues, so you aren't caught off guard by one of our many known bugs. Taking a look at the known issues list will also help reduce the load on us developers - the fewer people file bugs for stuff we already know about, the less time we have to spend curating our bug tracker and the more time we can spend actually fixing things!

### The good news and...

For those of you too busy to read the full release notes, here is the good news:

<ul class="square">
  <li>Getting started is easy: Mailpile now sports a user-friendly interactive setup flow</li>
  <li>Reading and writing e-mail works, including attachments</li>
  <li>Our searching and tagging engine can handle hundreds of thousands of messages</li>
  <li>The user interface is clean and elegant, and our font now looks great in all browsers & weights</li>
  <li>The spam filter works well (as long as you correct its mistakes now and then)</li>
  <li>Our OpenPGP support is convenient and easy to work with, including searching for & importing keys</li>
  <li>We have packages for Windows and the Mac!</li>
</ul>

Some of the things that still need work:

<ul class="square">
  <li>The user interface has not been optimized, so it can be quite slow now and then</li>
  <li>The user interface needs some improvements to work well on smaller screens</li>
  <li>We need to integrate Tor to better protect our users' privacy</li>
  <li>We wrote code too fast and our translators couldn't really keep up</li>
  <li>There are still lots of bugs that need fixing!</li>
</ul>

### Where can I get it?

The Mailpile beta is released in 4 forms:

<div class="add-bottom">
<h5 class="half-bottom">Online Demo</h5>
View our <a href="https://www.mailpile.is/demos/">online demo here</a>
</div>

<div class="add-bottom">
<h5 class="half-bottom"><img src="/img/os-windows.png" border="0" style="height:24px;"> Windows Installer</h5>
Download via: <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.exe">HTTPS</a> or <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.exe.torrent">Bittorrent</a> (faster)<br>
<em>Checksums: <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.exe.sha1">sha1</a> &nbsp;<a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.exe.md5">md5</a></em>
</div>

<div class="add-bottom">
<h5 class="half-bottom"><img src="/img/os-mac.png" border="0" style="height:24px;"> Mac OS Installer</h5>
Download via: <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.dmg">HTTPS</a> or <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.dmg.torrent">Bittorrent</a> (faster)<br>
<em>Checksums: <a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.dmg.sha1">sha1</a> &nbsp;<a href="https://www.mailpile.is/files/releases/Mailpile-Installer-Beta.dmg.md5">md5</a></em>
</div>

<div class="add-bottom">
<h5 class="half-bottom"><img src="/img/os-linux.png" border="0" style="height:24px;"> Linux</h5>
As a <a href="https://github.com/pagekite/Mailpile/releases" target="_blank">tagged source release on GitHub</a>
</div>

So give it a spin, seed our torrents and let us know what you think. :-)

In the meantime, we're going to get back to work. We still have 3-4 months worth of money in the bank, which should be exactly the right amount to get our 1.0 shipped in time for the New Year. Fingers crossed!

Hugs and ciphers,  
  ~The Mailpile team

P.S. Check out [this Hacker News](https://news.ycombinator.com/item?id=8315086)
post to discuss!
