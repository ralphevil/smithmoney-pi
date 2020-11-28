function fazerLogin(event, form) {
    event.preventDefault();
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
      .then(resp => {
        if (resp.status == 401) {
          window.location = "/login.html";
        } else if (resp.status !== 200) {
          reject("Não foi possível executar a operação.");
        } else {
          resp.json().then(data => {
            window.localStorage.setItem('token', data.token);
            window.localStorage.setItem('user', JSON.stringify(data.user));
          });
          window.location = "/dashboard.html";
        }
      })
  }