const { AuthenticationError } = require('apollo-server-express');
const { User, Book} = require('../models');
const { signToken} = require('../utils/auth');


const resolvers = {

Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')

                return userData;
        }

        throw new AuthenticationError('Not Logged In!!');
    },
},

Mutation: {
    //new user and token
    addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);
        
        return {token, user};
    },  

    //login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    //save the book
    saveBook: async (parent, { bookData }, context) => {
        if (context.user) {
            const updateUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookData } },
                { new: true }
            );

            return updateUser;
        }

        throw new AuthenticationError('You need to be logged in!');
    },
//remove the book
    removeBook: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                { $pull: { savedBooks: { bookId: arrgs.bookId } } },
                { new: true }
            );

            return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;