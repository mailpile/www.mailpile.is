jQuery(document).ready(function($){

    // Smooth Scrolling
    $('a.scroll-link[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
            || location.hostname == this.hostname) {
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
        dom_login: ".login-form",        // Selector for login form
        dom_logout: ".logout-form",      // Selector for logout form
        dom_login_error: ".login-error", // Selector for "login failed"
        dom_nickname: ".login-nickname", // Selector for user's name
        cookie_user: "usr",              // Cookie to store user name
        cookie_token: "tok",             // Cookie to store token
        callback_login_ok: function() {
          alert('Login OK');
        },
        callback_login_error: function() {
          alert('Login error :(');
        },
        callback_logged_out: function() {
          alert('You have been logged out. Good riddance');
        },
        callback_ranked_vote_ok: function() {
          alert('Stuff got ranked!');
        },
        callback_ranked_vote_error: function() {
          alert('Oops, could not rank things');
        },
        callback_single_vote_ok: function() {
          alert('The vote got saved!');
        },
        callback_single_vote_error: function() {
          alert('Oops, could not vote on things');
        }
    });

});