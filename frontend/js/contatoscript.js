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

    fetch("http://apiurl", {
        method: "POST",
        body: JSON.stringify(conteudo)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        alert("Sua menságem foi enviada com sucesso! Agora é só aguardar, breve entaremos em contato, te mais. ^^")
    })


})