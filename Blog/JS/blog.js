let idposts = [];

//Função que carrega toda a lista, trazendo todos os títulos.
function buscarPosts() {

    const urlPosts = 'https://jsonplaceholder.typicode.com/posts';

    fetch(urlPosts)
    .then(async response => {
        const data = await response.json();//Resultado Assincrono para esperar o resultado completo, para dar o resultado já pronto
        const listaPosts = document.getElementById('lista');

        for (let i = 0; i < data.length; i++) {
            let post = data[i];
            let itemPost = document.createElement('div');
            itemPost.className =  'list-group-item list-group-item-action';
            itemPost.innerText = post.id + "-" + post.title;
            itemPost.addEventListener('click', ()=>{ 
                
                //function buscar comentários
                const postId = post.id;

                //se o id de todos os posts nao contem isso, entao recebe uma mensagem de erro
                if (!idposts.includes(parseInt(postId))) {
                    const listaComentarios = document.getElementById('listagemComentarios');
                    listaComentarios.innerHTML = 'Este comentário não existe';
                    
                } else {
                    const urlComentarios = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;
                    fetch(urlComentarios)
                    .then(async response => {
                        const data = await response.json();
            
                        const listaComentarios = document.getElementById('listagemComentarios');
                        listaComentarios.innerHTML = '';
            
                        //for OF
                        for (const comentario of data) {
                            const itemComentario = document.createElement('div');
                            itemComentario.innerText = "Comentário: " + comentario.body+".";
                            listaComentarios.appendChild(itemComentario);
                        }
            
                    }).catch(erro => {
                        let listaComentarios = document.getElementById('listagemComentarios');
                        listaComentarios.innerHTML = "Erro: " + erro.message;
                    });
                }
            })
            listaPosts.appendChild(itemPost);
            idposts.push(post.id);
        }

    }).catch(erro => alert(erro.message));

}

//Função que exibe a lista de usuários
function buscarUsuarios() {

    const urlUsuarios = 'https://jsonplaceholder.typicode.com/users';

    fetch(urlUsuarios)
    .then(async response => {
        const data = await response.json();

        const listaUsuarios = document.getElementById('listagemUsuarios');

        for (const usuario of data) {
            const itemUsuario = document.createElement('li');
            itemUsuario.innerText = usuario.name;
            listaUsuarios.appendChild(itemUsuario);
        }

    });

}

//Função que retorna a pesquisa pelo ID do usuario.
function buscarUsuario() {

    const userId = document.getElementById('user-id').value;
    const urlUsuario = `https://jsonplaceholder.typicode.com/users/${userId}`;

    fetch(urlUsuario)
    .then(async response => {
        const data = await response.json();
        const detalhesUsuario = document.getElementById('detalhesUsuario');
        detalhesUsuario.innerHTML = '';

        if (response.status === 200) {
            const nomeUsuario = document.createElement('h2');
            nomeUsuario.innerText = data.name;
            detalhesUsuario.appendChild(nomeUsuario);

            const emailUsuario = document.createElement('p');
            emailUsuario.innerText = `Email: ${data.email}`;
            detalhesUsuario.appendChild(emailUsuario);

            const enderecoUsuario = document.createElement('p');
            enderecoUsuario.innerText = `Endereço: ${data.address.street}, ${data.address.suite}, ${data.address.city}`;
            detalhesUsuario.appendChild(enderecoUsuario);

        } else if (response.status === 404) {
            const nomeUsuario = document.createElement('h2');
            nomeUsuario.innerText = "Este usuário não existe";
            detalhesUsuario.appendChild(nomeUsuario);

        } else {
            const nomeUsuario = document.createElement('h2');
            nomeUsuario.innerText = "Erro " + response.status;
            detalhesUsuario.appendChild(nomeUsuario);

        }
    }).catch(erro => {
        const detalhesUsuario = document.getElementById('detalhesUsuario');
        detalhesUsuario.innerHTML = '';

        const nomeUsuario = document.createElement('h2');
        nomeUsuario.innerText = "Erro: " + erro.message;
        detalhesUsuario.appendChild(nomeUsuario);
    });

}

window.onload = function() {
    buscarPosts();
    buscarUsuarios();
};
