const user = {
  name: 'Alex',
  address: '15th Park Avenue',
  age: 43,
};

const clone = { ...user }; // Output, {name: "Alex", address: "15th Park Avenue", age: 43}

// console.log((equal = clone === user));

// update object

const updateObject = { ...user, salary: 45000 }; // Output, {name: "Alex", address: "15th Park Avenue", age: 43,salary:450000}
console.log(user); // Output, {name: "Alex", address: "15th Park Avenue", age: 43}

// name split and join
let myName = 'ajith,kumar,s';
myName = myName.split(',').join(' ');

console.log(myName);
