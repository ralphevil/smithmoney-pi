let botao = document.getElementById("enviar");
let email = document.getElementById("email");

botao.addEventListener("click", recuperaSenha, false);

function recuperaSenha(event){
    event.preventDefault();
    const dados = {
        "email":email.value
    }
    fetch(url+"/api/auth/forgot-password",{
        method: "POST",
        body: JSON.stringify(dados),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(response=>{
        if(response.ok){
            toastr.success("Email com link de alteração de senha enviado para "+email.value,null,{
                onHidden: function(){
                    window.location = "./login.html";
                }
            });            
        }else{
            toastr.error("Email não cadastrado na base de dados");
            email.value = "";
        }
    })
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