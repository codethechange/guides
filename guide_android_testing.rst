====================
Testing Android Apps
====================

*********
Why Test?
*********

Automated testing has benefits both for the overall organization and for
individual developers. For example, tests help catch problems before code
is shipped to users, lowering the costs of fixing. A solid set of tests that
thoroughly check all functionality also let developers experiment more and take
risks, safe in the knowledge that they won't break any existing functions
without a test letting them know.

*************
Writing Tests
*************

----------------
Types of Testing
----------------

Classifications of Tests:

* Unit Tests: Small, fast tests that check a tiny bit of functionality. For
  example, a unit test for a calculator might check that `1 + 1 = 2`. These
  are usually run in an unrealistic environment so that a small part of the
  product can be tested in isolation. This means that these types of tests can
  miss problems that arise only when different small parts of the product
  interact with each other. The narrowness of unit tests also make it easy to
  pin down a bug, since you know exactly what is tested by each test.
* Integration and End-to-End Tests: Take longer, but test the entire product
  together. This catches more subtle bugs, but those bugs can be hard to catch
  if they aren't caught by a unit test.

Unit Tests
==========

Testing in Android, and in Java more generally, is usually done with
`JUnit <https://junit.org>`_. While the latest version is JUnit 5, the Android
documentation refers to JUnit 4 as the most recent. The testing directory
is ``[module*name]/src/test/java/``, and it is created automatically whenever
Android Studio creates a new project. The following should be included in
your dependencies in ``build.gradle``:

.. code-block:: java

   dependencies {
       // Required -- JUnit 4 framework
       testImplementation 'junit:junit:4.12'
       // Optional -- Mockito framework
       testImplementation 'org.mockito:mockito-core:1.10.19'
       // Optional -- Hamcrest matchers like is()
       testImplementation 'org.hamcrest:hamcrest-library:1.3'
       // Optional -- Robolectric and Android support library needed for JSON
       testImplementation 'org.robolectric:robolectric:3.8'
       testImplementation 'com.android.support.test:runner:1.0.2'
       testImplementation 'com.android.support.test:rules:1.0.2'
   }

This will import the dependencies JUnit and Mockito.

Create one or more testing classes in the testing directory, and fill them
with methods that describe your tests. Methods with tests should be prefixed
with ``@Test`` and use ``assertThat`` statements to check that the expected
results are obtained. Below is one example:

.. code-block:: java

   import org.junit.Test;
   import static org.junit.Assert.assertFalse;
   import static org.junit.Assert.assertTrue;

   public class CalculatorTest {

       @Test
       public void calculator_one_isNumber() {
           assertThat(Calculator.isNumber(1), is(true));
       }
   }

Note that the ``is(true)`` statement is a
`Hamcrest matcher <https://github.com/hamcrest>`_ that serves only to make the
statement more readable.

Handling Dependencies
*********************

Many times, the functionality you want to test relies on code elsewhere in
your project. You could just call that code, but then your test will also fail
if *that* code has a bug. This destroys the value of unit tests, namely that
when they fail you know exactly where the bug is. There are two tools to
handle this: `Mockito <http://mockito.org/>`_ and
`Robolectric <http://robolectric.org/>`_. Mockito lets you define exactly how
you expect the other code to behave, but it can get cumbersome to mock complex
objects like those that are part of Android. For those, Robolectric contains
logic stubs that emulate how Android behaves while still running faster than
test would on an emulator.

These considerations are especially important if you need to use any Android
classes because Android Studio will execute your tests against a dummy version
of the ``android.jar`` library that throws exceptions in response to any call.
This forces you to replace all components of the Android libraries you use
with either mocking from Mockito or Robolectric.

To run your unit tests, right-click the directory of tests and select
``Run tests``.

For more information, see
https://developer.android.com/training/testing/unit-testing/local-unit-tests#java

Mockito
-------

With Mockito, you have to specify how you expect the dependency code to behave.
This is done with
``when([dependency function call]).thenReturn([expected result])`` calls.
For example, imagine if the calculator example from before returned a resource
string that specified the boolean result like so:

.. code-block:: java

   public class Calculator {
       private Context context;

       public Calculator(Context inContext) {
         context = inContext;
       }

       public boolean isNumber(int num) {
           // Any int is a number
           return context.getString(R.string.true)
       }
   }

We could mock the Android Context like this:

.. code-block:: java

   import org.junit.Test;
   import static org.junit.Assert.assertFalse;
   import static org.junit.Assert.assertTrue;
   import org.junit.runner.RunWith;
   import org.mockito.Mock;
   import org.mockito.runners.MockitoJUnitRunner;
   import android.content.SharedPreferences;


   @RunWith(MockitoJUnitRunner.class)
   public class CalculatorTest {

       private static final String FAKE_TRUE = "TRUE";

       @Mock
       Context mockContext;

       @Test
       public void calculator_one_isNumber() {
           when(mockContext.getString(R.string.true)).thenReturn(FAKE_TRUE)
           Calculator calc = new Calculator(mockContext);
           assertThat(calc.isNumber(1), is(FAKE_TRUE));
       }
   }

If you forget to mock something, you will get an error saying that the method
you call is not mocked. To solve this, mock the method as shown above.

.. Robolectric
.. -----------

.. .. todo:: Add notes from Android documentation

.. Instrumented Unit Tests
.. ***********************

.. .. todo:: Add notes from
..    https://developer.android.com/training/testing/unit-testing/instrumented-unit-tests

Guidelines for Well-Structured Unit Tests
*****************************************

* Long, descriptive names are perfect for tests since the method name is often
  what is displayed if the test fails. The name should include the conditions,
  action, and expected output for the test. For example,

  .. code-block:: java

     public class Tests {
       public static boolean whenLoggedOut_givenViewProfile_showGuestView() {
         // Log-out the user
         // Open up a profile
         // Check that the guest version of the profile was returned
       }
     }

* Tests should be focussed on a particular piece of functionality. Leave testing
  of other parts to separate tests. This will help make it easy to debug when
  tests fail. Given any method name of a test that failed, you should know
  exactly where in the codebase the problem is.

.. Integration Tests
.. =================

.. .. todo:: Fill with notes from Android documentation

.. End-To-End Tests
.. ================

.. .. todo:: Fill with notes from Android documentation


***********************
Test-Driven Development
***********************

To take testing even further, you can make writing tests the first thing you
do before writing any code. This forces you to think through how you want
your product to behave before you even start coding. This makes it clearer
what the code needs to do. Developers usually have to do this anyway, but
by doing it through tests instead of while coding, they both avoid writing code
that is later discarded and save time by writing the tests and pinning down
the requirements simultaneously.

Importantly, make sure that the tests you write *fail* at first. If they don't,
there is a bug in the tests.

**********
References
**********

1. https://developer.android.com/training/testing/
   The embedded video in particular
2. https://developer.android.com/training/testing/fundamentals
