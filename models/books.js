const mongoose = require("mongoose");

const bookSearchSchema = mongoose.Schema(
  {
    searchString: String,
    userId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookSearch", bookSearchSchema);