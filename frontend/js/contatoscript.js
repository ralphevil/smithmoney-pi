let nome = document.querySelector("#nome");
let emails = document.querySelector("#emails");
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