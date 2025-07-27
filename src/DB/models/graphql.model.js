import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { userMutation } from "../../modules/users/user.field.js";
import { noteMutation, noteQuery } from "../../modules/notes/note.field.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    fields: {
      ...noteQuery,
    },
  }),
  mutation: new GraphQLObjectType({
    name: "mutation",
    fields: {
      ...userMutation,
      ...noteMutation,
    },
  }),
});
