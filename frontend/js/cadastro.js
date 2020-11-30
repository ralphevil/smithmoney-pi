const senhaInput = document.querySelector("#senha");
const confirmarInput = document.querySelector("#confirm_senha");

confirmarInput.addEventListener("focusout",()=>{
  if(senhaInput.value != confirmarInput.value){
    toastr.error("As senhas não são iguais!");
    senhaInput.value = "";
    confirmarInput.value = "";
  }
})

function cadastrarUsuario(event, form) {
    event.preventDefault();
    const nome = form.nome.value;
    const email = form.email.value;
    const senha = form.senha.value;
    const confirmar = form.confirm_senha.value;
    const data = {
      nome: nome,
      email: email,
      password: senha
    }

    if ((!nome.length <= 0 || !nome == "") && (!email.length <= 0 || !email == "") && (!senha.length <= 0 || !senha == 0) && (!confirmar.length <= 0 || !confirmar == 0)) {
      fetch(url+"/api/usuarios", {
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(data)
      })
        .then(function (data) {
          if (data.ok){
            toastr.success("Cadastro realizado com sucesso!",null,{
                onHidden: function(){
                    window.location.href = "/login.html";
                }   
            });            
          }else{
            toastr.error("Ocorreu um erro ao realizar o cadastro!");
          }
        })
    }else{
        toastr.error("Preencha todos os campos!");
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