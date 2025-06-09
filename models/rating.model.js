import mongoose, { Schema } from "mongoose";

//Styrer det der er i db'en, sådan daten er formeret.

mongoose.set("runValidators", true);

const ratingSchema = new Schema(
  {
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.rating || mongoose.model("rating", ratingSchema);
