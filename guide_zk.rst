========================================
An Introduction to Zero Knowledge Proofs
========================================

One of my `instructors <https://people.csail.mit.edu/henrycg/>`_
shared that he would have a funny daily conversation with his dad:

- Dad: "How was school today?"
- Middle Schooler: "Fine."

Understandably, a father might be frustrated with the same response each day.
Why? One could argue that this father might not be learning much about his
son's day. Indeed, this idea captures a fundamentally important idea in
complexity theory and cryptography: zero-knowledge proofs.

-------------
Proof Systems
-------------

First, let's define how proofs work in computer science. We will define two
parties: a *prover* :math:`P` and a *verifier* :math:`V`. :math:`P` and
:math:`V` can communicate and send messages to each other. :math:`V`
can output "accept" if :math:`V` is convinced by :math:`P` and "reject"
otherwise. :math:`V` can only run in polynomial in the length of the
statement in question. :math:`P` and :math:`V` can also use randomness.
Here are some example statements a prover may try to prove to the verifier:

- Is a boolean formula `satisfiable <https://en.wikipedia.org/wiki/Boolean_satisfiability_problem>`_?
- Can a graph's nodes be assigned `three different colors <https://en.wikipedia.org/wiki/Graph_coloring#Computational_complexity>`_ such that no two adjacent
  nodes are the same color?
- Given a set of integers, is there a `subset whose sum is zero <https://en.wikipedia.org/wiki/Subset_sum_problem>`_?
- Given a group :math:`\mathbb{G}` with a generator
  :math:`g \in \mathbb{G}`, what is the `discrete logarithm <https://en.wikipedia.org/wiki/Discrete_logarithm>`_
  of :math:`g^x` for some :math:`x\in\mathbb{G}`?

.. note:: The first three examples are all
    `NP-Complete <https://en.wikipedia.org/wiki/NP-completeness#NP-complete_problems>`_ problems,
    so it is widely believed that
    :math:`V` will not be able to determine the answer in polynomial time themselves. This
    is why :math:`P` is needed in the first place.

.. note:: This fourth problem is a different form than the previous three. In fact,
    it is a *search problem* ("what is the answer") as opposed to a decision problem
    ("is this true or false").
    This problem doesn't have as strong computational hardness as the previous three but is also assumed to
    be hard for classical (non-quantum) computers.
    If you have a way to solve this problem efficiently for elliptic curve groups with classical computers,
    contact your nearest `cryptographer <https://en.wikipedia.org/wiki/Discrete_logarithm#Cryptography>`_ immediately.


.. note:: For budding complexity theorists, this definition of a proof system
    loosely encapulates the complexity class `IP <https://en.wikipedia.org/wiki/IP_(complexity)>`_.

-------------------------
Definining Zero Knowledge
-------------------------
In what sense can a proof system be zero knowledge?
At first glance, proving information without giving away information sounds
like a paradox. Let's say in English that a zero knowledge proof should prove
that a statement is true
**without giving away information beyond the fact that the statement is true**.

Let's ground this idea with some examples:

- Prove that a graph is 3-colorable without giving away any information about
  how to color it.
- Prove that a boolean formula has a satisfying assignment without giving away
  anything about the assignment.
- Prove that some cryptocurrency was given to you `without giving away anything
  about who previously owned that token <https://z.cash/>`_.
- Prove that you know the discrete logarithm of :math:`g^x` without giving away
  anything about :math:`x`.

.. note:: Similarly to our decision versus search problem discussion, the first three proofs
    are proofs of the truth of a statement. The last proof isn't about whether a statement is true
    but instead is defined as a "zero-knowledge proof of knowledge."


------------------
A Cool Application
------------------
Let's perform the ultimate test of who are your real friends:
who knows your birthday?

Now, imagine that you were with a group of friends who can all listen in.
Some of your friends claim that they know the answer.
You would like to allow these arithmetic pros to prove
to you that they know
the answer without giving away the answer to your other friends
who are listening. Even more, you want to allow your friends
that *know* your birthday to convince your friends that *don't* know
your birthday that they know your birthday without giving away your birthday.

The crazy thing: this can be done!

------------------------
Schnorr's Sigma Protocol
------------------------
First, let's encode your birthday as an integer: MMDDYYYY.
For example, if you birthday is Jan 10, 1938, then your encoding would be
01101938.
Choose some super large cyclic group :math:`\mathbb{Z}_p=\{0,1,\ldots, p-1\}`
where
:math:`p=2q+1` for some *huge*
primes :math:`q` and  :math:`p` (let's say around :math:`2^{2048}`).
Since our :math:`P` and :math:`V`
are humans, let :math:`p=2000000579`.

.. note:: If you want to know how I picked :math:`p`, check out this `page <https://www.doc.ic.ac.uk/~mrh/330tutor/ch06s02.html>`_.
    This careful choice of :math:`p` is to make the discrete logarithm for this group difficult.

Choose any :math:`g\neq 0,1 \in \mathbb{Z}_p` as our
generator for :math:`\mathbb{Z}_p`. Next, let :math:`x`
the encoding of our birthday. Publish :math:`h=g^x` to your friends.
We assume it is hard for them to be able to find :math:`x` given :math:`g^x`
beyond brute forcing the solution.
If your appearance doesn't give away
your age, let's assume that there are about :math:`36,500` possibilities
and that a human thus would really
struggle to brute force guess the answer.

.. note:: In this toy example, brute forcing the answer (guessing :math:`a`'s and cheking if :math:`g^a=g^x`) via a computer is easy.
    Most computer science problems have a much larger output space such that brute forcing a solution
    would be infeasible. As such, our goal will be to make brute forcing be a forgetful friend's best strategy
    to figure out the answer.

In this case, your friend is the prover, and you are the verifier.
In fact, even your friends who **don't** know the answer could be the
verifier themselves!
Here is the protocol:

+--------------------------------------+-----------------------+-------------------------------------+
| :math:`P(x, h=g^x)`                  |                       | :math:`V(h=g^x)`                    |
+--------------------------------------+-----------------------+-------------------------------------+
| :math:`r \rightarrow^R \mathbb{Z_p}` |                       |                                     |
+--------------------------------------+-----------------------+-------------------------------------+
| :math:`u \leftarrow g^r`             |                       |                                     |
|                                      | :math:`\rightarrow u` |                                     |
+--------------------------------------+-----------------------+-------------------------------------+
|                                      |                       | :math:`c \rightarrow^R \mathbb{Z_p}`|
|                                      | :math:`c\leftarrow`   |                                     |
+--------------------------------------+-----------------------+-------------------------------------+
|  :math:`z \leftarrow r+cx`           |                       |                                     |
|                                      | :math:`\rightarrow z` |                                     |
+--------------------------------------+-----------------------+-------------------------------------+
|                                      |                       |     "Accept" if :math:`g^z==u*h^c`  |
+--------------------------------------+-----------------------+-------------------------------------+  


------------------------------------------
How to Try It Using the Python Interpreter
------------------------------------------
**Note: This tutorial is an instructive toy example. This code should not be used for any real application.**
**For example, this code does not protect against side channel attacks and stores private values in terminal memory.**

Pick some friends and try this out!
You can easily do all this arithmetic using the Python Interpreter,
which we will demonstrate below.

For the person who wants to poll who knows their birthday, they should compute
their public value as follows (without anyone looking at their screen):

.. code-block:: console

    >>> g = 5 # public parameter
    >>> p = 2000000579 # public parameter
    >>> x = 1101938 # Don't let anyone peek! Jan 10, 1938
    >>> h = pow(g,x,p) # more efficient than (g**x) % p
    1880666247

For the friend :math:`P` that wants to prove that they know your birthday,
have them begin with this code (do not let anyone take a peek at your screen!).

.. code-block:: console

    >>> from random import SystemRandom
    >>> gen = SystemRandom()
    >>> g = 5 # public parameter
    >>> p = 2000000579 # public parameter
    >>> r = gen.randrange(p)
    >>> u = pow(g,r,p)
    >>> print(u) # send to V
    1706406692

Send :math:`u` to the verifier friend :math:`V`. :math:`V` should then run this code
on their computer.

.. code-block:: console

    >>> from random import SystemRandom
    >>> gen = SystemRandom()
    >>> g = 5 # public parameter
    >>> p = 2000302 # public parameter
    >>> u = 1706406692 # From prover, let's keep this for later
    >>> c = gen.randrange(p)
    >>> print(c) # send to P
    107041050

Next, P should receive :math:`c` and run this code:

.. code-block:: console

    >>> c = 107041050 # from V
    >>> z = r+c*x
    >>> print(z) # Send to V
    1181831844243911

Finally, V should perform this final check:

.. code-block:: console

    >>> h = 1880666247 # from person who's birthday I should know but don't.
    >>> z = 1181831844243911 # from prover
    >>> print("They know that person's birthday" if pow(g,z,p) == (u * pow(h,c,p)) % p else "They're lying! They don't know their birthday")
    They know that person's birthday



-------------------------
Zero Knowledge Formalisms
-------------------------

This is a more formal treatment of a zero knowledge proof.
Feel free to skip this section.
Let :math:`(P,V)` be an interactive proof system for a language :math:`L`
(a "language" is a complexity theory formalism. Essentially, treat
:math:`x\in L` as "x is true"). This proof system is *zero-knowledge*
if it satisfies the following properties :math:`\forall x`:

    - *Completeness*. :math:`x\in L \implies Pr_\text{P,V's randomness } [V \text{ accepts running} (P,V)] = 1`
        In English, this means that an honest prover and verifier should cause the verifier to accept if x is true.
    - *Soundness*. :math:`\forall P^* (x\not \in L \implies Pr_{\text{P,V's randomness }}[V \text{ accepts } (P^*,V)])< \frac{1}{3}`.
        In English, this means that malicious provers should only be able to trick an honest verifier that a statement is true
        with low probability.
    - *Perfect Zero Knowledge*. :math:`\forall V^* \exists \text{ efficient S such that } \forall x \in L: \{Sim(y)\} \approx \{View_{V^*}((P,V^*)(x))\}`
        In English, this means an efficient algorithm should be able to generate the transcript of the protocol
        without even knowing whether :math:`x` is true or not. If the transcript can be generated without the knowledge
        of the answer, then the transcript must give away zero knowledge! In order to preserve completeness and soundness,
        the resulting proof system **must** be randomized.

There are many variants of this definition of zero knowledge:

    - *Honest-Verifier ZK* only requires the simulator to produce identical
        distributions for the honest verifier :math:`V` for the protocol.
        In other words, the verifier is expected to behave honestly,
        but malicious verifiers may be able to learn information by
        deviating from the protocol.
    - *Statistical ZK* relaxes the requirement that the transcript/view distributions are
        identical and instead makes the similarity function allow for some
        negligible difference (as a function of some security parameter)
        in probability for any given state in the distribution.
    - *Computational ZK* requires that all polynomially bounded algorithms should be
        unable to distinguish the transcript/view distributions (relying on some security assumptions).

----------------------------------------------------------------
An Aside About Completeness and Soundness for Schnorr's Protocol
----------------------------------------------------------------

Completeness and soundness properties are what define
an interactive proof system, so I will briefly explain
the analysis for Schnorr's protocol. Note that if :math:`P`
is honest, then :math:`g^z=g^{r+cx}=g^rg^{cx}=u(g^x)^c=u*h^c`,
satisfying completness. This part is not vital fo the idea of zero-knowledge,
so you can skip this section.

Soundness is somewhat trickier. In fact, our ZK formalisms don't quite apply
here, as those definitions were for decision problems, not search problems.
Instead, we could say that soundness means
"a poly-time adversary without :math:`x` should only be able to produce
:math:`z` where :math:`g^z=u*h^c` with negligible probability." We could prove
this definition of soundness by using an adversary that would
break soundness for Schnorr's
Protocol to create an adversary that would break some widely
held security assumption, such as the
`Decisional Diffie Hellman <https://en.wikipedia.org/wiki/Decisional_Diffie%E2%80%93Hellman_assumption>`_ assumption
or discrete log assumption.
This proof format is a `security reduction <https://en.wikipedia.org/wiki/Provable_security>`_and is widely
used in cryptgraphy.

Similarly, one could define a variant of soundness for Proof of Knowledge systems.
Namely, the scheme should satisfy a proof of knowledge requirement. Formally, this means
that an efficient algorithm :math:`E` called the "extractor" can, 
with black box access to :math:`P`, determine the hidden value. In our setting:

:math:`\forall x,h, P^* Pr[g^x=h : x \leftarrow E^{P^*}(h)] \geq Pr[(P,V)(h)=1]-\epsilon`
where :math:`\epsilon` is considered the *knowledge error*.

Here would be our extractor algorithm:

+-----------------------------------------------------------------------------------------------+
| Run :math:`P^*` to determmine :math:`u`.                                                      |
+-----------------------------------------------------------------------------------------------+
| Send :math:`c_1 \rightarrow^R \mathbb{Z_p}` to :math:`P^*` and get response :math:`z_1`       |
+-----------------------------------------------------------------------------------------------+
| Rewind the prover :math:`P^*` to its state after the first message.                           |
+-----------------------------------------------------------------------------------------------+
| Send :math:`c_2 \rightarrow^R \mathbb{Z_p}` to :math:`P^*` and get response :math:`z_2`       |
+-----------------------------------------------------------------------------------------------+
| Output :math:`\frac{z_1-z_2}{c_1-c_2}\in \mathbb{Z}_p`                                        |
+-----------------------------------------------------------------------------------------------+

Here, the algorithm fails if :math:`c_1-c_2=0` which happens with probability :math:`\frac{1}{p}`.
As a result, the knowledge error is :math:`\frac{1}{p}` for provers that always convince the verifier.

In this way, a verifier


-------------------------------------------------------
Proving that Schnorr's Sigma Protocol is Zero Knowledge
-------------------------------------------------------
Our goal is to construct an efficient algorithm that
will produce a distribution identical to a verifier's
view of the protocol. We will only prove HVZK: the
non-interactive version of Schnorr's Protocol will
automatically become strongly zero knowledge against
even malicious verifiers because the protocol transcript
will not depend on the verifier at all.

Consider the following algorithm :math:`S`:

+---------------------------------------+
| :math:`z \rightarrow^R \mathbb{Z_p}`  |
+---------------------------------------+
| :math:`c \rightarrow^R \mathbb{Z_p}`  |
+---------------------------------------+
| :math:`u \leftarrow \frac{g^z}{h^c}`  |
+---------------------------------------+
| Output :math:`(u,c,z)`                |
+---------------------------------------+

Note that we perform the protocol in reverse to guarantee that the verifier's
constraints are satisfied without having to perform difficult discrete
logarithms. We only satisfy honest-verifier ZK because we implicitly assume
that the verifier will generate :math:`c` with uniform randomness.
Next, note that we arrive at strong zero-knowledge because
the transcript/view distributions are identical:
:math:`\forall g,h \in L: \{Sim(y)\} = \{(u,c,z): c,z \leftarrow^R \mathbb{Z}_p, u=\frac{g^z}{h^c} \} = \{(g^r,c,z) : r,c \mathbb{Z}_p, z=r+cx \} = \{View_{V}((P,V)(g,h))\}`

This holds because each tuple :math:`(u,c,z)` is uniformly random
such that :math:`(u,c,z)`
satisfies the constraints :math:`g^z=u*h^c`.


-------------------------
Licensing and Attribution
-------------------------

This tutorial is heavily inspired by the 2019 CS355 
course and lecture notes: https://crypto.stanford.edu/cs355/19sp/about/,
particularly for the details of Schnorr's Protocol and Proof of Knowledge systems. 
Special thanks to `Floran Tramèr <https://floriantramer.com/>`_,
`Dima Kogan <https://www.cs.stanford.edu/~dkogan/>`_, and `Henry Corrigan-Gibbs <https://people.csail.mit.edu/henrycg/>`_
for being such fantastic instructors.

I also found Oded Goldreich's `ZK: A Tutorial <http://www.wisdom.weizmann.ac.il/~oded/zk-tut02.html>`_ to be immensely
helpful in understanding different variations of zero knowledge. I highly recommend starting there to learn more about
zero-knowledge!

Copyright (c) Drew Gregory (https://github.com/DrewGregory) <djgregny@gmail.com>
