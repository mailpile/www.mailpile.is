jQuery(document).ready(function($){

    // Smooth Scrolling
    $('a.scroll-link[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') || location.hostname === this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
               if (target.length) {
                var link_height = target.offset().top - 108;
                 $('html,body').animate({
                     scrollTop: link_height
                }, 1000);
                return false;
            }
        }
    });

    // Flexnav
    $(".flexnav").flexNav();

    // Hoi Poi community stuff
    hoipoi.init({
        url_db: "/hoipoi/db/",       // Directory of user json
        url_up: "/cgi-bin/mailpile/user-up.py",   // Path to update CGI scr
        url_mv: "/cgi-bin/mailpile/user-mv.py",   // Path to moving CGI scr
        url_mk: "/cgi-bin/mailpile/user-mk.py",   // Path to creating CGI s
        dom_login: "#login-form",        // Selector for login form
        dom_logout: "#logout-form",      // Selector for logout form
        dom_login_error: ".login-error", // Selector for "login failed"
        dom_nickname: ".login-nickname", // Selector for user's name
        cookie_user: "usr",              // Cookie to store user name
        cookie_token: "tok",             // Cookie to store token
        template_vote: "<a class='vote vote-%(vote)s' id='%(id)s' data-issue='%(issue)s' data-value='%(vote)s'><span class='icon-vote-%(vote)s'></span> %(vote)s</a>",
        callback_login_ok: function() {
          $('#roadmap-details').slideDown();
          $('#community-perks').slideDown();
        },
        callback_login_error: function() {
          alert('Unfortunately we could not log you in :( please double check your email');
        },
        callback_logged_out: function() {
          window.location.reload(true);
        },
        callback_ranked_vote_ok: function() {
        },
        callback_ranked_vote_error: function() {
          alert('Oops, could not rank things');
        },
        callback_single_vote_ok: function() {
          //alert('The vote got saved!');
        },
        callback_single_vote_error: function() {
          alert('Oops, could not vote on that');
        }
    });


    $('a.more').on('click', function(e) {

      e.preventDefault();
      var item = $(this).parent();
      var summary = $(this).parent().find('span.summary');
      var link = $(this);

      if (summary.css('display') === 'none') {
        
        summary.css('display', 'block');
        link.html('hide details');

        // Rank
        item.append('<a id="issue-' + item.data('issue') + '-rank" href="#" class="rank"><span class="icon-star"></span> Ranked ' + item.data('rank') + ' by Community</a>');

        // Add Github Link
        if (item.data('comments')) {
          item.append('<a id="issue-' + item.data('issue') + '-comments" href="' + link.attr('href') + '" class="comment" target="_blank"><span class="icon-comment"></span> ' + item.data('comments') + ' Comments on Github</a>');
        } else {
          item.append('<a id="issue-' + item.data('issue') + '-comments" href="' + link.attr('href') + '" class="comment" target="_blank"><span class="icon-comment"></span> Comment on Github</a>');
        }

        // Adjust CSS
        link.css({'top': '3px'});

      } else {

        summary.hide();
        link.html('see details');
        $('#issue-' + item.data('issue') + '-comments').remove();
        $('#issue-' + item.data('issue') + '-rank').remove();
        link.css({'top': '-16px'});
      }

    });

});