// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const adminSchema = mongoose.Schema({
//   name: { type: String, required: true },
//   phone: { type: Number, required: true },
//   email: { type: String, required: true },
//   role: { type: String, required: true },
//   image: { type: String, required: true },
//   date: { type: String, required: true },
//   password: { type: String, required: true },
//   tokens: { type: String, default: "" },
// });

// adminSchema.pre("save", async function (next) {
//   if (this.isModified("password") || this.isNew) {
//     if (!this.password.startsWith("$2b$")) {
//       try {
//         const hashedPassword = await bcrypt.hash(this.password, 10);
//         this.password = hashedPassword;
//         next();
//       } catch (error) {
//         return next(error);
//       }
//     } else {
//       return next();
//     }
//   } else {
//     return next();
//   }
// });
// const AdminRegister = mongoose.model("AdminRegister", adminSchema);
// module.exports = AdminRegister;
