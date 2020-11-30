const token = window.localStorage.getItem('token');
let btnAdd = document.querySelector("#btn-adiciona");
let btnFechar = document.querySelector('#btn-fechar');

btnAdd.addEventListener('click', function (event) {
  iniciaModal('modal-adiciona');
});

function iniciaModal(modalId) {
  let modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('mostrar');
    modal.addEventListener('click', function (event) {
      if (event.target.id == modalId || event.target.className == 'fechar') {
        modal.classList.add('fadeOut');
        setTimeout(function () {
          modal.classList.remove('mostrar');
          modal.classList.remove('fadeOut');
          window.location.reload();
        }, 1000)
      }
    });
  }
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/api/categorias");
xhr.setRequestHeader('Authorization', 'Bearer ' + token);

xhr.addEventListener("load", function () {
  let resposta = xhr.responseText;
  let categorias = JSON.parse(resposta);


  categorias.map((categoria) => {
    if (categoria.tipo == "Despesa") {
   
     populaSpan(categoria.categoria);
     populaSpan(categoria.categoria);
     populaSpan(categoria.categoria);
     populaSpan(categoria.categoria);
    }
    
    
  });

  function populaSpan(categoria) {
    let catdesp1 = document.querySelector("#catdesp1");
    let catdesp2 = document.querySelector("#catdesp2");
    let catdesp3 = document.querySelector("#catdesp3");
    let catdesp4 = document.querySelector("#catdesp4");
    let catdesp5 = document.querySelector("#catdesp5");
    let catdesp6 = document.querySelector("#catdesp6");
    let catdesp7 = document.querySelector("#catdesp7");
    let catdesp8 = document.querySelector("#catdesp8");
    let catdesp9 = document.querySelector("#catdesp9");
    let catdesp10 = document.querySelector("#catdesp10");
    let catdesp11 = document.querySelector("#catdesp11");
    let catdesp12 = document.querySelector("#catdesp12");
    let catdesp13 = document.querySelector("#catdesp13");
    let catdesp14 = document.querySelector("#catdesp14");
    let catdesp15 = document.querySelector("#catdesp15");
    let catdesp16 = document.querySelector("#catdesp16");
    let catdesp17 = document.querySelector("#catdesp17");
    let catdesp18 = document.querySelector("#catdesp18");
    let catdesp19 = document.querySelector("#catdesp19");
    let catdesp20 = document.querySelector("#catdesp20");
    let catdesp21 = document.querySelector("#catdesp21");

    catdesp1.textContent = categoria;
    catdesp2.textContent = categoria;
    catdesp3.textContent = categoria;
    catdesp4.textContent = categoria;
    catdesp5.textContent = categoria;
    catdesp6.textContent = categoria;
    catdesp7.textContent = categoria;
    catdesp8.textContent = categoria;
    catdesp9.textContent = categoria;
    catdesp10.textContent = categoria;
    catdesp11.textContent = categoria;
    catdesp12.textContent = categoria;
    catdesp13.textContent = categoria;
    catdesp14.textContent = categoria;
    catdesp15.textContent = categoria;
    catdesp16.textContent = categoria;
    catdesp17.textContent = categoria;
    catdesp18.textContent = categoria;
    catdesp19.textContent = categoria;
    catdesp20.textContent = categoria;
    catdesp21.textContent = categoria;
  }


});

xhr.send();