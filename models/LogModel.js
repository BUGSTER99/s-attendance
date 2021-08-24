const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {

    user: { type: Schema.Types.ObjectId, ref: "User" },

    log: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);


