const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
  {

    image_apps: { type: String },
    apps_name: { type: String },
    mulaiabsen_datang: { type: String },
    selesaiabsen_datang: { type: String },
    mulaiabsen_datang: { type: String },
    selesaiabsen_datang: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Log", LogSchema);


