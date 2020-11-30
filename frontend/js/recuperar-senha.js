let botao = document.getElementById("enviar");
let email = document.getElementById("email");

botao.addEventListener("click", recuperaSenha, false);

function recuperaSenha(event){
    event.preventDefault();
    if(email.value < 0 || email.value == ""){
        toastr.error("Preencha o campo email!")
    }else{
        const load = document.querySelector(".lds-ellipsis");
        load.style.display = "inline-block";
        fetch(url+"/api/auth/forgot-password",{
            method: "POST",
            body: JSON.stringify(email.value),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(response=>{
            load.style.display = "none";
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
        }).catch(_ => {
            load.style.display = "none";
            toastr.error("Servidor indisponível.");
          });
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