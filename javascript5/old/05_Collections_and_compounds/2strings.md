`typeof null` evaluates to "object" while `typeof "abc"` evaluates to "string".
The null value is not an object, but a string value actually is a kind of object. Strings have properties.

Strings differ from ordinary objects in that you can't write to them. You can't change the characters within the primitive value at the core of the string. You can't change the length of the string. You can't add your own property to a string the way you can with a regular object. But you can read properties and execute methods. You'll learn what methods are as we go.

So this is valid JS code
    "abc".length
it means the number 3.

Nobody would ever write that in a program because it always means the same thing is just `3`. This is more like the code that uses the length property:

    1  var str = "abc";
    2  for (var i = 0; i < str.length; i++) {
    3      // bla bla bla
    4  }

Line 2 has `str.length` instead of `3` because that makes the code more modular, meaning it can be changed more easily with less breaking of things. Line 1 can be changed to `var str = "supercalifrigilisticexpialidocious";` or it can be changed to `var str = "";` and either change will still function with the rest of the code. Line 2 looks up `str.length` in order to iterate the loop once per character of str. The code on lines 2..4 makes no assumptions about the string, only that it has a length property, and perhaps that `str` actually is a string or something that behaves very much like a string. It makes no assumptions about the content of the string. It should work no matter what line 1 does, so long as it sets the variable `str` to any valid string. Line 3 could represent many lines of code that does all kinds of fancy things with `i` and `str` like using the string methods that come with any JavaScript string, but whatever it does, it happens once per character as the loop iterates zero times if line 1 were `str = ""` and one time if line 1 were `str = "a"` and so on.

Let's look up the string methods in the official Mozilla JavaScript documentation.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

There's a lot there! It includes all the methods ever created for strings. A lot of those methods won't be available to you with your ECMAScript 5 interpreter. Kudos to you if you read some of that documentation. Let's look deeper, at the length property documentation.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length

It says...

This property returns the number of code units in the string. UTF-16, the string format used by JavaScript, uses a single 16-bit code unit to represent the most common characters, but needs to use two code units for less commonly-used characters, so it's possible for the value returned by length to not match the actual number of characters in the string. For an empty string, length is 0. The static property String.length returns the value 1.

Let's parse the meaning of those words.

Every string has a length property, so "".length has a number 0 in it. UTF-16 is a set of rules for mapping (pairing) 16-bit sequences to characters (letters of the Greek/Roman/Korean alphabet in all their diacritic forms, punctuation symbols, spaces, mathematical symbols and such). A consecutive series of these UTF-16 code units represents a string of human-linguistic characters. Since sixteen bits is not enough to provide a distinct bit pattern for every possible character of every possible language supported by UTF-16, some characters are represented by 32 bits, or two UTF-16 "code units". All the characters of the world's most common living languages and technical notations fit in a single UTF-16 code unit, so you are not likely to see a string whose number of code units differs from its number of characters, but when that happens, just know that the `length` property means the number of 16-bit code units, not the number of 16-bit or 32-bit linguistic characters those code units represent. When the documentation says "String.length returns the value 1" it means the code `String.length` always resolves to the number 1, while the code "myVariable.length" with a string in `myVariable` resolves to the length of the string you have in myVariable.

There are nicer JavaScript documentation browsing tools than the official Mozilla reference website. It works, but you can try going to this website
    devdocs.io
There you'll find a web application that makes it convenient to browse the documentation of nearly a hundred development technologies, including the JavaScript, HTML, and CSS languages, the HTTP protocol, and the lodash JavaScript extension library. We're looking up docs on JavaScript, so find the item for JavaScript in the left browser pane, possibly under "disabled" and enable it. Then twirl the triangle beside the JavaScript item to reveal a bunch of built-in pseduo-classes. Clicking on the JavaScript heading will show the top-level description of the language in the righthand browser pane, but we're going to twirl the triangle beside String to reveal the String.length. Clicking on that pulls up the documentation we were just looking at from Mozilla's documentation website. It's the same stuff, but in a more readable format. Now go back to the left pane and click on "String" which is under "String" which is under "JavaScript".

You'll see a bunch of jargon words like "global object" and "constructor". We'll get to those eventually, but you should try to get meaning from documentation written with unfamiliar words. At this point you have been exposed to many of these words and had some of them explicitly defined for you. This is kind of a long page of documentation about strings, but try to understand as much as you can about it without doing too much outside research as you go. "Too much" research is when it gets in the way instead of helping you make progress. This is what's often informally called a "rabbit hole". Figuring out how something works is great except when it's not. It can be hard to stay focused on figuring something out when there's always more to figure out. Try to skip over what you don't yet understand, unless it's clearly necessary to make progress.

EXERCISE: Next time you are with your pair, take turns reading this page of documentation and explain what you think it means, even if you're not really sure yourself. When you think your pair doesn't quite understand tell them what you think something means. When you don't understand, ask for more explanation. It's okay to leave holes that neither of you understands, but whenever you think you disagree about what something means, make a note of it and try to clear it up somehow. Experimentation is the best way to verify an idea. If you can figure out how to write some code to illustrate some concept in the debugger, in the console, or just running it through, do that.

One word of caution about experimentation. Your JS interpreter may have bugs that make it behave differently from the JS specification document says it's supposed to. That said, we're all using the V8 engine, which is close enough to a source of truth to rely on at this stage of your learning. If the V8 engine does something, believe that's what ECMA says it's is supposed to do unless you have reason to believe otherwise.

Let's experiment with strings, either solo or in our pair.

So a string is an object -- sort of. Let's play with that in the console. Go to "about:blank" in a Chrome browser window and then open a console from that window. Type these bits of code, plus a few more you're wondering about in the console.

> "abc"
> "abc".length
> "abc".length = 2
> var s = "abc"
> s
> s.length
> s.length = 2
> s.length
> s
> s = "xyz"
> s

We tried to change a string's length property. The interpreter behaved as if it let us do it, but it didn't actually go through with the change. At the end, we didn't actually change the content of the string to "xyz". We created a new string and overwrote the value of the variable with the new value -- a brand new string.

I haven't explicitly taught you about methods or functions, but we're going to use them now anyway. The basic idea is a function is invoked (run) by giving its name directly in code, or by giving any expression that resolves to that function in code, then putting an opening parenthesis `(` and any arguments (also not yet taught) and a closing parethesis `)`. This creates an expression that evaluates by running that function against those parameters, and resolving to whatever the return value (also not yet taught) of that function is. A method is a function that is referenced by an object property, which can be run by putting the parentheses argument construction to the right of that.

You may pick up what some of those jargon words mean by seeing the next examples.

We can call methods on strings. Let's play with that:

> "abc".toUpperCase
< function toUpperCase()

That means the string "abc" has a property whose key is "toUpperCase" and whose value is a function that takes no parameters. That's what the "()" means above. When we say `"abc".toUpperCase` we are saying to the interpreter "build me a string as described, then report to me whatever you find as the value of the 'toUpperCase' property of that string." If it's a function, the console signifies that with the word 'function' and the name of the function and round parentheses describing what you can pass in as arguments.

> "abc".toUpperCase()
< "ABC"

The presence of the round parentheses after the method name means "run the function you'll find at "abc"['toUpperCase'] passing in no arguments".

Remember, you are not expected to know all these words yet, Just get in the habit of not quite understanding everything and learning something anyway. It will happen a lot while you're learning while doing.

What this shows us is that there's a way to "ask a string" what the uppercase version of itself is, and the string replies with the answer. This is an expression that goes evaluates like this:
    ( ("abc") . toUpperCase ) ()
First build a brand new string with three characters in it. Then lookup the property with the key 'toUpperCase' in it. Then try to call it as a function, passing in no arguments. Whatever came back from that function is the value the expression resolves to.

Again, we'll learn about functions in detail later, but for now, try to tough it out almost understanding what we're doing here.

> var s
< undefined
> s = 'abc'.toUpperCase()
< "ABC"
> s
< "ABC"

We saw that `"abc".toUpperCase()` produces "ABC" Since single-quote is an alternate way to do string literals, `s = 'abc'.toUpperCase()` evaluates to `s = "ABC"` which evaluates to just "ABC" after assigning it to the `s` variable.

> s.indexOf('B')
< 1

That's a method that takes a parameter. Go to devdocs.io and find the documentation for the indexOf method for strings. If you get lost, ask your pair for help.

We have already seen how the bivalent plus operator favors concatenation over addition whenever a string is present on either side of the `+`. Let's do it again here to reinforce the idea. With data types other than numbers and strings, the rules vary, but if either element is a string, it means concatenation.

> 5 + "5"
> 5 + "5" + 5
> 5 + 5 + "5" + 5
> 5 + 5 + +"5" + 5

Bookmark devdocs.io in a prominent place in your Chrome browser, like near the left side of the bookmarks bar if you can figure out how.
