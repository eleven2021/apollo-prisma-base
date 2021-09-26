import { Resolvers } from "../../gqlTypes";
import { createUser,login  } from './mutations'
import { users,me } from './queries'

const Query: Resolvers["Query"] = {
  users,me
};

const Mutation: Resolvers["Mutation"] = {
  createUser,
  login,
};


export const resolvers: Resolvers = {
  Mutation,
  Query,
};
