
let nomeCampo = document.querySelector("#nome");
let emailCampo = document.querySelector("#email");
let assuntoCampo = document.querySelector("#assunto");
let mensagemCampo = document.querySelector("#mensagem");

function enviarContato(event, form) {
    event.preventDefault();
    if (nomeCampo.value == "" || emailCampo.value == "" || assuntoCampo.value == "" || mensagemCampo.value == "") {
        toastr.error("Preencha todos os campos!");
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
                toastr.success("Sua mensagem foi enviada com sucesso!",null,{
                    onHidden: function(){
                        nomeCampo.value = "";
                        emailCampo.value = "";
                        assuntoCampo.value = "";
                        mensagemCampo.value = "";
                    }
                });
            } else {
                toastr.error("Ocorreu uma falha no envio da mensagem!");
            }
        })

    }


}

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
    "timeOut": "2000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }