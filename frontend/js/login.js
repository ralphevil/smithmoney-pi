function fazerLogin(event, form) {
    event.preventDefault();
    if((form.username.value < 0 || form.username.value == "") || (form.password.value < 0 || form.password.value == "")){
      toastr.error("Preencha todos os campos!");
    }else{
      const load = document.querySelector(".lds-ellipsis");
      load.style.display = "inline-block";
      const username = form.username.value;
      const password = form.password.value;
      const dados = {
        username: username,
        password: password
      }

      fetch(url+"/api/auth/login", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(dados)
      })
        .then(response => {
          load.style.display = "none";
          if(response.ok){
            response.json().then(data => {
              window.localStorage.setItem('token', data.token);
              window.localStorage.setItem('user', JSON.stringify(data.user));
              window.location = "/dashboard.html";
            });
          }else{
            toastr.error("Login ou senha inválidos!");
            form.username.value = "";
            form.password.value = "";
          }
        }).catch(_ => {
          load.style.display = "none";
          toastr.error("Servidor indisponível.");
        });
    }    
  }

  function validatedLogin(){
    const token = window.localStorage.getItem('token');
    if(token){
        fetch('http://localhost:8080/api/auth/valid',{
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if(response.ok){
                window.location = "./dashboard.html";
            }
        })
    }
 }

 validatedLogin()

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