import mongoose from "mongoose";

const GithubLogsSchema = new mongoose.Schema(
  {
    username: String,
    name: String,
    followers: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Github", GithubLogsSchema);
