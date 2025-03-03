import mongoose, { Schema, model } from "mongoose";

const urlSchema = new Schema(
  {
    shortId: { type: String, required: true, unique: true },
    originalURL: { type: String, required: true },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const URL = model("Url", urlSchema);

export default URL;
