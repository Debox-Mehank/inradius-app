import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://fierce-crag-46127.herokuapp.com/graphql",
  cache: new InMemoryCache(),
  credentials: "include",
});

export default client;
