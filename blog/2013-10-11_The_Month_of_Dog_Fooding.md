Subject: The Month of Dog Fooding
Author: The Team
Date: October 11, 2013
Type: blog

<img src="/files/dog-fooding-mailpile.jpg">

Hello Internets!

We've been quite silent these past few weeks as we've been ramping up our development. The good news is that we reached our first set of goals for September more or less on time, and now we're rushing through a bunch of the October goals.

<h3>Development Progress</h3>

Specifically, what happened in September was a lot of API design, redesign and rethinking, lots and lots of refactoring. Amongst other things, Bjarni wrote a whole new internal command and plugin architecture and redesigned the metadata index so that it's rigged up for an understanding of social graphs (who communicates with who). 

Meanwhile, Smári worked in a complete replacement of the templating engine so that we're now using <a href="http://jinja.pocoo.org/" target="_blank">Jinja</a>. Smári also well added support to import e-mail from Mac Mail.app mailboxes. 

Brennan made headway on designing a new "actually" free font to solve <a href="http://www.mailpile.is/blog/2013-08-30_Fonts_and_Copyright_Licenses.html">the font problem</a>. Our new font is called "Mailpile" and while it's not fully done yet (we plan to add another weight or two) you can <a href="https://github.com/mailpile/fonts" target="_blank">check it out now</a> and use it in your FOSS projects. Brennan also created dozens of sketches & designs exploring different parts of the interface, as well as of course rewriting all of the templates for the new engine

<div class="clearfix">
  
  <div class="col-5 text-center">
    <a href="/designs/Mailpile_0_2_Slide_Concept.png" target="_blank"><img src="/designs/thumb-Mailpile_0_2_Slide_Concept.jpg"></a>
    <h5>Slide Concept</h5>
  </div>
  
  <div class="col-5 text-center">
    <a href="/designs/Mailpile_sketch_1_Tag_Cards.png" target="_blank"><img src="/designs/thumb-Mailpile_sketch_1_Tag_Cards.jpg"></a>
    <h5>Tag Cards Sketch</h5>
  </div>

  <div class="col-5 text-center">
    <a href="/designs/Mailpile_sketch_1_User_Cards.png" target="_blank"><img src="/designs/thumb-Mailpile_sketch_1_User_Cards.jpg"></a>
    <h5>User Cards Sketch</h5>
  </div>

</div>

Best of all: now it is possible to send email from the web UI after connecting an external SMTP server. And that's only half of it, really.

Doing all of this refactoring meant a lot of things broke that were working before. People who have been testing Mailpile so far are probably seeing how everything is in flux - but don't worry, that's intentional. Until January, nothing is sacred, and we will mercilessly chop things up as needed to get the experience and functionality we desire.

<h3>What, Dog Food?</h3>

Developing software is an interesting art. Getting so many things just right on the boundary between logic, design, psychology and utility can be a nerve wrecking endeavor, and because we're trying to push a lot of boundaries with Mailpile we've sometimes had to make some pretty sweeping decisions that upend everything. This is why "dogfooding" is so important for a project like ours. Dogfooding is the state of being able to "<a href="https://en.wikipedia.org/wiki/Eating_your_own_dog_food" target="_blank">eat your own dog food</a>" - namely, use the software on a daily basis for its intended purpose.

Having reached this goal means that now we'll start to vent our frustrations about things that don't work into code more directly, and we go from a large-scale architectural mode of development to a tighter, more iterative mode.

That said, there are some big things afoot in October and November. This month, we intend to get OpenPGP working, set up a testing environment for the project and be more hard on ourselves about documenting what we're doing. On top of that we're going to flesh out the plugin architecture and the APIs, bake in some internationalization and localization support, and get the contact manager to do a little bit more than just storing names.

We're excited about all of this, and we hope you are too.

 -- Bjarni, Brennan and Smári
