let nome = document.getElementById("nome");
let genero = document.getElementById("genero");
let data = document.getElementById("data");
let email = document.getElementById("email");
let body = document.getElementsByTagName("body")[0];
let user = JSON.parse(window.localStorage.getItem('user'));
const token = window.localStorage.getItem('token');

body.addEventListener("load",carregarPerfil());

function carregarPerfil(){  
    
    fetch("http://localhost:8080/api/usuarios/id/"+user.id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'GET'
    }).then(response=>response.json())
    .then(json=>{
        nome.value = json.nome;
        genero.value = json.genero;
        data.value = json.dataNascimento;
        email.value = json.email;
    })
}

function editarPerfil(event, form){
    event.preventDefault();
    const dados = {
        nome: form.nome.value,
        genero: form.genero.value,
        dataNascimento: form.data.value,
        email: form.email.value
    }
    

    fetch("http://localhost:8080/api/usuarios/"+user.id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'PATCH',
        body: JSON.stringify(dados)
    }).then(response => {
        if(response.ok){
            alert("Registro atualizado com sucesso!");
            window.localStorage.removeItem("user");
            window.localStorage.setItem("user", JSON.stringify(dados));
        }
    })
}

