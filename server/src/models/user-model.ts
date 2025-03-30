import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false }, // Добавлено значение по умолчанию
  activationLink: { type: String },
});

export default model("User", UserSchema);