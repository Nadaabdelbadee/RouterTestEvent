import joi from "joi";

export const addNoteSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
});

export const idNoteSchema = joi.object({
  _id: joi.string().required(),
});
