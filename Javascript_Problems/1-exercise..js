// ----------------------//
/* Write a javascript program to check two numbers and return true if one of the number 1s 100 or if the sum of the two numbers is 100*/

// traditional function expression

// function isEqual100(a, b) {
//   let result;
//   if (a === 100 || b === 100) {
//     result = true;
//   } else {
//     result = false;
//   }

//   return result;
// }
// console.log(isEqual100(10, 100));

// Arrow function

const isEqual100 = (a, b) => a === 100 || b === 100 || a + b === 100;

console.log(isEqual100(12, 100));

console.log(isEqual100(12, 50));

console.log(isEqual100(12, 50));

console.log(isEqual100(50, 50));
