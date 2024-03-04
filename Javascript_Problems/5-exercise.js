/* write a javascript program to create a new string adding "New!" in front of given string. If the given string begins with "New!" already then return the original String*/

const addNewString = (string) =>
  string.indexOf("New!") === 0 ? string : `New! ${string}`;

console.log(addNewString("New! ajith"));
