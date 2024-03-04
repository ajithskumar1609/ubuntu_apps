class Car {
  constructor(name) {
    this.brand = name;
  }
  present() {
    return console.log(`I have a ${this.brand} car`);
  }
}

class Model extends Car {
  constructor(name, mod) {
    super(name);
    this.model = mod;
  }
  show() {
    return console.log(`${this.present()}+it is ${this.model}`);
  }
}

// const myCar = new Car("maruti");
// console.log(myCar);
// myCar.present();

const myCar = new Model("ford", "mustag");
myCar.show();
