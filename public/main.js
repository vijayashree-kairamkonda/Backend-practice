const output = document.getElementById("postsContainer");
const button = document.getElementById("loadPostsBtn");
const createButton = document.getElementById("createPostBtn");

const showPosts = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/posts");
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const posts = await response.json();
    output.innerHTML = "";
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.innerHTML = `<h3>${post.title}</h3>`;
      output.appendChild(postElement);
    });
  } catch (error) {
    output.innerHTML = `<p>${error.message}</p>`;
  }
};

const createPost = async (e) => {
  e.preventDefault();
  const title = document.getElementById("postTitle").value;
  try {
    const response = await fetch("http://localhost:8000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const newPost = await response.json();
    const postElement = document.createElement("div");
    postElement.innerHTML = `<h3>${newPost.title}</h3>`;
    output.appendChild(postElement);
    showPosts();
  } catch (error) {
    output.innerHTML = `<p>${error.message}</p>`;
  }
};

button.addEventListener("click", showPosts);
createButton.addEventListener("click", createPost);
