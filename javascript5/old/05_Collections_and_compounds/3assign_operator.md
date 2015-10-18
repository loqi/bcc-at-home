We haven't explored the assign `=` operator in detail. Let's do that now.

Open a JavaScript console and type these commands.

> var s = "abc"
< undefined
> s = "xyz"
< "xyz"

Notice that the value reported by the console from the expression accumulator. In the first statement, the `=` is part of the var statement. In the second statement, it's the `=` operator. A var statement always leaves the expression accumulator unchanged. The console always loads the accumulator with the undefined value (or undefined pseudo-value) before executing a command we type. Let's try another line:

> 5; var s = "abc"
< 5

Here our console command is two JS statements. The console hands that line of JS code to the interpreter which then executes it as a tiny JavaScript program. The first token is a very simple expression that means the number five. The semicolon tells the interpreter to run everything it's got so far, which is just a tiny expression '5', so it creates a number five and puts it into the accumulator. Done. Now parse forward looking for the next statement. It sees a `var` keyword, which causes it to create a new variable with the name `s` in the current namespace and it sees the `var` statement has the optional `=` continuation. It evaluates the expression "abc" as a string literal, creating a string with those characters in it and loads the new `s` variable with it. A var statement doesn't touch the expression accumulator. That still has the number five in it. The interpreter has reached the end of that tiny JS program, so it returns the content of the accumulator, which the console then reports to the user.

> 5; s = "abc"
< "abc"

This starts off the same, but the second statement is another expression in the form "variable = string_literal". That second statement evaluates like this: Make a new string with three characters in it and put it into the accumulator. Find the variable `s` and overwrite its content with whatever's in the accumulator. Done. The `=` operator overwrites the writeable memory location on the left with whatever is in the accumulator, which it has just interpreted from the code on the right of the `=`. The `=` operator evaluates right-to-left, so we can have code like this:

> var a, b, c
< undefined
> a = b = c = 3
< 3
> a
< 3
> b
< 3
> c
< 3

The code `a = b = c = 3` is a statement because we gave it to the console as a command, hitting the enter key, which is just like putting a semicolon on the end. The console hands it to JavaScript as a tiny executable program. JavaScript runs it, sees it's an expression that means this:
    ( a = ( b = ( c = (3) ) ) )
because `=` evaluates from right to left. Each of those '=' operators causes the writeable memory location on the left (the value location of the variable) to be overwritten with whatever is in the accumulator from the previous evaluation. First the `3` evaluates to the number three, which is put into the accumulator. Next the value of variable `c` is overwritten from the accumulator. Then `b` is overwritten from the accumulator. Then `a` is overwritten from the accumulator.

You'd never actually perpetrate the next code on your engineering teammates, but see if you can guess what it does:

> a = ( b = ( c = 10 + 1 ) + 2 ) + 3

`+` gets done before `=` so it's the same as
    ( a = ( ( b = ( ( c = (10 + 1) ) + 2 ) ) + 3 ) )
which evaluates to
    ( a = ( ( b = ( ( c = (  11  ) ) + 2 ) ) + 3 ) )
which, after setting `c` to 11 evaluates to
    ( a = ( ( b = ( (      11      ) + 2 ) ) + 3 ) )
which evaluates to
    ( a = ( ( b = (            13        ) ) + 3 ) )
which, after setting `b` to 13 evaluates to
    ( a = ( (             13               ) + 3 ) )
which evaluates to
    ( a = (                 16                   ) )
which, after setting `a` to 16 evaluates to
    ( 16 )
which is returned to the console in the expression accumulator and reported by the console to the user (to you) as
    < 16

Now you should see those three values in the variables.

> a
< 16
> b
< 13
> c
< 11

