const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  phone: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  confirm: { type: String, required: true },
  tokens: { type: String, default: "" },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    if (!this.password.startsWith("$2b$")) {
      try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
      } catch (err) {
        return next(err);
      }
    } else {
      return next();
    }
  } else {
    return next();
  }
});
const UserList = mongoose.model("UserList", userSchema);
module.exports = UserList;
