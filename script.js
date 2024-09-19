let posts = [];
let currentUser = "";
let postToDeleteIndex = null;
let postToEditIndex = null;

function loadUserProfile() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile) {
    currentUser = userProfile.name;
  } else {
    window.location.href = "login.html";
  }
}

function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = "";

  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "card mb-3";
 postElement.innerHTML = `
    <div class="card-body position-relative">
        <h5 class="card-title post-username">${post.username}</h5>
        <p class="card-text" id="post-content-${index}">${post.content}</p>
        <button class="btn btn-link" onclick="likePost(${index})">Curtir (${post.likes})</button>
        <button class="btn btn-link" onclick="toggleCommentInput(${index})">Comentar</button>
        <div class="comments" id="comments-${index}">
            ${post.comments.map((comment) => `<p>${comment}</p>`).join("")}
        </div>
        ${
          post.username === currentUser
            ? `
            <button class="btn btn-warning position-absolute edit-btn" onclick="prepareEdit(${index})">Editar</button>
            <button class="btn btn-danger position-absolute delete-btn" onclick="prepareDelete(${index})">Excluir</button>`
            : ""
        }
        <div class="comment-input collapse" id="comment-input-${index}">
            <div class="mb-3">
                <textarea id="comment-text-${index}" class="form-control" rows="2" placeholder="Digite seu comentário..."></textarea>
            </div>
            <button class="btn btn-primary" onclick="addComment(${index})">Adicionar Comentário</button>
        </div>
    </div>
`;postElement.innerHTML = `
<div class="card-body position-relative">
    <h5 class="card-title post-username">${post.username}</h5>
    <p class="card-text" id="post-content-${index}">${post.content}</p>
    <button class="btn btn-link" onclick="likePost(${index})">Curtir (${post.likes})</button>
    <button class="btn btn-link" onclick="toggleCommentInput(${index})">Comentar</button>
    <div class="comments" id="comments-${index}">
        ${post.comments.map((comment) => `<p>${comment}</p>`).join("")}
    </div>
    ${
      post.username === currentUser
        ? `
        <button class="btn btn-warning position-absolute edit-btn" onclick="prepareEdit(${index})">Editar</button>
        <button class="btn btn-danger position-absolute delete-btn" onclick="prepareDelete(${index})">Excluir</button>`
        : ""
    }
    <div class="comment-input collapse" id="comment-input-${index}">
        <div class="mb-3">
            <textarea id="comment-text-${index}" class="form-control" rows="2" placeholder="Digite seu comentário..."></textarea>
        </div>
        <button class="btn btn-primary" onclick="addComment(${index})">Adicionar Comentário</button>
    </div>
</div>
`;
    postList.appendChild(postElement);
  });
}

function toggleCommentInput(index) {
  const commentInput = document.getElementById(`comment-input-${index}`);
  if (commentInput.classList.contains('collapse')) {
    commentInput.classList.remove('collapse');
  } else {
    commentInput.classList.add('collapse');
  }
}

function prepareEdit(index) {
  const postContent = document.getElementById(`post-content-${index}`);
  document.getElementById('editPostContent').value = postContent.innerText;
  postToEditIndex = index;
  $("#editModal").modal("show");
}

document
  .getElementById("confirmEditBtn")
  .addEventListener("click", function() {
    const newContent = document.getElementById('editPostContent').value;
    if (newContent && postToEditIndex !== null) {
      posts[postToEditIndex].content = newContent;
      savePosts();
      renderPosts();
      postToEditIndex = null;
    }
    $("#editModal").modal("hide");
  });

function addComment(index) {
  const commentText = document.getElementById(`comment-text-${index}`).value;
  if (commentText) {
    posts[index].comments.push(commentText);
    document.getElementById(`comment-text-${index}`).value = '';
    savePosts();
    renderPosts();
  }
}

function prepareDelete(index) {
  postToDeleteIndex = index;
  $("#deleteModal").modal("show");
}

function deletePost() {
  if (postToDeleteIndex !== null) {
    posts.splice(postToDeleteIndex, 1);
    savePosts();
    renderPosts();
    postToDeleteIndex = null;
  }
  $("#deleteModal").modal("hide");
}

document
  .getElementById("postForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const newPostContent = document.getElementById("newPostContent").value;
    if (currentUser && newPostContent) {
      const newPost = {
        username: currentUser,
        content: newPostContent,
        likes: 0,
        comments: [],
      };
      posts.unshift(newPost);
      document.getElementById("newPostContent").value = "";
      savePosts();
      renderPosts();
    }
  });

function likePost(index) {
  posts[index].likes++;
  savePosts();
  renderPosts();
}

function commentPost(index) {
  const comment = prompt("Digite seu comentário:");
  if (comment) {
    posts[index].comments.push(comment);
    savePosts();
    renderPosts();
  }
}

function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

function loadPosts() {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  }
}

function init() {
  loadUserProfile();
  loadPosts();
  renderPosts();
}

init();

document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", deletePost);
