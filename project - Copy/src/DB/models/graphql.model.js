import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { userMutation } from "../../modules/users/user.field.js";

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "query",
    fields: {
      sayHello: {
        type: GraphQLString,
        resolve: () => {
          return "Hello world";
        },
      },
    },
  }),
  mutation: new GraphQLObjectType({
    name: "mutation",
    fields: {
      ...userMutation,
    },
  }),
});
