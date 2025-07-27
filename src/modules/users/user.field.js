import { GraphQLNonNull, GraphQLString } from "graphql";
import {
  confirmOtp,
  forgetPassword,
  logIn,
  logOut,
  profilePic,
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
  profilePic: {
    type: userData,
    args: {
      imageUrl: { type: GraphQLString },
    },
    resolve: profilePic,
  },
  logOut: {
    type: GraphQLString,
    resolve: logOut,
  },
  forgetPassword: {
    type: GraphQLString,
    resolve: forgetPassword,
  },
  confirmOtp: {
    type: GraphQLString,
    args: {
      code: { type: GraphQLString },
    },
    resolve: confirmOtp,
  },
  resetPassword: {
    type: userData,
    args: {
      newPassword: { type: GraphQLString },
    },
    resolve: resetPassword,
  },
};
