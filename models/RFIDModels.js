const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RfidSchema = new Schema(
  {

    RFID: { type: String, required: true, unique: true},

    status: { type: String, default: "belum digunakan", enum: ["belum digunakan", "telah digunakan"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RFIDCard", RfidSchema);


