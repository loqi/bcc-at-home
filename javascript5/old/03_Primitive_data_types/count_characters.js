// var str = "hello and welcome to the next phase of your life";
// var str = "Hello, and welcome to the next phase of your life.";
var str = "I don't feel so hot.";
// var str = "I am such an ace at writing code! There's nothing I can't do. Hey, I got this.";

// Discover the length of the string `str`
console.log("Length of the string: " + str.length);

// Count the number of occurences of the letter 'o' in the string `str`
var oCount = 0;   // These look like `assignments, but they are not
var ch     = 0;   // They can be left off, and the var is undefined

for (var i = 0;   i < str.length; ++i) {
    oCount += +(str.charAt(i) === 'o');
}

console.log("Number of 'o' occurrences: " + oCount);

// Count the number of vowels in the string `str`
var vowC = 0;
for (var i = 0; i < str.length ++i) {
    vowC += +(("aAeEiIoOuU".indexOf(str.charAt(i)) >= 0));
}
console.log("Number of vowels: " + vowC);

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


