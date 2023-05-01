jQuery(document).ready(function($){

  var posts = [
{
  "author": "Bjarni",
  "date": "2013-08-08",
  "subject": "Mailpile Launched",
  "url": "/blog/2013-08-08_Mailpile_Launched.html"
},
{
  "author": "Brennan",
  "date": "2013-08-11",
  "subject": "Designing Security (video)",
  "url": "/blog/2013-08-11_Designing_Security.html"
},
{
  "author": "Bjarni",
  "date": "2013-08-11",
  "subject": "Our first week (IGG update #1)",
  "url": "/blog/2013-08-11_IndieGoGo_Update_1.html"
},
{
  "author": "Sm\u00e1ri",
  "date": "2013-08-15",
  "subject": "Digging Through the Details",
  "url": "/blog/2013-08-15_Digging_Through_the_Details.html"
},
{
  "author": "Bjarni",
  "date": "2013-08-20",
  "subject": "Turning Money Into Code",
  "url": "/blog/2013-08-20_Turning_Money_Into_Code.html"
},
{
  "author": "Bjarni",
  "date": "2013-08-21",
  "subject": "We are funded! (IGG update #2)",
  "url": "/blog/2013-08-21_IndieGoGo_Update_2.html"
},
{
  "author": "Sm\u00e1ri McCarthy",
  "date": "2013-08-30",
  "subject": "Fonts and Copyright Licenses",
  "url": "/blog/2013-08-30_Fonts_and_Copyright_Licenses.html"
},
{
  "author": "Bjarni",
  "date": "2013-09-05",
  "subject": "PayPal News (IGG Update #3)",
  "url": "/blog/2013-09-05_IndieGoGo_Update_3.html"
},
{
  "author": "Brennan",
  "date": "2013-09-05",
  "subject": "PayPal Freezes Campaign Funds",
  "url": "/blog/2013-09-05_PayPal_Freezes_Campaign_Funds.html"
},
{
  "author": "Bjarni",
  "date": "2013-09-06",
  "subject": "PayPal News (IGG Update #4)",
  "url": "/blog/2013-09-06_IndieGoGo_Update_4.html"
},
{
  "author": "Brennan",
  "date": "2013-09-10",
  "subject": "The Home Stretch (IGG Update #5)",
  "url": "/blog/2013-09-10_IndieGoGo_Update_5.html"
},
{
  "author": "Brennan",
  "date": "2013-09-10",
  "subject": "Surveillance And Centralization (video)",
  "url": "/blog/2013-09-10_Surveillance_Centralization.html"
},
{
  "author": "Bjarni",
  "date": "2013-09-11",
  "subject": "A Rough Budget and Alpha Roadmap",
  "url": "/blog/2013-09-11_Budget_and_Roadmap.html"
},
{
  "author": "Bjarni",
  "date": "2013-09-12",
  "subject": "Thank you! (IGG Update #6)",
  "url": "/blog/2013-09-12_IndieGoGo_Update_6.html"
},
{
  "author": "The Team",
  "date": "2013-10-11",
  "subject": "The Month of Dog Fooding",
  "url": "/blog/2013-10-11_The_Month_of_Dog_Fooding.html"
},
{
  "author": "Sm\u00e1ri",
  "date": "2013-10-31",
  "subject": "DarkMail and Secure Protocols",
  "url": "/blog/2013-10-31_DarkMail_and_Secure_Protocols.html"
},
{
  "author": "Bjarni",
  "date": "2013-11-01",
  "subject": "Perks? What perks? (IGG Update #7)",
  "url": "/blog/2013-11-01_IndieGoGo_Update_7.html"
},
{
  "author": "Sm\u00e1ri",
  "date": "2013-11-18",
  "subject": "Speaking Your Language",
  "url": "/blog/2013-11-18_Speaking_your_language.html"
},
{
  "author": "Bjarni",
  "date": "2013-11-23",
  "subject": "A Pound of Security",
  "url": "/blog/2013-11-23_A_Pound_of_Security.html"
},
{
  "author": "Bjarni",
  "date": "2014-01-12",
  "subject": "A Plan For Spam ... and Bacon!",
  "url": "/blog/2014-01-12_A_Plan_For_Spam.html"
},
{
  "author": "The Team",
  "date": "2014-02-01",
  "subject": "Alpha Release: Shipping Bits and Atoms",
  "url": "/blog/2014-01-31_Alpha_Release_Shipping_Bits_and_Atoms.html"
},
{
  "author": "The Team",
  "date": "2014-02-07",
  "subject": "Development, Perks, and Alpha (IGG Update #8)",
  "url": "/blog/2014-02-07_IndieGoGo_Update_8.html"
},
{
  "author": "Bjarni",
  "date": "2014-04-07",
  "subject": "Mailpile Workshop in London",
  "url": "/blog/2014-04-07_Workshop_in_London.html"
},
{
  "author": "The Team",
  "date": "2014-04-30",
  "subject": "Where is the Community Site?",
  "url": "/blog/2014-04-30_Where_is_the_Community_Site.html"
},
{
  "author": "The Team",
  "date": "2014-07-03",
  "subject": "Mailpile Alpha II - The Dogfood Edition",
  "url": "/blog/2014-06-03_Mailpile_Alpha_II.html"
},
{
  "author": "The Team",
  "date": "2014-08-08",
  "subject": "Our Upcoming Beta Release",
  "url": "/blog/2014-08-08_Our_Upcoming_Beta_Release.html"
},
{
  "author": "The Team",
  "date": "2014-08-20",
  "subject": "Our Upcoming Beta Release: Part II",
  "url": "/blog/2014-08-20_Upcoming_Beta_Release_Part_II.html"
},
{
  "author": "The Team",
  "date": "2014-09-13",
  "subject": "One Year Later: Mailpile Beta",
  "url": "/blog/2014-09-13_Mailpile_Beta_Release.html"
},
{
  "author": "Sm\u00e1ri",
  "date": "2014-10-07",
  "subject": "Some thoughts on working with GnuPG",
  "url": "/blog/2014-10-07_Some_Thoughts_on_GnuPG.html"
},
{
  "author": "Bjarni",
  "date": "2014-11-21",
  "subject": "To PGP/MIME or not to PGP/MIME",
  "url": "/blog/2014-11-21_To_PGP_MIME_Or_Not.html"
},
{
  "author": "The Team",
  "date": "2015-01-20",
  "subject": "Mailpile Beta II - the 4096 bit release",
  "url": "/blog/2015-01-20_Mailpile_Beta_II_4096_bits.html"
},
{
  "author": "Bjarni",
  "date": "2015-02-26",
  "subject": "More thoughts on working with GnuPG",
  "url": "/blog/2015-02-26_Revisiting_the_GnuPG_discussion.html"
},
{
  "author": "Bjarni",
  "date": "2015-03-06",
  "subject": "Beta Rejected!",
  "url": "/blog/2015-03-06_Beta_Rejected.html"
},
{
  "author": "Bjarni",
  "date": "2015-04-13",
  "subject": "Back to Work!",
  "url": "/blog/2015-04-13_Back_to_Work.html"
},
{
  "author": "Bjarni",
  "date": "2015-04-20",
  "subject": "The First OpenPGP E-mail Summit",
  "url": "/blog/2015-04-20_OpenPGP_Email_Summit.html"
},
{
  "author": "Bjarni",
  "date": "2015-04-26",
  "subject": "Last week: Roadmap, Memory Hole, refactoring",
  "url": "/blog/2015-04-26_Weekly_Report.html"
},
{
  "author": "Bjarni",
  "date": "2015-04-27",
  "subject": "A Roadmap to Version 1.0",
  "url": "/blog/2015-04-27_Roadmap_to_v1.html"
},
{
  "author": "Bjarni",
  "date": "2015-05-04",
  "subject": "Last week: code pushed, Cloudfleet, key discovery",
  "url": "/blog/2015-05-04_Weekly_Report.html"
},
{
  "author": "Bjarni",
  "date": "2015-05-08",
  "subject": "Choosing a License for Mailpile 1.0",
  "url": "/blog/2015-05-08_Choosing_a_License.html"
},
{
  "author": "Bjarni",
  "date": "2015-05-11",
  "subject": "Site updates and community roadmap launched",
  "url": "/blog/2015-05-11_Weekly_Report.html"
},
{
  "author": "Bjarni",
  "date": "2015-05-18",
  "subject": "Digging for Data",
  "url": "/blog/2015-05-18_Digging_for_Data.html"
},
{
  "author": "Bjarni",
  "date": "2015-05-25",
  "subject": "An AMA with the Localization Lab",
  "url": "/blog/2015-05-25_Localization_Lab_AMA.html"
},
{
  "author": "Bjarni",
  "date": "2015-06-01",
  "subject": "Roadmap Reality Check",
  "url": "/blog/2015-06-01_Roadmap_Reality_Check.html"
},
{
  "author": "Bjarni",
  "date": "2015-06-08",
  "subject": "Multiple PGP Key Support!",
  "url": "/blog/2015-06-08_Multiple_PGP_Key_Support.html"
},
{
  "author": "Bjarni",
  "date": "2015-06-15",
  "subject": "Licensing: Your Feedback So Far",
  "url": "/blog/2015-06-15_Community_License_Feedback.html"
},
{
  "author": "Bjarni",
  "date": "2015-06-22",
  "subject": "The DCSS Conference in Cardiff",
  "url": "/blog/2015-06-22_DCSS_Cardiff.html"
},
{
  "author": "Bjarni",
  "date": "2015-06-29",
  "subject": "Fast Startup and Key Discovery",
  "url": "/blog/2015-06-29_Fast_Startup_and_Key_Disco.html"
},
{
  "author": "Bjarni",
  "date": "2015-07-02",
  "subject": "License: The Python's Tongue",
  "url": "/blog/2015-07-02_Licensing_Decision.html"
},
{
  "author": "Bjarni",
  "date": "2015-07-07",
  "subject": "Beta III preparations",
  "url": "/blog/2015-07-07_Beta_III_prep.html"
},
{
  "author": "Bjarni",
  "date": "2015-07-20",
  "subject": "Mailpile Beta III: WYSIWYG",
  "url": "/blog/2015-07-20_Mailpile_Beta_III.html"
},
{
  "author": "Bjarni",
  "date": "2015-08-03",
  "subject": "Vacation over; Back to work!",
  "url": "/blog/2015-08-03_Back_to_Work.html"
},
{
  "author": "Bjarni",
  "date": "2015-08-10",
  "subject": "Github Issue Cleanup Frenzy",
  "url": "/blog/2015-08-10_Issue_Cleanup_Frenzy.html"
},
{
  "author": "Bjarni",
  "date": "2015-08-18",
  "subject": "On Crowdfunding and Burnout",
  "url": "/blog/2015-08-18_On_Crowdfunding_and_Burnout.html"
},
{
  "author": "Bjarni",
  "date": "2015-08-24",
  "subject": "Thank you!",
  "url": "/blog/2015-08-24_Thank_You.html"
},
{
  "author": "Bjarni",
  "date": "2015-09-07",
  "subject": "Quiet days; new people",
  "url": "/blog/2015-09-07_Quiet.html"
},
{
  "author": "Bjarni",
  "date": "2015-09-14",
  "subject": "Goals and Releases",
  "url": "/blog/2015-09-14_Goals_and_Releases.html"
},
{
  "author": "Bjarni",
  "date": "2015-09-22",
  "subject": "PyCon UK and Mailpile Mel",
  "url": "/blog/2015-09-22_pyConUK_and_Mailpile_Mel.html"
},
{
  "author": "Bjarni",
  "date": "2015-10-06",
  "subject": "Fall FAQs",
  "url": "/blog/2015-10-06_Fall_FAQ.html"
},
{
  "author": "Bjarni",
  "date": "2015-10-19",
  "subject": "UI Updates, OTF news",
  "url": "/blog/2015-10-19_Major_UI_Updates.html"
},
{
  "author": "Bjarni",
  "date": "2015-12-03",
  "subject": "Why so quiet?",
  "url": "/blog/2015-12-03_Why_so_Quiet.html"
},
{
  "author": "Bjarni",
  "date": "2015-12-24",
  "subject": "Merry Christmas, Hello 32c3!",
  "url": "/blog/2015-12-24_Merry_Christmas.html"
},
{
  "author": "Bjarni",
  "date": "2016-01-01",
  "subject": "Happy Frozen New Year!",
  "url": "/blog/2016-01-01_Happy_Frozen_New_Year.html"
},
{
  "author": "Bjarni",
  "date": "2016-03-16",
  "subject": "Status Update and PyCon SK report",
  "url": "/blog/2016-03-16_PyCon_SK.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2016-03-24",
  "subject": "Python SSL Woes",
  "url": "/blog/2016-03-24_Python_SSL_Woes.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2016-04-18",
  "subject": "Delegate, Automate, Collaborate, Pirate",
  "url": "/blog/2016-04-18_GUI-o-Matic_Automation_GnuPG_Piracy.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2016-09-23",
  "subject": "Rebooting the Mailpile Development Process",
  "url": "/blog/2016-09-23_Rebooting_Mailpile_Development.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2016-10-26",
  "subject": "Search as a Core Feature",
  "url": "/blog/2016-10-26_Search_as_a_Core_Feature.html"
},
{
  "author": "Bjarni",
  "date": "2016-11-23",
  "subject": "Protecting Your Local Data",
  "url": "/blog/2016-11-23_Protecting_Your_Local_Data.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2016-12-12",
  "subject": "Too Cool for PGP",
  "url": "/blog/2016-12-13_Too_Cool_for_PGP.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2017-01-30",
  "subject": "A Plan for 2017",
  "url": "/blog/2017-01-30_A_Plan_for_2017.html"
},
{
  "author": "Bjarni",
  "date": "2017-08-02",
  "subject": "SHA2017, Here We Come!",
  "url": "/blog/2017-08-02_SHA2017_Here_We_Come.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2017-08-13",
  "subject": "Still Hacking Anyway",
  "url": "/blog/2017-08-13_SHA2017.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2017-12-12",
  "subject": "Holiday Season Updates",
  "url": "/blog/2017-12-12_Holiday_Season_Updates.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2018-01-07",
  "subject": "Containing the Spectre",
  "url": "/blog/2018-01-07_Containing_the_Spectre.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2018-01-22",
  "subject": "We are Hiring!",
  "url": "/blog/2018-01-22_We_are_Hiring.html"
},
{
  "author": "Oktav\u00eda",
  "date": "2018-03-29",
  "subject": "Building up Steam",
  "url": "/blog/2018-03-29_Building_up_Steam.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2018-05-03",
  "subject": "Desktop Usability Tests",
  "url": "/blog/2018-05-03_Desktop_Usability_Tests.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2018-05-14",
  "subject": "PGP Security Alert",
  "url": "/blog/2018-05-14_PGP_Security_Alert.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2018-10-27",
  "subject": "Progress Report: events, packages, 1.0",
  "url": "/blog/2018-10-27_Progress_Report.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2019-02-15",
  "subject": "Community Discourse: Launched!",
  "url": "/blog/2019-02-15_Community_Discourse.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2019-04-06",
  "subject": "Burned Out and Happy?",
  "url": "/blog/2019-04-06_Burnout.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2019-08-31",
  "subject": "CCCamp19 and further EFail mitigations",
  "url": "/blog/2019-08-31_CCCamp_EFail.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2022-11-30",
  "subject": "Rebooting Mailpile",
  "url": "/blog/2022-11-30_Rebooting_Mailpile.html"
},
{
  "author": "Bjarni R\u00fanar",
  "date": "2023-05-01",
  "subject": "A Mail Client in Six Steps",
  "url": "/blog/2023-05-01_A_Mail_Client_in_Six_Steps.html"
}];

  var prev = -1;
  var next = -1;
  for (var i = 0; i < posts.length; i++) {
      if (window.location.pathname == posts[i].url) {
          prev = i-1;
          next = i+1;
      }
  }
  if (prev >= 0) {
    $('.prev').html('Previous: <a href="'
                    + posts[prev].url + '">'
                    + posts[prev].subject+'</a>');    
  }
  if (next >= 0 && next < posts.length) {
    $('.next').html('Next: <a href="'
                    + posts[next].url + '">'
                    + posts[next].subject+'</a>');
  }
});