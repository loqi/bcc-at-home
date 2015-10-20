Big things are made of little things.

That's how we manage complexity as engineers. We put a bunch of parts together into some configuration to do something, which might in turn be part of something still bigger to do an even more complicated job. To keep the complexity manageable, we limit the amount of interaction that can happen between the parts. The places where one part can touch and interact with another part is called the interface.

Consider a complex machine like a car. A car is one machine made up of smaller machines. If you look at a system of roads and traffic, one car is part of an even bigger system. Going smaller, one car has an engine, transmission, suspension, and each of those parts is itself made of smaller parts. We have names for these parts, like "car" or "engine" or "fuel injector" because it's useful to think of each of these collections of smaller parts as one unit.

The engine has a job to do. It takes in fuel and air through some tubes. It pushes exhaust gasses through another tube, and its whole job is to use those things to forcefully turn a shaft. The world outside the engine doesn't need to know how that engine does its business, all it needs to do is supply the air and fuel, take away its exhaust gasses, and somehow use the mechanical turning of the shaft. If a completely new kind of engine gets the job done in some completely different way, it could be swapped into service, so long as the interfaces all match up. If that engine is to be used in a boat instead of a car, it will still work, so long as the interface matches up. That engine is made of smaller parts that similarly could work in a completely different way than they do, so long as they interface with the things that use them in the same way.

This concept is called modularity. When something needs to be replaced in a mechanical device, you can remove the old part and put in another part just like it. The new one might be better than the old one was, perhaps it's made of stronger or lighter material, or it was made in a less costly way, or perhaps it operates on some newfangled principle on the inside. The new part has to fits in place and do the job, but the way it gets the job done on the inside is its own business. Each part is a module that can be replaced by another module with a compatible interface.

We strive to use functions in a modular way. Each function takes a few argument values, does something with them, and produces just one output value. Let's look at an example from earlier.

    // Count the number of vowels in the string `str`
    var i, vowCount = 0;
    for (i = 0; i < str.length; ++i) {
        vowCount += +("aAeEiIoOuU".indexOf(str.charAt(i)) >= 0);
    }
    // Now `vowCount` has the number of vowels in `str`


Well, that's a fine piece of code. It does something. It counts the number of vowel characters in the string `str`. We can describe its job in one sentence. Let's turn that into a function.

    /* Given a string, this function returns the total number of occurences of the
     * characters { a A e E i I o O U o } in the string.
     */
    function numberOfVowels(str) {
        var i, ret = 0;
        for (i = 0; i < str.length; ++i) {
            ret += +("aAeEiIoOuU".indexOf(str.charAt(i)) >= 0);
        }
        return ret;
    }

That piece of code doesn't actually cause that vowel-counting code to run. That `function` statement covers all the code to its closing `}`. It causes the interpreter to find a suitable chunk of available memory in the JS memory heap, where it creates a function with all those smaller, inner statements inside, along with all the other stuff that a JS function carries around with itself. It also creates a variable `numberOfVowels` whose value is a reference to that brand new function. After that, the function will be ready to use whenever we want. To run it we invoke the function using that variable with trailing round parentheses around any arguments to pass it, like so:

    numberOfVowels("This is a string");
    numberOfVowels("This is another string");

If the `numberOfVowels` variable ever has its value overwritten with another value before being copied somewhere else, we will permanently lose track of our function. The JS interpreter's garbage collector can usually tell when an object (a JS function is a kind of object) no longer has any reachable reference to it, and then it reclaims that object's memory real estate whenever it needs the space.

Now we have a nice little vowel-counting machine, but we could make an any-character-counting machine. We could let the user (the code that calls this function is the user from this function's perspective) specify the characters they're interested in counting:

    function occurrenceCount(searchInStr, searchForCharStr) {
        var i, ret = 0;
        for (i = 0; i < searchInStr.length; i++) {
            ret += +(searchForCharStr.indexOf(searchInStr.charAt(i)) >= 0);
        }
        return ret;
    }

We use it with expressions like these:

    occurrenceCount("This is a string", "aAeEiIoOuU")
    occurrenceCount("This is another string", "aAeEiIoOuU")
    occurrenceCount("abcdadbdadcad", "defgh")

That would get the job done, but it's still a bit cumbersome, and repetitive. Let's use occurrenceCount() as the lower-level workhorse for the higher-level vowelCount() function.

    function occurrenceCount(searchInStr, searchForCharStr) {
        var i, ret = 0;
        for (i = 0; i < searchInStr.length; i++) {
            ret += +(searchForCharStr.indexOf(searchInStr.charAt(i)) >= 0);
        }
        return ret;
    }

    function vowelCount(str) {
        return occurrenceCount(str, "aAeEiIoOuU");
    }

    var a = vowelCount("This is a string");
    var b = vowelCount("This is another string");
    var c = occurrenceCount("abcdadbdadcad", "defgh");

Here, a general-purpose selected-character-counting function is used by a more specific vowel-counting function, each of which is invoked a few times by some other code that wants to do those tasks.

This shows the beginnings of modular design. Here's a good set of guidelines:

    1. Write functions that do one thing well
    2. Have a concise idea for that one thing is and say what it is as documentation
    3. Wherever possible, use existing functions within your new function
    4. If you write code similar to other code, factor out the similarities
    5. If your function is long, it's probably doing more than "one" "thing"

Well written code often looks mostly like a bunch of little functions that call other functions to get their job done. In ocurrenceCount() above, we're using indexOf() and charAt(), two functions that come with JavaScript. Each of those functions does one thing well and uses even more elementary functions within them to get their jobs done.

Functions exist for two principal reasons. 1. you can re-use code, running it again and again as needed. And 2. you can write your code to minimize state leakage or coupling. By passing in all the data a function needs to do its job, and by returning just one value, a function's effects on the data can be clearly seen and understood. The parameters and return value, (as well as read or written global variables if you're being naughty) together constitute that function's "interface".

When a function is called, each parameter receives a *copy* of the original value. Each argument is derived from an expression which is evaluated to a single value, which is then passed to the function's corresponding parameter. Remember that objects are passed by reference, so in that case the actual value is a copy of the reference, not a copy of the object.

This statement from vowelCount()

    return occurrenceCount(str, "aAeEiIoOuU");

executes like this:

    1. look up the content of the local `str` variable, which is expected to be some string
       value. A copy of that string value becomes the first argument.
    2. The string value represented by the string literal will be the second argument.
       A copy of that "aAeEiIoOuU" string value will be the second argument.
    3. Run the function (which is a special kind of object) referred to by the content
       of the variable `occurrenceCount` (which has an object reference, since JS functions
       are objects), passing in the two arguments to populate the parameters of the function.
    4. When that function completes, its return value will be in the expression accumulator.
    4. Whatever value is in the accumulator is what the expression
       `charListCount(str, "aAeEiIoOuU")` resolves to. It'll be a number.
    5. Since the expression of the return statement has been fully resolved, the content of
       the expression accumulator stays as-is and flow control returns to the calling code.
    6. The calling code is actually an epression like `vowelCount("This is a string")`
       so the statement like `var a = vowelCount("This is a string");` now means something like
       `var a = (whatever is in the expression accumilator right now);`, which is eqivalent to
       something like `var a = (4);`

In other words, if `charListCount(str, "aAeEiIoOuU")` returns the number 4 this time, then that line behaves just like `return 4;` this time. Each time charListCount() is run, it resolves to a different value because the arguments can be different each time, and that return value is the one that gets returned.
