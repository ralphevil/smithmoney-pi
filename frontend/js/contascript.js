jQuery(function($){
    $('.conta-saldo').mask('#.##0,00', {reverse: true});
    });

jQuery(function($){
    $('.editar-conta-saldo').mask('#.##0,00', {reverse: true});
    });


/* 
let nomeConta = document.querySelector("#exampleFormControlInput1");
let saldoAtual = document.querySelector("#exampleFormControlInput2");
let banco = document.querySelector("#exampleFormControlSelect1");
let descricao = document.querySelector("#exampleFormControlTextarea1");
let cadastroConta = document.querySelector("#salvar");

cadastroConta.addEventListener("click", function(event) {
    event.preventDefault();

    let dados = {
        nomeConta: nomeConta.value,
        saldoAtual: saldoAtual.value,
        banco: banco.value,
        descricao: descricao.value
    };
    
    fetch("...", {
        method: "POST",
        body: JSON.stringify(dados)
    })
    .then(function(response) {
        return response.jseon();
    })
    .then(function(response) {
        array.forEach(conta => {
            
        });
        alert("Conta adicionada com sucesso!")
    })
    
}) */

/* function cadastrarUsuario(event, form) {
    event.preventDefault();
    const nome = form.nome.value;
    const email = form.email.value;
    const senha = form.senha.value;
    const data = {
      nome: nome,
      email: email,
      password: senha
    }

    if ((!nome.length <= 0 || !nome == "") && (!email.length <= 0 || !email == "") && (!senha.length <= 0 || !senha == 0)) {
      fetch('http://localhost:8080/api/usuarios', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(function (data) {
          console.log('Request success: ', data);
          if (data.ok) window.location.href = "/login.html"
        })
        .catch(function (error) {
          console.log('Request failure: ', error);
        });
    }
  } */