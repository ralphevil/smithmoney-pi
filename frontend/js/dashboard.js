const token = window.localStorage.getItem('token');
let btnAdd = document.querySelector("#btn-adiciona");
let btnFechar = document.querySelector('#btn-fechar');

btnAdd.addEventListener('click', function (event) {
  iniciaModal('modal-adiciona');
  document.getElementById("valor").focus();
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

let dataAtual = new Date();
let obtemMesAtual = dataAtual.getMonth();

let listaMes = ["#janeiro", "#fevereiro", "#marco", "#abril", "#maio", "#junho", "#julho", "#agosto", "#setembro", "#outubro", "#novembro", "#dezembro"];

function pegaMes() {
  let select = document.getElementById('select-date');
  let option = select.options[select.selectedIndex];

  let mesSelecionado = option.value;

  let mesEscolhido = listaMes[mesSelecionado];

  window.localStorage.removeItem('mesId');
  window.localStorage.setItem('mesId', mesEscolhido);
  
  window.localStorage.removeItem('mes');
  localStorage.setItem("mes", mesSelecionado);
  
  window.location.reload();
}

let mesIdLocal = window.localStorage.getItem("mesId");
let mesId = listaMes[obtemMesAtual];

if (window.localStorage.getItem("mes")) {
  preencheSelect(mesIdLocal);
} else {
  preencheSelect(mesId);
}

function preencheSelect(mes) {
  let mesAtual = document.querySelector(mes);
  mesAtual.setAttribute("selected", "");
}

let selectMesAtual;

if (window.localStorage.getItem("mes")) {
  selectMesAtual = window.localStorage.getItem("mes");
} else {
  selectMesAtual = $("#select-date").val();
}

function formataData(data) {
  let dataInput = data;
  data = new Date(dataInput);
  dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  return dataFormatada;
}

let mesTotal; 

if (!window.localStorage.getItem("mes")) {
  mesTotal = obtemMesAtual + 1;
} else {
  let ajustaMes = window.localStorage.getItem("mes");
  mesTotal = Number(ajustaMes) + 1;
}

setTimeout(function() {
  window.localStorage.removeItem('mesId');
  window.localStorage.removeItem('mes');
}, 3000);

fetch(`${url}/api/dashboard/total/mes/${mesTotal}`, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
  },
  method: 'GET'
}).then(response => response.json())
.then(item=>{
  
  let totalContas = item.contaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalDespesas = item.despesaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalReceitas = item.receitaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let total = item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  preencheTotais(totalContas, totalDespesas, totalReceitas, total);
})

function preencheTotais(contas, despesas, receitas, total) {
  let constasTotal = document.querySelector("#total-contas");
  let despesasTotal = document.querySelector("#total-despesas");
  let receitasTotal = document.querySelector("#total-receitas");
  let lancamentoTotal = document.querySelector("#total");
  constasTotal.textContent = contas;
  despesasTotal.textContent = despesas;
  receitasTotal.textContent = receitas;
  lancamentoTotal.textContent = total;
}

let xhr = new XMLHttpRequest();
xhr.open("GET", url+"/api/lancamentos");
xhr.setRequestHeader('Authorization', 'Bearer ' + token);

xhr.addEventListener("load", function () {
  let resposta = xhr.responseText;
  let lancamentosPendentes = JSON.parse(resposta);

  let status;
  let classe;
  let cor;

  lancamentosPendentes.map((pendentes) => {
    (!pendentes.pago) ? status = "Pendente" : status = "Paga";
    (status == "Paga") ? classe = "status-paga" : classe = "status-pendente";

    if (pendentes.pago == false) {
      let buscaPendentes = obtemDadosDespesas(pendentes);
      let trPendentes = montaTr(buscaPendentes);
      let tabelaPendentes = document.querySelector("#tabela-pendencia");
      tabelaPendentes.appendChild(trPendentes);
    }
  });

  let temLancamento = document.querySelector(".info-valorPendentes");
  let tableSemLancamento = document.querySelector(".table");
  let divSemLancamento = document.querySelector(".div-imgSem")
  if (!temLancamento) {
    tableSemLancamento.classList.add("semLancamento");
    divSemLancamento.classList.remove("semLancamento"); 
  } else {
    tableSemLancamento.classList.remove(".comLancamento");
    divSemLancamento.classList.add("semLancamento");
  } 

  function obtemDadosDespesas(pendentes) {
    let despesas = {
      valor: pendentes.valor,
      data: pendentes.dataVencimento,
      descricao: pendentes.descricao,
      categorias: pendentes.categoria.categoria,
      conta: pendentes.conta.nome,
      id: pendentes.id,
      pago: pendentes.pago,
      tipo: pendentes.categoria.tipo
    }
    return despesas;
  }

  function montaTr(pendentes) {
    let tdEfetiva = document.createElement("td");
    let tdAltera = document.createElement("td");
    let tdDeleta = document.createElement("td");

    let trDespesa = document.createElement("tr");

    let btnEfetiva = document.createElement("button");
    let btnAltera = document.createElement("button");
    let btnDeleta = document.createElement("button");
    let imgEfetiva = document.createElement("img");
    let imgAltera = document.createElement("img");
    let imgDeleta = document.createElement("img");

    trDespesa.classList.add("despesas");

    trDespesa.appendChild(montaTd(pendentes.id, "oculta-tabela"));
    trDespesa.appendChild(montaTd(status, classe));
    trDespesa.appendChild(montaTd(formataData(pendentes.data), "info-data"));
    trDespesa.appendChild(montaTd(pendentes.descricao, "info-descricao"));
    trDespesa.appendChild(montaTd(pendentes.tipo, "info-tipo"));
    trDespesa.appendChild(montaTd(pendentes.categorias, "info-categoria"));
    trDespesa.appendChild(montaTd(pendentes.conta, "info-conta"));
    trDespesa.appendChild(montaTd(pendentes.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-valorPendentes"));

    tdEfetiva.appendChild(btnEfetiva);
    trDespesa.appendChild(tdEfetiva);
    imgEfetiva.src = "./resourses/img/efetiva.png";
    btnEfetiva.title = "Pagar";
    btnEfetiva.appendChild(imgEfetiva);
    btnEfetiva.classList.add("btn-efetuar");

    tdAltera.appendChild(btnAltera);
    trDespesa.appendChild(tdAltera);
    imgAltera.src = "./resourses/img/edita.png";
    imgAltera.classList.add("img-controler");
    btnAltera.title = "Editar";
    btnAltera.appendChild(imgAltera);
    btnAltera.classList.add("btn-altera");

    tdDeleta.appendChild(btnDeleta)
    trDespesa.appendChild(tdDeleta);
    imgDeleta.src = "./resourses/img/lixeira.png";
    imgDeleta.classList.add("img-controler");
    btnDeleta.title = "Deletar";
    btnDeleta.appendChild(imgDeleta);
    btnDeleta.classList.add("btn-deletar");

    return trDespesa;
  }

  function montaTd(dado, classe) {
    let td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
  }

  function adicionaMensageErro(erro, campo) {
    let erroCampo = document.querySelector(erro);
    erroCampo.classList.remove("erro-invisivel");
    erroCampo.classList.add("erro-texto");
    document.getElementById(campo).focus();
  }

  function removeMensagemErro(erro) {
    setTimeout(function () {
      let erroValor = document.querySelector(erro);
      erroValor.classList.remove("erro-texto");
      erroValor.classList.add("erro-invisivel");
    }, 3000);
  }

  function validaCampos(form) {
    let campoValor = "#erro-valor";
    let campoData = "#erro-data";
    let campoDescricao = "#erro-descricao";
    let campoCategoria = "#erro-categoria";
    let campoContas = "#erro-contas";
    let campoTipoLancamento = "#erro-tipo";

    let validado = true;

    if (form.valor.value == 0) {
      adicionaMensageErro(campoValor, "valor");
      removeMensagemErro(campoValor);
      validado = false;
    }
    if (form.data.value === "") {
      adicionaMensageErro(campoData, "data");
      removeMensagemErro(campoData);
      validado = false;
    }
    if (form.descricao.value === "") {
      adicionaMensageErro(campoDescricao, "descricao");
      removeMensagemErro(campoDescricao);
      validado = false;
    }
    if (form.categoria.value === "Selecione") {
      adicionaMensageErro(campoCategoria, "categoria");
      removeMensagemErro(campoCategoria);
      validado = false;
    }
    if (form.conta.value === "Selecione") {
      adicionaMensageErro(campoContas, "conta");
      removeMensagemErro(campoContas);
      validado = false;
    }
    if (form.tipolancamento.value === "Selecione") {
      adicionaMensageErro(campoTipoLancamento, "tipo");
      removeMensagemErro(campoTipoLancamento);
      validado = false;
    }

    if (validado) {
      return true;
    } else {
      return false;
    }
  }

  let btnAdicionaLancamento = document.querySelector("#btn-add");
  btnAdicionaLancamento.addEventListener("click", function (event) {
    event.preventDefault();
    let form = document.querySelector("#formulario-lancamento");

    let camposSemErros = validaCampos(form);

    if (camposSemErros) {
      let lancamento = {
        valor: parseFloat(form.valor.value.toString().replace(/\./g, '').replace(',', '.')),
        dataVencimento: form.data.value,
        descricao: form.descricao.value,
        categoriaId: parseInt(form.categoria.value),
        contaId: parseInt(form.conta.value),
        tipo: form.tipo.value,
        editado: form.editarLancamento.value,
        editadoId: form.editarLancamentoId.value
      }
      form.reset();

      if (form.editarLancamento.value === "Editado") {
        salvaLancamentoEditado(lancamento, form.editarLancamentoId.value);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        salvaLancamento(lancamento);
      }
    }
  });

  function salvaLancamento(lancamento) {
    fetch(url+"/api/lancamentos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(lancamento),
    }).then(response => {
      if (response.ok) {
        toastr.success("Lançamento salvo com sucesso!");
      } else {
        toastr.error("Ocorreu um erro no envio dos dados!");
      }
    });
  }

  function salvaLancamentoEditado(lancamento, pegaIdReceitaEditado) {
    fetch(url+"/api/lancamentos/" + pegaIdReceitaEditado, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(lancamento),
    }).then(response => {
      if (response.ok) {
        toastr.success("Receita editada com sucesso!");
      } else {
        toastr.error("Ocorreu um erro no envio dos dados!");
        console.log(response.status);
      }
    });
  }

  let tdIdEfetiva = document.querySelector(".btn-efetuar");
  tdIdEfetiva.setAttribute('onclick', efetivaLancamento());

  function efetivaLancamento() {
    $(document).on("click", ".btn-efetuar", function () {
      let pegaIdLancamento = $(this).parent().parent().find(".oculta-tabela").text();

      let efetivado = {
        pago: true
      }

      fetch(url+"/api/lancamentos/" + pegaIdLancamento, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(efetivado),
      }).then(response => {
        if (response.ok) {
          toastr.success("Lançamento efetivado com sucesso!");
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          toastr.error("Ocorreu um erro no envio dos dados!");
          console.log(response.status);
        }
      });
    });
  }

  let tdIdEditar = document.querySelector(".btn-altera");
  tdIdEditar.setAttribute('onclick', editarLancamento());

  function editarLancamento() {
    $(document).on("click", ".btn-altera", function () {
      let pegaIdLancamento = $(this).parent().parent().find(".oculta-tabela").text();
      lancamentosPendentes.map((item) => {
        if (item.categoria.tipo === "Receita" || item.categoria.tipo === "Despesa") {
          if (pegaIdLancamento == item.id) {
            setTimeout(function () {
              iniciaModal('modal-adiciona');
            }, 500);

            let modalValor = document.querySelector("#valor");
            let campoValor = item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            let novoValor = campoValor.replace("R$", " ");
            modalValor.value = novoValor;
            let modalData = document.querySelector("#data");
            modalData.value = item.dataVencimento;
            let modalDescricao = document.querySelector("#descricao");
            modalDescricao.value = item.descricao;
            let editado = document.querySelector("#editarLancamento");
            editado.value = "Editado";
            let editadoId = document.querySelector("#editarLancamentoId");
            editadoId.value = pegaIdLancamento;
          }
        }
      });
    });
  }

  let tdIdDeletar = document.querySelector(".btn-deletar");
  tdIdDeletar.setAttribute('onclick', deletarLancamento());

  function deletarLancamento() {
    $(document).on("click", ".btn-deletar", function () {
      let pegaIdLancamento = $(this).parent().parent().find(".oculta-tabela").text();

      fetch(url+"/api/lancamentos/" + pegaIdLancamento, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      }).then(response => {
        if (response.ok) {
          toastr.success("Lançamento deletado com sucesso!");
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          toastr.error("Ocorreu um erro no envio dos dados!");
          console.log(response.status);
        }
      });
    });
  }
});

//Pendentes Total
fetch(url+"/api/dashboard/pendente/total", {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
  },
  method: 'GET'
}).then(response => response.json())
.then(item => {
  let totalDespesasPendentes = item.despesa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalReceitasPendentes = item.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  preencheTotalPendentes(totalDespesasPendentes, totalReceitasPendentes);
});

function preencheTotalPendentes(despesas, receitas) {
  let despesasPendentesTotal = document.querySelector("#despesa-pendentes");
  let receitasPendentesTotal = document.querySelector("#receitas-pendentes");

  despesasPendentesTotal.textContent = despesas;
  receitasPendentesTotal.textContent = receitas;
}

$(document).ready(function () {
  $('.input-valor').mask('000.000,00', { reverse: true });
  $(".input-valor").change(function () {
    $("#value").html($(this).val().replace(/\D/g, ''))
  });
});

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
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}