**********************************
Guide to Python Flask Unit Testing
**********************************

=====================================
Introduction to Unit Testing Concepts
=====================================

---------
Why Test?
---------

Testing is generally a best-practice in software development. Some of its
benefits include:

* **More robust software**: Tests help catch bugs in your product. If you create
  new tests as you discover mistakes, you know you won't make the same mistake
  again.
* **Faster debugging**: If you have lots of small tests covering all of your
  code, you can track down bugs based on which tests are failing. This can
  quickly isolate a problem without putting ``print`` statements everywhere.
* **Automatic documentation**: Good tests can even replace much of your
  documentation. Instead of reading your documentation, someone can read your
  tests and see what kinds of input and output your code expects.
* **Freedom to experiment**: With comprehensive testing, you can be assured that
  a given version of your code works as expected. This lets you add new features
  or experiment with a new implementation of a feature while knowing that your
  project still works overall.

----------------
Kinds of Testing
----------------

There are 3 general classes of testing:

* Unit Testing: Tests small components of the program (units) in isolation. For
  example, you might test each individual function.
* Integration Testing: Tests larger parts of the program that consist of
  multiple *units*. This is a little vague, so it might be most helpful to think
  of as between unit and end-to-end testing.
* End-to-End Testing: Tests that the program as a whole works as expected. For a
  webapp, this might mean programmatically clicking buttons on the site
  to complete a common user task. `Selenium <https://www.seleniumhq.org/>`_ is
  a common tool for this.

For this guide, we will focus on unit testing.

------------
Unit Testing
------------

Unit testing takes a reductionist approach by focusing on the parts of a program
rather than the whole. As a gross generalization, the idea is:

    Break the program into all its little pieces, each of which has well-defined
    behavior. If we are sure that each little piece behaves as expected, then
    when we put the pieces all back together, the program should also behave as
    expected. Therefore, we write tests to verify that each piece--each
    *unit*--of the program behaves correctly.

Of course, this is incredibly optimistic. Bugs can often hide in how parts of
the program interact, and it is quite time-consuming to actually test each part
thoroughly.

This doesn't mean that unit testing isn't *useful* though, just that it's not a
silver bullet. We hope that across all three types of testing, nearly all the
bugs will be caught. Unit testing has benefits besides bug-catching, though. It
is the kind of testing that can replace many of those function-level comments
(e.g. docstrings or javadoc), and it is the kind of testing that can help
isolate bugs. If you make a change that breaks your program, you can check which
unit tests are failing. The code those tests cover is likely where the bug is
hiding.

==============================
Unit Testing with Python Flask
==============================

------------
Python Flask
------------

Python `Flask <http://flask.pocoo.org/docs/1.0/>`_ is a framework that makes it
easy to create web apps with Python. This guide will use a Flask app as an
example and walk you through creating unit tests for it. Even if you don't use
Flask, the unit-testing concepts illustrated are generally applicable.

The app used is a stripped-down version of the
`CultureMesh FFB app <https://github.com/Code-the-Change/culturemeshFFB/>`_
created by Stanford Code the Change. If you have experience working with that
code, it may be helpful to know that the following features remain:

* Home Page: ``/``
* Viewing Post: ``/post/?id=<Post ID Here>``

All other pages may no longer function properly. For example, clicking on the
``About`` link on the home page will yield an error page. The other pages were
removed to simplify this guide and so that we can concentrate on writing unit
tests.

===============
Getting Started
===============

#. Clone this repository by running

   .. code-block:: console

       $ git clone https://github.com/Code-the-Change/flask_tests_workshop.git

#. Install python from https://python.org or via your favorite package manager

#. Install ``virtualenv``

   .. code-block:: console

     $ pip3 install virtualenv

#. If you get a note from ``pip`` about ``virtualenv`` not being in your
   ``PATH``, you need to perform this step. ``PATH`` is a variable accessible
   from any bash terminal you run, and it tells bash where to look for the
   commands you enter. It is a list of directories separated by ``:``. You can
   see yours by running ``echo $PATH``. To run ``virtualenv`` commands, you need
   to add python's packages to your ``PATH`` by editing or creating the file
   ``~/.bash_profile`` on MacOS. To that file add the following lines:

   .. code-block:: console

     PATH="<Path from pip message>:$PATH"
     export PATH

#. Then you can install dependencies into a virtual environment

   .. code-block:: console

     $ cd flask_tests_workshop
     $ virtualenv venv
     $ source venv/bin/activate
     $ pip install -r requirements.txt

#. Make the start script executable

   .. code-block:: console

       chmod 700 run.sh

#. Start the app

   .. code-block:: console

       ./run.sh

   You'll see something like this on the terminal:

   .. code-block:: console

     $ python run.py
      * Restarting with stat
      * Debugger is active!
      * Debugger PIN: XXX-XXX-XXX
      * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)

   You can then head over to your browser and type in
   http://127.0.0.1:8080/ on the address bar. You should now see the home
   page of the app.

   .. note:: By default, the website (even if running locally) really
     communicates with the live CultureMesh API.

#. You can use any editor you like, but this guide will point out some shortcuts
   for `PyCharm <https://www.jetbrains.com/pycharm/>`_ (Community Edition)
   users.

#. The ``master`` branch of this repository stores the starter code you should
   start with and make changes to as you follow along with the guide. Completed
   example code is included in this document. If you would like to see
   "solution" code, switch to the repository's other branches. For example, to
   see the finished version, checkout the ``tests_written`` branch.

   .. code-block:: console

       $ git checkout tests_written

   To see all available branches:

   .. code-block:: console

       $ git branch --all

=============
Writing Tests
=============

------------------
Set-up Directories
------------------

Create the following structure of Python modules:

.. code-block:: plain

    flask_tests_workshop/
        test/
            unit/
                webapp/
                    __init__.py
                __init__.py
            __init__.py

PyCharm will automatically add the ``__init__.py`` files if you create each
module by right-clicking on the parent directory and selecting
``New > Python Package``. Such a deep nesting of directories is unnecessary for
this small example, but it is helpful to separate tests into folders like this
for your own sanity when you have many more tests.

-------------------------
Create ``client`` Fixture
-------------------------

We will use a ``pytest`` feature called "fixtures" to turn our web app into a
Python object we can run tests against. Copy the following code into
``flask_tests_workshop/test/unit/webapp/__init__.py``. This will make ``client``
available to all tests under the ``webapp`` directory. In fact, ``pytest`` will
automatically provide us with an instance of ``client`` for each test.

.. code-block:: python

    import pytest
    from culturemesh import app

    """Initialize the testing environment

    Creates an app for testing that has the configuration flag ``TESTING`` set to
    ``True``.

    """

    # The following function is derived from an example in the Flask documentation
    # found at the following URL: http://flask.pocoo.org/docs/1.0/testing/. The
    # Flask license statement has been included below as attribution.
    #
    # Copyright (c) 2010 by the Pallets team.
    #
    # Some rights reserved.
    #
    # Redistribution and use in source and binary forms of the software as well as
    # documentation, with or without modification, are permitted provided that the
    # following conditions are met:
    #
    #     * Redistributions of source code must retain the above copyright notice,
    #       this list of conditions and the following disclaimer.
    #     * Redistributions in binary form must reproduce the above copyright
    #       notice, this list of conditions and the following disclaimer in the
    #       documentation and/or other materials provided with the distribution.
    #     * Neither the name of the copyright holder nor the names of its
    #       contributors may be used to endorse or promote products derived from
    #       this software without specific prior written permission.
    #
    # THIS SOFTWARE AND DOCUMENTATION IS PROVIDED BY THE COPYRIGHT HOLDERS AND
    # CONTRIBUTORS “AS IS” AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    # LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
    # PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
    # CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
    # EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    # PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
    # BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
    # IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
    # ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE AND DOCUMENTATION, EVEN IF
    # ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


    @pytest.fixture
    def client():
        """Configures the app for testing

        Sets app config variable ``TESTING`` to ``True``

        :return: App for testing
        """

        #app.config['TESTING'] = True
        client = app.test_client()

        yield client

The ``@pytest.fixture`` annotation tells ``pytest`` that the following function
creates (using the ``yield`` command) an app for testing. In this case, the
function doesn't do too much, but it could also configure temporary database
files or set configurations for testing (e.g. the commented-out ``app.config``
line).

----------------------------------
Simple Test: Test the Landing Page
----------------------------------

``pytest`` identifies our tests by searching for files prefixed with ``test``
and functions starting with ``test`` within those files. Therefore, create a
file called ``test_root.py`` in the ``webapp`` directory.

To use the ``client`` fixture we created before, we need to import it. PyCharm
will claim that the import is unused, but ``pytest`` actually needs it. At the
top of the newly created ``test_root.py`` file, add an import statement:

.. code-block:: python

    from test.unit.webapp import client

Test for the Right Landing Page
*******************************

Let's first make sure that we are getting the landing page we expect. First,
create a function named ``test_landing`` that takes a parameter ``client``. The
function declaration should look like ``def test_landing(client):``. The
``client`` parameter will be filled with the fixture we created.

Loading Page into Test
======================

To see the landing page, try pointing a web browser to
http://127.0.0.1:8080/. To load this page in our test, add the following
lines to the function we just created:

.. code-block:: python

    landing = client.get("/")
    html = landing.data.decode()

The first line executes a ``GET`` request against our app at the URL ``/``. This
is equivalent to pointing your browser to http://127.0.0.1:8080/. The app
doesn't care about the base of the URL (the ``http://127.0.0.1:8080`` part), so
the fact that we don't ask for anything more than that is all that matters (and
is expressed as just a ``/``). A ``GET`` request is a type of web request and
the type used when you just go to a website and *get* the contents of the page
to view.

The second line takes the response to that request, gets the data out, and
decodes it from binary back to normal text. This yields the HTML code your
web browser renders into the page you see.

Specifying Expectations for Page
================================

Now we can add tests for what we expect the landing page to include. ``pytest``
uses ``assert`` statements for this. If the statement following the ``assert``
keyword is false, an exception is raised, causing the test to fail. Therefore,
we can add statements like these to test important attributes of the landing
page:

.. code-block:: python

    # Check that links to `about` and `login` pages exist
    assert "<a href=\"/about/\">About</a>" in html
    assert " <a href=\"/home/\">Login</a>" in html

    # Spot check important text
    assert "At CultureMesh, we're building networks to match these " \
           "real-world dynamics and knit the diverse fabrics of our world " \
           "together." in html
    assert "1. Join a network you belong to." in html

We can also check that the request was successful (indicated by a response code
of 200):

.. code-block:: python

    assert landing.status_code == 200

Test for Landing Page Aliases
*****************************

In this app, the landing page can be accessed either at ``/`` or at ``/index/``.
To confirm that this is working as expected, we can add a test like this:

.. code-block:: python

    def test_landing_aliases(client):
        landing = client.get("/")
        assert client.get("/index/").data == landing.data

Finished Test File
******************

In the end, your ``flask_tests_workshop/test/unit/webapp/test_root.py`` should
look like this:

.. code-block:: python

    from test.unit.webapp import client


    def test_landing(client):
        landing = client.get("/")
        html = landing.data.decode()

        # Check that links to `about` and `login` pages exist
        assert "<a href=\"/about/\">About</a>" in html
        assert " <a href=\"/home/\">Login</a>" in html

        # Spot check important text
        assert "At CultureMesh, we're building networks to match these " \
               "real-world dynamics and knit the diverse fabrics of our world " \
               "together." in html
        assert "1. Join a network you belong to." in html

        assert landing.status_code == 200


    def test_landing_aliases(client):
        landing = client.get("/")
        assert client.get("/index/").data == landing.data

Running Tests
*************

When running the tests, we will need to specify some environment variables that
the app expects to be available. This can be automated using a script
``test.sh`` which will work just like ``run.sh``. Fill ``test.sh`` with the
following code:

.. code-block:: bash

    #!/usr/bin/env bash

    export CULTUREMESH_API_KEY=1234
    export WTF_CSRF_SECRET_KEY=1234
    export CULTUREMESH_API_BASE_ENDPOINT=dummy

    python -m pytest

The variables have dummy values because the app shouldn't actually interact with
the server. All those interactions should be mocked, as we will soon see.

You can execute the tests by executing the ``test.sh`` file

.. code-block:: console

    $ ./test.sh

All tests should pass.

------------------------------------------
More Complicated Test: Test Viewing a Post
------------------------------------------

The landing page was relatively simple to test since it was already an isolated
unit. When viewing a post, on the other hand, the app normally retrieves
information from CultureMesh's servers. In a unit test, we want to isolate
our code from CultureMesh's servers. If something goes wrong, then we'll know
whether it is our code or the servers that are to blame. For this test, create
a ``test_posts.py`` file under the ``webapp`` directory.

Understanding Flask Code
************************

In order to isolate our code from the server, we need to understand what our app
does when we try to view a post. For an example of viewing a post, start the app
and point a web browser to http://127.0.0.1:8080/post/?id=626. When the web
browser sends Flask this request, Flask runs one of the app's functions based on
the URL from the browser and returns to the browser whatever the function
returns. In this case, we can see in
``flask_tests_workshop/culturemesh/__init__.py`` that the lines

.. code-block:: python

    from culturemesh.blueprints.posts.controllers import posts

    app.register_blueprint(posts, url_prefix='/post')

tell Flask that any URLs starting with ``/post`` (excluding the base
``http://127.0.0.1:8080``) should be handled by the
``culturemesh.blueprints.posts.controllers`` module. As the import statement
suggests, this module is defined in
``flask_tests_workshop/culturemesh/blueprints/posts/controllers.py``. At the top
of that file, you should see

.. code-block:: python

    @posts.route("/", methods=['GET'])
    def render_post():

This tells Flask that any URLs with nothing after the ``/post`` prefix (we know
the URL has that prefix since we have already been routed to this file) should
be handled by the ``render_post()`` function (the requests also have to be GET
requests).

In the ``render_post()`` function, a ``Client`` object is instantiated and then
used repeatedly. For example,

.. code-block:: python

    c = Client(mock=False)
    post = c.get_post(current_post_id)

The ``Client`` object is a layer of abstraction that handles all of the app's
interactions with the server. To isolate our code from the server, we need to
somehow replace all the calls to ``Client`` with dummies.

Mocking
*******

The canonical way to handle this problem is by *mocking* the ``Client`` calls.
We will replace the called functions with *mocks* that, instead of contacting
the server, just return hard-coded objects that we expect to receive from the
server in response to the call we expect the mocked function to receive. In our
test, we can test that the mocked function was called with the parameters we
expect. Thus, with a passing test case, we can say

    We know that the mocked function was called correctly, and we know that it
    returned what we would expect the real call to return. The end result of the
    function was as expected, so under the assumption that the mocked function
    works correctly, our function works correctly.

While it might seem strange to assume something works correctly in a test case,
that is what it means to isolate part of the program. When we isolate our code
from the server, we are testing whether, under the assumption that the server
works correctly, our code works correctly. This lets us test *only* our code
and ignore the server.

Python comes with built-in mocking functionality through the ``mock`` library.
``pytest`` integrates with ``mock`` using the ``pytest-mock`` library. These let
us either create our own dummy function or let Python create one for us. We will
use both techniques. To use these features and the fixture from earlier, include
these import statements at the top of the ``test_posts.py`` file:

.. code-block:: python

    from test.unit.webapp import client
    import mock
    from mock import call

Getting Expected Output
=======================

So we know we need to mock all the ``c.`` statements, but first we need to know
what they normally return. If you were writing a new feature you might already
know, but in this case we need to find out. It's clunky, but ``print``
statements are one way to do this. Print out the result of each ``c.`` call in
the ``render_post`` function, for instance like this:

.. code-block:: python

    post = c.get_post(current_post_id)
    print('---------- c.get_post ----------')
    print(c.get_post(current_post_id))
    print('----------')

.. note:: Doing this might seem strange. Of course the tests pass since we set
    the expected output based on the actual output! If you were writing this
    code from scratch, you would know what outputs to expect and this would all
    make more sense. However, in this case, we are dealing with existing code
    that doesn't have tests but that we know works from manually using the app.
    Writing these tests is useful because it automates what would otherwise be
    manual testing. In other words, we know that the app works now, and we want
    to automate the process of making sure it always works.

In the end, your function should look something like this:

.. code-block:: python

    @posts.route("/", methods=['GET'])
    def render_post():

        current_post_id = safe_get_query_arg(request, 'id')

        user_id = current_user.get_id()
        c = Client(mock=False)
        post = c.get_post(current_post_id)
        print('---------- c.get_post ----------')
        print(c.get_post(current_post_id))
        print('----------')

        post['network_title'] = get_network_title(c.get_network(post['id_network']))
        print("---------- c.get_network ----------")
        print(c.get_network(post['id_network']))
        print('----------')
        post['username'] = c.get_user(post["id_user"])["username"]
        print('---------- c.get_user ----------')
        print(c.get_user(post['id_user']))
        print('----------')
        post['time_ago'] = get_time_ago(post['post_date'])

        # NOTE: this will not show more than the latest 100 replies
        replies = c.get_post_replies(post["id"], NUM_REPLIES_TO_SHOW)
        print('---------- replies ----------')
        print(replies)
        print('----------')
        replies = sorted(replies, key=lambda x: int(x['id']))

        error_msg = None

        for reply in replies:
          reply['username'] = c.get_user(reply["id_user"])["username"]
          print('---------- c.get_user(reply) ----------')
          print(c.get_user(reply['id_user']))
          print('----------')
          reply['time_ago'] = get_time_ago(reply['reply_date'])

        new_form = CreatePostReplyForm()

        return render_template(
          'post.html',
          post=post,
          replies=replies,
          num_replies=len(replies),
          curr_user_id=user_id,
          form=new_form,
          error_msg=error_msg
        )

Now, run the server and go to http://127.0.0.1:8080/post/?id=626 again. The post
should appear in the browser, and in your terminal you should see output like
this:

.. code-block:: console

     * Running on http://127.0.0.1:8080/ (Press CTRL+C to quit)
     * Restarting with stat
     * Debugger is active!
     * Debugger PIN: 655-024-032
    ---------- c.get_post ----------
    {'id': 626, 'id_network': 1, 'id_user': 157, 'img_link': None, 'post_class': 'o', 'post_date': 'Sun, 26 Aug 2018 22:31:04 GMT', 'post_original': None, 'post_text': "Hi everyone! I'm hoping to move here soon, but I'd like to get a better sense of the local community. Would anyone be willing to take a few minutes to talk with me about there experiences living here, particularly after leaving home? Thanks!\n", 'vid_link': None}
    ----------
    ---------- c.get_network ----------
    {'city_cur': 'Palo Alto', 'city_origin': None, 'country_cur': 'United States', 'country_origin': 'United States', 'date_added': 'Tue, 12 Jan 2016 05:51:19 GMT', 'id': 1, 'id_city_cur': 332851, 'id_city_origin': None, 'id_country_cur': 47228, 'id_country_origin': 47228, 'id_language_origin': None, 'id_region_cur': 55833, 'id_region_origin': 56020, 'img_link': None, 'language_origin': None, 'network_class': 'rc', 'region_cur': 'California', 'region_origin': 'Michigan', 'twitter_query_level': 'A'}
    ----------
    ---------- c.get_user ----------
    {'about_me': "I'm from Michigan", 'act_code': '764efa883dda1e11db47671c4a3bbd9e', 'company_news': None, 'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None, 'first_name': 'c', 'fp_code': None, 'gender': 'n', 'id': 157, 'img_link': 'https://www.culturemesh.com/user_images/null', 'last_login': '0000-00-00 00:00:00', 'last_name': 's', 'network_activity': None, 'register_date': 'Sun, 02 Dec 2018 16:33:20 GMT', 'role': 0, 'username': 'cs'}
    ----------
    ---------- replies ----------
    [{'id': 465, 'id_network': 1, 'id_parent': 626, 'id_user': 157, 'reply_date': 'Sun, 02 Dec 2018 18:20:40 GMT', 'reply_text': "This is a test reply, but I'd be happy to talk to you.  "}, {'id': 461, 'id_network': 1, 'id_parent': 626, 'id_user': 172, 'reply_date': 'Tue, 18 Sep 2018 16:09:13 GMT', 'reply_text': 'This is another test reply.  Do not mind me, but welcome to Palo Alto! Hope you like it here'}, {'id': 460, 'id_network': 1, 'id_parent': 626, 'id_user': 171, 'reply_date': 'Tue, 18 Sep 2018 16:07:16 GMT', 'reply_text': 'This is only a test reply.  But I am sure someone else here can help you out.'}]
    ----------
    ---------- c.get_user(reply) ----------
    {'about_me': 'I like to cook and watch movies.  I recently made some clam chowder and it was amazing :D.  Originally from Mexico, now living in the bay area.', 'act_code': '', 'company_news': None, 'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None, 'first_name': 'Alan', 'fp_code': None, 'gender': None, 'id': 171, 'img_link': None, 'last_login': '0000-00-00 00:00:00', 'last_name': 'Last name', 'network_activity': None, 'register_date': 'Thu, 20 Sep 2018 10:30:04 GMT', 'role': 0, 'username': 'aefl'}
    ----------
    ---------- c.get_user(reply) ----------
    {'about_me': 'Live and learn', 'act_code': '', 'company_news': None, 'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None, 'first_name': 'Alan 2.0', 'fp_code': None, 'gender': None, 'id': 172, 'img_link': None, 'last_login': '0000-00-00 00:00:00', 'last_name': 'Lastname', 'network_activity': None, 'register_date': 'Wed, 19 Sep 2018 22:15:15 GMT', 'role': 0, 'username': 'aefl2'}
    ----------
    ---------- c.get_user(reply) ----------
    {'about_me': "I'm from Michigan", 'act_code': '764efa883dda1e11db47671c4a3bbd9e', 'company_news': None, 'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None, 'first_name': 'c', 'fp_code': None, 'gender': 'n', 'id': 157, 'img_link': 'https://www.culturemesh.com/user_images/null', 'last_login': '0000-00-00 00:00:00', 'last_name': 's', 'network_activity': None, 'register_date': 'Sun, 02 Dec 2018 16:33:20 GMT', 'role': 0, 'username': 'cs'}
    ----------
    127.0.0.1 - - [07/Jan/2019 09:42:11] "GET /post/?id=626 HTTP/1.1" 200 -
    127.0.0.1 - - [07/Jan/2019 09:42:11] "GET /static/css/culturemesh-style.css HTTP/1.1" 200 -
    127.0.0.1 - - [07/Jan/2019 09:42:11] "GET /static/css/bootstrap.css HTTP/1.1" 200 -
    127.0.0.1 - - [07/Jan/2019 09:42:11] "GET /static/fonts/font-awesome/css/fontawesome-all.min.css HTTP/1.1" 200 -

Now you know what the functions we will mock normally return! They are all JSON
objects or lists of JSON objects, which Python represents as dictionaries or
lists of dictionaries, respectively. You can copy-and-paste them straight into
your test file and assign them to variables. The top of your test file should
include some of those objects like this:

.. code-block:: python

    view_post_post = {'id': 626, 'id_network': 1, 'id_user': 157, 'img_link': None,
                      'post_class': 'o',
                      'post_date': 'Sun, 26 Aug 2018 22:31:04 GMT',
                      'post_original': None,
                      'post_text': "Hi everyone! I'm hoping to move here soon, but "
                                   "I'd like to get a better sense of the local "
                                   "community. Would anyone be willing to take a "
                                   "few minutes to talk with me about there "
                                   "experiences living here, particularly after "
                                   "leaving home? Thanks!\n", 'vid_link': None}
    view_post_net = {'city_cur': 'Palo Alto', 'city_origin': None,
                     'country_cur': 'United States',
                     'country_origin': 'United States',
                     'date_added': 'Tue, 12 Jan 2016 05:51:19 GMT', 'id': 1,
                     'id_city_cur': 332851, 'id_city_origin': None,
                     'id_country_cur': 47228, 'id_country_origin': 47228,
                     'id_language_origin': None, 'id_region_cur': 55833,
                     'id_region_origin': 56020, 'img_link': None,
                     'language_origin': None, 'network_class': 'rc',
                     'region_cur': 'California', 'region_origin': 'Michigan',
                     'twitter_query_level': 'A'}
    view_post_replies = [{'id': 465, 'id_network': 1, 'id_parent': 626,
                          'id_user': 157,
                          'reply_date': 'Sun, 02 Dec 2018 18:20:40 GMT',
                          'reply_text': "This is a test reply, but I'd be happy "
                                        "to talk to you.  "},
                         {'id': 461, 'id_network': 1, 'id_parent': 626,
                          'id_user': 172,
                          'reply_date': 'Tue, 18 Sep 2018 16:09:13 GMT',
                          'reply_text': 'This is another test reply.  Do not mind '
                                        'me, but welcome to Palo Alto! Hope you '
                                        'like it here'},
                         {'id': 460, 'id_network': 1, 'id_parent': 626,
                          'id_user': 171,
                          'reply_date': 'Tue, 18 Sep 2018 16:07:16 GMT',
                          'reply_text': 'This is only a test reply.  But I am sure '
                                        'someone else here can help you out.'}]

When we mock functions, we can specify these objects as the object to return
and Python will handle creating the dummy function automatically.

However, the ``c.get_user`` function is different because it is called more than
once. This means we can't specify a single return value when we mock it. Instead
we will have to write the dummy function ourselves and return the user object
whose ID matches the parameter. Here is an example:

.. code-block:: python

    def mock_client_get_user(id):
        users = [
            {'about_me': "I'm from Michigan",
             'act_code': '764efa883dda1e11db47671c4a3bbd9e',
             'company_news': None, 'confirmed': 0,
             'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'c', 'fp_code': None, 'gender': 'n', 'id': 157,
             'img_link': 'https://www.culturemesh.com/user_images/null',
             'last_login': '0000-00-00 00:00:00', 'last_name': 's',
             'network_activity': None,
             'register_date': 'Sun, 02 Dec 2018 16:33:20 GMT', 'role': 0,
             'username': 'cs'},
            {'about_me': 'I like to cook and watch movies.  I recently made some '
                         'clam chowder and it was amazing :D.  Originally from '
                         'Mexico, now living in the bay area.',
             'act_code': '', 'company_news': None, 'confirmed': 0,
             'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'Alan', 'fp_code': None, 'gender': None, 'id': 171,
             'img_link': None, 'last_login': '0000-00-00 00:00:00',
             'last_name': 'Last name', 'network_activity': None,
             'register_date': 'Thu, 20 Sep 2018 10:30:04 GMT', 'role': 0,
             'username': 'aefl'},
            {'about_me': 'Live and learn', 'act_code': '', 'company_news': None,
             'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'Alan 2.0', 'fp_code': None, 'gender': None, 'id': 172,
             'img_link': None, 'last_login': '0000-00-00 00:00:00',
             'last_name': 'Lastname', 'network_activity': None,
             'register_date': 'Wed, 19 Sep 2018 22:15:15 GMT', 'role': 0,
             'username': 'aefl2'}
        ]
        for user in users:
            if user['id'] == id:
                return user
        raise ValueError("User ID {} is unknown to mock_client_get_user".format(id))

Now that we can specify the expected outputs of the mocked functions, we can
use ``@mock.patch`` annotations to actually do the mocking. This looks like

Performing Mocking
==================

.. code-block:: python

    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_post',
                return_value=view_post_post)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_network',
                return_value=view_post_net)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_user',
                side_effect=mock_client_get_user)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_post_replies',
                return_value=view_post_replies)
    def test_view_post(replies, user, net, post, client):

The first argument to each ``@mock.patch`` call is a string that specifies the
function to mock--to replace with a dummy function. Importantly, it specifies
the function based on where it is *used*, not where it is *defined*. In the top
case, the ``Client.get_post`` function is defined at
``culturemesh.client.Client.get_post``. However, it is used within the
``culturemesh.blueprints.posts.controllers`` file, which imports ``Client``.

.. note:: The distinction between where a function is defined and where it is
    used is a common source of problems and easy to get wrong. Some trial and
    error may be necessary here.

Each ``@mock.patch`` statement causes another object (the mocked function) to be
passed as an argument when the test is run. This is where the
``replies, user, net, post`` arguments come from. Note that they are ordered
from left to right to match the order of the ``@mock.patch`` calls from bottom
to top. This is strange, but it results from the order in which Python applies
annotations.

Specifying Return Values
========================

Each ``@mock.patch`` call also specifies how Python should determine the return
value. For those functions that are only called once, a single value can be
specified by the ``return_value`` keyword argument. Python will then handle
creating the mock function for us. For functions that are called more than once,
we have to create the mock function ourselves and use the ``side_effect``
keyword argument instead.

Adding Test Cases
=================

Now, we can add assertions like before.

.. code-block:: python

    result = client.get('/post/?id=626')
    html = result.data.decode()

    # Check that replies are displayed
    assert "This is another test reply.  Do not mind me, " in html
    assert 'This is only a test reply.' in html

    # Check that reply author username displayed
    assert 'aefl' in html

    # Check that post text displayed
    assert 'Hi everyone!' in html

    # Check that post author username displayed
    assert 'cs' in html

    # Check that network name displayed
    assert 'From Michigan, United States in Palo Alto, California, ' \
           'United States' in html

In addition, we can check that the mocked functions were called as expected.
Instead of the ``assert`` keyword, we can call functions on the mock functions
provided as parameters to our test. ``assert_called_with`` tests whether the
mock function was called with the arguments you pass to the assertion.
To test for multiple calls in a particular order, use ``has_calls`` instead and
provide a list of ``call`` objects. When creating each ``call`` object, pass the
parameters you expect the mocked function to be called with. Combining these
techniques might result in test code like this:

.. code-block:: python

    replies.assert_called_with(626, 100)
    user.assert_has_calls([call(157), call(171), call(172), call(157)])
    net.assert_called_with(1)
    post.assert_called_with('626')

If you didn't know what arguments to expect, you could take a guess randomly
and run the test. ``pytest`` will report the failing test case and show you what
arguments the mocked function actually received.

Finished Test Function
**********************

In the end, you should have a ``test_posts.py`` file that looks like this:

.. code-block:: python

    from test.unit.webapp import client
    import mock
    from mock import call


    view_post_post = {'id': 626, 'id_network': 1, 'id_user': 157, 'img_link': None,
                      'post_class': 'o',
                      'post_date': 'Sun, 26 Aug 2018 22:31:04 GMT',
                      'post_original': None,
                      'post_text': "Hi everyone! I'm hoping to move here soon, but "
                                   "I'd like to get a better sense of the local "
                                   "community. Would anyone be willing to take a "
                                   "few minutes to talk with me about there "
                                   "experiences living here, particularly after "
                                   "leaving home? Thanks!\n", 'vid_link': None}
    view_post_net = {'city_cur': 'Palo Alto', 'city_origin': None,
                     'country_cur': 'United States',
                     'country_origin': 'United States',
                     'date_added': 'Tue, 12 Jan 2016 05:51:19 GMT', 'id': 1,
                     'id_city_cur': 332851, 'id_city_origin': None,
                     'id_country_cur': 47228, 'id_country_origin': 47228,
                     'id_language_origin': None, 'id_region_cur': 55833,
                     'id_region_origin': 56020, 'img_link': None,
                     'language_origin': None, 'network_class': 'rc',
                     'region_cur': 'California', 'region_origin': 'Michigan',
                     'twitter_query_level': 'A'}
    view_post_replies = [{'id': 465, 'id_network': 1, 'id_parent': 626,
                          'id_user': 157,
                          'reply_date': 'Sun, 02 Dec 2018 18:20:40 GMT',
                          'reply_text': "This is a test reply, but I'd be happy "
                                        "to talk to you.  "},
                         {'id': 461, 'id_network': 1, 'id_parent': 626,
                          'id_user': 172,
                          'reply_date': 'Tue, 18 Sep 2018 16:09:13 GMT',
                          'reply_text': 'This is another test reply.  Do not mind '
                                        'me, but welcome to Palo Alto! Hope you '
                                        'like it here'},
                         {'id': 460, 'id_network': 1, 'id_parent': 626,
                          'id_user': 171,
                          'reply_date': 'Tue, 18 Sep 2018 16:07:16 GMT',
                          'reply_text': 'This is only a test reply.  But I am sure '
                                        'someone else here can help you out.'}]


    def mock_client_get_user(id):
        users = [
            {'about_me': "I'm from Michigan",
             'act_code': '764efa883dda1e11db47671c4a3bbd9e',
             'company_news': None, 'confirmed': 0,
             'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'c', 'fp_code': None, 'gender': 'n', 'id': 157,
             'img_link': 'https://www.culturemesh.com/user_images/null',
             'last_login': '0000-00-00 00:00:00', 'last_name': 's',
             'network_activity': None,
             'register_date': 'Sun, 02 Dec 2018 16:33:20 GMT', 'role': 0,
             'username': 'cs'},
            {'about_me': 'I like to cook and watch movies.  I recently made some '
                         'clam chowder and it was amazing :D.  Originally from '
                         'Mexico, now living in the bay area.',
             'act_code': '', 'company_news': None, 'confirmed': 0,
             'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'Alan', 'fp_code': None, 'gender': None, 'id': 171,
             'img_link': None, 'last_login': '0000-00-00 00:00:00',
             'last_name': 'Last name', 'network_activity': None,
             'register_date': 'Thu, 20 Sep 2018 10:30:04 GMT', 'role': 0,
             'username': 'aefl'},
            {'about_me': 'Live and learn', 'act_code': '', 'company_news': None,
             'confirmed': 0, 'events_interested_in': None, 'events_upcoming': None,
             'first_name': 'Alan 2.0', 'fp_code': None, 'gender': None, 'id': 172,
             'img_link': None, 'last_login': '0000-00-00 00:00:00',
             'last_name': 'Lastname', 'network_activity': None,
             'register_date': 'Wed, 19 Sep 2018 22:15:15 GMT', 'role': 0,
             'username': 'aefl2'}
        ]
        for user in users:
            if user['id'] == id:
                return user
        raise ValueError("User ID {} is unknown to mock_client_get_user".format(id))


    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_post',
                return_value=view_post_post)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_network',
                return_value=view_post_net)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_user',
                side_effect=mock_client_get_user)
    @mock.patch('culturemesh.blueprints.posts.controllers.Client.get_post_replies',
                return_value=view_post_replies)
    def test_view_post(replies, user, net, post, client):
        result = client.get('/post/?id=626')
        html = result.data.decode()

        # Check that replies are displayed
        assert "This is another test reply.  Do not mind me, " in html
        assert 'This is only a test reply.' in html

        # Check that reply author username displayed
        assert 'aefl' in html

        # Check that post text displayed
        assert 'Hi everyone!' in html

        # Check that post author username displayed
        assert 'cs' in html

        # Check that network name displayed
        assert 'From Michigan, United States in Palo Alto, California, ' \
               'United States' in html

        replies.assert_called_with(626, 100)
        user.assert_has_calls([call(157), call(171), call(172), call(157)],
                              any_order=False)
        net.assert_called_with(1)
        post.assert_called_with('626')

=========================
Licensing and Attribution
=========================

Copyright (c) U8N WXD (https://github.com/U8NWXD) <cs.temporary@icloud.com>

|CC-0 license|

.. |CC-0 license| image:: https://i.creativecommons.org/l/by/4.0/88x31.png
   :target: http://creativecommons.org/licenses/by/4.0/

This work, including both this document and the source code in the associated
GitHub repository, is licensed under a `Creative Commons Attribution 4.0
International License <https://creativecommons.org/licenses/by/4.0/>`_.

This work was initially created for a workshop at
`Stanford Code the Change <http://www.codethechange.stanford.edu>`_.
