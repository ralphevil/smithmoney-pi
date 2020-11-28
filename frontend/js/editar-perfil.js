let nome = document.getElementById("nome");
let genero = document.getElementById("genero");
let data = document.getElementById("data");
let email = document.getElementById("email");
let celular = document.getElementById("celular");
let foto = document.getElementById("img-perfil");
let body = document.getElementsByTagName("body")[0];
let user = JSON.parse(window.localStorage.getItem('user'));
let fotoPerfil;
const imgInput = document.getElementById("img-select");
const token = window.localStorage.getItem('token');

body.addEventListener("load",carregarPerfil());

function carregarPerfil(){
    fetch(url+"/api/usuarios/", {
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
        celular.value = json.celular;
        email.value = json.email;
        if(json.foto){
            foto.src = url+"/"+json.foto;
        }
    })
}

//UPLOAD DE IMAGEM
let input_img = document.querySelector("#img-select");
input_img.addEventListener("change",trocarIMG);
function trocarIMG(){
    if (this.files && this.files[0]) {
        var img = document.querySelector("#img-perfil");
        img.src = URL.createObjectURL(this.files[0]);
    }
}

imgInput.addEventListener("change", ()=>{
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append("image", img)
    
    fetch(url+"/upload",{
        method: "POST",
        body: formData
    }).then(response=>response.text())
    .then(path=>{
        if(path){
            fotoPerfil = path;
        }else{
            fotoPerfil = null;
        }
    })

})

//ATUALIZAR PERFIL
function editarPerfil(event, form){
    event.preventDefault();
    const dados = {
        nome: form.nome.value,
        genero: form.genero.value,
        dataNascimento: form.data.value,
        celular: form.celular.value,
        foto: fotoPerfil
    }  

    fetch(url+"/api/usuarios/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'PATCH',
        body: JSON.stringify(dados)
    }).then(response=>{
        if (response.ok) alert("Deu certo")
    })
}