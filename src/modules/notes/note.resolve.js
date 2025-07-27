import { openAI } from "../../../index.js";
import noteModel from "../../DB/models/note.model.js";
import userModel from "../../DB/models/user.model.js";

// ========================== addNote ============================

export const addNote = async (parent, args, context) => {
  const { title, content } = args;
  const id = context?.user?._id;
  if (!(await userModel.findById(id))) {
    throw new Error("unauthorized");
  }
  const note = await noteModel.create({ title, content, ownerId: id });
  return note;
};

// ========================== deleteNote ============================

export const deleteNote = async (parent, args, context) => {
  const { _id } = args;
  const id = context?.user?._id;
  if (!(await userModel.findById(id))) {
    throw new Error("unauthorized");
  }
  const note = await noteModel.findByIdAndDelete(_id);
  return "note deleted successfully";
};
// ========================== getNote ============================

export const getNote = async (parent, args, context) => {
  const { _id } = args;
  const id = context?.user?._id;
  if (!(await userModel.findById(id))) {
    throw new Error("unauthorized");
  }
  const note = await noteModel.findById(_id);
  return note;
};

// ========================== summzrizeNote ============================

export const summzrizeNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const noteExist = await noteModel.findById(id);
    if (!noteExist) {
      throw new Error("note not found", { cause: 404 });
    }
    const response = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Summarize this note in one paragraph:\n${noteExist.content}`,
        },
      ],
    });
    const summary = response.choices[0].message.content;
    note.summary = summary;
    await note.save();
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
};
