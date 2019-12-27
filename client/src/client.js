import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

/**
 * Create a new apollo client and export as default
 */

const link = new HttpLink({ uri: 'http://localhost:4000/' });

// Cache 
const cache = new InMemoryCache();

// Initialize a Client
const client = new ApolloClient({
	link,
	cache
});

export default client;