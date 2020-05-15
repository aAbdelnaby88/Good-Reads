const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  content: { type: String, required: [true, "can't be blank"] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  date: { type: Date, default: Date.now },
});

const reviewModel = mongoose.model("Review", reviewSchema);

module.exports = reviewModel;
