window.onload = ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);    
    const token = urlParams.get('token');
    window.localStorage.setItem("token",token);
}

let new_password = document.querySelector("#new_password");
let confirm_password = document.querySelector("#confirm_password");
let botao = document.querySelector("#redefinir")

confirm_password.addEventListener("focusout",()=>{
    if(new_password.value != confirm_password.value){
        toastr.error("As senhas não são iguais!");
        new_password.value = "";
        confirm_password.value = "";
    }
})

botao.addEventListener("click",redefinir,false);

function redefinir(event){
    event.preventDefault();
    if (new_password.value.length > 0 && confirm_password.value.length > 0 && new_password.value == confirm_password.value){
        const token = window.localStorage.getItem("token");
        const dados = {
            "password":new_password.value
        }

        const load = document.querySelector(".lds-ellipsis");
        load.style.display = "inline-block";
        
        fetch(url+"/api/auth/login",{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        },
        method: 'PATCH',
        body: JSON.stringify(dados)
        }).then(response => {
            load.style.display = "none";
            if(response.ok){
                toastr.success(
                    "Registro atualizado com sucesso!",
                    null,
                    {
                    onHidden: function () {
                            window.localStorage.removeItem("token");
                            window.location = "/login.html";
                        }
                    }
                );          
            }else{
                toastr.error("Ocorreu algum erro ao atualizar os dados!");
            }
        }).catch(_ => {
            load.style.display = "none";
            toastr.error("Servidor indisponível.");
        });
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