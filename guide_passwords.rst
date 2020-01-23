*********************************************************************
Passwords: Cracking, Hashing, Salting
*********************************************************************

==========
Motivation
==========

- https://www.theguardian.com/technology/2019/jan/17/breached-data-largest-collection-ever-seen-email-password-hacking
- https://www.consumerreports.org/digital-security/stolen-emails-and-passwords-surface-online/
- https://motherboard.vice.com/en_us/article/evegxw/collection-one-data-breach-password-hack-what-to-do

Unfortunately, websites get hacked quite frequently.
This can leak the authentication data of millions of users. Because of this,
one must take precautions regarding how we store this authentication data
in the first place.

We will largely be using this phenomenally written article as a resource: https://crackstation.net/hashing-security.htm

This guide will serve as an interactive tutorial to see for yourself
the effects of different representations of account passwords.

=======
Storage
=======
First, `install pipenv
<https://pipenv.readthedocs.io/en/latest/>`_ if you have not done
so already. Clone https://github.com/codethechange/password-storage-workshop.git,
and then run ``pipenv install`` followed by ``pipenv shell``.
Next, generate a passwords file by running ``python password-geneartor.py``.
That should create a ``passwords.json`` file. This is a simulated dump of
username-password pairs, consisting of a fair proprtion of the
`most popular passwords
<https://www.esquire.com/lifestyle/a25570880/top-passwords-2018/>`_ coupled with
passwords comprised of concatenated dictionary words as well as random strings.
Imagine as an adversary that this is a dump of passwords you acquired.

=========
Plaintext
=========
Alas, if you store your passwords in plaintext, it is automatically game over.
If the wrong eyes reach this password dump, they can appear as any user on your platform.
Let's try to avoid this.

=======
Hashing
=======
Run ``python hash-passwords.py`` to generate ``hashed-passwords.json``. Imagine that this
is the dump you, as an adversary, maliciously fetched from some poor web platform.
To log in, the server hashes your provided password and see if the resulting hash matches
the entry in the database corresponding to your username. This may seem secure out first glance,
but we can easily concoct a lookup table. Run ``python hash-dictionary.py`` to generate a lookup
table for all passwords that are dictionary words. Lookup tables cover many other variations of passwords,
like common passwords in general and words with common substitutions. Next,
run ``python crack-passwords.py`` to find passwords for many users! Also note that
most lookup tables are too large to fit in memory, so `rainbow tables
<https://en.wikipedia.org/wiki/Rainbow_table>`_ are used instead for a time/space complexity tradeoff.

=======
Salting
=======
How could we prevent this lookup table?
Well, we have to essentially require a unique lookup table for each password.
We can produce a unique, random salt for each username-password pair.

Write this code in ``hash-salt-passwords.py``:

.. code-block:: python

    import pandas as pd
    from hashlib import sha256
    import hashlib, binascii
    import json
    from random import choice
    with open('passwords.json') as f:
        d = json.load(f)
    from string import printable
    chars = [c for c in printable if c.isalnum()]
    for i in range(len(d['users'])):
        salt = ''.join([choice(chars) for _ in range(8)])
        m = sha256()
        to_hash = salt + '||' + d['passwords'][i]
        m.update(to_hash)
        d['passwords'][i] = salt + '$' + m.hexdigest()
    with open('salted-passwords.json', 'w') as f:
        json.dump(d,f)


Then we will have the passwords stored in a more secure dump: ``salted-passwords.json``.

Now, try cracking this password with ``crack-salts.py``: 



.. code-block:: python

    # Load table
    words = []
    with open('dictionary.txt') as f:
        for line in f:
            line = str(line).replace('\n','')
            words.append(line)
    # See if we can crack any passwords
    import json
    with open('salted-passwords.json') as f:
        d = json.load(f)
    cracked_users = []
    from hashlib import sha256
    for i in range(len(d['users'])):
        salt, hash_val = tuple(d['passwords'][i].split('$'))
        if i % 10 == 0:
            print(i)
        # Generate salted hash for each word
        for word in words:
            m = sha256()
            m.update(str(salt + word).encode('utf-8'))
            if m.hexdigest() == d['passwords'][i]: # the hash exists! We have found a collision
                cracked_users.append((d['users'][i], word))
                break
    print('Cracked ' + str(len(cracked_users)) + ' passwords!')
    print(cracked_users[-10:])

Not that this takes significantly more time to crack than with no salt.

There are two quick improvements to our salting: a key derivation function, where we can
control the computational difficulty of each resulting hash value, and a cryptographic
PRG.

.. code-block:: python

    import pandas as pd
    from hashlib import sha256
    import hashlib, binascii
    import json
    from secrets import choice
    with open('passwords.json') as f:
        d = json.load(f)
    from string import printable
    chars = [c for c in printable if c.isalnum()]
    for i in range(len(d['users'])):
        salt = ''.join([choice(chars) for _ in range(8)])
        val = binascii.hexlify(hashlib.hmac('sha256', d['passwords'][i].encode('ascii'), salt.encode('ascii'), 1000000))
        d['passwords'][i] = salt + '$' + val.decode('ascii')
        print(d['passwords'][i])
    with open('salted-passwords.json', 'w') as f:
        json.dump(d,f)

With that being said, check out `this article
<https://medium.com/@mpreziuso/password-hashing-pbkdf2-scrypt-bcrypt-and-argon2-e25aaf41598e>`_ for more info
about the preferred key derivation functions.
