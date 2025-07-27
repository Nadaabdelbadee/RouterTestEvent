import { GraphQLID, GraphQLString } from "graphql";
import { addNote, deleteNote, getNote } from "./note.resolve.js";
import { noteData } from "./note.type.js";

export const noteQuery = {
  getNote: {
    type: noteData,
    args: {
      _id: { type: GraphQLID },
    },
    resolve: getNote,
  },
};
export const noteMutation = {
  addNote: {
    type: noteData,
    args: {
      title: { type: GraphQLString },
      content: { type: GraphQLString },
    },
    resolve: addNote,
  },
  deleteNote: {
    type: GraphQLString,
    args: {
      _id: { type: GraphQLID },
    },
    resolve: deleteNote,
  },
};
