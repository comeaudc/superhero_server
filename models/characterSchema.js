import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  name: { type: String },
  alias: {
    type: String,
    unique: true,
    required: true,
  },
  powers: {
    type: [String],
    required: true,
  },
  hero: { type: Boolean, default: true },
  //   associations: String,
});

export default mongoose.model("Characters", characterSchema);
