const mongoose = require("mongoose");
const ORDER = require("./model.js/orderModel");
const DB = "mongodb://localhost:27017/pizza";

mongoose.connect(DB).then((con) => {
  console.log(con.connection);
  console.log("database connected");
});

// const orders = new ORDER({
//   name: "ajith",
// });
// orders
//   .save()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   }

// const orders = ORDER.create({
//   name: "ajith",
// });
const importData = async () => {
  try {
    const order = await ORDER.insertMany([
      {
        _id: 0,
        name: "Pepperoni",
        size: "small",
        price: 19,
        quantity: 10,
        date: "2021-03-13T08:14:30Z",
      },
      {
        _id: 1,
        name: "Pepperoni",
        size: "medium",
        price: 20,
        quantity: 20,
        date: "2021-03-13T09:13:24Z",
      },
      {
        _id: 2,
        name: "Pepperoni",
        size: "large",
        price: 21,
        quantity: 30,
        date: "2021-03-17T09:22:12Z",
      },
      {
        _id: 3,
        name: "Cheese",
        size: "small",
        price: 12,
        quantity: 15,
        date: "2021-03-13T11:21:39.736Z",
      },
      {
        _id: 4,
        name: "Cheese",
        size: "medium",
        price: 13,
        quantity: 50,
        date: "2022-01-12T21:23:13.331Z",
      },
      {
        _id: 5,
        name: "Cheese",
        size: "large",
        price: 14,
        quantity: 10,
        date: "2022-01-12T05:08:13Z",
      },
      {
        _id: 6,
        name: "Vegan",
        size: "small",
        price: 17,
        quantity: 10,
        date: "2021-01-13T05:08:13Z",
      },
      {
        _id: 7,
        name: "Vegan",
        size: "medium",
        price: 18,
        quantity: 10,
        date: "2021-01-13T05:10:13Z",
      },
    ]);
    console.log(order);
  } catch (err) {
    console.log(err);
  }
};
importData();
const order = async () => {
  try {
    const order = await ORDER.deleteMany({});
    console.log(order);
  } catch (err) {
    console.log(err);
  }
};