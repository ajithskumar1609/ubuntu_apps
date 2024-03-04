const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: Number,
  name: String,
  size: String,
  price: Number,
  quantity: Number,
  date: String,
});
const ORDER = mongoose.model("ORDER", orderSchema);

module.exports = ORDER;
