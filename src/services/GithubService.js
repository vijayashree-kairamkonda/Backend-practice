import axios from "axios";

//get users by username
export const getUser = async (username) => {
  const response = await axios.get(`https://api.github.com/users/${username}`, {
    // headers: {
    //   Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    // },
  });
  const data = response.data;
  return {
    username,
    name: data.name,
    followers: data.followers,
  };
};
