Using the Chrome debugger

It's time to play Follow the Leader with code in the Chrome debugger. First start Chrome and open a console. Type something into it to be sure it's running. Then paste this code in and press enter:


var counter       = 0;
var triangularNum = 0;
debugger;
while (counter < 10) {
    counter = counter + 1;
    triangularNum = triangularNum + counter;
    console.log("The " + counter + "'th triangular number is " + triangularNum);
}
console.log("Our loop has finished.\n  counter is left with " + counter + "\n  triangularNum is left with " + triangularNum);



The third line of that code has a debugger statement, meaning it's a hard-coded breakpoint. When you run it in a browser that has developer tools, the debugger tool will pause execution at that line and wait for you to tell it what to do. We're using Chrome, so I'll be talking about the Google Chrome debugger tool.

The debugger tool is shown in the "sources" tab. It usually focuses there automatically, but you may need to click the tab. There you will see the code you just gave the console, possibly with a few extra lines of weirdness above and below. Drag your dividers around so you have a pretty good sized view of the off-white middle pane. The `debugger;` line should be highlighted. Execution has paused there, ready for you to control the flow using debugger commands. Mine looks like this:

 1 with (typeof __commandLineAPI !== 'undefined' ? __
 2 var counter       = 0;
 3 var triangularNum = 0;
 4 debugger;                <<<<<< debugger paused here
 5 while (counter < 10) {
 6     counter = counter + 1;
 7     triangularNum = triangularNum + counter;
 8     console.log("The " + counter + "'th triangular
 9 }
10 console.log("Our loop has finished.\n  counter has
11 }

You might see a bunch of inner tabs with some unfamiliar names and weird looking JavaScript code. That is JavaScript code, written by teams of engineers and processed through filters that makes it hard to read but smaller to transmit over the network. The debugger gives you access to this code in case you are a super-nerd and want to play with it too. Your code will be in one of these tabs with one of these names, paused and ready for you to debug.

Lines 1 and 11 were added by Chrome to get the debugger to work. I'm going to assume your line numbers match mine when I refer to them. If your debugger did not add one line at the top, adjust what I say about line numbers accordingly.

In the upper right area, you'll see some clickable symbols that let you resume execution, and step through the code statement-by-statement. Below that is a watch area. You can put any expression in there to see what its current evaluation is. Twirl the triangle downward and remove any leftover lines in there by pressing the little minus sign at the right of each line. Now press the plus sign in the watch header. You'll get a text box, in which you type any arbitrarily complex expression. Do that once for each variable name triangularNum and counter. Now you can see what's in those variables all the time. You can also peek inside a variable by hovering over its name in the off-white code. If it's a really short variable name, you may need to hover over the left side.

Let's add a soft breakpoint. Click on the line number of line 6. That should emphasize the line number with a breakpoint symbol. Clicking it again will un-breakpoint line 6. Make a breakpoint on line 6 and line 10.

Now you should have execution paused on line 4, breakpoints on line 6 and 10, and counter and triangularNum showing in the watch area. Running the next statement and then pausing is called stepping in the debugger. Hover over the little eyebrow arrow in the upper right to show the keyboard shortcut. You can click the symbol or tap the F10 key to get the step effect. A big keyboard has an F10 key; a laptop may need to hold down the fn key while tapping the f10 on the top row. Step once to pause on line 5.

We see that counter currently has the number 0, which is less than the number 10. Step again to pause on line 6. Line 6 is highlighted. The first (only) statement of line 6 is extra highlighted. It is about to be executed. No part of that statement has yet been executed. Occasionally, you'll see statements partially executed before the pause. That is because the V8 JavaScript interpreter sometimes optimizes the code by rearranging the internal sequence of steps. It gives the same high-level effect but runs faster. This weirdness is sometimes exposed in the debugger. Your statement might appear to have been halfway executed already when you look at variable state. Be aware that's a thing, and don't be confused when you see two events happen in a strange sequence when you inspect variables. This is not one of those times. The line 6 statement `counter = counter + 1` is about to be executed and counter contains 0 right now, just before the statement begins. We can see this in the watch area, or by hovering over any occurrence of the variable name in the off-white code pane.

Step line 6. Now we're paused on line 7.

In case you're feeling exceptionally bad at addition, or somewhat mistrustful of JavaScript's incessant type coercion helpfulness, you can drag-highlight a bigger expression and then hover over that highlight to evaluate it in real time. Try this with something `triangularNum + counter` to see what is about to be written to triangularNum. Highlight that expression and hover over that highlight to get a tooltip to see that it really is addition (creates a number) and what that sum is. If you accidentally included the semicolon, it will still evaluate, but the semicolon is not part of that expression. You could type that expression into the watch area if you want it to stay visible all the time.

Let's highlight a bigger expression, like the whole thing: `triangularNum = triangularNum + 1`

Hovering over this will show the real-time evaluation of that expression. Hovering over it again will highlight it again. And again. Oops. Why does it keep changing?

Clicking the refresh circle-arrow of the watch area shows the new values that got past its auto-refresher. Let's fix the value before proceeding using a little hack. Add the watch expression `triangularNum = 0` and then click refresh and then remove that watch expression. Now it's back where it was before our shenanigans. We can proceed with the code and it will do what it would've otherwise done.

Step line 7 while watching the watch expressions. Now the debugger is paused on line 8 and triangularNum will have changed (now 1) and counter will have stayed the same (still 1). Stepping line 8 will build a message string and sent it to the console for display. Let line 8 run. We don't see the message, but its in the console. Click the console tab to see it. The "1'th" triangular number? It's just easier this way for now. Click on the sources tab to get back to the debugger session.

Now that line 8 has run for the first time, we're paused at line 5 again. This is where our `while` structure -- I like to think of it as a "sticky if" structure -- tests its condition for the second time. Had it come out false the first time, we would've run the body zero times, skipping execution flow to line 10. It was false, so the body executed one time so far. Now it's time for the second test to determine whether there will be a second execution of the body. The variable `counter` currently has a numeric 1 as its value. 1.0 is less than 10.0, so the `<` operator causes the expression to resolve to the boolean true value. The body of the `while` structure will execute at least one more time.

Now remove the breakpoint on line 6 and put one on line 8 and 10 by clicking on the line numbers. Hit F8 or fn+F8 or click the little blue "play forward" button in the upper right region to resume execution. Execution should be paused at the next breakpoint the execution flow reaches, which should be line 8. Now the variables are in the state they should be at the end of the second iteration. Check their values to confirm they are what you think they ought to be. Notice you can't set a breakpoint on line 9 because it doesn't contain executable code. It just has a `}` which tells the interpreter how to group the statements, but is not itself a statement. If you really need to set a breakpoint on a `}` line, you can slightly temporarily pollute your code with another hack and use `;}` as your block closer. Can you explain why this line is breakpoint-able? That trick very occasionally comes in handy. Don't leave the orphan semicolon (or `debugger` statement) behind when you're done debugging. Since we have a convenient last line of "real" code at the end of the `while` structure, we use that as a breakpoint.

Pressing "play" again will finish out this iteration and run most of the next iteration, pausing at the same breakpoint. Verify the variables look right to you. Press play five more times while watching the variables.

Now make a prediction. Which breakpoint will be the next one to pause at, line 8 or line 10? Each time you press play, guess which one will be the line where the debugger pauses. Be sure you're not off by one.

Off-by-one errors are very common. At first, you may be off by one quite often. Just know about that trickiness and double check your work. Go ahead and write code you know is possibly buggy, and check it either by just running it bare to see what happens, or by inspecting variables in the debugger. If you think there might be an error in your code, add a comment note about it.

It's customary to use the word FIXME at the beginning of a comment to indicate something might be broken, or isn't as nice as it ought to be. Use BUG when you know for sure the code is broken.
http://stackoverflow.com/questions/1452934/what-is-the-meaning-of-xxx
Many editors have tools and plugins that respond to comments in this format.

When you press the debugger's continue button again, the last of the code will run through to the end and the console will report the final content of the expression accumulator. In this case it has the undefined value since the final expression is console.log("bla bla bla") which has no return value. You won't find console.log in the JavaScript documentation, because the console is a feature of the web browser (Chrome), not the JavaScript language. There's a whole bunch of stuff that comes with the browser that is made available to the JavaScript interpreter. We'll learn about those.

-----

That's a pretty good tour of the Chrome debugger. Now try to write some code on your own to do some tasks. Here are a few coding challenges. Copy this code to your text editor and clipboard some of it into the console to run, perhaps with debugger statements in it:


var str = "hello and welcome to the next phase of your life";
// str = "Hello, and welcome to the next phase of your life.";
// str = "I don't feel so hot.";
// str = "I am such an ace at writing code! There's nothing I can't do. Hey, I got this.";

var answer = 0;

// Discover the length of the string `str`
answer = str.length;
console.log("Length of the string: " + answer);

// Count the number of occurences of the letter 'o' in the string `str`

var oCount = 0;   // These look like assignments, but they are not
var index  = 0;   // They are the optional part of a `var` statement
var ch;           // They can be left off, and the var is undefined
debugger;
while (index < str.length) {
    // Read the next character
    ch = str.charAt(index)

    // If we found an 'o'
    if (ch === 'o') {
       oCount = oCount + 1;
    }
    index = index + 1;
}
answer = oCount;
console.log("Number of 'o' occurrences: " + answer);



// Count the number of vowels in the string `str`
// ***** your code here *****
console.log("Number of vowels: " + answer);



var messedUpStr = '';
// Create a string with the content of `str`, but with all the 'o'
//   characters replaced with 'a' characters.
// ***** your code here *****
console.log("Messed up string: " + messedUpStr);



// Count the number of words in `str`.
// ***** your code here *****
console.log("Number of words: " + answer);



// Count the number of words in `str`.
// ***** your code here *****
console.log("Number of words: " + answer);



// Count the number of *unique* characters in `str`.
// ***** your code here *****
console.log("Number of words: " + answer);



// Find a character in `str` that occurs the most.
// ***** your code here *****
console.log("Number of words: " + answer);







