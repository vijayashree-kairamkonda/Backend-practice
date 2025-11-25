import User from "../models/User.js";

export const resolvers = {
  Query: {
    getUsers: async () => {
      return await User.find();
    },
    getUser: async (_, { id }) => {
      return await User.findById(id);
    },
  },

  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const userExists = await User.findOne({ email: input.email });
        if (userExists) {
          return {
            error: true,
            message: "User already exists with this email",
          };
        }
        await User.create(input);
        return {
          error: false,
          message: "User created successfully!",
        };
      } catch (err) {
        return {
          error: true,
          message: "Something went wrong while creating a user",
          user: null,
        };
      }
    },

    updateUser: async (_, { id, input }) => {
      try {
        const user = await User.findByIdAndUpdate(id, input, { new: true });
        if (!user) {
          return {
            error: true,
            message: "User not found",
          };
        }
        return {
          error: false,
          message: "User updated successfully",
        };
      } catch (err) {
        return {
          error: true,
          message: "Failed to update user",
        };
      }
    },

    deleteUser: async (_, { id }) => {
      try {
        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser) {
          return {
            error: true,
            message: "User not found",
          };
        }

        return {
          error: false,
          message: "User deleted successfully",
        };
      } catch (err) {
        return {
          error: true,
          message: "Something went wrong while deleting the user",
        };
      }
    },
  },
};
