Subject: A Pound of Security
Date: November 23, 2013
Author: Bjarni

<style type='text/css'>
  code { font-family: Terminus,Consolas,Profont,"Andale Mono",Monaco,Inconsolata,Inconsolata-g,Unifont,Lime,"ClearlyU PUA",Clean,"DejaVu Sans Mono","Lucida Console","Bitstream Vera Sans Mono",Freemono,"Liberation Mono",Dina,Anka,Droid Sans Mono,Anonymous Pro,Proggy fonts,Envy Code R,Gamow,Courier,"Courier New",Terminal,monospace; }
  pre { margin: 0 3em 1em 3em; padding: 1px 5px;
        font-size: 0.7em; line-height: 1.15em;
        border: 1px solid #777; background: #222; color: #bbb; }
</style>

The last couple of days we have been working a bit on improving how we
communicate with our community. There are many facets to this, but central to
all of it is our website - which until yesterday was only available as an
unencrypted plain-text HTTP site, which is not the example we should set as a
security-minded software project.

Upgrading to basic SSL was relatively straightforward:

   1. Get a free SSL certificate from [StartSSL](https://startssl.com/).
   2. Install the [Pound](http://www.apsis.ch/pound/) load balancer.
   3. Move our [lighttpd](http://www.lighttpd.net/) server off port
      80 and configure Pound to handle both ports 443 and 80,
      redirecting all insecure HTTP requests to HTTPS.

That was easy enough and that is where many webmasters would call it a day.

But not us... [I solicited feedback from
Twitter](https://twitter.com/MailpileTeam/status/403976756912066560), asking
how to improve the security.  Sure enough, people pointed out that the default
ciphers used by Pound aren't really up to modern security standards. I had
been hoping someone would also send me a link to a simple how-to on how to
harden the Pound SSL configuration, but no such luck; I had to figure it out
myself. Oh well!

After doing a bit of research, I discovered that [fixing the Pound SSL cipher
list requires patching the daemon and
rebuilding](http://www.apsis.ch/pound/pound_list/archive/2012/2012-02/1328105174000).
Once I had patched, recompiled and installed the new Pound, I was able to
configure it with the following sections and restart:

    ListenHTTPS
        Address 0.0.0.0
        Port    443
        Cert    "/etc/pound/mailpile_is.pem"

        # SSL Cipehr settings from here:
        # https://hynek.me/articles/hardening-your-web-servers-ssl-ciphers/

        # Note: Line split for readability, remove linebreaks before use!
        Ciphers "ECDH+AESGCM:DH+AESGCM:ECDH+AES256:DH+AES256:
                 ECDH+AES128:DH+AES:ECDH+3DES:DH+3DES:RSA+AES:
                 RSA+3DES:!ADH:!AECDH:!MD5:!DSS"
        SSLHonorCipherOrder 1

        Service
                BackEnd
                        Address 127.0.0.1
                        Port    12345
                End
        End
    End
    ListenHTTP
        Address 0.0.0.0
        Port    80
        Service
            Redirect "https://www.mailpile.is"
        End
    End

This sufficed to get us [an "A" rating on
SSLLabs.com](https://www.ssllabs.com/ssltest/analyze.html?d=mailpile.is).
Mission accomplished!

But wait, there's more!

Since I prefer to use Debian package manager to keep track of all installed
software, I wrote a script that builds a Debian packages with those patches.
It looks a bit like this:

    #!/bin/bash
    set -e

    # Download Pound and set up debian packaging config
    curl http://www.apsis.ch/pound/Pound-2.6.tgz >pound_2.6.orig.tar.gz
    tar xvfz pound_2.6.orig.tar.gz
    cp -a pound-2.6-debian Pound-2.6/debian

    # Build it!
    cd Pound-2.6
    debuild -us -uc
    cd ..

    # Cleanup
    rm -rf Pound-2.6

The magic is actually in the `pound-2.6-debian` folder, the contents of which
you can [download from here](/files/pound-2.6-debian-builder.tar.gz).

Hopefully these tips will help others secure their own websites. Thanks for
reading!

