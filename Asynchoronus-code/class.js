// class is a blueprint of the object // You create object from the class // class inside variable declare and methods

// constructor //

// function person(name,age) {
//   this.name = 'ajith';
//   this.age = 20;
// }

// const person1 = new person(); // object create
// console.log(person1);

// The class keyword is used to create a class. The properties are assigned in a constructor function.

// creating class //
class person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log('hell good morning');
  }
}

// creating in a object //

const person1 = new person('ajith');
const person2 = new person('nikhil');

console.log(person1);
console.log(person2);
person1.greet();
