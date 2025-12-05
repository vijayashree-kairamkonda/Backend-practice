import redis from "../../config/redis.js";
import User from "../models/User.js";

export const resolvers = {
  Query: {
    getUsers: async () => {
      const cacheKey = "users:list";
      const cached = await redis.get(cacheKey);
      if (cached) {
        console.log("cache hit");
        return JSON.parse(cached);
      }
      console.log("cache miss, setting users in redis");
      const users = await User.find();
      await redis.set(cacheKey, JSON.stringify(users), "EX", 300);
      return users;
    },
    getUser: async (_, { id }) => {
      try {
        const key = `user:${id}`;
        const cached = await redis.get(key);
        if (cached) {
          console.log("cache hit : get user by id");
          return JSON.parse(cached);
        }
        console.log("cache miss, setting user by id in redis", id);
        const user = await User.findById(id);
        if (!user) {
          await redis.set(key, JSON.stringify(null), "EX", 30);
        }
        await redis.set(key, JSON.stringify(user), "EX", 300);
        return user;
      } catch (err) {}
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
        await redis.del("users:list");
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
        await redis.del(`user:${id}`);
        await redis.del("users:list");
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
        await redis.del(`user:${id}`);
        await redis.del("users:list");
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
