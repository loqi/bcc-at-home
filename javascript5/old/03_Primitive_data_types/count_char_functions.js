

// Count the number of occurences of the letter 'o' in the string `str`
function oCount(str) {
    var count = 0, ch = 0;
    for (var i = 0; i < str.length; ++i) {
        count += +(str.charAt(i) === 'o');
    }
    return count;
}
console.log("Number of 'o' occurrences: " + oCount("This is a string."));



vowelCount :: f(str)



str        :: "I think..."
count      :: 1
i          :: 0

// Count the number of vowels in the string `str`
function vowelCount(str) {
    var count = 0;
    for (var i = 0; i < str.length ++i) {

    }
    return count;
}




function vowelCount(str) {
    var count = 0;
    for (var i = 0; i < str.length ++i) {
        ("aAeEiIoOuU".indexOf(str.charAt(i)) >= 0) && ++count;
    }
    return count;
}
console.log("Number of vowels: " + vowelCount("I think that I shall never see a thing so lovely as a tree."));

debugger;

// n      0 1 2 3 4 5 6  7  8  9
// fib(n) 0 1 1 2 3 5 8 13 21 34 
// 0th fib is 0; 1st fib is 1; and so on...
function fib(n){
    return (n<2) ? n : ( fib(n-1) + fib(n-2) );
}
console.log("0th Fibonacci number is " + fib(0));
console.log("1st Fibonacci number is " + fib(1));
console.log("2nd Fibonacci number is " + fib(2));
console.log("3rd Fibonacci number is " + fib(3));
console.log("4th Fibonacci number is " + fib(4));
console.log("5th Fibonacci number is " + fib(5));
debugger;
console.log("300th Fibonacci number is " + fib(300));


var messedUpStr = '';
// Create a new string with the content of `str`, but with all the 'o'
//   characters replaced with 'a' characters.
var ch     = 0;   // They can be left off, and the var is undefined
for (var i = 0; i < str.length; ++i) {
    ch = str.charAt(i);
    messedUpStr += (ch==='o') ? 'a' : ch;
}
str.replace('o', 'a');

console.log("Messed up string: " + messedUpStr);

// Advanced puzzles




// Count the number    of words in `str`.
var counter = 0, isInWord, wasInWord = false;
for (var i = 0; i < str.length; ++i) {
    isInWord = ("- \n\t\r".indexOf(str.charAt(i)) < 0);
    counter += +(!wasInWord && isInWord);
    wasInWord = isInWord;
}
console.log("Number of words: " + counter );







// Count the number of *unique* characters in `str`.
//   The string "abcdad" would have b, c unique. There are two of them => 2
console.log("Number of unique characters: " +            );


// Find a character in `str` that occurs the most.
//   The string "abcdbdb" would have "d" twice and b" three times. => 'b'
// In the event of a tie, you can report any or all winners.
// ***** your code here *****
console.log("Most frequent character: " +            );

// Really hard

// Find the length of the longest palindrome.
//   The string "squirrel abba zyxxyz bunny" has "zyxxyz" is longest. => 6
// ***** your code here *****
// console.log("Length of longest palindrome: " +            );


