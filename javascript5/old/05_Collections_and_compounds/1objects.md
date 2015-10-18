First, let's recap JavaScript values.

We talked about how expressions always resolve to exactly one value and that value must be one of the JavaScript data types
(undefined) (null) (boolean) (number) (string) (reference to an object)

A value of the undefined data type can only ever be the undefined value.

A value of the null data type can only be the null value.

A boolean value can be either one of two possible values: true or false.

A number value can represent any one numerical value, or any of a few special values like NaN, -0, +0, -Infinity, +Infinity. Due to quirks in how floating point numbers work, fractional arithmetic is often only an estimation, and not even the closest possible estimation. Arithmetic on positive or negative floating-point integer values of trillions or smaller (-1.8e+16 .. +1.8e+16) will always be exact.

> 0.1 + 0.2 === 0.3
< false
> 0.1 + 0.2 <= 0.30000000000000001
< false
> 0.1 + 0.2 >= 0.30000000000000004
< true
> 0.3
< 0.3
> 0.1 + 0.2
< 0.30000000000000004
> (0.30000000000000002)
< 0.30000000000000004
> (0.30000000000000001)
< 0.3
> 1.0 + 2.0 === 3.0
< true

A string value represents a series of characters. A string can be of length zero or longer, with an extremely long limit you're not likely to ever reach. Strings are immutable, meaning you can't change them. If you want to change a string, you need to create a new string with the changed content you want and use that new one instead. Strings are considered primitives in JavaScript because the language behaves just exactly as if the strings were a single value stored directly in a variable. However, strings are also objects, meaning they come with properties you can manipulate and use, just like any object.

This brings us to the final JavaScript data type: reference to an object.

In the JavaScript world, an object is a data structure that JavaScript knows how to create and manipulate in memory, designed to be used as a key-value store. An object is a collection of zero or more properties, and each property is a pair of two values: a key and a value. The key is *always* a string even when it looks like something else, and the key must be unique among all the keys of the object. The value can be any JS data type, including a reference to an object.

Just as you can describe a string with a string literal in your code, quotation marks around some characters, you can describe an object's contents with an object literal. JavaScript provides a special syntax for object literals to let you describes an object's contents so the interpreter can build a populated (already filled-in) object with the properties you specified. It uses the curly braces like this:

    { key: value, another_key: another_value, ... }

The key can either be a string literal or number literal or an identifier token (series of characters that conform to variable naming rules, but often along looser rules; some interpreters allow numeric characters at the beginning). Whatever the code in the key position looks like, it represents a string no matter what. IT IS IMPOSSIBLE FOR AN OBJECT TO USE ANYTHING OTHER THAN A STRING AS A KEY, SO EVERY KEY OF EVERY OBJECT IS ALWAYS COERCED TO A STRING. If you want more control over what characters make one of your keys in an object literal, you need to use quotes to use a string literal in your key position. You can't have a variable lookup or operator in the key position of an object literal. If you want to create a property with a key built from an expression, you'll need to write code to add that property to your object after it has been created.

Next comes the colon and the value that pairs with that key. The value is specified by any expression to be evaluated and the result will become the value of that property. Any data type can be a property value, but only a string can be a key. The same value can pair with as many keys as you want, but each key must be a unique string with no key exactly identical character-for-character to any other key in an object. You can have the identical key in another object, but if you try to have the same key twice in the same object, the most recent value will just overwrite the earlier value.

Let's build an object using object literal notation:

    person = { name: "Amelia Bedelia", age: 29, isFictional: true };

This is a statement made of an expression in the form

    variable = object_built_from_literal

When this line of code executes, the interpreter will follow these steps:
    1. Create an object somewhere in memory with those three properties in it
    2. Resolve `{ name: "Am...al:true }` to a reference to that new object
    3. Overwrite whatever value was in the `person` variable with that reference

So what's a reference to an object?

Whenever JavaScript creates a new object, it puts it into the heap of memory that it manages for you. In a lower-level language like C, you'd have to allocate your own memory and keep track of where you put things and then free that memory up for something else to use whenever you are done with a chunk of memory. If there's any pathway through your C code that doesn't free up all the memory you allocated, that's called a "memory leak". It's hard to write code that properly manages memory allocation. JavaScript does this for you. All you need to do is write code that asks the interpreter to create some large or small piece of data, and it allocates the memory, puts the data there, and returns a reference to that data. You don't need to see the reference. It's a special long number that tells the interpreter how to find an object in memory. You never need to see it. In fact, you have to resort to extraordinary measures to see a JavaScript object reference number. Your JavaScript variable contains this reference number, but if you try to look at it through JavaScript, for instance by casting an object (which is really a reference number that tells the interpreter where to find an object) to a number, all you get is `NaN`. It's in there, but there's no way to see it using JavaScript.

After this line of code runs
    person = { name: "Amelia Bedelia", age: 29, isFictional: true };
we have an object somewhere in memory, and a reference to that object in the `person` variable. If our program forgets where to find that object, or how to find something that knows how to find it, the object is lost forever to our script. If we were to have the next line of code say
    person = true;
the object reference will have been overwritten with some other value (boolean true), and now since nothing in our program remembers where that object is, we can never get it back. Now it's eligible for garbage collection, meaning the memory occupied by that forgotten object can be reclaimed for some other purpose as needed. We'll learn about the garbage collector later. Just know it's a part of every JavaScript interpreter that finds forgotten objects and frees up their space for re-allocation to other uses so you don't have to write code to manage memory yourself.

Suppose I'm my own grandpa. Here's an object representing myself:
    myself = { mama: myMotherObject, grandpa: myself };
This doesn't quite do what I want:
    1. Create an object somewhere in memory with two properties in it
        a. This object has a property with whatever was in `myself` from before this object was created
    2. Resolve `{ ... }` to a reference to that new object
    3. Overwrite whatever value was in the `myself` variable with that reference
To make this really work, I need to overwrite grandpa with the new value. Here's a line of code that will do that. You'll learn how to use it later.
    myself.grandpa = myself;

Now I'm really my own grandpa. Here's a snippet of code. Open a window in your Chrome web browser and type this into the URL bar

    about:blank

Every browser will respond by creating a completely empty web page with nothing in it. Now when you open a JavaScript console from this absolutely blank page, it will not interact with anything unexpected. A real web page might have created and left some objects and variables hanging around in the JavaScript memory area, and those objects might somehow interact with yours. Other pages may be open, but a Chrome console only sees the JavaScript environment of the browser window it was opened from. Each page gets its own separate JS memory space.

Now paste this code into your Chrome console.

    var eve = null;
    var myMother = { name: "Gladys", mom: eve };
    var myself = "This is a string.";
    debugger;
    myself = { mom: myMother, grandpa: myself };
    myself.grandpa = myself;

When you press enter, you should see a debugger window come to the foreground with execution paused on line 4 `debugger;`. If not, try clicking on the sources tab, and if you see more than one inner tab with weird names, click through those until you find this piece of JS code.

Stepping execution by one line will pause execution just before
    myself = { mom: myMother, grandpa: myself };
begins to execute.
Remove any leftover watch expressions from the last debugging session and add these watch expressions:
    typeof eve
    eve
    typeof myMother
    myMother
    typeof myself
    myself

`typeof` is a unary operator. Not all operators have to be weird characters. This one is a weird word. It's unary in the sense that it resolves to one value from one other value. All operators resolve to one value. Unary operators operate on one value. Every value that is possible in the JavaScript language must be one of these
    (undefined) (null) (boolean) (number) (string) (reference to an object)
Every string that is possible for `typeof` to resolve to must be one of these
    "undefined"   "boolean"   "number"   "string"   "object"
There's one missing.

`typeof null` resolves to "object". Does this mean the null value is a weird kind of JavaScript object?

No! You might have heard that null is an object in JavaScript. It is not. You can't use it like an object. It's not an object. It is... it is... null. Even so, `typeof null` is "object". This is universal JavaScript behavior. Like so much of JavaScript, it is wrong, but consistently wrong in all implementations of JavaScript, so you can write code that relies on this behavior.

null is a data type. Why does `typeof null` not produce the string "null"?

The time has come for a thumbnail history lesson. Like so much of what happens in the modern world, this typeof teeny-tiny atrocity owes its existence to inter-corporate sabotage and business gamesmanship. In a previous decade, Microsoft was concerned that some web browsers, the web itself, and even the Internet itself were not a wholly-owned subsidiaries of Microsoft. When Netscape released a version of Navigator containing a hastily written and named DOM-manipulation language, Microsoft rapidly reverse-engineered that language, painstakingly documented all the behaviors in exquisite detail -- bugs and all -- and created their own version of JavaScript for Internet Explorer called JScript. Microsoft steadfastly refused to fix any bugs in JScript, so any code written for a debugged version of JavaScript would not work in the forever-broken JScript. As ever more JavaScript code appeared, and as ever more web users were browsing through IE with JScript, Netscape decided to keep the bugs in JavaScript, and just pretend that's how it was meant to be. These bugs have been with us to this day, two decades later.
https://en.wikipedia.org/wiki/Embrace,_extend_and_extinguish

So null is not an object, despite what you may have heard from the grapevine of from the typeof operator. The null value is the only possible value of the null data type, and it is mis-reported by typeof.

Now back to the debugger. We're paused at `myself = { ... };` about to run that statement. The watch pane shows `eve` has `null` which claims to be an object but isn't. `myself` has a string "This is a string." `myMother` has an object that really is an object. Actually, `myMother` doesn't technically have an object either. The variable named `myMother` contains a little piece of data, a JavaScript *reference* to an object. The data that describes that object is somewhere in JavaScript's memory heap. The reference describes to the JavaScript interpreter where to find the object.

Exactly one value (one single specimen of any of the possible data types) at a time can be "in" a variable. In the case of every data type other than `object` the data "in" the variable is the actual value. In the case of an object, the thing "in" the variable is a reference to the object, and the data that describes that object is stashed somewhere in the memory heap.

Let's play with the debugger to reveal this. Step the line `myself = { ... };` pausing at line `myself.grandpa = myself;`. The highlighted statement is the one about to be executed. You can't step backward with the debugger, only forward.

Now the variable myself has an object. Remember when we say a variable has an object, this is shorthand for "has a reference to an object". This is a source of confusion for many beginners, but not us. The debugger gives us no special notation for "reference to". Mine shows a variable name in purple, a colon in black and a value in red. Variables with references to objects have a little twirly triangle to the left and the black word "Object" to the right. Okay, perhaps that's the special notation for "reference to". Since the "object" data type is the only one that's by reference, and since there's no other way to use an object than by the "object" data type, we can say that any special treatment of objects is our reminder that the variable has a memory reference as its value. Really, we just remember that all objects in JS are by reference, and everything else is by value.

Twirl the triangles to look inside the objects. You may see some unfamiliar underscorey names like `__proto__` That is a property put there by your JavaScript interpreter to make things work. You can ignore any such properties, or explore them when you are feeling adventurous. The two properties of each object created by our code are shown.

The object called `myself` (or more precisely, the object in memory that is identified by the reference stored in the variable called `myself`) has two properties specified by our code, `mom` and `grandpa`. These two properties are not variables, but they behave very much like variables. Each variable exists in a JavaScript variable namespace context ("variable scope" which you'll learn about later). It has a name and a value. Each property of an object has a key and a value. Early versions of JavaScript actually created secret objects behind the scenes to manage variable scopes, but now the V8 engine does fancier things for managing variables to get the same effect faster. A property can have anything as its value that a variable can have. A property name can be any string, but a variable name must follow JavaScript identifier naming rules. A variable is referenced by name in your code. A property key is referenced either by a square-bracketed string or by an identifier after a dot operator in your code. We'll see examples of this later. For now, remember, variable names stand on their own, and object keys need variables to find the objects, which might themselves lead to more object by reference. These effects all starts in your code with variables.

Here's an expression that uses the dot operator:

    myself.grandpa

and an expression that uses the square bracket operator to the same effect:

    myself['grandpa']

Add both these expressions to your watch list. You may need to drag your watch pane bigger, untwirl some triangles and scroll up to see your plus sign icon in the debugger's GUI. Add both of those expressions. They should mean the same thing.

These operators follow the form
    object.identifier
or
    object[string]
and mean "the value of the property of the object that is keyed by identifier or string". And of course, `object` is not an object, but a reference to an object. (At this point, I hope you're more bored than confused by this belaboring of the point.)

You can use these dot or bracket expressions anywhere you could use a variable, including on the left of the assign (single =) operator.

By JavaScript cultural convention, the dot operator is preferred except when it won't work. The bracket operator is more general. You can use it with a string that doesn't conform to JS identifier naming rules. You can use it with a string stored in a variable. You can use it with a string created by any means. So use the dot operator whenever it works, or the bracket operator when the dot operator won't get the job done.

We're about to execute the statement `myself.grandpa = myself;`. What do you expect to happen in your watch window when you step that line of code?

An earlier line caused the myself variable to have the string "This is a string." Now we're about to overwrite that string with whatever the expression `myself` currently resolves to. That expression is just a variable name, whose value is currently a reference to an object. That object's content can be seen by twirling the `myself` triangle in the watch window or by hovering over any occurrence of `myself` in the off-white code pane. It has `grandpa` with a string, and `mom` with an object. You can similarly drill down into the `mom` object if you're interested.

When we step this line of code it will take the current content of `myself`, a reference to an object, and it will overwrite the string myself.grandpa with that little piece of reference data. So step that line to see it happen in the debugger.

Now the variable `myself` references an object. Inside that object is a property `grandpa` with its own reference to an object. Inside that object is a property `grandpa` that references an object, and so on. It's turtles all the way down.

We haven't broken JavaScript. All we've done is write an object reference into an object property. That reference is to the same object that contains the value, but there's nothing special about it. It creates a reference cycle because if you follow it, you can get back to where you started. If we try to read all the way to the end, we'll never get there, but other than that, there's nothing weird going on here. We asked the interpreter to write a value into a memory location and it did that. No problem. Done.

Let's add another expression to the watch list:
    dissociativeSelf
There is no existing identifier by that name, so you should see a debugger indication that variable doesn't exist. Let's create one using the watch pane. Add this expression to your watch list:
    dissociativeSelf = myself.grandpa.grandpa;
Look inside to see yourself.

Since the property `myself.grandpa` contains a reference to the same object that the `myself` variable contains, you can use `myself.grandpa.grandpa` to reference the same object. That value is a reference to the object originally created in memory when the object literal `{ mother: myMother, grandpa: myself }` was first evaluated as an expression a few lines back. When that literal was evaluated, an object was created and populated, and that literal resolved to a reference to that newly created object, which was then available for the `=` operator to write into the variable `myself`. A later line `myself.grandpa = myself` changed the content of that object, but it's still the same object, so all references to it remain the same. An object can overwrite properties, add and remove properties, and it'll still be the same object. It may become empty or extremely big, but its reference never changes as long as it continues to exist.

Press the refresh circle-arrow of the watch pane to evaluate all its expressions again, including the one that assigns to the `dissociativeSelf` variable. Now edit the `dissociativeSelf = myself` watch expression by double-clicking it. Change it to
    dissociativeSelf.greatGreatGrandpa = myself
Click refresh and see what has happened to all your objects. They all have the new property. Or more precisely, the one object has the new property. All these others are just alternate references to that same object in memory, each of which has its own copy of the same JavaScript object reference value. Really though, there are only four actual copies of these reference values in the JavaScript interpreter's memory. These copies of the reference are in the variable `myself`, and in the object it refers to under the properties `grandpa` and `greatGreatGrandpa`, as well as the variable we created on the fly called `dissociativeSelf`. Our original code didn't have anything to create that variable, but we used the watch pane to execute some code that made one right alongside the variables created by those other lines of code.

So here's the main takeaways:

1. All objects are stored in variables or properties by reference not by value. In other words, the variable contains a little reference to a big object, not the big object itself.
2. Although strings can also be big, JavaScript puts on a convincing act of storing strings by value, not by reference.
3. Unlike strings, objects are mutable. You can change an object's content and it's still the same object. All references to it are still good, even as the content changes.
3. the `typeof` operator provides some limited value in discovering the data type of a piece of data.
4. The null value is not an object, despite what typeof says.
5. The dot and bracket operators do the same thing in different ways.
6. Use the dot operator unless the bracket operator is the only way.

Now experiment with objects on your own. You'll get structured assignments as we go, but get in the spirit of unguided exploration using the tools you know and figuring out some tools you find.
