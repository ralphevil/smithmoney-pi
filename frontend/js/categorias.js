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
xhr.open("GET", url+"/api/categorias");
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

function pegaTipo() {
  let selectTipo = document.getElementById('tipo');
  let option = selectTipo.options[selectTipo.selectedIndex];
  if (option.value == "Despesa") {
    criaOptionDesp();
  } else if (option.value == "Receita") {
    criaOptionRect();
  }
}

function criaOptionRect() {
  var comboRect = document.getElementById("categoria");

  var opt50 = document.createElement("option");
  opt50.value = "";
  opt50.text = "Selecione";
  comboRect.add(opt50, comboRect.options[0]);

  var opt22 = document.createElement("option");
  opt22.value = 22;
  opt22.text = "13º Salário";
  comboRect.add(opt22, comboRect.options[0]);

  var opt23 = document.createElement("option");
  opt23.value = 23;
  opt23.text = "Aluguéis";
  comboRect.add(opt23, comboRect.options[1]);

  var opt24 = document.createElement("option");
  opt24.value = 24;
  opt24.text = "Empréstimos";
  comboRect.add(opt24, comboRect.options[2]);

  var opt25 = document.createElement("option");
  opt25.value = 25;
  opt25.text = "Férias";
  comboRect.add(opt25, comboRect.options[3]); 

  var opt26 = document.createElement("option");
  opt26.value = 26;
  opt26.text = "Investimentos";
  comboRect.add(opt26, comboRect.options[3]); 

  var opt27 = document.createElement("option");
  opt27.value = 27;
  opt27.text = "Outras receitas";
  comboRect.add(opt27, comboRect.options[3]); 

  var opt28 = document.createElement("option");
  opt28.value = 28;
  opt28.text = "Salário";
  comboRect.add(opt28, comboRect.options[3]); 

}

function criaOptionDesp() {
  var comboDesp = document.getElementById("categoria");
  var opt1 = document.createElement("option");
  opt1.value = 1;
  opt1.text = "Alimentação";
  comboDesp.add(opt1, comboDesp.options[0]);

  var opt2 = document.createElement("option");
  opt2.value = 2;
  opt2.text = "Assinaturas & Serviços";
  comboDesp.add(opt2, comboDesp.options[1]);

  var opt3 = document.createElement("option");
  opt3.value = 3;
  opt3.text = "Bares & Restaurantes";
  comboDesp.add(opt3, comboDesp.options[2]);

  var opt4 = document.createElement("option");
  opt4.value = 4;
  opt4.text = "Casa";
  comboDesp.add(opt4, comboDesp.options[3]); 

  var opt5 = document.createElement("option");
  opt5.value = 5;
  opt5.text = "Compras";
  comboDesp.add(opt5, comboDesp.options[4]); 

  var opt6 = document.createElement("option");
  opt6.value = 6;
  opt6.text = "Cuidados Pessoais";
  comboDesp.add(opt6, comboDesp.options[5]); 

  var opt7 = document.createElement("option");
  opt7.value = 7;
  opt7.text = "Dívidas & Empréstimos";
  comboDesp.add(opt7, comboDesp.options[6]); 

  var opt8 = document.createElement("option");
  opt8.value = 8;
  opt8.text = "Educação";
  comboDesp.add(opt8, comboDesp.options[7]); 

  var opt9 = document.createElement("option");
  opt9.value = 9;
  opt9.text = "Família & Filhos";
  comboDesp.add(opt9, comboDesp.options[8]); 

  var opt10 = document.createElement("option");
  opt10.value = 10;
  opt10.text = "Impostos & Taxas";
  comboDesp.add(opt10, comboDesp.options[9]); 

  var opt11 = document.createElement("option");
  opt11.value = 11;
  opt11.text = "Investimentos";
  comboDesp.add(opt11, comboDesp.options[10]); 

  var opt12 = document.createElement("option");
  opt12.value = 12;
  opt12.text = "Lazer & Hobbies";
  comboDesp.add(opt12, comboDesp.options[11]); 

  var opt13 = document.createElement("option");
  opt13.value = 13;
  opt13.text = "Mercado";
  comboDesp.add(opt13, comboDesp.options[12]); 

  var opt14 = document.createElement("option");
  opt14.value = 14;
  opt14.text = "Outras Despesas";
  comboDesp.add(opt14, comboDesp.options[13]); 

  var opt15 = document.createElement("option");
  opt15.value = 15;
  opt15.text = "Pets";
  comboDesp.add(opt15, comboDesp.options[14]); 

  var opt16 = document.createElement("option");
  opt16.value = 16;
  opt16.text = "Presentes & Doações";
  comboDesp.add(opt16, comboDesp.options[15]); 

  var opt17 = document.createElement("option");
  opt17.value = 17;
  opt17.text = "Roupas";
  comboDesp.add(opt17, comboDesp.options[16]); 

  var opt18 = document.createElement("option");
  opt18.value = 18;
  opt18.text = "Saúde";
  comboDesp.add(opt18, comboDesp.options[17]); 

  var opt19 = document.createElement("option");
  opt19.value = 19;
  opt19.text = "Trabalho";
  comboDesp.add(opt19, comboDesp.options[18]); 

  var opt20 = document.createElement("option");
  opt20.value = 20;
  opt20.text = "Transporte";
  comboDesp.add(opt20, comboDesp.options[19]); 

  var opt21 = document.createElement("option");
  opt21.value = 21;
  opt21.text = "Viagem";
  comboDesp.add(opt21, comboDesp.options[20]);
} 