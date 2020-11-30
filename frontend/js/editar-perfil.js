let nome = document.getElementById("nome");
let genero = document.getElementById("genero");
let data = document.getElementById("data");
let email = document.getElementById("email");
let celular = document.getElementById("celular");
let foto = document.getElementById("img-perfil");
let body = document.getElementsByTagName("body")[0];
let user = JSON.parse(window.localStorage.getItem('user'));
const imgInput = document.getElementById("img-select");
const token = window.localStorage.getItem('token');

let fotoPerfil;

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
        if(json.genero) genero.value = json.genero;
        if(json.dataNascimento) data.value = json.dataNascimento;
        if(json.email) celular.value = json.celular;
        email.value = json.email;
        if(json.foto){
            foto.setAttribute("src",url+"/"+json.foto);
            foto.onerror = function(){
                foto.setAttribute("src","./resourses/img/usericon.png")
            }
        }
    })
}

//UPLOAD DE IMAGEM
let input_img = document.querySelector("#img-select");
input_img.addEventListener("change",trocarIMG);
function trocarIMG(){
    if (this.files && this.files[0]) {
        var img = document.querySelector("#img-perfil");
        img.setAttribute("src",URL.createObjectURL(this.files[0]));
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

nome.addEventListener("focusout",()=>{
    if(nome.value < 0 || nome.value == ""){
        toastr.error("É obrigatório o preenchimento do campo nome!");
    }
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

    if(celular.value < 0 || celular.value == ""){
        dados.celular = null;
    }

    if(genero.value < 0 || genero.value == ""){
        dados.genero = null;
    }

    if(data.value < 0 || data.value == ""){
        dados.dataNascimento = null;
    }

    fetch(url + "/api/usuarios/", {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'PATCH',
        body: JSON.stringify(dados)
    }).then(response=>{
        if (response.ok){
            toastr.success("Perfil atualizado com sucesso!");
            let dadosStorage = JSON.parse(window.localStorage.getItem("user"));
            dadosStorage.nome = dados.nome;
            dadosStorage.genero = dados.genero;
            dadosStorage.dataNascimento = dados.dataNascimento;
            dadosStorage.celular = dados.celular;
            if(dados.foto) dadosStorage.foto = dados.foto;
            window.localStorage.setItem("user",JSON.stringify(dadosStorage)); 
            perfilHeader();         
        }else{
            toastr.error("Ocorreu um erro ao atualizar o perfil!");
        }
    })
}

var behavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
options = {
    onKeyPress: function (val, e, field, options) {
        field.mask(behavior.apply({}, arguments), options);
    }
};
$('#celular').mask(behavior, options);

toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }