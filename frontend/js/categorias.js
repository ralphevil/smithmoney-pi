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
      let buscaCategoria = obtemDadosCategoria(categoria);
      let trCategoria = montaTr(buscaCategoria);
      let tabelaCategoria = document.querySelector("#categoria-despesa");
      tabelaCategoria.appendChild(trCategoria);
    } else {
      let buscaCategoria = obtemDadosCategoria(categoria);
      let trCategoria = montaTr(buscaCategoria);
      let tabelaCategoria = document.querySelector("#categoria-receitas");
      tabelaCategoria.appendChild(trCategoria);
    }
  });

  function montaTr(categoria) {
    let trCategoria = document.createElement("tr");
    trCategoria.classList.add("categoria");

    trCategoria.appendChild(montaTd(categoria.id, "info-id"));
    trCategoria.appendChild(montaTd(categoria.categoria, "info-categoria"));

    return trCategoria;
  }

  function montaTd(dado, classe) {
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
  }

  function obtemDadosCategoria(categoria) {
    let categorias = {
      id: categoria.id,
      categoria: categoria.categoria
    }
    return categorias;
  }
});


function pegaTipoCategoria() {
  let select = document.getElementById('select-tipocategoria');
  let option = select.options[select.selectedIndex];
  let categoriaEscolhida = option.value;

  let sectionRect = document.querySelector(".section-rect");
  let sectionDesp = document.querySelector(".section-desp");

  if (categoriaEscolhida == "receita") {
    sectionRect.classList.remove("catOut");
    sectionDesp.classList.add("catOut");
    select.classList.add("select-tipoCategoriaRect");
    setTimeout(function() {
      sectionDesp.classList.add("section-categoria");
      sectionRect.classList.remove("section-categoria");
    }, 500);

  } else {
    sectionDesp.classList.remove("catOut");
    sectionRect.classList.add("catOut");
    select.classList.remove("select-tipoCategoriaRect");
    select.classList.add("select-tipoCategoriaDesp");
    setTimeout(function() {
      sectionRect.classList.add("section-categoria");
      sectionDesp.classList.remove("section-categoria");
    }, 500);
  }
}

xhr.send();