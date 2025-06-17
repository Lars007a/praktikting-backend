import mongoose, { Schema } from "mongoose";

//Styrer det der er i db'en, sådan daten er formeret.

mongoose.set("runValidators", true);

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.users || mongoose.model("users", userSchema);
