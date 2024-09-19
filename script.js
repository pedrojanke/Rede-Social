// main.js

// Array para armazenar postagens
let posts = [];
let currentUser = ""; // Nome do usuário logado
let postToDeleteIndex = null; // Índice da postagem a ser excluída

// Função para carregar o nome do usuário logado
function loadUserProfile() {
  const userProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (userProfile) {
    currentUser = userProfile.name;
  } else {
    window.location.href = "login.html"; // Redireciona para o login se não estiver logado
  }
}

// Função para renderizar o feed de postagens
function renderPosts() {
  const postList = document.getElementById("postList");
  postList.innerHTML = ""; // Limpa o conteúdo anterior

  posts.forEach((post, index) => {
    const postElement = document.createElement("div");
    postElement.className = "card mb-3";
    postElement.innerHTML = `
        <div class="card-body position-relative">
          <h5 class="card-title post-username">${post.username}</h5>
          <p class="card-text">${post.content}</p>
          <button class="btn btn-link" onclick="likePost(${index})">Curtir (${
      post.likes
    })</button>
          <button class="btn btn-link" onclick="toggleCommentInput(${index})">Comentar</button>
          <div class="comments" id="comments-${index}">
            ${post.comments.map((comment) => `<p>${comment}</p>`).join("")}
          </div>
          ${
            post.username === currentUser
              ? `<button class="btn btn-danger position-absolute delete-btn" onclick="prepareDelete(${index})">Excluir</button>`
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

// Função para alternar a visibilidade do campo de entrada de comentário
function toggleCommentInput(index) {
  const commentInput = document.getElementById(`comment-input-${index}`);
  if (commentInput.classList.contains('collapse')) {
    commentInput.classList.remove('collapse');
  } else {
    commentInput.classList.add('collapse');
  }
}

// Função para adicionar comentário
function addComment(index) {
  const commentText = document.getElementById(`comment-text-${index}`).value;
  if (commentText) {
    posts[index].comments.push(commentText);
    document.getElementById(`comment-text-${index}`).value = ''; // Limpa o campo de texto
    savePosts(); // Salva as postagens no localStorage
    renderPosts(); // Atualiza o feed
  }
}

// Função para preparar a exclusão de uma postagem
function prepareDelete(index) {
  postToDeleteIndex = index;
  $("#deleteModal").modal("show");
}

// Função para excluir postagem
function deletePost() {
  if (postToDeleteIndex !== null) {
    posts.splice(postToDeleteIndex, 1);
    savePosts(); // Salva as alterações no localStorage
    renderPosts(); // Atualiza o feed
    postToDeleteIndex = null; // Limpa o índice de postagem a ser excluída
  }
  $("#deleteModal").modal("hide");
}

// Função para adicionar nova postagem
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
      document.getElementById("newPostContent").value = ""; // Limpa o campo de texto
      savePosts(); // Salva as postagens no localStorage
      renderPosts(); // Atualiza o feed
    }
  });

// Função para curtir postagem
function likePost(index) {
  posts[index].likes++;
  savePosts(); // Salva as postagens no localStorage
  renderPosts();
}

// Função para comentar postagem
function commentPost(index) {
  const comment = prompt("Digite seu comentário:");
  if (comment) {
    posts[index].comments.push(comment);
    savePosts(); // Salva as postagens no localStorage
    renderPosts();
  }
}

// Função para salvar postagens no localStorage
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// Função para carregar postagens do localStorage
function loadPosts() {
  const savedPosts = localStorage.getItem("posts");
  if (savedPosts) {
    posts = JSON.parse(savedPosts);
  }
}

// Inicializar a página
function init() {
  loadUserProfile();
  loadPosts();
  renderPosts();
}

// Carregar a página
init();

// Configurar o botão de confirmação do modal
document
  .getElementById("confirmDeleteBtn")
  .addEventListener("click", deletePost);
