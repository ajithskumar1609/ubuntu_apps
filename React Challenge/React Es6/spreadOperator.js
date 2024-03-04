const array = [1, 2, 3];
const array2 = [4, 5, 6];

const compaineArray = [...array, ...array2];
console.log(compaineArray);

const [one, ...rest] = array;
console.log(...rest);

const myVehicle = {
  brand: "Ford",
  model: "Mustang",
  color: "red",
};

const updateMyVehicle = {
  type: "car",
  year: 2021,
  color: "yellow",
};

const update = { ...myVehicle, ...updateMyVehicle };
console.log(update);
