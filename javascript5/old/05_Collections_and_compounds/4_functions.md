We have used functions and methods, but now we're going to look at them in detail.

A method is just a function that is stored in an object's property. But what is a function?

In JavaScript, a function is a kind of object.

A string is a limited kind of immutable object (sort of). It behaves like an object, but it is stored by value not by reference, and applying the `typeof` operator evaluates to "string".

A function is a kind of object. It really is an object in every way. It's a JavaScript object that has a special talent of carrying around a piece of executable JavaScript code and running that code when asked to do so.

Programming functions are inspired by functions in mathematics. A math function resolves to no more than one value for any unique set of input values (arguments), and produces exactly the same output every time it gets exactly the same arguments. In programming, a function might produce different outputs under different conditions, even with the same arguments coming in, but it always produces only one value or no value at all. This will make more sense as you read on.

There are two different special syntaxes for creating a function object,

    function nameOfFunction(p1, p2, p3) { statements }

or

    function(p1, p2, p3) { statements }

Each of these uses the `function` keyword to create a function object, but in a slightly different way. They both create a function that takes three parameters, and runs some statements when the function gets invoked (asked to run itself). They both create or overwrite a variable called `nameOfFunction` with an object reference to the function that was just created.

Here's what's different. When the function keyword appears on the left of the new function's name (first form), it's called a "named function" in JavaScript parlance. It works in a similar way to how the `var` keyword creates a variable. The name of the function is recorded in the variable space alongside all the other variables. If a variable already exists with that name, it is overwritten with a reference to the function object you just made. If the variable does not exist, it is created in the local variable context (we'll cover variable namespace scoping later). But there's one more thing that happens when you use the named function form. Every function object has an immutable property with the key of `name`. The function keyword populates the new function with the property `name:whatever_you_said_the_name_is`. in other words, a named function knows its own name.

When you use the second form, the interpreter will create an "anonymous function". All that means is the function object gets created with the property `name:""`. But the second form is not much use without using it somehow. If you don't remember where it is, it will be lost without ever running the function you just made, so we might want to assign the function to a variable like this:

    myFunctionName = function(p1, p2, p3) { statements };

Note the semicolon at the end of the previous line. That's there because `function(p1, p2, p3) { statements }` is actually an expression. Think of both of these as a function literal. In the same way that objects and strings have special syntax to describe objects and strings for the interpreter to create, so too functions have these two forms to describe how to make them for the interpreter. One populates the name property with a string version of the function name, the other with an empty string, but both of these creates a function (which is a kind of object) and resolves as an expression to a reference to that object (the kind of object that is also a function).

If this is confusing, think of it as a kind of categorization. All functions are objects, but not all objects are functions. All owls are birds but not all birds are owls.

> function f(){}  // Create a named function. A function is a kind of object.
< undefined       // The function keyword doesn't touch the expression accumulator
> f               // What is in the variable `f` right now?
< function f()    // A function object that takes no parameters and is named `f`
> f.name          // `f` variable has a reference to a function object. Ask its name
< "f"             // The `name` property of a function is a string not a function

So that was a named function. Now let's do that with an anonymous function.

> var anon = function(){}; // Create a variable `anon` with a reference to a function
< undefined                // The var keyword doesn't touch the expression accumulator
> anon                     // What is in the `anon` variable right now?
< function anon()          // That's a surprise. The function seem to know its own name
> var x = anon             // Let's try assigning it to another variable
< function anon()          // It still seems to know its own name
> x                        // Let's try reading it from that other variable
< function anon()          // It still seems to know its own name
> anon.name                // Does the function really know its own name?
< ""                       // No name here

It turns out that anonymous functions don't really know their own name. The Chrome developer tools sometimes give us extra information that's not available to a running JavaScript program. This can be helpful or confusing, depending on what you're expecting to see.

It's time to build a function that actually does something.

> function sum(a, b) { return a+b; }
< undefined
> sum
< function sum(a, b)
> sum(5, 2)
< 7

The `sum` function we just made takes two parameters and then returns the results of applying the `+` operator between them. The `return` statement causes the expression after the `return` keyword to be evaluated, and the result is what the value of the function-calling expression resolves to. When the expression `sum(5, 2)` is evaluated, the interpreter follows these steps:
    1. There is an identifier followed by a `(`  That means a function call.
    2. That identifier is a variable name. Find the variable and read its value.
    3. That variable `sum` has an object reference to a function in it.
    4. Find that function in memory by following the reference.
    5. Run the function with `a` containing 5 and `b` containing 2.
    6. The function has only one statement. Run that statement.
       evaluate the expression (a+b) to (5+2) to (7)
    7. The expression `sum(5, 2)` resolves to the number 7

There's a difference between parameters and arguments. Many people use these words interchangeably, but there's a difference. The parameters are the variables that get auto-loaded by the function call. The arguments are the values that get loaded. So in the example `5` and `2` are the arguments and `a` and `b` are the parameters.

The parameters get loaded positionally. That means the leftmost argument gets loaded into the leftmost parameter, the second argument goes into the second parameter, and so on. If there are more arguments than parameters, the extra arguments (on the right side) get ignored. If there are more parameters than arguments, the extra parameters have the undefined value.

A function has a length property. That property's value is a number representing the arity (number of parameters) of the function.

> sum.length
< 2
> sum(2, 2, 7)
< 4
> sum(2)
< NaN
> 2 + undefined
> NaN
> sum(5, "5")
< "55"

The only conventional way for JavaScript code to create a function is with the function keyword. You can't take a non-function object and turn it into a function but you can treat a function just like any other object and add more properties to it. It's a bit strange. It's not often done, but let's play with it now to illustrate that a function is just a plain object plus the function features.

> sum.somethingNew = "suit"
< "suit"
> sum.somethingBorrowed = "bicycle"
< "bicycle"
> sum.somethingNew
< "suit"
> sum.somethingBorrowed
< "bicycle"
> Object.keys(sum) // You'll learn about this later
< ["somethingNew", "somethingBorrowed"]
> sum instanceof Function // Another operator to learn about
< true
> sum instanceof Object
< true
> sum instanceof Array
< false

A function really is a kind of object. It can do everything an object can do, plus the special talent of carrying code around and running it when invoked.

Functions are fundamental to organizing your code and managing complexity. Before functions were invented for computer programming, everything was done with global variables and subroutines, and it was so easy to become a mess. With functions, we have well-defined sets of inputs and a single output. The function might be simple or complex on the inside, but it isn's supposed to mess with much other than its arguments and return value. We still use global variables, but we try to keep them to a minimum so as to minimize coupling between systems (side-effects and dependent behaviors between otherwise disconnected parts of a program).

Most functions are not as tiny as the ones shown here. The point of this chapter is to demonstrate what functions are. We'll get bigger in our functions as we go along.

One last point about anonymous vs. named functions. The syntax can be mixed.

> var anonFunc = function namedFunc(){ return 5; };
< undefined
> anonFunc;
< Function namedFunc()
> namedFunc;
   Uncaught ReferenceError: namedFunc is not defined
> anonFunc.name;
< "namedFunc"
> anonFunc();
< 5
> namedFunc();
   Uncaught ReferenceError: namedFunc is not defined

So when you mix the two, a function gets created, and it knows its own name to be the one given after the function keyword. But no variable by that name gets created because it's not using the `function` keyword is within a `var` statement. Only the variable name from `var` gets created. The name from `function` is the function name, but `function` is not the keyword defining the statement, so we end up with a mismatch between the identifier pointing at the function, and the function's name-name.

> var namedFunc = anonFunc;
< undefined
> namedFunc;
< Function namedFunc;
> namedFunc();
< 5
> namedFunc.name;
< "namedFunc"

We'll use functions to organize our code going forward. The standard indentation form is

function sum(a, b) {
    return a+b;
}
