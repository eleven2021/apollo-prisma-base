import { Resolvers } from "../../gqlTypes";
import { createUser,login  } from './mutations'
import { users } from './queries'

const Query: Resolvers["Query"] = {
  users,
};

const Mutation: Resolvers["Mutation"] = {
  createUser,
  login,
};


export const resolvers: Resolvers = {
  Mutation,
  Query,
};
