The true meaning of semicolon


What is this semicolon business with JavaScript statements?

First, what is a statement?

It's the smallest chunk of code that the interpreter can execute. Statements are often composed of smaller executable chunks of code but the interpreter doesn't try to run just part of a statement. It only tries to run an entire statement all the way through before moving on to the next statement to run all the way through.

Let's study the steps followed by the JavaScript interpreter to run this code snippet. Line numbers shown for reference; not part of the JavaScript code.
    1  counter = counter + 1;
    2  if (counter === 7) {
    3    console.log("Lucky number 7!");
    4  }

Any JavaScript interpreter will just as happily run this snippet:
    a=x+1;if(a===7){console.log("Lucky number 7!");}

The whitespace is there for us humans. Spaces, newlines, and tabs are there to show us visual creatures the structure of the code. The interpreter just skips over it, just as it skips over comments without trying to run them. Comments and whitespace are there for us humans who like to understand how things work, so give some attention to whitespace, comments, and the names of things, to make it easier for the people on your team. Reading code you wrote yourself three months ago is almost as hard as reading code someone else wrote today.

The interpreter is incapable of understanding anything. It just converts JavaScript into invisible machine language and causes the CPU to run that machine language. Out here where we are, it looks like our computer is running JavaScript, but really, it's our favorite web browser (in machine-language) running its embedded JavaScript interpreter (in machine-language ) to convert JavaScript code into machine language. We don't have to understand or see any of that machine language. All we have to know is that it it happening somehow.

So the interpreter begins at the first character of the example code snippet `c`. Well, that already looks like a valid statement, `c;`. If we want to be real sticklers, even `` is a valid statement, `;`. But JavaScript doesn't try to run either of those, it continues parsing forward.

`counter `. Okay, also looking like a statement `counter ;`. No problem running that, but it's not a statement yet. `counter = counter` is another valid statement. Keep parsing. `counter = counter + 1;` -- Okay we have reached a semicolon. That means the code has a definitive statement designation, so the interpreter runs the code. That statement is just an expression with two operators and three values. No problem. Evaluate that expression by the hopefully now-familiar expression evaluation rules we went over in such detail.

In this context, the meaning of the semicolon is, "Hey JS interpreter, all that stuff on the left of this semicolon, that's a statement, so go ahead and run whatever you found there and begin parsing for your next statement after that semicolon."

So if you write code like this
    ;;;
JS will run it like this
    run the statement `` and then the statement `` and then ``

In other words, do nothing three times.

When the interpreter reaches this line
    console.log("Lucky number 7!");
it will run it as a statement. We haven't yet gone over the dot operator or function calls, but the line is a bit of whitespace, a compound expression, a semicolon, and a newline followed by still more code after that. The semicolon definitively makes the expression `console.log("Lucky number 7!")` into a statement. All that means is that when the JavaScript interpreter reaches that line, it will parse it to the semicolon and then attempt to run that expression.

But what about these lines of code?

    2  if (counter === 7) {
    3    console.log("Lucky number 7!");
    4  }

Line 3 is a statement. Is Line 2 a statement?

Just as expressions can be composed of smaller expressions, statements can be composed of smaller statements. Lines 2 through 4, containing the sequence `if (...) { ... }` is a statement, inside which is line 3, also a statement.

Would this be correct JavaScript for line 4?
    4  };

The answer is yes. In some sense it would be *more* correct, because we are more explicitly annunciating our statements. However, it is customary in the JavaScript world to omit semicolons from going directly after a code block closer, because there is no possible case where a `}` doesn't serve the same purpose as a `;` to tell the interpreter to run all the code since the end of the previous statement as a new statement. JavaScript will have already interpreted `}` as the end of a statement and run it before it sees `;`.

The bigger reason why we don't use `};` is because nobody else does that. To be consistent with social convention among JavaScript programmers, we omit the semicolon following a closing curly because a closing curly is just as good as a semicolon for declaring the end of a statement.

For that reason, a closing curly is just as good at delimiting a statement in front too, since it forces all code after the previous statement to be run.
    console.log("Lucky number 7!")}
Similarly, the very last line of your script can't possibly require a semicolon at the very end, because once the interpreter reaches the end, it assumes it has a whole statement, semicolon or no semicolon. However, unless the closing curly is on the same line with its last statement, it is customary to use the semicolon in a consistent way.
    3    console.log("Lucky number 7!");
    4  }
Otherwise, we'd have to constantly try to write the last line differently from the second-to-last line of a code block.

Here's a mini exercise. In light of these semicolon rules, find the bug here:

    if (user_is_ready); console.log("I see you're ready now.");

You might want to put curly braces and newlines in there to fit your style conventions.
    if (user_is_ready); {
      console.log("I see you're ready now.");
    }
That may be a style violation, but it's not a bug.

The presence of the semicolon in `if (user_is_ready);` causes the interpreter to run `if (user_is_ready)` as a statement. It goes ahead and executes that chunk of code. It's an `if` statement, so it does the same thing as `if (user_is_ready) {}` before moving on to the next statement { console.log(...); }`. We haven't yet learned about JavaScript headless block statements, but the interpreter will do this:
    if user_is_ready is truthy, then do nothing.
    Unconditionally console.log the message within as a block statement.

It's as if we'd written this code:
    if (user_is_ready) {
        // do nothing
    }
    /* headless block statement begins here */ {
      // Code in here runs exactly the same as outside here
      console.log("I see you're ready now.");
    }
Or more concisely:
    if (user_is_ready) {
    }
    console.log("I see you're ready now.");

You don't need to know what a block statement is. Nobody ever uses them in JavaScript. They were intended to create a nested execution context (you'll learn about execution contexts later), but the very first version of JavaScript was released with an interpreter that didn't open a new execution context when it saw the new-execution-context syntax, so the tradition continued do this day. The new-context syntax rule still exists but it does absolutely nothing special. Over the twenty-year history of JavaScript, headless block statement syntax has remained valid, but means, "Just run this code the regular way, as if these curlies weren't even here."

The main point here is, putting a semicolon where it doesn't belong can make your code do something different from what it looks like it's supposed to do. The interpreter ignores the indentation but not the semicolons, and sometimes not doesn't ignore the newlines.

There are times when the JS interpreter mis-identifies statement breaks in otherwise valid code. It parses the next piece of code until it decides it has found the beginning of a new statement (or end of the current code block) and then tries to run the statement it just parsed. 

Here's one example
    a=x+1if(a===7){
The token `1if` does not follow identifier rules (variable naming rules). A person can figure out what this code is meant to be, but the interpreter sees the `1` is a numeric character and then tries to read `1if` to represent some kind of number. That code doesn't follow any literal format it recognizes, so it throws a syntax error. Even putting a space in there doesn't solve the syntax error with the current V8 interpreter. A newline or semicolon does the trick.
    a=x+1;if(a===7){

Newline characters are sometimes like a halfway-semicolon to the interpreter.
    1  a = x + 1
    2  if (a === 7)
    3  {
    4  console.log("Lucky number 7!")
    5  }

Line 1 means the same as `a = x + 1;` and line 4 is the same as `console.log("Lucky number 7!");` and line 5 is interpreted as the last line of the `if` statement, but line 2 is *not* interpreted the same as `if (a === 7);` because of some obscure interpreter behavior.

I'll leave it to you to decide what's easier for you: using semicolons at the end of every statement except those ending in '}' -- OR omitting most of your semicolons by learning how the interpreter infers differentiation between statements.

1. You can *almost* always get away with omitting a semicolon.
2. Putting in an extra semicolon might break your code.
3. http://davidwalsh.name/javascript-semicolons

Learn where semicolons belong and what they do, or else one way or another you will eventually experience pain.

-----

Semicolons are often taught backward, as if they're a minor punctuation glyph that represents good form for your code. As a result, many JavaScript coders think the principal function of semicolons is to politely document your code for other people to read.

The semicolon is a live command to the interpreter! It means "RUN THAT CHUNK OF CODE YOU JUST FOUND".

Adding a semicolon after a runnable statement of code is roughly equivalent to wrapping that code in curly braces. The interpreter gets an unambiguous signal that it has been given a complete statement. So it goes ahead and tries to run it before starting in on its next statement. If the interpreter finds what looks to be a complete statement followed by the beginning of a new statement, it figures you omitted a semicolon and runs that statement before parsing into that next statement. Putting semicolons after every statement reduces the chance your code will be misinterpreted.
