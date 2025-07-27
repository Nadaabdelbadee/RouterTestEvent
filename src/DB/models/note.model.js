import mongoose, { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  summary: String,
});

const noteModel = mongoose.model.Note || mongoose.model("Note", noteSchema);
export default noteModel;
