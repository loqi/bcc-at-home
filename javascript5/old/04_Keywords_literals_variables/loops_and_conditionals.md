BASIC CONDITIONALS AND LOOPS

The `if` statement follows this syntax:

    if (expression)
        statement to run if expression resolved to a truthy value

or this format

    if (expression)
        statement to run if expression resolved to a truthy value
    else
        statement to run if expression did not resolve to a truthy value

or this format

    if (exp1)
        statement to run if expression resolved to a truthy value
    else if (exp2)
        statement to run if !exp1 and !!exp2
    else
        statement to run if !exp1 and !exp2

and so on.

The parentheses of the `if` expression are required.

Any code ahead of or behind the if statement is run always. The `if` statement itself is run always. Only the code of the THEN and ELSE clauses are run conditionally. [Although there is no `then` keyword in JavaScript, a THEN clause is the first clause, and the ELSE clause is second optional clause with the `else` keyword.]

When you have more than one statement to go into one of your clauses, you'll need curly braces to turn those multiple statements into one big statement made out of lots of little statements. Comments don't count as statements, so I'll make some actual JavaScript code representing this.

    if (expression)
        ; // runs if expression resolved to a truthy value
    else {
        ; // runs if expression did not resolve to a truthy value
        ; // also runs if expression did not resolve to a truthy value
    }

Many programmers would get their knickers in a twist over the above code formatting. They'd insist on curly braces for both clauses, something like this:

    if (expression) {
        ; // runs if expression resolved to a truthy value
    } else {
        ; // runs if expression did not resolve to a truthy value
        ; // also runs if expression did not resolve to a truthy value
    }

It is generally considered safer to always use curly braces with all clauses of multi-line statements. This is because people sometimes mis-identify what is actually a statement, and because someone else might come along and add a second statement to the above THEN clause without noticing there are no curlies there. Leaving aside who might have let someone like that near your codebase, there are many people who would be upset about missing curlies, so that's usually a good enough reason to use them consistently.

People are creatures of cultural norms more than of logical consistency. That goes for schoolmarms with their English grammar and spelling rules as well as most software engineers with their code formatting rules. The closing curly braces above are outdented to match the if and else keywords. If our indentation were following simple logically consistent rules, these rules would look something like this:

1. Start each line of code at the same indentation level as the line above
unless a line is a continuation of a multi-line statement.
2. Indent the second through the last line of a milti-line statement.
3. That is all.

Some hypothetical pseudocode might follow these rules to look like this:

look out the window
if you see it's sunny outside
    then
        put on sunglasses
        take a parasol
    else if it's raining
        put on rain boots
        take an umbrella
    else
        take a lantern
go outside

Or it might omit the `then` keyword and indent the `else` keywords by zero character positions:

look out the window
if you see it's sunny outside
    put on sunglasses
    take a parasol
else if it's raining
    put on rain boots
    take an umbrella
else
    take a lantern
go outside

However, there is a long-standing tradition of outdenting the last (and possibly also the second) line of a multi-line expression, statement or source code structure dating back to the earliest published books explaining how to write C code. These books established a precedent for indentation rules that has carried from C to C++ and Java and now JavaScript:

1. Start each line of code at the same indentation level as the line above
unless a line is a continuation of a multi-line statement.
2. Indent the second through the last line of a milti-line statement unless that line is comprised only of a curly brace.
3. Outdent the second or the last line of a multi-line statement if that line is a lone curly brace.
4. If the closing curly brace of a multi-line statement is followed by an else keyword, optionally put the ELSE keyword on the same line with the previous clause's closing curly brace.

That's how we get slightly comical lines like `} else {`. Occasionally, you'll see code following these indentation rules written by someone who likes to put opening curly braces on a separate lines:
    if (expression)
    {
        ; // runs if expression resolved to a truthy value
    }
    else
    {
        ; // runs if expression did not resolve to a truthy value
        ; // also runs if expression did not resolve to a truthy value
    }

JavaScript culture tends to favor opening braces `{` at the end of the line above and closing braces `}` at the beginning of the line below, and outdented.

When we get into functional programming, we'll see this logical inconsistency carried over to more than just single curly braces can create long sequences of parentheses, commas, and even expressions outdented to the enclosing lexical level but applying its logical meaning to the inner statement context.

All this creates a small cognitive tax to be paid many times while reading code. Even so, the tax may be higher if we buck convention and use more consistent and visually efficient formatting rules. There is generally more value in following a norm than in deviating. That's why most of us don't insist on "womans" as the plural of "woman", and we change the pronunciation of "women" in a different place than we change the spelling. People are not fundamentally logical beings, even as we use and understanding logic.

So here is the generally accepted JavaScript formatting of an `if` statement:

    if (exp1) {
        zero or more statements
    } else if (exp2) {
        zero or more statements
    } else {
        zero or more statements
    }

To follow convention you must...

* Always use curly braces in the clauses, even for single statements.
* Always put opening curlies on the end of the previous line
* Always put closing curlies outdented at the start of a line
* Always put else keywords to the right of the previous '}'

The JavaScript community has not yet settled the question of whether to force our co-workers in all cases to use or to omit interstitial spaces. You might see lines like these:
    `if(expression){`
or
    `}else{`



WHILE LOOPS

The `while` statement can be thought of as a "sticky-if" statement. A `while` statement follows the same syntactic format as an `if` statement with no else clause:

    while (expression) {
      one or more statement to run until expression resolves falsy
    }

Here is some pseudocode that does exactly what this while loop does:

    1  if expression is falsy, go to line 4
    2       one or more statements to run until loop terminates
    3       go to line 1
    4  continue on to next statement

This shows that the evaluation of the expression happens only in one place in a while loop, and that is at the top of the loop (line 1 in the expanded pseudocode). The expression is evaluated once at the top of each iteration, and if it is falsy the first time, the body does not get run even once. Each time the body completes one iteration, flow jumps back to the test at the top of the loop, and it repeats this pattern.

The `do-while` statement in JavaScript always runs at least once. The syntax for that loop with dominant formatting norms looks like this:

    do {
      one or more statements to run until loop terminates
    } while (expression);

Note the semicolon at the end. Since the `}` is not the end of this statement, it is customary, though not strictly required, to put a `;` after the `)`.

Here is some pseudocode that does exactly what this do-while loop does:

    1  beginning of loop:
    2      statements to run until loop terminates
    3      if expression is truthy, go to line 2
    4  continue on to next statement

Starting from line 1, each line executes until line 3, where the first conditional test is. That means line 2 gets run at least once, and possibly more than once.



FOR LOOPS

Just as the `while` statement abstracts away GOTO jumps from loops, the `for` statement abstracts away the setup and progression code of while loops.

Her is an example of a pretty typical while loop:

    // Count 0..9 and print a message with each number
    c = 0;
    while (c < 10) { 
        console.log("The counter is " + c);
        c = c+1;
    }

It turns out that this pattern shows up a lot in programming. The `for` statement was created to standardize this pattern. By virtue of standardization, it becomes easier to read with practice. It can be re-written like this:

    // Count 0..9 and print a message with each number
    for (c = 0; c < 10; c = c+1 )
        console.log("The counter is " + c);
    }

The for statement head has three fields in its parentheses, each separated by semicolons. These semicolons may look like the semicolons that differentiate a statement in the rest of JavaScript, but they are not that kind of semicolon. We know because you can't have one at the end of the third field, like this `for ( i=0; i<10; i=i+1; )` On most interpreters this will throw a syntax error. You have to say `for ( i=0; i<10; i=i+1 )` instead. These semicolons are special separator characters between the three code fields within the round parentheses.

The meaning of each field is
    for ( initialization ; condition ; increment ) body;

Initialization, condition, increment, and body are all statements. The body is a statement, but it's usually a block statement, meaning a collection of statements inside curly braces.

The `for` loop translates to a `while` loop like this:
    initialization;
    while (condition) {
        body;
        increment;
    }

That means whatever code in the initialization field gets run first, and one time only. Then the test condition determines whether the first (or the next) iteration will run. Then everything in the body is run once. Then the increment code is run once. Then control loops back up to the test to determine if there is to be one more iteration. This continues until the test comes out false one time, when control goes to the line after the closing curly `}`.

After our discussion of semicolons, it might occur to you to abuse `for` loops by writing something like this:

    for ( initialization ; condition ; { body; increment; } );

That doesn't work. Inside the for loop's head parentheses, the rules are different than in the rest of JavaScript. In there, curly braces do not build a compound statement. This doesn't work for the same reason you can't have a third semicolon in there. Braces are always assumed to be an object literal within a for loop's parentheses. You can however abuse for loops like this:

    for ( initialization ; condition ; body, increment );

If body contains only expressions (no ifs, whiles, or fors), that would totally work the same as this:

    for ( initialization ; condition ;  increment ) body;

It works by exploiting the comma operator. You won't normally use the the comma operator, but I'll tell you how it works in this case anyway. The expression `exp1, expr2` means evaluate exp1 and then discard the value and evaluate exp2. You can string as many of these together as you like with more commas, and the whole thing resolves to whatever the last expression in the sequence resolves to.

Let's return to this code with a comma operator in the head of the `for` statement.

    for ( initialization ; condition ;  body, increment );

Let's see what that looks as a while loop:

    initialization;
    while (condition) {
        ; // This is the semicolon at the end of the `for` parens.
        body, increment;
    }

When the expression `body, increment` is evaluated, body is evaluated, and then increment is evaluated. Don't actually do this, it's abusive. The `for` loop is meant to make your code more readable than a `while` loop that follows the initialize-test-iterate-increment-test pattern. But do understand how it works, because there are cases that are not so abusive. Consider this one:

    for ( i=0, j=limit-1 ; i<j; i++, j-- ) {
        // do some stuff using i and j
    }

In this case, we have two indexes starting at each end and walking in opposite directions. It is not considered abusive (by many coders) because these indexing variables are for conceptually similar purposes in most people's thinking. Whether they were going in the same direction, or opposite directions, or the same or different pace, they are doing some kind of bookkeeping task to make the loop function. Use your own judgement about whether your use of the comma operator inside a `for` loop's head adds or detracts from an unfamiliar person's understanding of your code. You don't need to fully understand the comma operator to use it in a for loop. You can think of it as a baby semicolon in this context. It's like having two statements in one field of the `for` parentheses.



As an exercise, try to re-write your string parsing code to use `for` loops wherever it seem appropriate.
