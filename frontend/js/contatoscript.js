let nome = document.querySelector("#nome");
let email = document.querySelector("#email");
let assunto = document.querySelector("#assunto");
let menssagem = document.querySelector("#menssagem");
let formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", function(event){
    event.preventDefault();

    let conteudo = {
        nome: nome.value,
        email: email.value,
        assunto: assunto.value,
        menssagem: menssagem.value
    };


})