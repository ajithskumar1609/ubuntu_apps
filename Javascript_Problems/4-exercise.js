/* Write a javascript program to get the current date */
/* expected Output -> mm/dd/yyyy or dd/mm/yyy*/

// traditional function

const date = new Date();

const month = date.getMonth() + 1;
const year = date.getFullYear();
const day = date.getDate();
console.log(day);

const dateFormat = `${day}/${month}/${year}`;

console.log(dateFormat);

// Arrow function

const formateDate = (date = new Date()) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

console.log(formateDate());
