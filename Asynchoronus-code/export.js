// export variable

const array = [1, 2, 3, 4];

// export class

class user {
  constructor(name) {
    this.name = name;
  }
  get() {
    console.log(this.name);
  }
}

// export function

function sayHi(user) {
  console.log(`Hello. ${user}!`);
}

// multiple export modules

export { array, user, sayHi };
