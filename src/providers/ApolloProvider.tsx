import React, { useEffect } from "react";
import { ApolloProvider as ReactApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { from } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { agent } from "../lib/setup";
import * as Daf from "daf-core";
import Debug from "debug";
import Config from "react-native-config";

const debug = Debug("daf-provider:apollo");

// todo: replace agent with remote graphql server 2020/09/01
// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });

// const contextLink = new SchemaLink({
//   schema,
//   context: { agent }
// });

// https://www.apollographql.com/docs/link/links/http/
const uri = Config.GRAPHQL_SERVER_URI || "http://localhost:4000/graphql";
const contextLink = createHttpLink({ uri });

const link = from([contextLink]);
export const cache = new InMemoryCache({});
export const client = new ApolloClient({
  connectToDevTools: true,
  cache,
  link
});

interface Props {}

export const ApolloProvider: React.FC<Props> = ({ children }) => {
  // useEffect(() => {
  //   agent.on(Daf.EventTypes.savedMessage, async (message: Daf.Message) => {
  //     debug("New message %O", message);
  //     client.reFetchObservableQueries();
  //   });
  // }, []);

  return (
    <ReactApolloProvider client={client}>
      <ApolloHooksProvider client={client}>{children}</ApolloHooksProvider>
    </ReactApolloProvider>
  );
};
