As we've seen, JavaScript provides us with a key data structure called the "object".

In JavaScript, the built-in data structure that provides us with a key-value store is called an "object". Other programming languages provide a similar data structure called a "hash map", "hash table", or simply a "hash" collection. All these words refer to the concept of a key-value store, which is a collections of properties (key-value pairs). Each property has a key (name) and a value (anything that can fit in one variable). They are designed to rapidly look up the value from the key.

JavaScript is an object-oriented classless language. In a language that supports classes, the word "object" refers to a bundle of variables and code that knows how to operate on those variables, and a "class" is a description of how to make one of those bundles. A class is like a blueprint for a particular kind of building, and any number of individual buildings may be created according to that blueprint.

JavaScript was intended to facilitate programmers organizing their code into objects but it took an unconventional approach to object-oriented programming. JavaScript has no concept of a class, and yet it can create any number of similar objects. In JavaScript parlance, the word "object" means key-value collection. Any reference to a function (a kind of JS object with a special code-management talent) may be the value of any property (key-value pair). Object-oriented programmers refer to a function that an object carries around as a method.

Here's an example. Let's pretend we're building a social network. Each user knows its own name, knows its list of friends, and also knows how to acquire a new friend.

var me =
    { name     : "Ebineezer Scrooge"
    , friends  : [ 5791, 3877, 3038 ]
    , befriend : function(userId){ this.friends.push(userId); }
    };

When that statement finishes executing, there will be three new objects on the memory heap...
    (ref#1)   [ 5791, 3877, 3038 ]
    (ref#2)   function(userId){ this.friends.push(userId); }
    (ref#3)   { "name":"Ebineezer Scrooge" , "friends":(ref#1) , "befriend":(ref#2) }
...and one new variable...
    me == (ref#3)

The example here introduces the `this` keyword, which is a universal identifier for an object from within that object's methods. There are many subtleties to what `this` actually means, but that's a decent first approximation at this introductory level of understanding.

Now that we have a user object and a `me` variable referencing it, we can do something like this:

    me.befriend(2271);

That will cause that user to acquire one more user ID on its `friends` array. Here's how
    1. Find `me` variable's contents: (ref#3)
    2. Dot operator means treat the left value (ref#3) as a reference to an object, and the
       right value "befriend" as a key into that object, leading to property value (ref#2).
    3. Trailing parentheses means treat the (ref#2) as a reference to a function and call it,
       passing 2271 as the only argument, and bind (ref#3) as `this` because `me` is left of dot.
    4. Run (ref#2) function's only statement: `this.friends.push(userId);`
        1. (this.friends) means (ref#3)["friends"] which means (ref#1)
        2. (ref#1).push means the `push` method that comes with JS arrays.
        3. Trailing parentheses means call Array.push with (ref#1) as `this` and 2271 as argument.
        4. This lengthens the array by one element at the end with 2271 in that new element.
    5. Return from Array.push function and then from (ref#2) function.


Perhaps we read the data from a database