****************
React with Hooks
****************

============
Introduction
============

Up until the mid-2010s when React was released, web development was 
dominated by established frameworks like jQuery, Backbone, and *MooTools*. 
These frameworks helped solve many of the problems that developers 
faced in the early 2000s, including a lack of cross-browser functionality. 
What is even more relevant to this workshop, however, is that they made 
creating dynamic web-pages much easier (this is known as DOM manipulation, 
check out `this Mozilla documentation <https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents>`_ 
if you’re interested in knowing more).

However, these libraries posed many problems of their own. For instance, 
let’s say that you wanted to create a simple to-do list that took some 
text from a form and added it to a list after clicking an 'Add' button 
(original CodePen `here <https://codepen.io/beeeees/pen/tsBwe>`_):

.. code-block:: html

    <body>
        <form>
            <input type="text" name="item" />
        </form>

        <div id="button">Add</div>
        <ol></ol>
    </body>

With jQuery, you would have to add the following JavaScript code to 
dynamically add text to the list:

.. code-block:: javascript

    $(document).ready(
        function() {
            $('#button').click(
                function() {
                    var toAdd = $('input[name=item]').val();
                    $('ol').append('<li>' + toAdd + '</li>');
                });   
        }
    );

As you can see, this already looks pretty obscure with a simple add-only 
todo-list. Can you imagine what a jQuery app could look like with a more 
complicated UI? A script (or multiple) like this would need to be created 
for every single dynamic element created, which isn’t a very maintainable 
or modular solution to web pages with many possible states. Luckily, the 
introduction of modern web frameworks like Angular, React, and Vue have 
largely replaced these older libraries with a more straightforward approach 
to web development. For the purposes of this workshop, we will focus on React 
due to its popularity and extensive documentation, but many of the ideas that 
are mentioned in this write-up also apply to Angular and Vue.

The to-do app below will mostly follow the steps outlined in this DigitalOcean 
tutorial: https://www.digitalocean.com/community/tutorials/how-to-build-a-react-to-do-app-with-react-hooks.

-----
Setup
-----

First, install Node.js for your OS at nodejs.org.

Next, run the following commands in your shell to create a React app with 
starter code and run it in your local browser:

.. code-block:: console

    $ npx create-react-app react-workshop
    $ cd react-workshop
    $ npm start

Now, navigate to your browser of choice and enter ``localhost:3000`` in the URL. 
From here, you should see a screen with the React logo. Remove all of the 
boilerplate code from ``src/App.js`` besides the ``import`` and ``export`` statements.

Next, for the purposes of styling (which you can edit later), add the following to 
``src/App.css``:

.. code-block:: css

    .app {
        background: #044b7a;
        height: 100vh;
        padding: 30px;
    }
    
    .todo-list {
        background: #158ad8;
        border-radius: 4px;
        max-width: 400px;
        padding: 5px;
    }
    
    .todo {
        align-items: center;
        color: #000;
        background: #fff;
        border: none;
        display: flex;
        font-size: 12px;
        justify-content: space-between;
        margin-bottom: 6px;
        padding: 3px 10px;
    }
    
    button {
        background: #158ad8;
        color: #fff;
        border: none;
        margin-left: 2px;
        margin-right: 2px;
        border-radius: 2px;
    }

----------
To-Do List
----------

For the remainder of the workshop, we will build a basic to-do list app using 
functional React components with hooks. To show how we can use ``state`` and 
``props`` to build a variety of modular components, we will add 
read/write/update/delete functionality to this app. From these four basic 
functions, one can create large-scale systems with ease.

.. note::

    Unless otherwise specified, the components below can be implemented in 
    ``App.js``.

How to Build a To-Do List and Read a To-Do Item
***********************************************

First, let’s build the read functionality of the app! By the end of this step, 
we should have a root ``App`` component that looks like this:

.. code-block:: jsx

    const App = () => {
        const [todos, setTodos] = React.useState([
            { text: "Learn about React" },
            { text: "Meet friend for lunch" },
            { text: "Build a really cool todo app" }
        ]);

        return (
            <div className="app">
                <div className="todo-list">
                    {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                    />
                    ))}
                </div>
            </div>
        );
    }

Here, we can observe that there are two very important steps to building a 
component: 1) setting its initial state and 2) returning the element to be 
rendered.

Let’s take a look at #1. In React, state is just an object that every 
component uses to store information about itself. In our example, we create 
a state variable called ``todos`` that holds an array of text items 
corresponding to our to-do list. It is accompanied by a function called 
``setTodos`` that we can call at any point within the ``App`` component to change 
the list. For example, we can add a new to-do item to the end of the list by 
using the following call:

.. code-block:: javascript

    setTodos([...todos, { text: "Finish the React workshop" }])

When we write ``const [todos, setTodos] = React.useState(/* ... */);``, all 
we’re really doing is initializing a state variable along with its 
corresponding setter so that we can control and change the state at any stage 
of the functional component’s lifecycle. This is why it’s called a Hook; we’re 
prying into the component’s data and changing it directly from within! React 
Hooks drastically simplify the dynamic rendering process so that we can edit 
the content of webpages in real time; no jQuery needed.

.. note::

    Since state is local to each component, it is recommended that you only get 
    and set a component’s state inside its declaration.

Now, let’s take a look at #2. For any React component, we will always return 
one HTML element. In this case, we are returning a ``<div>`` container that holds 
an array of ``<Todo>`` components (``map`` is the method that creates this array). 
Since ``<Todo>`` isn’t a native HTML element, we have to create this element 
ourselves by introducing another functional component above ``App`` called ``Todo``, 
which will return the text for its corresponding to-do item:

.. code-block:: jsx

    const Todo = (props) => {
        const { index, todo } = props;
        return (
            <div className="todo">
            {todo.text}
            </div>
        );
    };

Notice that this functional component has one parameter called ``props``, 
short for 'properties.' This variable is simply a JavaScript object 
containing all of the attributes that we pass into the component:

.. code-block:: jsx

    <Todo key={index} index={index} todo={todo} />

From the element above, we can see that there are three variables in props: 
``key``, ``index``, and ``todo``. However, ``key`` is a special type of prop in 
React which gives each ``<Todo>`` element in the array a unique identity, 
so it does not get passed in with the rest of the props. Thus, we can 
just access the values of ``index`` and ``todo`` when creating our ``Todo`` 
component by using the following:

.. code-block:: javascript

    const { index, todo } = props

At the end of ``Todo``, we just return a ``<div>`` element containing a 
string of text from the to-do item.

How to Create a To-Do Item
**************************

While the code above works for hard coded to-do items, we can improve on this 
functionality by creating new to-do items with user input. First, we should 
create a form component that takes in a user’s input and returns it from the 
``App`` component:

.. code-block:: jsx

    const App = () => {
        const [todos, setTodos] = React.useState([]);

        const addTodo = (text) => {
            const newTodos = [...todos, { text }];
            setTodos(newTodos);
        };

        return (
            <div className="app">
                <div className="todo-list">
                    {todos.map((todo, index) => (
                    <Todo
                        key={index}
                        index={index}
                        todo={todo}
                    />
                    ))}
                    <TodoForm addTodo={addTodo} />
                </div>
            </div>
        );
    }

The ``TodoForm`` component only passes in one prop, which is ``addTodo``—a 
function that will add a new to-do item to the `todos` array. We can define 
``TodoForm`` like so:

.. code-block:: jsx

    const TodoForm = (props) => {
        const { addTodo } = props;
        const [value, setValue] = React.useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!value) return;
            addTodo(value);
            setValue("");
        };

        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        );
    }

In this component, the state variable ``value`` is a string that tracks
the text added to the form via user input.

The ``handleSubmit`` function might look a bit tricky, but it’s just a 
function that changes some of the contents of the app when we type 
something into the form and hit the ``ENTER`` key. Since this function is
passed into the ``onSubmit`` attribute, we should accept a user event ``e``
as a parameter. 

Similarly, the ``input`` element has an ``onChange`` attribute that accepts 
a function with a parameter ``e``—an event that is fired when a user presses
a key, which we can use to change the input string in the text box.

How to Update a To-Do Item
**************************

For the updating part of this workshop, we will add functionality to 
the list that allows us to visually complete individual to-do items. 
There are many ways to design this functionality, but for the sake of 
simplicity, we will cross out the text when a task is complete.

To determine whether a task is complete or not, we should add a new 
field called ``isComplete`` to each element in the ``todos`` array so that 
every to-do item has the structure ``{ text: <string>, isCompleted: <boolean> }``. 
To mark an item as complete, we can create a new function in the 
``App`` component called ``completeTodo`` that finds an item using 
its index and sets ``isCompleted`` to ``true``:

.. code-block:: javascript

    const completeTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].isCompleted = true;
        setTodos(newTodos);
    };

.. note::

    The ``[...todos]`` syntax uses something called a ‘spread operator’, 
    which takes all of the elements in the ``todos`` array and creates a 
    new array with these elements. In other words, this creates a copy of 
    ``todos`` so that we can set the state to be this new array.

Functions can be props, too! With ``completeTodo``, you can now pass this 
function into the ``Todo`` component in order to style an item’s text with 
a strikethrough when ``isCompleted`` is ``true``:

.. code-block:: jsx

    const Todo = (props) => {
        const { todo, index, completeTodo } = props
        return (
            <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
            </div>
            </div>
        );
    }

.. code-block:: jsx

    const App = () => {
        // ...

        return (
            <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
            </div>
        );
    }

Notice that we added a ``<button>`` element next to the text of each item 
that calls ``completeTodo`` when clicked. When you click on the 'Complete' 
button, you should now see the corresponding task being crossed out!

How to Delete a To-Do Item
**************************

Lastly, we will add delete functionality to the to-do list, which will 
be very similar to marking an item as complete. First, let’s create a 
function called ``removeTodo`` that finds an item by its index and 
splices/removes it from the ``todos`` state array:

.. code-block:: javascript

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

Next, pass ``removeTodo`` as a prop for the ``Todo`` component and add a 
button that calls it when clicked:

.. code-block:: jsx

    const Todo = (props) => {
        const { todo, index, completeTodo, removeTodo } = props
        return (
            <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
            </div>
        );
    }

.. code-block:: jsx

    const App = () => {
        // ...

        return (
            <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
            </div>
        );
    }

When you click the 'x' button, you should see the selected item disappear 
from the to-do list.

----------
Conclusion
----------

Congratulations on building your first complete React application with read, 
write, update, and delete functionality! If you followed every step correctly, 
you should have an implementation that is similar to the code here:

.. code-block:: jsx

    import React from "react";
    import "./App.css";

    const Todo = (props) => {
        const { todo, index, completeTodo, removeTodo } = props
        return (
            <div
            className="todo"
            style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
            >
            {todo.text}
            <div>
                <button onClick={() => completeTodo(index)}>Complete</button>
                <button onClick={() => removeTodo(index)}>x</button>
            </div>
            </div>
        );
    }

    const TodoForm = (props) => {
        const { addTodo } = props;
        const [value, setValue] = React.useState("");

        const handleSubmit = (e) => {
            e.preventDefault();
            if (!value) return;
            addTodo(value);
            setValue("");
        };

        return (
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            </form>
        );
    }

    const App = () => {
        const [todos, setTodos] = React.useState([]);

        const addTodo = (text) => {
            const newTodos = [...todos, { text }];
            setTodos(newTodos);
        };

        const completeTodo = (index) => {
            const newTodos = [...todos];
            newTodos[index].isCompleted = true;
            setTodos(newTodos);
        };

        const removeTodo = (index) => {
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        };

        return (
            <div className="app">
            <div className="todo-list">
                {todos.map((todo, index) => (
                <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                />
                ))}
                <TodoForm addTodo={addTodo} />
            </div>
            </div>
        );
    }

    export default App;

If you’re interested in learning about React further, get to know some of 
the more advanced features in the official documentation: 
https://reactjs.org/docs/getting-started.html.


=========================
Licensing and Attribution
=========================

Copyright (c) 2021 Anthony Perez (https://github.com/anthonyaperez) <aperez01@stanford.edu>

|license|

.. |license| image:: https://i.creativecommons.org/l/by/4.0/88x31.png
   :target: http://creativecommons.org/licenses/by/4.0/

This work, including both this document and the source code in the associated
GitHub repository, is licensed under a `Creative Commons Attribution 4.0
International License <https://creativecommons.org/licenses/by/4.0/>`_.

This work was initially created for a workshop at
`Stanford Code the Change <http://www.codethechange.stanford.edu>`_.
