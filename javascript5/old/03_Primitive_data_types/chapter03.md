JavaScript 5 defines six data types.

* undefined - undefined is a data type. It is also a JavaScript value. It's the value of an uninitialized variable or uninitialized collection element.
* null - null is a data type. It is also a value. 
* boolean
* number
* string
* object

undefined




~~~~~~
  Expression
  Piece of code that resolves to a value.
  
~~~~~~





First, my own take-home lessons.

1. That part about where JavaScript comes from took too much attention away from my main points.
2. Some early confusion is our goal, but It is to be cleared up with hands-on practice.
3. I left out an important way of understanding expression operations, which I will now remedy.

We will be spending a lot of time on expressions and operators because they are centrally important to understanding JavaScript. In JavaScript, just about *everything* you do is a series of expressions put together with operators.

CENTRAL POINT OF THE LECTURE:
        Most statements are just expressions.
        Big expressions are made of small expressions.
        Every expression evaluates to exactly one value of exactly one data type.

Missing from the lecture:
Each operator causes an operation to run, causing each operand (value that it operates on) to be cast to a data type, and resulting in one value of one data type.

Here are the only possible data types in JavaScript 5: (undefined) (null) (boolean) (number) (string) (reference to an object somewhere in memory)

Here are the operators that matter to us now, grouped by precedence and showing their casting rules and return types:

--------

logical not              !boolean         => boolean
unary minus          -number          => number
unary plus             +number         => number

multiply                  number * number         => number
divide                     number / number         => number

add/concatenate    number_or_string + number_or_string       => number_or_string
subtract                  number - number                                        => number

is less than             number_or_string <   number_or_string      => boolean
is not greater than  number_or_string <= number_or_string      => boolean
is not less than       number_or_string >= number_or_string      => boolean
is greater than        number_or_string >   number_or_string      => boolean

is equal to               something === something            => boolean
is not equal to         something !== something             => boolean

logical AND             something && something             => something

logical OR               something || something                => something

assign                     writeable = something                  => something

--------

Each vertical grouping indicates operators sharing the same precedence. When evaluating an expression, all operators of higher precedence are run before any operator of lower precedence. Operators of the same precedence are run either from left to right, or from right to left, according to the rules of that operator (not shown). [Look up the reference at the end of this email to see which direction each operator runs.] The first column describes what the operation does, the second column shows its usage and casting effects, and the third column shows the data type that is created by running each operation.

Let's be the interpreter and evaluate this statement in a series of tiny steps:
myVar = !myVar;

Here's how the interpreter runs that statement:

1. Parse the statement. The whole thing is an expression, as usual for JS. '!' is higher precedence than '='.
( (myVar)  = ( ! (myVar) ) )

2. Read the value located "in" the variable myVar into the expression accumulator.
( (myVar)  = ( ! (value_from_myVar) ) )

The JavaScript expression accumulator is a special memory location where the interpreter resolves an expression to a single value of a single data type.

The first operation will be this one:
logical not              !boolean         => boolean

3. Cast the accumulator to boolean. Shoehorn it to either a true state or a false state somehow.
( (myVar)  = ( !boolean_of_value_from_myVar ) )

4. Reverse the accumulator to the opposite of its current boolean value.
( (myVar)  = reversed_boolean_of_value_from_myVar )

None of this has changed what's in myVar. It has all taken place in the accumulator. Now the accumulator contains a boolean value created by reversing the boolean version of whatever is in myVar.

Now it's time to do this operation:
assign                     writeable = something                  => something

5. Perform the '=' operation. Find the memory location of myVar and overwrite whatever is there with whatever is in the accumulator.
( myVar  = reversed_boolean_of_value_from_myVar )
        becomes
( reversed_boolean_of_value_from_myVar )
        after myVar gets overwritten

6. The accumulator now contains whatever was returned by the '=' evaluation and there are no more expressions to evaluate. We're done. Move on to the next statement.


------------
Now let's do this one:
myOtherVar = myVar = !myVar;

1. Parse the statement. It's an expression. '!' is higher precedence than '='. The '=' operator evaluates from right to left.
( (myOtherVar) = ( (myVar)  = ( ! (myVar) ) ) )

Steps 2..5 are the same.

6. The accumulator now contains whatever was returned by the righthand '=' evaluation. Perform the lefthand '=' operation. Find the memory location of myOtherVar and overwrite whatever is there with whatever is in the accumulator.
( myOtherVar  = reversed_boolean_of_value_from_myVar )
        becomes
( reversed_boolean_of_value_from_myVar )
        after myOtherVar gets overwritten

7. The accumulator now contains whatever was returned by the lefthand '=' evaluation and there are no more expressions to evaluate. We're done. Move on to the next statement.

------------
It's clear from this new way of expressing the operator table that addition is the most treacherous operation of all:

add/concatenate    number_or_string + number_or_string       => number_or_string

The expression
        something1 + something2 
evaluates to either a string or a number on the basis of each operand evaluating to either a string or a number. Thank you, JavaScript.

Don't be afraid of the idea of expressions evaluating from smaller expressions. Do be afraid of JavaScript helpfully casting something to a data type you weren't expecting and then merrily continuing along, building unexpected behavior on top of unexpected behavior. But only be a little afraid of that. We can still get stuff done.

I'll be sending you some home-study exercises about expressions and operators. Until then, open a Chrome window to any (or no) website. Bring up the console using cmd-opt-J or through the View -> Developer menu. Start typing in simple expressions, like single plain literals or variable names. And then slightly more complex or weirdly put together pairs of those, joined by operators.

Here are some literals to experiment with:
   undefined
   null
   true
   false
   -5.7
   5
   "5"
   '"Right," said Fred.'
   { myKey: ‘myValue’ }

What happens when you multiply a string by a boolean? What happens when you add a string to a number, string to number, number to number, string to string?

Here are some basic popular casting idioms:
   Anything to boolean:     !!something
   Anything to number:      +something
   Anything to string:      ""+something

They work by boiling down the casting rules to something short and reliable in all cases.

And here is an expression that, when evaluated, causes a string of data to be logged to your console output.
   console.log(expression_that_casts_to_a_string)
It's sometimes useful for revealing things as your code runs.

So, what happens when you add null to undefined, null to zero, or null to a string. What happens when you subtract a string made up of numeric characters from a boolean? Or when you add them?

There will be some home study prompts coming, but for now play with operators and expressions on your own. Start with little things. Cast them using the three idioms above. Slowly build bigger things by stringing in one more operator at a time. Remove some explicit casting and rely on implicit casting (the things the operator table describe happening).

Also, use those idioms as guides to guess what is likely to happen when you apply operators to values.

IF YOU HAVE UNEXPECTED RESULTS IN THE CONSOLE. TRY IT AGAIN. GROUP THE WHOLE THING AND A FEW PARTS WITH PARENTHESES. Or put it inside a  console.log( ***here*** );   statement. My interactive console seems to be interpreting code slightly different form the straight interpreter drawing from a source code file. When it does something weird, check it with those techniques.


--------

Complete JavaScript operator reference is here
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
Some of those operators are not available in JS5, such as ** for exponentiation.











I hope you have been experimenting with the console, just noodling around with individual expressions and seeing what they return.

Here is the basic work flow for an interactive console session.

Start Chrome and open a browser window. That window can be pointing to a website or not.
On Mac hit the keyboard shortcut command+option+J to open developer tools straight to the console view. On PC it would be Ctrl+Shift+J. If you prefer, use the menus View -> Developer -> JavaScript Console. This will open a pane or window with the console in the foreground. Resize some of the inner panes to get a pretty good sized console view, or use the horizontal-vertical-detach buttons to configure your work environment to your liking.

You may need to scroll to the bottom and click on the area to activate it. There you'll see a command prompt with this character '>' and a ready cursor. Test it by typing something, maybe just a semicolon or a number, and hit enter. Then the console will execute the JavaScript code you typed, and will report the final content of the expression evaluation accumulator after a '<' character, like this:

> 7 + 3 * 2;          (typed by you, semicolon optional)
< 13                  (final value of the expression accumulator)
>                     (blinking cursor waiting for you to type)

When you type something in the console, you are feeding it a string of text, like so:

> true
< true

What happened here? The console didn't just repeat what you just said. It came up with it on its own. You typed the keys <t> <r> <u> <e> <enter> , and the Chrome browser's console development tool expected that to represent an executable snippet of JavaScript code. It then sent the string "true" to its built-in V8 engine (awesome JavaScript interpreter) to be run as JavaScript code. V8 then recognized it as a single statement, made of a single expression, made of a single keyword that means "the boolean true value". It generated one of those in whatever format it has been created to use in there and put it into the expression accumulator. V8 sees there's nothing more to the expression, and nothing more to the statement, so it's done. V8 reports its accumulator content to the console while stopping itself. The console sees the boolean true value and then shows you a text representation of that, the word "true".

When you see the console report "< " followed by something, that something is a textual representation of whatever is the final value left behind in the expression accumulator. You can't actually touch boolean true values inside the V8 engine. You can only feed text code that causes the V8 engine to manipulate its internal state, and then see more text that represents the result. There's a bunch of stuff in there. You may have created hundreds of variables and read huge files from giant databases, all with console commands, manually typed by you. All you get back is a "< " followed by a single value. Whatever was in the accumulator when the last line finished executing. [NB: the Chrome console reports lengthy objects as clickable GUI elements with twirly triangles. It's fun.]

Let's play with type coercion in a systematic way now. I'll feed you what to type in your console, and you guess what it will produce as a reported result. At any time, explore on your own to pursue any ideas that may occur to you. Each time you type an expression, predict the result. Make a note of every time you guessed wrong, or even when you guessed right but think it's interesting or counterintuitive.

Bring your list of weirdnesses to class and we'll compare notes.

Remember the operator type-coercion table:

!boolean                                => boolean
-number                                 => number
+number                                 => number
number * number                         => number
number / number                         => number
number_or_string + number_or_string     => number_or_string
number - number                         => number
number_or_string <  number_or_string    => boolean
number_or_string <= number_or_string    => boolean
number_or_string >= number_or_string    => boolean
number_or_string >  number_or_string    => boolean
whatever === whatever                   => boolean
whatever !== whatever                   => boolean
whatever && whatever                    => whatever
whatever || whatever                    => whatever
writeable = whatever                    => whatever

The left column indicates the data types that are coerced into existence whenever that operator is used on *any* kinds of values. The original source of the value remains untouched. The coercion happens in the JavaScript interpreter's expression accumulator. So, for example, if you try to divide a boolean by a string, you get a number because the division operation coerces both operands to number values before performing the divide, which in turn only ever resolves to a number. The 'whatever' data type is a not a JavaScript data type, it's a disposable notation for right here, meaning no coercion takes place. That leaves us with the mystery of number_or_string coercion. That one is ambiguous until we get deeper into understanding JS behavior. It means coercion happens, and that coercion produces either a number or a string. We'll get to that as we systematically probe the console for JavaScript behavior. The right column indicates the data type that operator *always* produces. The bivalent + operator might mean concatenation of strings or it might mean addition of numbers. What would life be without adventure?

As yet another reminder, here are the six possible JavaScript 5 data types:
(undefined) (null) (boolean) (number) (string) (reference to an object)
At this point, I hope you are more bored than confused with this.

Some common idioms for explicit coercion (typecasting):
!!something => the boolean version
""+something => the string version
+something => the numeric version

Let's try some of these in the console. Actually do the typing by hand, rather than copy and paste. It sticks in your brain better that way.

Remember to predict the result the console will report before pressing enter, and make a note of any surprises.

> !true
> !false
> !!true
>    !  !  false
> !!undefined
> !!null
> !!0
> !!-0
> !!0.0000000001
> !!NaN        // This is a floating point value meaning "not a number" -- It's a number
> !!-Infinity  // Another floating point number that mathematicians don't consider a number
> !!5/0
> !!0/0
> !!(5/0)
> !!(0/0)
> 5/0
> 0/0
> !!""
> !!" "
> !!"0"
> !!"false"
> !!"null"
> !!'undefined'
> !!{}   // Empty object.
> !![]   // Empty array. An array of length zero.
> // Do a dozen more that you invent yourself



That was mostly playing with the logical NOT operator. It coerces its operand to boolean and then reverses it, returning that. Double-banging any value (Unix-speak for exclamation points) gives a not-not of any value: the genuine boolean value representing the "truthiness" of that original value. It's short, fast, and reliable, so that's why it is a common programmers' idiom.

In JavaScript, only about a half a dozen values are falsy and everything else is truthy Other languages are more restrictive in what they consider falsy. In Ruby, only false and nil are falsy. All other values including zero are truthy. This makes Ruby code less confusing, less buggy, and more concise. Even so, it is possible to write JavaScript code that does what we want it to do. We just have to learn more and try harder. Ruby's nil is like JavaScript's undefined and null combined. JavaScript has two separate values and data types to mean nearly the same concept. The way to keep them straight is to know that the only way null can ever appear in one of your variables is because it was explicitly put there, not by the interpreter being sneakily helpful. The undefined value (or pseudo-value) can be there for many reasons, like the variable was created but not initialized (hasn't yet had its first value written to it). When you try to read something that doesn't exist and it doesn't cause a runtime error, JavaScript uses undefined as the value as if that thing does exist and contains the undefined value. The null value would be there because someone wrote code to actually put it there. Both null and undefined are falsy values in JavaScript.

Here is a list of all possible falsy values in JavaScript:
(false) (undefined) (null) (0.0) (-0.0) (NaN) ("" or '')
All other values are truthy. They cast to true in any boolean coercion.

Now try doing that kind of experimentation with the other operators on the list. I'll send more systematically complete lines of code to your email box, but until then, get in the habit of playing with things independently. Do all the unary minuses and plusses in the way the unary NOTs were used here. Then string together bangs and minuses and plusses to see what happens. Add various parenthetical groupings to see if they matter. Be aware that ++ and -- are both operators in their own right. (They are unary operators that are only valid against a writable operand like a variable name, so they'll probably report an error if you use them.) If you mean to negate a negation, you'll need to separate your double minuses with spaces or parentheses, like this: - -true

Happy experimentation!








Here are some console probes to reveal more about the inner workings of JavaScript. Remember to type them by hand, type a few extra of your own devising, declare the result you expect before pressing enter, and record all the ones you weren't expecting.

> +true
> -true
> +false
> -false
> + +true
>  + + false
> +-true
> -+false
> +undefined
> -undefined
> +null
> -null
> -+0
> +-0
> 0
> 0.0
> - -0
> +NaN
> -NaN
> NaN + 1
> -Infinity
> Infinity
> 0.00001/0
> 0.00000/0
> +""
> +" "
> +'5'
> +'     5      '
> +'5.'
> +'5.0'
> +'010'
> +'-'
> +'x'
> +'0x'
> +'0x0'
> +'-0x0'
> +-'0x0'
> +{}           // empty object
> +[]           // empty array
> +[1]          // array with one number in it
> +[2]          // array with one number in it
> +[1,2]        // array with two numbers in it
> +['2']        // array with one string in it
> +[undefined]
> +[null]
> +[false]
> +[true]
> !![false]
> !![true]
> !!['0']
> !!['-7']
> -['-7']
> -[-'7']
> -['-7', '12']
> +[3]
> +[[3]]       // array with one element, which is an array with one number
> +[[['3']]]
> ![[['3']]]
> ![[['0']]]
> ![[[true]]]
> +[[['3','3']]]
> +[[[]]]
> +[[{}]]
> +[[{0:0}]]

Many choices (or non-choices) by the early JavaScript language designers (or non-designers) are what one might call bizarre. They might've just been trying to provide us with an extra element of challenge and danger, but after a couple of decades of adding features and maintaining backward compatibility with existing code, we get an amalgam of strange, inconsistent behaviors. We shouldn't normally write code that relies on the fact that unary plus on a single-element array looks inside the array and casts the content of that single element to a number unless there's a boolean in there. The best we can do is understand that JavaScript has its own beautifully quirky ways without bothering to memorize all of these cases.

I don't really know and barely care whether the ECMA standard calls for this behavior, or whether most or all JavaScript interpreters conform to this behavior. It's good enough to notice there are many strangenesses that don't seem to follow any sensible rule, and then avoid tripping over those strangenesses. However, discovering these inconsistencies can reveal some rules that we can make sense of. In general, it's a really bad idea to use weird behavior because it might just be the effect of a bug in the interpreter that will change in the future, and it definitely will confuse our co-workers or ourselves. But it's a really good idea to experiment with these things to gain insights into the language and how it works.

Next up, bivalent probes.






Now it's time to play with floating point numbers using bivalent arithmetic operators:

number * number => number
number / number => number
number - number => number

Once you understand how the numeric coercion works, you understand most of how those three operations work. Since they coerce all their operands to numbers, they're basically the same as this:

(+whatever) - (+whatever) => number
(+whatever) * (+whatever) => number
(+whatever) / (+whatever) => number

Implicit coercion to numbers is just an implicit version of the (+whatever) idiom. It is applied to each operand individually in turn, and then the multiplication, subtraction, or division happens in the expected way to produce a value of type number.

That's really all you need to know about type coercion. If you understand it in the unary case, you understand it here as two separate unary operations, whether explicit or implicit. End of lesson.

But now we're doing arithmetic on floating point numbers. That can get very weird. Let's look at a few particularly slippery operations.

> 0-0
> -0-0
> -0+0
> -0-0-0+0-0
> -0-0-0+0*-0
> 1/0

These operations result in special values enumerated in the IEEE 754 64-bit floating point specification, which is the format of all JavaScript numbers. These special values like negative zero, positive and negative infinity, an not-a-number are represented by a unique bit pattern of the 64 bits of the number, and are triggered by events like dividing by zero, or negating zero. When the JS interpreter builds a string representation of these special values, it makes strings like "NaN" or "-Infinity" just as for a regular numerical value it makes a string like "-23.54" or "3.54e+27".

There are many subtleties when it comes to floating point numbers in computing. Many of these apply not just to JavaScript but to everything that uses floating point numbers. The floating point specification is implemented into silicon as a math unit in a modern CPU, so many of these subtle properties are all the way down in the metal. We've already seen some of these subtitles in the expressions above. -0 - 0 - 0 results in -0 while -0 +0 -0 results in +0. This is not normally something you'll need to think about, but the consequences can sometimes cause subtle problems. Knowing that this effect exists can make you a better programmer. Let's look at some less subtle surprises.

> Infinity * -1
> Infinity * 0
> Infinity * 1
> 1/0
> 0/0
> 0/-0
> 1/-0
> -0/-0
> 0/0 === 0/0

To a mathematician, infinity is not a number, it's a direction on the number line. In the world of math, dividing a finite number by zero does not result in infinity, it is an undefined operation, but for a different reason than zero divided by zero is undefined. If 1/0 = x, then 0x = 1. There is no number that can multiply by zero to get 1 so there exists no value for 1/0. However, if 0/0 = x, then 0x = 0. All numbers can multiply by zero to make zero. 0/0 is undefined because everything is a possible result.

Here in floating point land, dividing non-zero by either flavor of zero results in the number Infinity or -Infinity, and dividing zero by zero results in the number NaN. Each of these special number states have special properties when you do arithmetic on them with each other and with ordinary numbers.

> Infinity * -1
> -Infinity * -1
> Infinity * 0
> Infinity * -0
> Infinity / 0
> Infinity / -0
> Infinity + Infinity
> Infinity - Infinity
> Infinity * Infinity
> -Infinity * Infinity
> Infinity * -Infinity
> -Infinity * -Infinity
> 5 + NaN
> 5 + NaN - NaN
> 1.7976931348623158079372e308   // Okay to copy and paste
> 1.7976931348623158079373e308   // press up arrow and change one digit
> -1.7976931348623158079373e308  // press up arrow and add a minus sign
> -1.7976931348623158079372e308  // press up arrow and change one digit

Infinity is tricky enough in the world of mathematics. Calling it a number and adding implementation anomalies makes it a different kind of strange. Most of what we do with JavaScript does not involve infinity, but knowing how floating point works makes us stronger programmers. You don't need to memorize all these details, just get a strong sense for the ways floating point can behave  differently from what we expect.

Let's see some trickiness with more conventional numbers.

> 0.1 + 0.1 === 0.2
> 0.1 + 0.2 === 0.3
> (.6 + .3) < (.5 + .4)
> 0.1 + 0.2
> 0.8 + 0.4
> 1.8 + 1.4

Due to details of the floating point number internal representation, simple arithmetic on simple numbers often fails just enough to break something. We're not talking about exotic circumstances here. The bad news is ordinary floating point arithmetic results only in approximations, and rounding errors compound on other rounding errors, growing over time. The good news is that if your numbers have no fractional part and are smaller than 10^15, you have pseudo-integers that don't suffer from these problems. If your numbers have fractional parts, never trust them to be exact.

Next, we tackle the treachery of addition/concatenation
number_or_string + number_or_string => number_or_string





Now for the addition/concatenation operator '+'

number_or_string + number_or_string => number_or_string

Computer scientists would say the plus sign is an 'overloaded operator,' meaning it has different meanings inferred from context. One meaning is as a unary do-nothing operator for numbers, which has the effect of coercing non-numbers to numbers:
    +number => number
which could be restated as
    +whatever => numeric_version_of_that_value

As a bivalent operator, the plus sign means addition or concatenation, depending on the data type of the operands. Let's play with it.

> 2 + 2
> '2' + '2'
> '2' + 2
> 2 + '2'
> n25 = 25
> s17 = '17'
> n25 - s17
> n25 + s17
> -n25 + -s17

We see that the '+' operator's concatenation operation dominates its addition operation. If any either one of the operands is a string, '+' means concatenation:
    string + number_or_string => string
    number_or_string + string => string
Only when neither operand is a string does it mean addition:
    number + number => number

Let's try that with operands of the other data types.

> undefined + undefined
> undefined + null
> undefined + true
> undefined + n25
> undefined + s17

> null + undefined
> null + null
> null + true
> null + n25
> null + s17

> true + undefined
> true + null
> true + true
> true + n25
> true + s17

> n25 + undefined
> n25 + null
> n25 + true
> n25 + n25
> n25 + s17

> s17 + undefined
> s17 + null
> s17 + true
> s17 + n25
> s17 + s17

We know from earlier experiments how values of all the data types are individually coerced into numbers:
    +null=>0   +undefined=>NaN
    +true=>1   +false=>0
    +'5'=>5    +5=>5
and how they're coercing to strings:
    ''+null=>'null'  ''+undefined=>'undefined'
    ''+true=>'true'  ''+false=>'false'
    +'5'=>5          +5=>5

But which coercion does the bivalent plus operator use? Let's make a table to see reveal a pattern. The first operand is along the top, the second operand is down the left column. Each cell contains the meaning of '+'.

       UNDEF    NULL    BOOL    NUM    STR
UNDEF   add     add     add     add    cat
NULL    add     add     add     add    cat
BOOL    add     add     add     add    cat
NUM     add     add     add     add    cat
STR     cat     cat     cat     cat    cat

This table reveals a few things. First, it's symmetric along the diagonal, meaning the typecasting rules are all commutative.
    false + '7' is the same operation as '7' + false.
They both mean string concatenation, although concatenation is not itself commutative.
    "false7" is not the same as "7false"

It also shows that '+' always means addition, unless any of the two operand is a string, in which case it means concatenation.

THE RULES OF THE PLUS OPERATOR: In a unary context, it always means numeric coercion. Binary plus means addition, unless it has string on the left or the right, which overrides the meaning to concatenation. "You're welcome," says JavaScript.

In practice, we rarely use operators with literals. We wouldn't see code like
    5 + 7
when it could just look like
    12
We would see code like
    someVariable + 7
or
    someVariable + someOtherVariable

Just be sure to know what kind of data is in your variables or JavaScript will helpfully change the meaning of your binary plus operator dynamically at runtime.

Compare operators are up next.












Compare operations always return a boolean value no matter what.

Let's start with the simplest compare operator: === It means "is exactly identical to." It results in a boolean true value if the expression on the left of the === resolves to a value that is exactly the same data type and value as the expression on the right resolves to; false otherwise.

There is a similar operator in JavaScript, == that means "is sort-of equivalent to." That one is a treacherous work of sabotage. Never, never use it until you understand all the issues about double-equal, including that other programmers will judge you incompetent if they see you using it, or be confused by it even if you use it correctly. There are rare cases when the double-equal operator is appropriate, but you're not likely to encounter them for a while, if ever. Always choose triple-equal over double-equal unless you have a really good reason.

> [null] == ""     // Array with a null value is vaguely like an empty string
> [null] == [null] //  ...but it's not even close to an identical array

Don't use the double-equal operator.

So, on to the triple-equal operator. Let's recall once again the 
(undefined) (null) (boolean) (number) (string) (reference to an object)

Every expression always resolves to one of these. That includes the little expressions that make up the big expressions.

> 70 - 10 === 20 * 30
> 70 + 10 === 20 * 30
> "60" === 20 * 30

The expression
    70 - 10 === 20 * 30
is made up of smaller expressions, like
    70 * 30
which are made up of still smaller expressions
    70

The 7 and 0 of 70 are not expressions. The interpreter recognizes the character sequence 70 as a single token (elementary piece of meaning to the language).

All the expressions, from smallest to biggest, each resolve to a value of one of the six data types. Those operators (- + ===) each cause an operation (subtraction, addition, comparison) on two values, converting them into one value.

So the character sequence 70 is recognized as an elementary expression and results in the 64-bit floating point numeric value that means the number 70.0 to be created and remembered in the expression accumulator. Subtraction and multiplication have higher precedence than equality comparison, so the interpreter uses this grouping:
    ( (70 - 10) === (20 * 30) )
These groupings are implied by the operator precedence rules of JavaScript. We don't need parentheses, but if we find it less confusing, we can put some or all of them into the code as a cue to human readers. Now the interpreter sees that === is the top level operation, so it figures out what the left side means, and then figures out what the right side means, and then it performs the comparison.

The left side of the === is (70 - 10). The top level operation here is subtraction. It figures out what the left side means, then the right side, then performs the subtraction. So 70 and 10 are bits of source code text that mean specific numbers. Interpreter creates a number 70.0 and a number 10.0 and then performs subtraction, resolving the expression (70 - 10) to the number 60.0, remembering that number for later. Then it similarly figures out that (20 * 30) means the number 60.0, remembering that for what comes next. Now it performs the operation (number:60.0 === number:60.0). They are both numbers, and those numbers have identical values, so that (70 - 10 === 20 * 30) thing resolves down to the boolean value (true).

The === operator always causes a boolean true or boolean false value. Unlike the == operator, which does type coercion and more to its operands, the === operator doesn't bother with any of that. If the left and right operand data types are mismatched, that's as far as === has to look: they're not identical, so the comparison resolves to false. If they are matching data types, the comparison operation looks inside the data to see if the two values are exactly identical, returning a boolean value accordingly.

Let's try a few more.

> 9 === 9
> false === false
> "7" === "7"
> "7" === 7
> "" === ""
> "" === " "
> false === null
> false === "false"
> false === 0
> true === 1
> false === ""
> null === null
> undefined === undefined

Here are a few that might be a surprise.

> {} === {}
> 0 === -0
> Infinity === Infinity
> NaN === NaN

The character sequence {} is an object literal. It means our code asks the interpreter to create a new object in memory, and the data type it resolves to is a reference (a special kind of number that indicates where to find the contents of that object). Each {} creates a new object in a new location, resolving to a unique reference to that new object. So the line
    {} === {}
says to build two objects and then compare their memory references to see if they're the same. They are not, so it resolves to false.

It's like this:
    (description of where to find a newly created empty object)
    (description of where to find another newly created empty object)
    (Do those two descriptions refer to the same memory location?)

0 === -0   and   Infinity === Infinity   both resolve to true because the floating-point specification says they should.
Same with   NaN === NaN   being false. It's the law.


The opposite equality operator is !==

It means "is not exactly equal to" and does the same thing as ===, but with the opposite boolean result.
   value1 !== value2
means exactly the same thing as
   !(value1 === value2)
It works like that every time every time.

> NaN !== NaN
> true !== true

Likewise, the != operator returns the opposite of the == operator every time. Handle that one with tongs, if at all.







Less-than and greater-than comparison operators.

These four operators  <  <=  >  >=  always return a boolean, but they do type coercion on their operands. Let's start with just numbers. They are simplest to understand.

> 8 < 8
> 22 <= 22
> 4 > 5
> 4.999 >= 5

No surprises there, but what about mixed data types?

> 1 <= true
> 1 >= true
> false < true
> false < true
> undefined <= 0
> undefined >= 0
> +undefined
> null < 0
> null > 0
> +null
> ({}) < 0
> ({}) > 0
> ({}) >= 0
> +({})
> null < false
> null > false
> null >= false
> 0 == ""
> 0 >= ""
> 0 <= ""
> "5" <= [5]
> "5" >= [5]
> "5" < [5]
> "5" > [5]

Let's compare some numbers and strings.

> "aardvark" < "zebra"
> "9" < "19"
> 9 < "19"
> "9" < 19
> 9 < 19
> "9.9.9" > 111
> "9.9.9" > "111"
> +"9.9.9" > 111
> +"9.9.9"

If both operands are strings, they are compared lexicographically, otherwise they are both cast to numbers and compared numerically.




whatever && whatever                    => whatever
whatever || whatever                    => whatever

writeable = whatever                    => whatever

