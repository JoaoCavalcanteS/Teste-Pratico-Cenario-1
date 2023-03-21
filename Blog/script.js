function buscarPosts() {

    let urlPosts = 'https://jsonplaceholder.typicode.com/posts';

    fetch(urlPosts)
    .then(response => response.json())
    .then(data => {

        let listaPosts = document.getElementById('listagemPosts');

        for (let i = 0; i < data.length; i++) {
            let post = data[i];
            let itemPost = document.createElement('li');
            itemPost.innerText = post.title;
            listaPosts.appendChild(itemPost);
        }

    });

}

function buscarComentarios() {

    let postId = document.getElementById('post-id').value;
    let urlComentarios = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

    fetch(urlComentarios)
    .then(response => response.json())
    .then(data => {

        let listaComentarios = document.getElementById('listagemComentarios');
        listaComentarios.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            let comentario = data[i];
            let itemComentario = document.createElement('li');
            itemComentario.innerText = comentario.body;
            listaComentarios.appendChild(itemComentario);
        }

    });

}

function buscarUsuarios() {

    let urlUsuarios = 'https://jsonplaceholder.typicode.com/users';

    fetch(urlUsuarios)
    .then(response => response.json())
    .then(data => {

        let listaUsuarios = document.getElementById('listagemUsuarios');

        for (let i = 0; i < data.length; i++) {
            let usuario = data[i];
            let itemUsuario = document.createElement('li');
            itemUsuario.innerText = usuario.name;
            listaUsuarios.appendChild(itemUsuario);
        }

    });

}

function buscarUsuario() {

    let userId = document.getElementById('user-id').value;
    let urlUsuario = `https://jsonplaceholder.typicode.com/users/${userId}`;

    fetch(urlUsuario)
    .then(response => response.json())
    .then(data => {

        let detalhesUsuario = document.getElementById('detalhesUsuario');
        detalhesUsuario.innerHTML = '';

        let nomeUsuario = document.createElement('h2');
        nomeUsuario.innerText = data.name;
        detalhesUsuario.appendChild(nomeUsuario);

        let emailUsuario = document.createElement('p');
        emailUsuario.innerText = `Email: ${data.email}`;
        detalhesUsuario.appendChild(emailUsuario);

        let enderecoUsuario = document.createElement('p');
        enderecoUsuario.innerText = `Endereço: ${data.address.street}, ${data.address.suite}, ${data.address.city}`;
        detalhesUsuario.appendChild(enderecoUsuario);

    });

}

window.onload = function() {
    buscarPosts();
    buscarUsuarios();
}