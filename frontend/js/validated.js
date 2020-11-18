function validatedJwt(){
    const token = window.localStorage.getItem('token');
    if(token){
        fetch('http://localhost:8080/api/auth/valid',{
            method: 'GET',
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            if(!response.ok){
                window.location = "/login.html";
            }
        })
    }else{
        window.location = "/login.html"; 
    }
}

function logout(){
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user')
    validatedJwt();
}

function perfilHeader(){
    const nomePerfil = document.querySelector(".texto-nome");
    const emailPerfil = document.querySelector(".texto-email");
    const user = JSON.parse(window.localStorage.getItem("user"));
    nomePerfil.innerHTML = `<strong>${user.nome}</strong>`;
    emailPerfil.innerHTML = `${user.email}`;
}

validatedJwt();
