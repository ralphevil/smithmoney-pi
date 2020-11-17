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
    
})

