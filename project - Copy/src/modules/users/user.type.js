import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const userData = new GraphQLObjectType({
  name: "userData",
  fields: {
    _id: { type: GraphQLID },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isDeleted: { type: GraphQLBoolean },
    confirmed: { type: GraphQLBoolean },
  },
});
export const profilePic = new GraphQLObjectType({
  name: "profilePic",
  fields: {
    secure_url: { type: GraphQLString },
    public_id: { type: GraphQLString },
  },
});

export const token = new GraphQLObjectType({
  name: "token",
  fields: {
    token: { type: GraphQLString },
  },
});
