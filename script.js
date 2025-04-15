document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("blogForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const postsContainer = document.getElementById("postsContainer");
  
    const getPosts = () => {
      return JSON.parse(localStorage.getItem("blogPosts")) || [];
    };
  
    const savePosts = (posts) => {
      localStorage.setItem("blogPosts", JSON.stringify(posts));
    };
  
    const renderPosts = () => {
      postsContainer.innerHTML = "";
      const posts = getPosts();
      posts.forEach((post, index) => {
        const postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <button onclick="deletePost(${index})">Delete</button>
        `;
        postsContainer.appendChild(postCard);
      });
    };
  
    window.deletePost = (index) => {
      const posts = getPosts();
      posts.splice(index, 1);
      savePosts(posts);
      renderPosts();
    };
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = titleInput.value.trim();
      const content = contentInput.value.trim();
  
      if (!title || !content) {
        alert("Both fields are required!");
        return;
      }
  
      const posts = getPosts();
      posts.unshift({ title, content }); // add new post to the top
      savePosts(posts);
  
      titleInput.value = "";
      contentInput.value = "";
      renderPosts();
    });
  
    renderPosts();
  });
  