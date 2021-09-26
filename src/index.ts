import { ApolloServer, gql  } from "apollo-server";
import {  IResolvers } from '@graphql-tools/utils';
import { Resolvers } from "../gqlTypes";
import { readFileSync } from "fs";
import { createContext } from "./context";
import { resolvers } from "./resolvers";

const getTypeDefs = () => {
  const schemaStr = readFileSync("schema.gql", "utf8");
  return gql`
    ${schemaStr}
  `;
};

//resolvers:  resolvers as IResolvers<any, any> & Resolvers,
async function startApolloServer(){
    const server = new ApolloServer({
      typeDefs: getTypeDefs(),
      context: createContext,
      resolvers:  resolvers as IResolvers,
      debug: true
    })
    // await server.start()
    const { url } = await server.listen();
    console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
