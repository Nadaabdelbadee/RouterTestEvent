import mongoose, { model, Schema } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const noteModel = mongoose.model.Note || mongoose.model("Note", noteSchema);
export default noteModel;
