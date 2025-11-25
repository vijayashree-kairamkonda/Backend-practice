import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Query {
    getUsers: [User]
    getUser(id: ID!): User
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  type MutationResponse {
    error: Boolean!
    message: String!
  }

  type UserMutationResponse {
    error: Boolean!
    message: String!
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): UserMutationResponse!
    updateUser(id: ID!, input: UpdateUserInput!): UserMutationResponse!
    deleteUser(id: ID!): MutationResponse!
  }
`;
