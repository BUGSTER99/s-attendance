const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema(
  {
    user: {type:Schema.Types.ObjectId, ref:"User"},

    profilePicUrl: { type: String },

    keterangan: { type: String },

    status: { type: String, default: "masuk", enum: ["masuk", "izin", "cuti", "lembur"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attendance", AttendanceSchema);


