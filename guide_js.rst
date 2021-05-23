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
    const o = { "asdf": 2 } 
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
As a result, `Ecma International <https://en.wikipedia.org/wiki/Ecma_International>`_ maintains
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
For example, :code:`alert('hi')` no longer makes sense here. :code:`console.log('hi')`,
however, does still work. Since Express is a framework to help run a 
web server, and web servers run as processes, Express is meant to be 
run in Node. Let's make an empty project directory. From there, make a :code:`src` directory.
We can thus try putting the Express starter code given above
in a file :code:`src/server.js` and then running :code:`node src/server.js` in the
terminal:

.. code-block:: console

    $ node src/server.js
    internal/modules/cjs/loader.js:883
        throw err;
        ^

    Error: Cannot find module 'express'

Interestingly, we no longer are experiencing the :code:`Uncaught ReferenceError`,
so we are getting closer. In fact, :code:`require` is not supported in
the ECMAScript specification, but is supported in Node (see the CommonJS Modules section).
Our remaining issue is that this third-party Express framework is a "module" that Node doesn't understand.
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
    entry point: (server.js) src/server.js
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
    "main": "src/server.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node src/server.js"
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
    > node src/server.js

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
    > node src/server.js

    internal/modules/cjs/loader.js:883
        throw err;
        ^

    Error: Cannot find module 'express'

We should now be able to run this :code:`server.js` file and be able to
visit http://localhost:3000:

.. code-block:: console

    $ npm run start

    > guides@1.0.0 start
    > node src/server.js
    Example app listening at http://localhost:3000

================
CommonJS Modules
================

Although our express server now works thanks to Node and NPM, how do
does :code:`require` work under the hood? :code:`cd` into the newly created
:code:`node_modules` folder, which installs the :code:`npm` packages
specific to our current project as defined in :code:`package.json`. We can
then inspect the :code:`express` folder which corresponds to the :code:`express` package.

If you inspect :code:`node_modules/express/index.js`, you will see that there is a special
:code:`module.exports` assignment to another :code:`require` call:

.. code-block:: javascript

    /*!
    * express
    * Copyright(c) 2009-2013 TJ Holowaychuk
    * Copyright(c) 2013 Roman Shtylman
    * Copyright(c) 2014-2015 Douglas Christopher Wilson
    * MIT Licensed
    */

    'use strict';

    module.exports = require('./lib/express');


This :code:`require()` has a relative path included, which tells Node to look locally for the
module file as opposed to installing a third-party NPM dependency.
If we inspect :code:`node_modules/express/lib/express.js`, we will see a much
more intricate file with many :code:`module.exports` assignments (but assigned to
a :code:`exports` convenience variable to not have to prefix with :code:`module` each time).

Back in :code:`node_modules/express/index.js`, let's add an additional export field:


.. code-block:: javascript

    /*!
    * express
    * Copyright(c) 2009-2013 TJ Holowaychuk
    * Copyright(c) 2013 Roman Shtylman
    * Copyright(c) 2014-2015 Douglas Christopher Wilson
    * MIT Licensed
    */

    'use strict';

    module.exports = require('./lib/express');
    module.exports.hi = "hello there";

Did we just edit the Express package? Let's see. Go back to :code:`src/server.js`,
add a simple :code:`console.log(express.hi)` line, and then run :code:`node server.js`.
You should see "hello there" in the output in addition to your server!

In the same way that the :code:`express` package used relative imports, you do not have to only
import and export module information from within :code:`node_modules`. To import your own source
files in the project, merely add relative paths in the :code:`require()` argument.

.. warning:: Editing an imported NPM package locally should not be done in practice -- 
    this exercise was for merely instructive purposes. A successive :code:`npm install`
    could overwrite all your work.

.. warning:: NPM does support installing local packages as NPM packages. Some organizations,
    have faced security issues where someone registers their project's local package name
    as a public package on NPM, causing a name collision. Here is a `Medium post <https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610>`_
    introducing this supply chain attack vector. GitHub published a `blog post <https://github.blog/2021-02-12-avoiding-npm-substitution-attacks/>`_
    regarding how to install local packages via NPM safely.



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
code into Javascript that is compliant with the old
ECMAScript standards so that it can be run out of the box. We will will see this in action on our modern :code:`server.js`
file that uses arrow functions.

.. note:: In fact, Babel can perform arbitrary transpilation, which is why
    React uses Babel to transform their JSX into pure, native javascript.
    We will want to explicitly tell Babel to transpile this modern
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

-------------------------------
ES6 + CommonJS: Import & Export
-------------------------------
When ES6 came about, Ecma International decided to put
module imports and exports in to the JS standard. Crazily enough,
the browsers support ES6 modules as well, although I have never
tried using ES6 modules directly via inline JS. Node, by
extension, also supports managing packages this way as well.
One particularly cool aspect is that Node makes ES6 module syntax
interoperable with other modules that use CommonJS syntax.

Try editing our server.js file to use ES6 import syntax:

.. code-block:: javascript

    import express from 'express'

    console.log(express.hi)
    var app = express();
    var port = 3000;
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
    app.listen(port, function () {
        console.log("Example app listening at http://localhost:" + port);
    });

If we try running this, we get the following error message:

.. code-block:: console

    $ node server.js
    (node:82672) Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.
    (Use `node --trace-warnings ...` to show where the warning was created)
    ./src/server.js:1
    import express from 'express'
    ^^^^^^

Interestingly, Node *doesn't* support interchanging CommonJS and ES6 syntax
within the same module. Thankfully, this is an easy fix. Add the :code:`"type": "module"`
("type" defaults to "commonjs" when the field isn't specified), which tells Node.js
to interpret this module in ES6. Even though express was written with CommonJS
modules, we can still import Express with ES6:

.. code-block:: console

    $ node server.js
    hello there
    Example app listening at http://localhost:3000

.. note:: We ran ES6 code via a normal :code:`node` command. What gives?
    The reality is that your new Node installation certainly supports ES6
    out of the box without transpilation in "experimental mode", and most browsers already support ES6
    anyways. As time goes on, there will be less and less of a need to transpile
    to pre-2015 ECMAScript-compliant JS. Still, the underlying principles behind
    transpilation will likely persist -- there will always be a gap between the newest
    versions of Javascript and the browser versions of billions of users all trying
    to run your javascrip on their local machines. You don't need to transpile, however,
    if your JS is being solely on a Node.js process whose version you control.

Indeed, our tweaked Express package in node_modules is still unchanged ("hello there" is still being printed)
and thus must still be written via CommonJS module syntax.

ES6 import/export statements also leverage the object destructuring syntax
added in the standard. Here is another example. Add :code:`other_file.js` to your
:code:`src` directory:

.. code-block:: javascript

    const hi  = 'hi from other file'

    const say_bye = () => { console.log("good bye from other file") }

    export {hi, say_bye}

Then, update our increasingly messy :code:`server.js` to use this functionality
from :code:`other_file`:

.. code-block:: javascript

    import express from 'express'
    import { hi, say_bye } from './other_file.js'

    console.log(hi)
    say_bye()
    console.log(express.hi)
    var app = express();
    var port = 3000;
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });
    app.listen(port, function () {
        console.log("Example app listening at http://localhost:" + port);
    });

Node.js, despite having experimental support with importing modules via ES6 syntax,
doesn't work too well with exports out of the box. Thankfully, Babel will convert our ES6
syntax into CommonJS syntax via transpilation. Remove the :code:`"type": "module"`
line from our :code:`package.json` to tell :code:`node` that we're reverting into CommonJS
syntax. Let's now compile our ES6 JS into CommonJS syntax via the same Babel command we used
before:

.. code-block:: console

    $ ./node_modules/.bin/babel src --out-dir lib --presets=@babel/env
    $ node lib/server.js
    hi from other file
    good bye from other file
    hello there
    Example app listening at http://localhost:3000
 

==========
Typescript
==========

Imagine you have the following function to check if someone will be
of legal drinking age in the US exactly 5 years from now given
their current age:

.. code-block:: javascript

    function willBeOfAge(age) {
        if (age + 5 >= 21) {
            return true
        } else {
            return false
        }
    }

What will happen if age is 10? What about "10"?

.. code-block:: console

    $ node
    Welcome to Node.js v14.13.1.
    Type ".help" for more information.
    > 10 + 5 >= 21
    false
    > "10" + 5 >= 21
    true
    > "10" + 5
    '105'

Javascript can support weird operations between different types,
and this can make it difficult to catch bugs where the wrong
types are being used. For example, imagine that, in the age example,
the age value was derived from some string regex. A developer could have
forgotten to cast the string into a number (there are no int types in JS).
In fact, many bugs can be viewed as type bugs -- incorrect function signatures,
handling null values, and performing comparisons with the wrong
implicit types all could be prevened with TypeScript.

Javascript does not support static types out of the box, so `TypeScript <https://www.typescriptlang.org>`_
was introduced to add static types to Javascript. A cool feature of TypeScript
is that one can have incremental adoption of TypeScript -- one can use different
settings to enforce static types on only some Javascript files, or one could disable
checks or :code:`null` or :code:`undefined`.

We'll try to use TypeScript to prevent a developer from accidentally passing in a
string to this willBeOfAge function. For our convenience, we'll make a new
file :code:`age_checker.ts` and include the following function:

.. code-block:: javascript

    const willBeOfAge = (age) => {
        if (age + 5 >= 21) {
            return true
        }
        return false
    }
    console.log(willBeOfAge(10))
    console.log(willBeOfAge("10"))

Here, we're also leveraging arrow functions for a more modern JS feel.
Run the file via :code:`node age_checker.ts` to see how passing
in the number as a string will not throw an exception but possibly
give the wrong answer.

We can selectively add types to whatever variables we would like:
we could add a type constraint to the argument :code:`age`.

.. code-block:: javascript

    const willBeOfAge = (age : number) : boolean =>  {
    if (age + 5 >= 21) {
        return true
    }
    return false
    }
    console.log(willBeOfAge(10))
    console.log(willBeOfAge("10"))

Let's now try to compile this with TypeScript and check
for type correctness. First, install TypeScript globally
on your machine:

.. code-block:: console

    $ npm install -g typescript

Next, try compiling your new :code:`.ts` file:

.. code-block:: console

    $ tsc age_checker.ts
    age_checker.ts:8:25 - error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
    8 console.log(willBeOfAge("10"))

    Found 1 error.

Here, TypeScript catches incorrect argument types before we deploy
our code. To be nice, Typescript will still compile the :code:`.ts` into
normal Javascript. If you inspect the newly created :code:`age_checker.js`,
you may notice that TypeScript performs a dual function -- it converted our fancy
arrow functions into older ES3 function definitions! Thus, TypeScript can already transpile
most of what Babel also supports in addition to their static type checking.

To learn more about TypeScript, check out their `documentation <https://www.typescriptlang.org/docs/handbook/intro.html>`_.