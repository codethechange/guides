****************************************
Introduction to Database and Structured Query Language (SQL)
****************************************

============
Introduction
============

A database serves as a platform to store and manage data. Database systems
provide an environment for storage and retrieval of both structured and
semi-structured data. Structuring the database tailored to one's needs
is as important as designing a visually appealing and easily navigate-able
UI/UX front-end. A good database would have advantages in terms of scale,
speed, stability, evolution, reliability, cost efficiency, etc.

The objective of this guide is to provide an overview of relational
databases, non-relational databases, some of the prominent languages used
to query the databases, and a deep dive into Structured Query Language (SQL),
which is a standard language for relational databases.




============
Relational Database
============

A relational database refers to any database that follows the relational
model provided by traditional relational database management systems.
What is meant by *relational* is that each object in the database is linked
to some other object in certain ways.

One keyword that is associated with relational databases is **table**.
Relational databases store data in **tables** and rows, built on the
concepts of relational algebra.

Relational databases are perhaps the most straightforward way of representing
the data. Adopting this scheme, each row in the table is a record with a unique
ID called the *key*, while the columns of the table hold attributes of the data.




Advantage of Relational Databases
******************************

Relational databases have a number of advantages, which include but are
not limited to the following:


1. It is easy to remove redundant data through a process called
**normalization**. The normalization process entails the organization of
the columns (also called as attributes) and tables (also called as relations)
of a database to ensure that their dependencies are properly enforced by
database integrity constraints.

2. Relational databases provide the ability to deal with larger datasets,
as long as data are structured coherently and they abide by conventions.

3. Relational databases offer almost infinite number of possible permutations to
slice and manipulate the data, based on one's needs, which turns out to be
a huge advantage in data analysis.

4. Relational databases have reputations as a standard and mature tool
for the design, collection, and storage of data, first introduced
and widely utilized since the 1970s.


Sidenote: Types of Relational Databases
******************************

Examples of relational databases are: MySQL, PostgreSQL, SQLite3, etc.

**Question**: Is there a need for all these different relational databases?

**Answer**: There is! These database systems are designed to meet the needs
of a particular task or a certain industry. Although the underlying scheme
is relational, their specifics do differ.



When to Use Relational Databases
******************************

Oracle provides the following guideline in the section *What to Look for
When Selecting a Relational Database*, duplicated below with some degree of
abridgement:

Several factors can guide your decision when choosing among database types
and relational database products. Ask yourself the following questions.

* What are our data accuracy requirements? [Will data storage and accuracy
rely on business logic? Does our data have stringent requirements for accuracy?]

* Do we need scalability? [What is the scale of the data to be managed,
and what is its anticipated growth?]

* How important is concurrency? [Will multiple users and applications need
simultaneous data access? Does the database software support concurrency
while protecting the data?]

* What are our performance and reliability needs? [Do we need a high-performance,
high-reliability product? What are the requirements for query-response
performance?]





============
Non-relational Database
============

A non-relational database refers to any any database that does not follow
the relational model provided by traditional relational database management
systems.

In non-relational databases, you would not expect to see a table. They instead
utilize a storage model optimized for the specific requirements of the types
of data being stored. Very commonly, data are stored as simple key/value pairs,
or even more often than that, data are stored as JSON documents.

It is worthwhile noting the term NoSQL, which refers to database systems that
do not use SQL for queries (hence No-SQL), but uses other programming languages
to achieve this purpose. For instance, MongoDB uses Javascript, which has a
distinguished advantage in parsing and handling JSON data. Many non-relational
databases also use Python as their querying language.




Advantage of Non-relational Databases
******************************

Relational databases have a number of advantages, which include but are
not limited to the following:


1. Non-relational databases are better in storing and processing large amounts
of unstructured data. Unlike relational databases, it is not obligatory to
relate an object to other ones. Thus, NoSQL databases are more flexible.

2. As a corollary to the first advantage, the fact that non-relational databases
contain data in an unstructured manner makes the iteration and code pushes very
fast.

3. Non-relational databases use object-oriented programming paradigm, which
is easy to use and is widely applicable.




Sidenote: Types of Non-relational Databases
******************************

Examples of relational databases are: MongoDB, DynamoDB, etc.

MongoDB stores data as a JSON file; DynamoDB is a AWS product, usually
lauded for its built-in security and in-memory caching for faster interactions.
Major companies tend to use DynamoDB a lot.




============
Structured Query Language (SQL)
============

Our main purpose is to explore SQL, a standard language for relational
database management systems, which include Oracle, Sybase, Microsoft
SQL Server, Ingres, etc. SQL is a relatively straightforward language, and
it is built on relational logic, which makes it extra useful and easier to learn.

RDBMS, which stands for Relational Database Management System, is the underlying
form of SQL, and as we have seen above, data in an RDBMS are stored in objects
called **tables**, which might look as follows:


.. code-block:: console

    +----+----------+-----+-------------+-------------------+
    | ID | NAME     | AGE | DEPARTMENT  | FAVORITE_NUMBER   |
    +----+----------+-----+-------------+-------------------+
    |  1 | Keith    |  32 | CS          |  137              |
    |  2 | Chris    |  54 | CS/Ling     |  1                |
    +----+----------+-----+-------------+-------------------+


This table can have a name! We can call it ``PROFESSORS``. (It is a convention
to name the table with uppercase letters only.)

A table has smaller entities called **fields**. ``PROFESSORS`` table
consists of ID, NAME, AGE, DEPARTMENT, and FAVORITE NUMBER fields.

Before getting into the syntax of SQL, we need to know a special value that
can appear in a table: NULL. NULL signifies that the value/entry in the field
is blank or NaN. Note that ``NULL != 0`` or ``NULL != (empty string)``.




Syntax of SQL
******************************

** CREATE statement **

``CREATE`` allows us to create a new table in the database.

.. code-block:: console

    CREATE TABLE professors (
        id INTEGER,
        name TEXT,
        age INT,
        department TEXT,
        fav_num INT
    );


** SELECT statement **

``SELECT`` allows us to fetch data from a database. You can either select
column(s) from a particular table, or can select all columns from a table.

.. code-block:: console

    SELECT column1, column2, ..., columnn FROM professors;
    SELECT * FROM professors;


** INSERT statement **

``INSERT`` allows us to insert a new **row** into a table.

.. code-block:: console

    INSERT INTO PROFESSORS (id, name, age, department, fav_num) VALUES (3, MTL, 61, Dean, 100);


** ALTER statement **

``ALTER`` allows us to add a new column to a table.

.. code-block:: console

    ALTER TABLE PROFESSORS ADD COLUMN fav_book TEXT;


** UPDATE statement **

``UPDATE`` allows us to edit/change a row in a table.

.. code-block:: console

    UPDATE PROFESSORS SET fav_book = 'C++ Programming Language Guide' WHERE name = 'Keith';


** DELETE statement **

``DELETE`` (or more specifically, ``DELETE FROM``) allows us to delete
one or more rows from a table.

.. code-block:: console

    DELETE FROM PROFESSORS WHERE favorite_book IS NULL;



** WHERE keyword **

``WHERE`` allows us to restrict our query results to a certain condition

.. code-block:: console

    SELECT * FROM PROFESSORS WHERE fav_num > 100;

The common comparison operators (=, !=, >, <, >=, <=) are used in SQL.



** AND/OR keywords **

``AND`` operator allows us to combine multiple conditions where both conditions
must be met, used in tandem with ``WHERE` keywords.

.. code-block:: console

    SELECT * FROM PROFESSORS WHERE fav_num > 100 AND age BETWEEN 20 AND 60;


Likewise, ``OR`` operator allows us to combine multiple conditions where at least one of
the conditions must be met, used in tandem with ``WHERE`` keywords.

.. code-block:: console

    SELECT * FROM PROFESSORS WHERE fav_num > 100 OR age BETWWEEN 20 AND 60;



** ORDER BY keyword **

``ORDER BY`` allows us to sort the results, either alphabetically or numerically.

.. code-block:: console

    SELECT * FROM PROFESSORS ORDER BY name;
    SELECT * FROM PROFESSORS ORDER BY name DESC;



** LIMIT keyword **

``LIMIT`` allows us to specify the maximum number of rows the result will have.

.. code-block:: console

    SELECT * FROM PROFESSORS LIMIT 10;




** COUNT function **

``COUNT()`` function allows us to count the number of **non-empty** values in
a column. The input is the name of a column.

.. code-block:: console

    SELECT COUNT(*) FROM PROFESSORS;




** SUM function **

``SUM()`` function allows us to return the sum of all the values in the
specified column.

.. code-block:: console

    SELECT SUM(AGE) FROM PROFESSORS;




** MAX/MIN functions **

``MAX()`` function allows us to return the largest value in the specified column,
and ``MIN()`` the smallest value.

.. code-block:: console

    SELECT MAX(AGE) FROM PROFESSORS;
    SELECT MIN(AGE) FROM PROFESSORS;



** AVG functions **

``AVERAGE()`` function allows us to return the average of the values in a specified
column.

.. code-block:: console

    SELECT AVG(AGE) FROM PROFESSORS;




** GROUP BY statement **

``GROUP BY`` statement allows us to arrange identical data into **groups**,
used in tandem with ``SELECT``.

.. code-block:: console

    SELECT age, COUNT(*) FROM PROFESSORS GROUP BY age;

    // identical to, for instance:

    SELECT COUNT(*) FROM PROFESSORS WHERE age = 20;
    SELECT COUNT(*) FROM PROFESSORS WHERE age = 40;
    SELECT COUNT(*) FROM PROFESSORS WHERE age = 60;



** DISTINCT keyword **

``DISTINCT`` keyword allows us to filter duplicate values and return rows
of specified column. 


.. code-block:: console

    SELECT DISTINCT fav_book FROM PROFESSORS;




** INNER JOIN keyword **

``INNER JOIN`` allows us to select records that have matching value in **two
or more** tables. Assume that there is another table called ``CSFACULTY`` that
contains faculty members in the Computer Science Department.


.. code-block:: console

    SELECT name FROM PROFESSORS INNER JOIN CSFACULTY ON PROFESSORS.name = CSFACULTY.name;











=========================
Licensing and Attribution
=========================

Copyright (c) 2020 U8N WXD (https://github.com/U8NWXD) <cs.temporary@icloud.com>

|license|

.. |license| image:: https://i.creativecommons.org/l/by/4.0/88x31.png
   :target: http://creativecommons.org/licenses/by/4.0/

This work, including both this document and the source code in the associated
GitHub repository, is licensed under a `Creative Commons Attribution 4.0
International License <https://creativecommons.org/licenses/by/4.0/>`_.

This work was initially created for a workshop at
`Stanford Code the Change <http://www.codethechange.stanford.edu>`_.
