
let nomeCampo = document.querySelector("#nome");
let emailCampo = document.querySelector("#email");
let assuntoCampo = document.querySelector("#assunto");
let mensagemCampo = document.querySelector("#mensagem");

function enviarContato(event, form) {
    event.preventDefault();

    if (nomeCampo.value == "" || emailCampo.value == "" || assuntoCampo.value == "" || mensagemCampo.value == "") {
        alert("Favor preencher todos os campos.")
    } else {

        const nome = form.nome.value;
        const email = form.email.value;
        const assunto = form.assunto.value;
        const mensagem = form.mensagem.value;

        const dados = {
            nome: nome,
            email: email,
            assunto: assunto,
            mensagem: mensagem
        }

        fetch("http://localhost:8080/api/contato", {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.ok) {
                alert("Mensagem enviada com sucesso! ^^")
            } else {
                alert("Vixe, deu ruim T-T")
            }
        })

    }


}