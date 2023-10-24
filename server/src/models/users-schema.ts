import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const UsersSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

UsersSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

module.exports = model("User", UsersSchema);
