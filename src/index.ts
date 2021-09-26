import express from 'express';
import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello GrapQL!',
    },
};

async function startApolloServer(){
    const server = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers
    })
    // await server.start()
    const { url } = await server.listen()
    console.log(`🚀 Server ready at ${url}`);
}

startApolloServer();
