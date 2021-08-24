const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {

    profilePicUrl: { type: String },

    name: { type: String, required: true },

    RFID: { type: String, required: true, unique: true, trim: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },
    
    date_birth: { type: String, required: true, select: false },
    
    phone: { type: Number, required: true, select: false },

    address: { type: String, required: true, select: false },

    newMessagePopup: { type: Boolean, default: true },

    unreadMessage: { type: Boolean, default: false },

    unreadNotification: { type: Boolean, default: false },

    role: { type: String, default: "user", enum: ["admin", "editor", "viewer", "user"] },

    resetToken: { type: String },

    expireToken: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);


