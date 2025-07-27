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
