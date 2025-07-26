import { GraphQLNonNull, GraphQLString } from "graphql";
import {
  confirmOtp,
  forgetPassword,
  logIn,
  logOut,
  register,
  resetPassword,
} from "./user.resolve.js";
import { token, userData } from "./user.type.js";

export const userMutation = {
  register: {
    type: userData,
    args: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: register,
  },
  logIn: {
    type: token,
    args: {
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve: logIn,
  },
  logOut: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      authorization: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: logOut,
  },
  forgetPassword: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
    },
    resolve: forgetPassword,
  },
  confirmOtp: {
    type: GraphQLString,
    args: {
      email: { type: GraphQLString },
      code: { type: GraphQLString },
    },
    resolve: confirmOtp,
  },
  resetPassword: {
    type: userData,
    args: {
      email: { type: GraphQLString },
      newPassword: { type: GraphQLString },
    },
    resolve: resetPassword,
  },
};
