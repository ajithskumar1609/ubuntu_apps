// Destructuring Array

// const Array1 = ["apple", "potato", "pencil"];

// // const [fruits, veg, stationary] = Array1;

// // console.log(fruits, veg, stationary);

// Destructuring Object

const obj = {
  name: "ajith",
  age: 21,
};

const { name, age } = obj;

console.log(name, age);

function employee({ name, age }) {
  console.log(name, age);
}
employee(obj);
