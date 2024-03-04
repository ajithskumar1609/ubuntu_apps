const user = {
  name: 'Alex',
  address: '15th Park Avenue',
  age: 43,
};
// object values assign in value

// const name = user.name;
// const age = user.age;
// const address = user.address;

// console.log(name, age, address);

// new Es6 assign in value new method in destructuring //

const { name } = user;
console.log(name);
