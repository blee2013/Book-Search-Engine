// import the gql tagged template function- Step 1
const { gql } = require('apollo-server-express');

//Step 4
const typeDefs = gql`
 
type Query {
    me: User
 }

type Auth {
    token: ID
    user: User
}

type User {
  _id: ID
  username: String
  email: String
  bookCount: Int
  savedBooks: [Book]
}

  type Book {
    bookId: String
    authors:[String]
    description: String
    title: String
    image: String
    link: String
  }

  type Mutation {
      login(email: String!, password: String!): Auth
      addUser(username: String!, email: String!, password: String!): Auth
      saveBook(input: savedBook) : User
      removeBook(bookkId: String!) : User
  }

 
  input savedBook {
    bookkId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
  }
`;


// export the typeDefs- Step 3
module.exports = typeDefs;