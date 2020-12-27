*******************************
An Introduction to Web Security
*******************************

.. DANGER::

    Web security is a huge field with far more nuances and details than
    I can cover here. If you are interested in learning more or are
    responsible for making security decisions for a web application, see
    the resources at the end of this guide. **Understanding this guide
    is insufficient experience for doing real security work!**

============
Introduction
============

----------
Motivation
----------

Many of the protocols that underpin our modern internet were created
without modern security concerns in mind. I actually think this was
pretty reasonable at the time. When the `ARPANET
<https://en.wikipedia.org/wiki/ARPANET>`_, the precursor to the modern
internet, was first created in 1969, it looked like this:

.. figure:: ./_static/web_security/G69Dec.jpg
   :scale: 50%
   :alt: The 4 nodes of the original ARPANET at UCSB, UCLA, Stanford,
       and the University of Utah. The nodes are drawn on an outline of
       the United States (the 48 contiguous states).

   From J. Noel Chiappa at MIT, 2014-11-07. Images comes from the
   `"ARPANET Technical Information: Geographic Maps" page
   <http://mercury.lcs.mit.edu/~jnc/tech/arpageo.html>`_

When the only people on the network were four universities, you just
didn't have to worry about as many security problems as you do now, when
less than 30% of the internet looks like this:

.. figure:: ./_static/web_security/internet_2005.png
   :scale: 50%
   :alt: A dense network of multicolored nodes an edges.

   By The Opte Project, 2006. Sourced from Wikimedia at `this page
   <https://commons.wikimedia.org/wiki/File:Internet_map_1024_-_transparent,_inverted.png>`_.

The fundamental insecurities of many web protocols make cybersecurity on
the internet difficult. Still, there are lots of steps we as developers
can take to build more secure applications.

--------
Overview
--------

In this guide, we will cover some common security vulnerabilities that
affect web apps. I've put together a simple web app for you to run
locally that has a secure version and a vulnerable version. We'll
experiment with the vulnerable version to see how these attacks work,
and then we'll see how the secure version fixes the vulnerability.

-----
Goals
-----

By the end of this guide, I hope you will have a high-level
understanding of how the following attacks work:

* Cross-Site Scripting (XSS)
* Cross-Site Request Forgery (CSRF)
* Monkey-in-the-Middle (MitM)
* HTTPS Downgrade
* SQL Injection

I also hope you'll have a high-level understanding of how the following
defensive strategies work and how they prevent various attacks:

* Escaping user input
* CSRF tokens
* HTTP Strict Transport Security (HSTS)
* Authenticating users on every page
* Two-Factor Authentication

Lastly, I hope that by the end you find cybersecurity interesting enough
to go and learn some more on your own! This is a fascinating field, and
there are tons of great resources for learning more. I'll link to some
at the end of the article.

================
Setting Up PwnMe
================

In case you haven't seen it before, "pwn" comes from online gaming
culture where it means to defeat (i.e. to "own") an opponent. In hacker
circles it refers to compromising a target. You can find more
information at `wikitionary <https://en.wiktionary.org/wiki/pwn>`_.

--------
Download
--------

I created a simple web application, PwnMe, that we can use to experiment
with security vulnerabilities. It's a `Flask
<https://flask.palletsprojects.com>`_ app that you can run locally on
your computer. Don't worry, the app is only visible from your computer.
It cannot be accessed by other computers on your network unless you pass
``--host=0.0.0.0`` to the ``flask run`` command we'll discuss below.

.. DANGER:: Please do not run PwnMe as a publicly accessible website. I
   purposely chose to have you run it locally to ensure no one exploited
   its vulnerabilities maliciously. If you expose it publicly, there's
   always a chance that an unsuspecting person will stumble upon it and
   fall victim to its vulnerabilities.

PwnMe is available on GitHub at https://github.com/U8NWXD/pwnme. Clone
the repository to your local computer like this:

.. code-block:: console

    $ git clone https://github.com/U8NWXD/pwnme.git
    $ cd pwnme

--------------------
Install Dependencies
--------------------

Now, let's set up a virtual environment and install the app's
dependencies.

.. note:: You might need to replace ``python`` with ``python3`` in the
   below commands depending on how you installed Python. This app
   requires Python 3.

I like to use Python's ``venv`` module for virtual environment, but
you're selcome to use whatever solution you like. You can even forgo the
virtual environment together and install these requirements globally,
though I don't recommend it since doing this can muck up your system
with unnecessary packages.

.. code-block:: console

    $ python -m venv --prompt pwnme venv
    $ source venv/bin/activate
    $ pip install -r requirements.txt

----------------
Initialize PwnMe
----------------

Configuration
*************

To configure PwnMe, we need to generate a configuration file at
``instance/config.py`` like this:

.. code-block:: console

    $ mkdir instance
    $ python pwnme/generate_config.py > instance/config.py
    $ cat instance/config.py
    SECRET_KEY = "<secret key>"

Instead of ``<secret key>`` you should see 64 hex characters. This is a
256-bit secret key that Flask will use for security operations like
signing cookies and generating CSRF tokens (more on this later).

Initialize Database
*******************

PwnMe stores its data in a SQLite database at ``instance/pwnme.sqlite``.
To initialize this database, run:

.. code-block::

    $ flask init-db
    Initialized the database

---------
Run PwnMe
---------

Now, you can run the web app:

.. code-block::

    $ source environment
    $ flask run
      * Serving Flask app "pwnme" (lazy loading)
      * Environment: development
      * Debug mode: on
      * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
      * Restarting with stat
      * Debugger is active!
      * Debugger PIN: <pin>

Don't worry about the value of ``<pin>``; we won't use it.

---------------
PwnMe Structure
---------------

When you first launch PwnMe and go to http://127.0.0.1:5000, you'll get
a page with links to two versions of PwnMe: a safe version and a
vulnerable version. The vulnerable one is susceptible to many of the
attacks we'll discuss, while the safe one has been hardened against
them.

=================================
A Note on Responsible Bug Hunting
=================================

Many of the vulnerabilities in this guide are commonly found in
production today. Many companies run bug bounty programs to encourage
people to responsibly disclose these bugs so they can be fixed. If you
choose to participate in these programs, **you must closely adhere to
responsible disclosure policies.** For example, take a look at
`hackerone's policy <https://www.hackerone.com/disclosure-guidelines>`_.
I even have `one for my own website
<https://u8nwxd.github.io/security/vdp/>`_.

These policies are important because by default, testing for
vulnerabilities in websites is usually a federal crime under the
`Computer Fraud and Abuse Act (CFAA)
<https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act>`_. Most
vulnerability disclosure policies include safe harbor provisions that
promise not to press charges against you so long as you follow the
policy.

.. note:: I'm not a lawyer, and these policies can be pretty
   complicated. If you decide to start looking for vulnerabilities in
   real websites, you should carefully consult the site's policies and
   bring any questions to a qualified lawyer.

For this guide, we're going to be avoiding these issues by testing our
exploits on our own web app that's running locally on our computers.

===============================================
Common Web Vulnerabilites and Their Mitigations
===============================================

.. DANGER:: **Never** look for vulnerabilities in websites without
   permission. Doing so may be a federal crime and carry both civil and
   criminal charges under the `Computer Fraud and Abuse Act (CFAA)
   <https://en.wikipedia.org/wiki/Computer_Fraud_and_Abuse_Act>`_. It's
   frequently a felony!

--------------------------
Cross-Site Scripting (XSS)
--------------------------

`Cross-site scripting
<https://en.wikipedia.org/wiki/Cross-site_scripting>`_ was originally
used by Microsoft engineers to describe an attack where a malicious
website loaded a target app and got it to execute malicious JavaScript.
However, it has now come to refer to many other kinds of code injection,
which makes the name pretty confusing. XSS is when an attacker injects
client-side code into a web page and gets that code to run in another
users's browser when they visit the page.

.. note::
   If you aren't familiar with the idea of client-side code, here's a
   quick overview. In the web, code can run in two different places: on
   the server (server-side) or on the machine of the client accessing
   the server (client-side). For example, when you send an email, the
   email is transmitted to your recipient by server-side code, but the
   layout of the message box you are typing into is defined by
   client-side code. This distinction is important. For example, if your
   server has secret keys that no user should know, you'd better not put
   them in client-side code! Similarly, any good password manager will
   encrypt a user's passwords client-side so that the server never has
   access to them. PHP and Python are server-side languages, while HTML
   and JavaScript generally run client-side. (Node can use server-side
   JavaScript.)


The Vulnerability
*****************

Let's try out XSS on PwnMe. Launch PwnMe with ``flask run`` and navigate
to http://127.0.0.1:5000. Then load the vulnerable site and click on the
``Who Am I`` link in the navigation bar. If you type your name into the
box, the app says hello to you!

Use your browser's developer tools to take a look at the page's HTML.
You can generally access these by right-clicking on the page. Find where
your name is being shown. You should see code like this:

.. code-block:: html

    <section class="content">
      <header>

      <h1>Hello</h1>

      </header>



      <!--The |safe filter disables autoescaping, allowing reflected XSS-->
      <h1>Hello, YOUR_NAME!</h1>


    </section>

Take a moment to think about how this program works. It takes in your
name and puts that into an HTML template. How might this be vulnerable
to XSS? Don't scroll down until you've thought about it!

-----------------------------------------------------------------------

There are lots of possible attacks here, but I'm going to just show you
one to give you a sense for what's possible. Try pasting
``<script>alert('You have been hacked!');</script>`` into the field for
your name. When you submit the form, an alert pops up! Here we just made
an alert pop up, but client-side JavaScript can do a lot. For example,
you might be able to impersonate the user and submit commands to the
server. If the user has a lot of permissions on the server, you could do
a lot of damage.

Notice that the name you submit ends up in the URL. This means you could
send someone an email with a link that includes your malicious code.
If they open it in a browser where they're signed in, your code has free
reign to mess with their account.

The Fix
*******

Now, switch to the safe version of PwnMe and try again. Instead of an
alert popping up, you should see ``Hello, <script>alert('You have been
hacked!');</script>!`` displayed as the name. It's definitely still
weird, but now your injected JavaScript is being displayed as text
instead of being executed.

Let's take a look at the code to understand how the safe version
prevents XSS. PwnMe uses `Jinja2 <https://jinja2docs.readthedocs.io/>`_
HTML templates, which can be configured with parameters from our Python
code. If you compare at the HTML templates
``pwnme/templates/hello_vuln.html`` and
``pwnme/templates/hello_safe.html`` you'll notice that the vulnerable
template has an extra ``|safe``:

.. code-block:: html

    <h1>Hello, {{ name|safe }}!</h1>

The ``|safe`` disables escaping. Flask configures Jinja2 with automatic
escaping turned on by default, but ``|safe`` overrides that. Jinja2 is
nice in that it handles escaping automatically, but we could do it
with another tool too.

.. important:: In any web application, make sure that any untrusted
   content is properly escaped before being sent to users. Untrusted
   content includes user-provided content, but it may also include
   third-party content you aren't sure is safe.

You may be tempted to try doing the escaping yourself. Just don't. These
security operations are difficult to get right, and you're better off
using code that's already been reviewed by experts.

.. important:: **Never** try and implement security code on your own.
   Security primitives like escaping content, hashing passwords, and
   encrypting data are available as reputable packages or built-in
   functions for nearly all modern programming languages. Use them!
   They're much more likely to get all the tricky details right than we
   are.

Even with this fix, are there still ways an attacker could abuse this
site? Here's one way: what if an attacker set the ``name`` parameter to
``Valued Customer. Your account has been hacked! Call (555) 555-5555 for
immediate assistance``? In a sense this is an injection attack, only
instead of code we're injecting a statement the legitimate website
doesn't actually want to make. There aren't really blanket mitigations
for this kind of attack except making very clear in your UI what is
user-provided and what is not.

---------------------------------
Cross-Site Request Forgery (CSRF)
---------------------------------

CSRF attacks exploit the fact that web operations are mostly stateless.
When you go to a web form, you use a GET request to see the form. Then
when you submit the form, a POST request sends the contents of your
form to the server. Like all HTTP requests, these operations are
independent. You could have submitted the POST request directly from
your terminal. The only reason for the form in the web page is as a
user-friendly tool to create the POST request.

Take a few moments to think about how this could be abused. When you
have some thoughts, scroll down to see how an exploit can take advantage
of this independence of HTTP requests.

-----------------------------------------------------------------------

Imagine you're logged into your bank account in one tab, but you're
browsing the web in another tab. If you open up a malicious site, say
evil.example.com, you should be fine since evil.example.com can't access
the data on your bank web pages. However, what if evil.example.com
tricked you into submitting a form that sent a POST request to your
bank. Since you're logged in already, that POST request looks exactly
the same as the one that would come from the form on your bank's
website. You might have thought you were asking to see 100 cat photos
from evil.example.com, but the form actually transferred 100 dollars
from your bank account!

The Vulnerability
*****************

Even more insidiously, forms can be invisible
and submit automatically. Take a look at ``malicious/csrf_vuln.html``:

.. code-block:: html

	<body onload="document.forms[0].submit()">
	  <form action="http://127.0.0.1:5000/vuln/withdraw/" method="POST">
		<input type="hidden" name="amount" value="100">
	  </form>
	</body>

This form submits automatically and withdraws 100 dollars from your bank
account at PwnMe. Let's see this in action.

Navigate to the vulnerable PwnMe site and register for an account. Log
in, and check your balance. You should have 0 dollars. Now go to
withdraw money and withdraw -100 dollars. Now you have 100 dollars.

.. note:: Obviously you shouldn't be able to withdraw negative amounts
   of money, but this works for what we need. If you're interested in
   cool exploits when user input isn't properly validated, check out
   buffer overflow and numeric overflow attacks.

Now, let's pretend you click on a link in an email that sends you to a
website with ``malicious/csrf_vuln.html``. To simulate this, open
``malicious/csrf_vuln.html`` in the same browser where you're logged in
to PwnMe. If you check your balance again, you should see that your
money has disappeared!

The Fix
*******

To fix this vulnerability, we need a way to tell whether a POST request
comes from our website or another site. The standard way to do this is
with CSRF tokens. These tokens are essentially unguessable passwords
given to a web form and passed along when the user submits the form.
Since a malicious site doesn't have these passwords, it can't submit a
valid request to drain your bank account.

CSRF tokens are a pretty simple idea, so you might be tempted to
implement them yourself. **Don't.** There are other reputable projects
that implement CSRF more reliably than we can. The Google Cloud
Platform's `flask-talisman
<https://github.com/GoogleCloudPlatform/flask-talisman>`_ project
recommends `Flask-SeaSurf
<https://flask-seasurf.readthedocs.io/en/latest/>`_. Flask-SeaSurf
operates on an entire app, so to only apply CSRF protection to the safe
version of PwnMe, I used `Flask-WTF
<https://flask-wtf.readthedocs.io/en/stable/>`_ instead.

Switch to the safe version of PwnMe. If you go the withdraw funds page
and inspect the HTML, you'll see a form like this:

.. code-block:: html

    <form method="post">
        <input id="csrf_token" name="csrf_token" type="hidden" value="IjE1YjM2NTQwZTIzZTM1MjI1ZDBkM2ZjZWU3M2MyZTYyNmQyYjBhMWQi.X-gT3g.EPXLTXLzO4CBozBRsJx0rOykafY">
        <label for="amount">Amount</label> <input id="amount" name="amount" required="" type="text" value="">
        <input type="submit" value="Withdraw Funds">
    </form>

Notice the CSRF token. Now let's simulate navigating to a site that
attempts a CSRF attack against the safe version by loading
``malicious/csrf_safe.html``. Now you see a CSRF validation error, and
your money is safe!

.. important:: Every authenticated endpoint on your site that changes
   state should be a POST endpoint and implement CSRF protections.

---------------------------
Monkey-in-the-Middle (MitM)
---------------------------

A `monkey-in-the-middle attack
<https://en.wikipedia.org/wiki/Man-in-the-middle_attack>`_ is where a
malicious server sits between the legitimate server and the user. You
can imagine it like this:

.. code-block:: plain

    +------+         +----------+         +--------+
    | User | <-----> | Attacker | <-----> | Server |
    +------+         +----------+         +--------+

The attacker impersonates the user when talking to the server, and they
impersonate the server when talking to the user. This lets them fully
control the conversation. For example, they could alter the server's
response to the user to give the user bad information, or they could
manipulate a user's request to cause the server to send money to the
attacker's account instead of the user's.

The Vulnerability
*****************

Actually, both the safe and vulnerable versions of PwnMe are susceptible
to MitM attacks because we've been working with them over insecure
connections. Notice how the URLs start with ``http://`` instead of
``https://``. That means we aren't using TLS, a security protocol that
encrypts web traffic and authenticates the server to the user.

The Fix
*******

To prevent MitM attacks, we need to secure those connections with TLS.
This is handled at the level of the web server, not the web app, so we
won't demonstrate it here. However, we can still discuss how it works.

When you visit a TLS-secured website, the website presents a
cryptographically signed certificate that proves the site contains a
secret key. It also contains a signature from a certificate authority
(CA) that. This signature certifies that the CA has confirmed that the
controller of the secret key is also the proper owner of some domain.
Your browser comes with a list of CAs it trusts. These are called root
CAs, and they have to follow strict regulations and undergo regular
audits.

As an example of how seriously browsers take violations by root CAs,
let's consider Symantec. Symantec was one of the largest and oldest
certificate authorities, but a number of instances were discovered from
2013 to 2017 where Symantec issued certificates improperly. As a result,
`Google
<https://security.googleblog.com/2018/03/distrust-of-symantec-pki-immediate.html>`_,
`Apple <https://support.apple.com/en-us/HT208860>`_, and `Mozilla
<https://blog.mozilla.org/security/2018/03/12/distrust-symantec-tls-certificates/>`_
all stopped trusting certificates issued by Symantec. This was
disruptive for server operators, who had to get new certificates, and
for Symantec, who had a lot of unhappy customers. Browsers don't mess
around with violations by CAs!

Since the CA ecosystem is so tightly secured, it's very hard to get a
fraudulant certificate. This means that if your website uses TLS, an
attacker won't be able to impersonate you, preventing a MitM attack.

At one point, many websites didn't use TLS because it was too expensive
to get certificates. Now, you can use `Let's Encrypt
<https://letsencrypt.org/>`_, a free service that gives out TLS
certificates that are trusted by all major browsers. They verify website
ownership just like other CAs, so they're still secure.

.. important:: Every website should use TLS for everything. No
   exceptions.

.. note:: You might notice that for some sites, particularly banking
   websites, the name of the website's company appears next to the lock
   icon in your browser. This signifies that the website is providing an
   Extended Validation (EV) certificate. While normal certificates just
   confirm that the holder owns the website's domain, EV certificates
   prove which legal entity controls the certificate and that the legal
   entity is the proper owner of a website.

--------------
HTTP Downgrade
--------------

The Vulnerability
*****************

Unfortunately, not all websites use TLS, so browsers have to allow
unsecured HTTP connections. Similarly, not all browsers support TLS, so
websites usually allow unsecured connections too. This means that a MitM
attacker can bypass the protections of TLS by tricking the user into
thinking the server is HTTP-only and tricking the server into thinking
the user doesn't support TLS. This is an `HTTP Downgrade attack
<https://en.wikipedia.org/wiki/Downgrade_attack>`_.

The Fix
*******

HTTP Public Key Pinning (HPKP)
==============================

A now-discouraged solution to HTTP downgrade attacks was `HTTP Public
Key Pinning (HPKP)
<https://developer.mozilla.org/en-US/docs/Web/HTTP/Public_Key_Pinning>`_.
This involved setting a header with the server's response that specified
the public key of one of the certificates verifying the website's
identity. The browser would then only allow TLS connections with the
website, and it would only allow TLS connections with that particular
certificate.

This meant that if a rogue certificate authority issued a certificate
for your website, that certificate wouldn't be accepted because it would
have the wrong public key.

HPKP has now been deprecated because it was very easy for websites to
pin the wrong certificate, permanently blocking browsers from connecting
to them. This also meant an attacker who managed to set headers on your
requests could do the same. Some legacy browsers support it still, but
you shouldn't use it.

.. important:: Don't use HPKP.

Instead, browsers have adopted `Certificate Transparency
<https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency>`_,
which provides additional oversight for the certificates issued by CAs
to detect bad behavior. I won't go into it much here, but it's a very
cool protocol. I encourage you to check it out!

HTTP Strict Transport Security (HSTS)
=====================================

`HSTS
<https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security>`_
is a somewhat softer version of HPKP that is recommended for use today.
It is a header you send with your requests that tells browsers they
should only ever contact you over TLS. From then on, the browser will
refuse to connect over plain HTTP, preventing downgrade attacks.

You can even set a ``preload`` option in your HSTS header that will get
your site included in a list shipped with major browsers. Then users
don't have to visit you at all to know that they should only connect
with you over TLS.

.. important:: Use HSTS to prevent downgrade attacks.

-------------
SQL Injection
-------------

SQL injection is similar to XSS in that it relies on getting a computer
to execute what's supposed to be just data as code. Instead of executing
JavaScript, SQL injection uses SQL commands.

The Vulnerability
*****************

Let's try this out on the vulnerable version of PwnMe. Log in and go to
the ``Lookup`` page. This page lets you look up a user's ID from their
username. For a bank, this might be how you look up someone's account
number to send them money. Since we store user data in a database, we
must be executing some kind of SQL command to look up the user ID. Maybe
it's something like this:

.. code-block:: sql

    SELECT * FROM user WHERE username = "user_input";

How might we exploit this? Scroll down after you've thought about it a
little.

-----------------------------------------------------------------------

What if you provided ``robert"; DROP TABLE user;--`` as the username?
Then the command would become:

.. code-block:: sql

    SELECT * FROM user WHERE username = "robert"; DROP TABLE user;--";

This command is valid because ``--`` makes the last quote a comment.
First we'll look up a user ID, but then we'll delete the entire
``user`` table!

.. figure:: _static/web_security/exploits_of_a_mom.png
   :scale: 100%
   :alt: A comic strip of a parent on the phone with a school. The
       school asks whether the parent's son is really named "Robert');
       DROP TABLE Students;--", and the parent says yes, they call him
       "Little Bobby Tables". The school says the student records have
       been lost, and the parent reminds them to sanitize database
       inputs.

   This is an `XKCD comic titled "Exploits of a Mom"
   <https://xkcd.com/327/>`_ available under a `CC-BY-NC 2.5
   <http://creativecommons.org/licenses/by-nc/2.5/>`_ license.
   Importantly, this means that this comic is not licensed for
   commercial use.

If we look at the code in ``pwnme/vuln.py``, we see two problems:

.. code-block:: python

    user = db.executescript(
        f'SELECT * FROM user WHERE username = "{username}"'
    ).fetchone()

First, we used ``db.executescript``, which allows for multiple
commands separated by semicolons. This is unnecessary for this lookup
function. Second, we put the user-provided username directly into the
SQL command with no filtering or escaping.

The Fix
*******

Instead, we should have used code like in ``pwnme/safe.py``:

.. code-block:: python

    user = db.execute(
        'SELECT * FROM user WHERE username = ?', (username,)
    ).fetchone()

Here we use ``db.execute()``, so only one command can run. More
importantly, though, we let the ``execute()`` function handle putting
the username into the command. This lets the ``sqlite3`` library do
proper escaping. This is called parameterizing commands.

Go ahead and try this exploit on the safe version of the site. It should
behave as if no user was found because your input was properly escaped.

.. important:: Never put untrusted data into a SQL command without
   proper escaping. As a general practice, you should parameterize all
   your SQL commands to let robust libraries handle this for you.

=============================
Useful Web Security Practices
=============================

--------------------------------------
Authenticating Users at Every Endpoint
--------------------------------------

In PwnMe, you'll see a ``Secret Message`` option when you log in. If you
click it, you'll be able to view a top secret note. Now, copy the URL of
the note and try to load it when you're signed out. In the vulnerable
site, this still works! What we should happen, and what does happen on
the safe site, is that you get directed to the login page instead.

If you look in the code at ``pwnme/safe.py`` you'll see that the
``hidden()`` function is decorated by ``@login_required``. This
decorator is missing in ``pwnme/vuln.py``.

.. important:: Just hiding the link won't stop hackers. You need to
   actively check that user's are authenticated at *every* secured
   endpoint.

-------------------------------
Two-Factor Authentication (2FA)
-------------------------------

You're probably all familiar with two-factor authentication. While it is
really more of an authentication technique, which we haven't discusssed
much here, I wanted to highlight it since it's so useful.

2FA, which marketing teams the world over have alternately named
two-step verification, security codes, verification codes, two-step
authentication, and more, deals with a simple problem: passwords suck.
Users can't remember very strong ones. When websites force users to have
strong ones, they tend to write them down on sticky notes at their
desks that then get `picked up by camera crews
<https://www.independent.co.uk/life-style/gadgets-and-tech/news/tv5monde-hack-staff-accidentally-show-passwords-report-about-huge-cyber-attack-10168475.html>`_.

2FA mitigates many of these problems by checking that you control some
physical object to let you sign in. This could be your phone (e.g. an
SMS code, Duo, or the TOTP protocol), a physical key that generates
numbers (banks seem to like these), or a security key (e.g. FIDO2).
These are much harder and riskier for hackers to steal since they're
physically near you.

Here are some common 2FA methods:

* Transmitted Codes: Numeric codes are often sent over SMS or email.
  These are among the least secure kinds of 2FA because SMS and email
  accounts can be compromised remotely (and sometimes easily). For
  example `SIM swap scams
  <https://en.wikipedia.org/wiki/SIM_swap_scam>`_ can let hackers steal
  your phone number and get your SMS 2FA codes. One exception to this is
  Apple's 2FA with trusted devices, which sends codes to trusted
  devices.
* Codes Generated from Pre-Shared Key: Numeric codes are generated from
  a secret key that the server gave you when you first set up 2FA. You
  probably scanned a QR code that contained the key. From then on, your
  device and the server can both generate the same code, which the
  server uses to check that you have your device. Sometimes this code
  changes based on the time (`TOTP
  <https://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm>`_),
  and other times it changes based on how many times you've asked for
  codes before (`HOTP
  <https://en.wikipedia.org/wiki/HMAC-based_One-time_Password_Algorithm>`_).
  Since the secret key is securely stored on your device, it's very
  difficult to steal remotely. This scheme is also quite easy to
  implement on your own because of many open-source implementations and
  no need for a separate communications channel like SMS.
* Notifications to Trusted Devices: Duo and Google Prompts fall into
  this category. When you sign in, the server sends a notification to an
  app on your phone that then prompts you to allow or reject the
  request. This is harder to implement than TOTP or HOTP because you
  have to build the notification infrastructure, but it similarly
  benefits from the difficulty in stealing trusted devices.
* Security Keys: These are the most secure forms of 2FA I've seen. A
  security key is usually a USB device you plug into your computer to
  authenticate. That key generates an authentication token that is only
  valid for the site you're visiting and for that sign-in attempt. This
  makes it the only method here that prevents phishing.

Phishing
========

Phishing is where an attacker gets a user to visit a malicious site that
looks like a trusted site. For example, it might mimic PwnMe's login
page. When the user attempts to sign in, they are inadvertantly giving
their credentials to the attacker. Any numeric codes from 2FA can also
be phished and quickly used to sign the attacker in before they expire
(usually in 30 seconds or so). Even notification-based 2FA can be
phished because if the attacker triggers a log-in attempt on the
legitimate site immediately after the user puts their credentials into
the phishing site, the user will probably approve it thinking they're on
the legitimate site.

Security keys, and particularly the `FIDO2 protocols
<https://fidoalliance.org/specifications/>`_, prevent phishing by tying
authentication tokens to the pages at which they are generated.  Even if
the user puts in their security key at the phishing site, the generated
token is only valid at the phishing site. It won't work at the
legitimate site, so the attaker can't log in. Google uses security keys
exclusively for their `Advanced Protection Program
<https://landing.google.com/advancedprotection/>`_, and it found that
when it gave security keys to its employees in 2017, it `completely
eliminated employee account takeovers
<https://krebsonsecurity.com/2018/07/google-security-keys-neutralized-employee-phishing/>`_.

Password managers also provide a powerful defense against phishing since
they usually check what website you're on before auto-filling your
password. This requires that users be disciplined about not copy-pasting
passwords into sites when their password manager won't auto-fill.

----------------
Security Headers
----------------

There are lots of other security headers you can add, some of which are
demonstrated by ``add_response_headers()`` in ``pwnme/safe.py``. Flask
provides a `handy list
<https://flask.palletsprojects.com/en/1.1.x/security/>`_ of security
changes, including headers, you can make to your Flask app.

=========
Resources
=========

For learning web security:

* Stanford's `CS253 course <https://cs253.stanford.edu>`_
* The `Security section of Google's Web Fundamentals guides
  <https://developers.google.com/web/fundamentals/security>`_
* Mozilla's `Web Security Guidelines
  <https://infosec.mozilla.org/guidelines/web_security>`_
* The `Security Considerations section
  <https://flask.palletsprojects.com/en/1.1.x/security/>`_ of Flask's
  documentation
* `Hacker101 <https://www.hacker101.com/>`_

For learning cybersecurity more broadly:

* Fedora's `Defensive Coding Guide
  <https://redhat-crypto.gitlab.io/defensive-coding-guide>`_

Reference material for secure coding:

* The `Open Web Application Security Project (OWASP)
  <https://owasp.org>`_, particularly their `reference guide
  <https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf>`_
  and `Security Knowledge Framework
  <https://owasp.org/www-project-security-knowledge-framework/>`_

NIST also has a `list of free and low-cost cybersecurity lessons
<https://www.nist.gov/itl/applied-cybersecurity/nice/resources/online-learning-content>`_
that you may find helpful.

=========================
Licensing and Attribution
=========================

Copyright (c) 2020 `U8N WXD <https://u8nwxd.github.io>`_

|license|

.. |license| image:: https://i.creativecommons.org/l/by/4.0/88x31.png
   :target: http://creativecommons.org/licenses/by/4.0/

This work, including both this document and the source code in the associated
GitHub repository, is licensed under a `Creative Commons Attribution 4.0
International License <https://creativecommons.org/licenses/by/4.0/>`_.

This work was initially created for a workshop at
`Stanford Code the Change <http://www.codethechange.stanford.edu>`_.
