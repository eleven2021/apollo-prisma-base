import { GraphQLClient, gql } from 'graphql-request'
const query = gql`{
  users {
    name
    id
  }
}`

async function main(){
   const client = new GraphQLClient('http://localhost:4000')
   const data = await client.request(query)
   console.log(data)
}


main()
