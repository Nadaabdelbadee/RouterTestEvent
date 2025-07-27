import { GraphQLID, GraphQLObjectType, GraphQLString } from "graphql";

export const noteData = new GraphQLObjectType({
  name: "noteData",
  fields: {
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    ownerId: { type: GraphQLID },
  },
});
