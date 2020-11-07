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
    validatedJwt();
}

validatedJwt();