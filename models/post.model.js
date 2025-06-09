import mongoose, { Schema } from "mongoose";

//Styrer det der er i db'en, sådan daten er formeret.

mongoose.set("runValidators", true);

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true },
    likes: { type: Number, required: true, default: 0 },
    comments: [
      {
        email: { type: String, required: true },
        name: { type: String, required: true },
        text: { type: String, required: true },
      },
    ],
    category: [{ type: String, required: true }],
    img: [{ type: String, required: true }],
  },
  { timestamps: true }
);

export default mongoose.models.post || mongoose.model("post", postSchema);
