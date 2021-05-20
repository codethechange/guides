*********************
The Javascript Onion
*********************

Is this Javascript?

.. code-block:: javascript

    function(a) {
        console.log(a);
    }("hi")
    var o = {}
    var o["2"] = 2
    var deepCopy = JSON.parse(JSON.stringify(o))

What about this?

.. code-block:: javascript

    const list = [1,2,3]
    a = (l) => {
        const [, num2, ] = l
        console.log(num2)
    }
    const o = { "asdf": 2} 
    const deepCopy = { ...o, b: 2 }

Both do seem to work when added as inline javascript to
our local HTML file in the browser:

.. code-block:: html

    <html>
        <body>
            <script type="text/javascript">
                const list = [1,2,3]
                a = (l) => {
                    const [, num2, ] = l
                    console.log(num2)
                }
                const o = { "asdf": 2 } 
                const deepCopy = { ...o, b: 2 }
                alert(JSON.stringify(deepCopy))
            </script>
        </body>
    </html>

There's no way that this could be `valid Javascript <https://github.com/aemkei/jsfuck/blob/master/jsfuck.js>`_:

.. code-block:: javascript

    [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]
    +!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]
    ]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[]
    )[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]
    +[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!
    +[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![
    ]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+!+[]]+(+[![]]+[][(![]+[])[+[]]+(![]+[])[!+
    []+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+!+[]
    +[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]
    )[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[
    ]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]
    ]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(
    ![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+
    (!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+
    !+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[
    ]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!
    ![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+
    []]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+
    !+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]
    )[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[!+[]
    +!+[]])+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]])()([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+
    (!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+
    !+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[
    ]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])
    [+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[
    ][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]](
    (!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+
    [])[+!+[]]+([]+[])[(![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[]
    )[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[
    ])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!
    +[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(!
    []+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]]+((![]+[])[+!+[]]+
    (![]+[])[!+[]+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[
    ]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[
    ]]+[!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]
    +!+[]+!+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+[]]+([![]
    ]+[][[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[+[]]+([![]]+[]
    [[]])[+!+[]+[+[]]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]]+[+[]]+(!![]+[])[+[]
    ]+[+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+
    !+[]+!+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]+!+[]+!+[]]+(!![]+[])[+[]]+[!+[]+!+[]+!+[]+!+[]+!+[]]+[+!+[]])[(
    ![]+[])[!+[]+!+[]+!+[]]+(+(!+[]+!+[]+[+!+[]]+[+!+[]]))[(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[]
    )[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([]+[])[([][(![]+[])[+[]]+(![]+[])[!+[]+!
    +[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+
    (![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[
    +[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[
    ])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[
    ]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]][([][[]]+[])[+!+[]]+(![]+[])[+!+[]]+((+[])[([][(![
    ]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])
    [+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]+(![]+[])[
    !+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[
    ]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[][(![]+[])[+[]]+(![]+[]
    )[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])[+!+[]]]+[])[+!+[]+[+!+[]]]+(!![
    ]+[])[!+[]+!+[]+!+[]]]](!+[]+!+[]+!+[]+[+!+[]])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]
    ]]+(!![]+[])[+[]]]((!![]+[])[+[]])[([][(!![]+[])[!+[]+!+[]+!+[]]+([][[]]+[])[+!+[]]+(!![]+[])[+[]]+(
    !![]+[])[+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()+[]
    )[!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+
    [+[]]]+([![]]+[][[]])[+!+[]+[+[]]]+([][[]]+[])[+!+[]]](([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[]
    )[+!+[]]+(!![]+[])[+[]]][([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!
    +[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[
    ]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+([]
    [(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]
    ]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[])
    [+!+[]]]((!![]+[])[+!+[]]+(!![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+([][[]]+[])[+[]]+(!![]+[])[+!+[]]
    +([][[]]+[])[+!+[]]+(![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[
    !+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[
    ])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]]+![]+(![]+[+[]])[([![]]+[][[]])
    [+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![
    ]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[
    ]+!+[]]]()[+!+[]+[+[]]])()[([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])
    [!+[]+!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[
    +[]]]+([][[]]+[])[+!+[]]+(![]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+([][[]]+[])[+[]]+(
    [][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+[]+!+[]]+(!![]+[])[+
    []]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!![]+[
    ])[+!+[]]]((![]+[+[]])[([![]]+[][[]])[+!+[]+[+[]]]+(!![]+[])[+[]]+(![]+[])[+!+[]]+(![]+[])[!+[]+!+[]
    ]+([![]]+[][[]])[+!+[]+[+[]]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+
    [])[!+[]+!+[]+!+[]]+(![]+[])[!+[]+!+[]+!+[]]]()[+!+[]+[+[]]])+[])[+!+[]])+([]+[])[(![]+[])[+[]]+(!![
    ]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+([][[]]+[])[+!+
    []]+(!![]+[])[+[]]+([][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]]+[])[!+[]+!+
    []+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+[+[]]]+(!
    []+[])[!+[]+!+[]]+(!![]+[][(![]+[])[+[]]+(![]+[])[!+[]+!+[]]+(![]+[])[+!+[]]+(!![]+[])[+[]]])[+!+[]+
    [+[]]]+(!![]+[])[+!+[]]]()[+!+[]+[!+[]+!+[]]])())

You may have heard of both the 
`MEAN/MERN <https://en.wikipedia.org/wiki/MEAN_(solution_stack)>`_ stacks, and both use Express.
Let's try adding Express - it is a Javascript library, after all! Try adding the
`Express.js starter code <https://expressjs.com/en/starter/hello-world.html>`_
for a basic hello world server as inline 
javascript:


.. code-block:: javascript

    const express = require('express')
    const app = express()
    const port = 3000

    app.get('/', (req, res) => {
    res.send('Hello World!')
    })

    app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    })

When inspecting your browser debugger, you should immediately 
encounter a bug of the form :code:`Uncaught ReferenceError: require is not defined`.
Yikes. This Javscript isn't designed for the browser.

Finally, let's try making our tiny HTML file a React app. When navigating to the
the Create React App `tutorial <https://reactjs.org/docs/create-a-new-react-app.html#create-react-app>`_,
we are immediately recommended to "use an integrated toolchain for the best user and developer experience."
Thankfully, there's a link to add React as a "plain" :code:`<script>` tag,
so let's try that. Even in that section, there is a link to a complete `HTML file <https://raw.githubusercontent.com/reactjs/reactjs.org/master/static/html/single-file-example.html>`_
shown here for your convenience:

.. code-block:: html

    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello World</title>
        <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

        <!-- Don't use this in production: -->
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/babel">

        ReactDOM.render(
            <h1>Hello, world!</h1>,
            document.getElementById('root')
        );

        </script>
        <!--
        Note: this page is a great way to try React but it's not suitable for production.
        It slowly compiles JSX with Babel in the browser and uses a large development build of React.

        Read this section for a production-ready setup with JSX:
        https://reactjs.org/docs/add-react-to-a-website.html#add-jsx-to-a-project

        In a larger project, you can use an integrated toolchain that includes JSX instead:
        https://reactjs.org/docs/create-a-new-react-app.html

        You can also use React without JSX, in which case you can remove Babel:
        https://reactjs.org/docs/react-without-jsx.html
        -->
    </body>
    </html>

Even after we parse through all the warnings that this isn't suited
for production, we see that it "slowly compiles JSX with Babel." There
also looks to be HTML within the javascript section of the app. The
:code:`<script>` tag also doesn't pretend that it's javascript anymore:
it is allegedly "text/babel."

What on earth does this mean? Welcome to the Javascript Onion.

==================
Vanilla Javascript
==================

As the web grew in popularity, websites wanted to be able to run
code that would execute in the browser. `Netscape <https://en.wikipedia.org/wiki/Netscape>`_,
an early web browser, designed a programming language called Javascript
that could be included in webpages and then executed in the browser.
This language caught on, and other browsers started to support Javascript.
Now, Javascript
is the single most popular programming language according to the latest
`Stack Overflow Developer Survey <https://insights.stackoverflow.com/survey/2020#most-popular-technologies>`_.
As a result, `ecma <https://en.wikipedia.org/wiki/Ecma_International>`_ maintains
a set of public standards around Javascript, which the browsers use
to continuously update their own JS interepreters. These standards
get frequuently updated and often add new features that the
browsers eventually support. This ECMAScript-compliant JS *should*
be able to be run via inline :code:`<script>` tags out of the box
in the latest browsers.

A far more comprehensive introduction to Javascript as a whole
can be found on the `MDN Web Docs <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide>`_.


=======
Node.js
=======
Javascript (and web technologies more broadly) have become so popular
that developers wanted to write Javascript code across all aspects
their software stack. Instead of just having Javascript run just in
the browser, why not be able to run Javascript as a *process*? `Node.js <https://nodejs.org/en/>`_
allows you to write scripts and servers in Javascript.

Once you install node, you can :code:`node` to open up a Node interpreter.
Here, you can run Javascript that doesn't involve browser interactions.
For example, :code:`alert('hi')` no longer makes sense here. :math:`console.log('hi')`,
however, does still work. Since Express is a framework to help run a 
web server, and web servers run as processes, Express is meant to be 
run in Node. We can thus try running the Express starter code given above
in a file :code:`server.js` and then running :code:`node server.js` in the
terminal:

.. code-block:: console

    $ node server.js
    internal/modules/cjs/loader.js:883
        throw err;
        ^

    Error: Cannot find module 'express'

Interestingly, we no longer are experiencing the :code:`Uncaught ReferenceError`,
so we are getting closer. Our remaining issue is that this
third-party Express framework is a "module" that Node doesn't understand.
Thankfully, Node.js comes with an excellent package manager
that is mysteriously named "npm". You can check out their
`homepage <https://www.npmjs.com>`_ to see some possibilities regarding
the meaning of the acronym. Regardless, to manage third-party libraries,
we need to make this one little script an npm package, even if we
don't plan on publishing this package publicly.

.. code-block:: console

    $ npm init
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help init` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.
    This utility will walk you through creating a package.json file.
    It only covers the most common items, and tries to guess sensible defaults.

    See `npm help init` for definitive documentation on these fields
    and exactly what they do.

    Use `npm install <pkg>` afterwards to install a package and
    save it as a dependency in the package.json file.

    Press ^C at any time to quit.
    package name: (guides)
    version: (1.0.0)
    description:
    entry point: (server.js)
    test command:
    git repository: (https://github.com/codethechange/guides)
    keywords:
    author:
    license: (ISC)
    About to write to ./package.json:

    {
    "name": "guides",
    "version": "1.0.0",
    "description": "=================================== Guides for Stanford Code the Change ===================================",
    "main": "server.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node server.js"
    },
    "repository": {
        "type": "git",
        "url": "git+https://github.com/codethechange/guides.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
        "url": "https://github.com/codethechange/guides/issues"
    },
    "homepage": "https://github.com/codethechange/guides#readme"
    }


    Is this OK? (yes) yes

And voila! Inspecting our current directory reveals that a somewhat auto-generated
:code:`package.json` file was creaed for our convenience. The :code:`scripts`
field of this JSON file even automatically created some default commands for us:

.. code-block:: console

    $ npm run start

    > guides@1.0.0 start
    > node server.js

    internal/modules/cjs/loader.js:883
        throw err;
        ^

    Error: Cannot find module 'express'

As the handy npm output recommended for us, let's install
packages via :code:`npm install express`. 


.. note:: It is important to make
    sure that you verify the package name corresponds to the actual software
    you are interested in using.
    For example, the express package can be viewable from the 
    `npm package registry <https://www.npmjs.com/package/express>`_. Be sure
    to check out our guide on `securing open source software <guides/guide_securing_oss.html>`_ for more information.


.. code-block:: console

    $ npm install express

    > guides@1.0.0 start
    > node server.js

    internal/modules/cjs/loader.js:883
        throw err;
        ^

    Error: Cannot find module 'express'

We should now be able to run this :code:`server.js` file and be able to
visit http://localhost:3000:

.. code-block:: console

    $ npm run start

    > guides@1.0.0 start
    > node server.js

    Example app listening at http://localhost:3000

=============================
ES6, Babel, and Transpilation
=============================

As we go back to the browser, you may have noticed an issue
with continuously updating standards: browsers have to send
updates to all their users so that all client-side browsers
can execute the newest features of Javascript. Inevitably, 
there will be users with outdated browsers that are incapable
of running modern versions of Javascript.

One especially big version change was ECMAScript 2015, or ES6.
The :code:`let` keyword and arrow function notation from the
second code snippet are part of ES6. The spread operator in 
the :code:`deepCopy` line is from ES9.

Thankfully, these language additions do not change
the expressivity of the language and can be viewed as
syntactic sugar. `Babel <https://babeljs.io/docs/en/usage>`_ is
a JS framework that helps convert your modern Javascript
code into Javascript that is compliannt with the old
ECMAscript standards so that it can be run out of the box.

We will will see this in action on our modern :code:`server.js`
file that uses arrow functions. First, to be clear about what we are
compiling, move :code:`server.js` to its own :code:`src` directory:

.. code-block:: console

    $ mkdir src
    $ mv server.js src

In fact, Babel can perform arbitrary transpilation, which is why
React uses Babel to transform their JSX into pure, native javascript.
Thus, we will want to explicitly tell Babel to transpile this modern
javascript a pre-ECMA2015 world. 

Next, we will install babel, babel's cli, and the default presets,
which include replacing arrow functions. Then, we will use Babel to
transpile our server.js file:

.. code-block:: console

    $ npm install --save-dev @babel/core @babel/cli @babel/preset-env
    $ ./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
    Successfully compiled 1 file with Babel (431ms).
    $ cat lib/server.js
    "use strict";

    var express = require('express');

    var app = express();
    var port = 3000;
    app.get('/', function (req, res) {
    res.send('Hello World!');
    });
    app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
    });

Et Voila! Our arrow functions have been replaced with traditional functions.
Be sure to continue reading `here <https://babeljs.io/docs/en/usage>`_ for more information
on how to use Babel.

==========
Typescript
==========
