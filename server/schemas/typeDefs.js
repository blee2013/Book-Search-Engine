// import the gql tagged template function- Step 1
const { gql } = require('apollo-server-express');

//Step 4
const typeDefs = gql`
 
type Query {
    me: User
 }

type Auth {
    token: ID!
    user: User
}

type User {
  _id: ID!
  username: String!
  email: String
  bookCount: Int
  savedBooks: [Book]
}

  type Book {
    bookId: ID!
    authors:[String]
    description: String
    title: String!
    image: String
    link: String
  }

  input BookInput { 
    authors: [String]
    bookId: String!
    description: String
    title: String!
    image: String
    link: String
  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(bookData: BookInput!) : User
      removeBook(bookId: ID!) : User
  }

 
`;


// export the typeDefs- Step 3
module.exports = typeDefs;