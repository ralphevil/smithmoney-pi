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

 function pegaTipoLancamento() {
  window.location = "./despesas.html";
   console.log("Chegou aqui");
 }

fetch(`http://localhost:8080/api/lancamentos/mes/${mesTotal}/tipo/{tipo}/total?tipo=Receita`, {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
  },
  method: 'GET'
}).then(response => response.json())
.then(item=>{
  let totalPendente = item.pendente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalPagas = item.pago.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalDespesas = item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  preencheTotais(totalPendente, totalPagas, totalDespesas);
})

function preencheTotais(pendentes, pagas, total) {
  let receitaPendente = document.querySelector("#despesa-pendente");
  let receitaPaga = document.querySelector("#despesa-paga");
  let receitaTotal = document.querySelector("#despesa-total");
  receitaPendente.textContent = pendentes;
  receitaPaga.textContent = pagas;
  receitaTotal.textContent = total;
}

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8080/api/lancamentos");
xhr.setRequestHeader('Authorization', 'Bearer ' + token);

xhr.addEventListener("load", function () {
  let resposta = xhr.responseText;
  let receitas = JSON.parse(resposta);

  let status;
  let classe;
  receitas.map((receita) => {
    (receita.pago == true) ? status = "Efetuada" : status = "Pendente";
    (status == "Efetuada") ? classe = "status-efetuada" : classe = "status-pendente";

    let dataVencimentoReceita = new Date(receita.dataVencimento);
    let mesVencimento = dataVencimentoReceita.getMonth();

    if (receita.categoria.tipo == "Receita" && mesVencimento == selectMesAtual) {
      let buscaReceitas = obtemDadosReceitas(receita);
      let trReceitas = montaTr(buscaReceitas);
      let tabelaReceitas = document.querySelector("#tabela-receitas");
      tabelaReceitas.appendChild(trReceitas);
    }
  });

  let temLancamento = document.querySelector(".info-valorReceita");
  let tableSemLancamento = document.querySelector(".table");
  let divSemLancamento = document.querySelector(".div-imgSem")
  if (!temLancamento) {
    tableSemLancamento.classList.add("semLancamento");
    divSemLancamento.classList.remove("semLancamento"); 
  } else {
    tableSemLancamento.classList.remove(".comLancamento");
    divSemLancamento.classList.add("semLancamento");
  }
  
  function obtemDadosReceitas(receita) {
    let receitas = {
      valor: receita.valor,
      data: receita.dataVencimento,
      descricao: receita.descricao,
      categorias: receita.categoria.categoria,
      conta: receita.conta.nome,
      id: receita.id,
      pago: receita.pago
    }
    return receitas;
  }

  function montaTr(receita) {
    let statusRecebido;
    (receita.pago == true) ? statusRecebido = "status-invisivel" : statusRecebido = "img-controler";

    let tdEfetiva = document.createElement("td");
    let tdAltera = document.createElement("td");
    let tdDeleta = document.createElement("td");

    let btnEfetiva = document.createElement("button");
    let btnAltera = document.createElement("button");
    let btnDeleta = document.createElement("button");
    let imgEfetiva = document.createElement("img");
    let imgAltera = document.createElement("img");
    let imgDeleta = document.createElement("img");

    let trDespesa = document.createElement("tr");
    trDespesa.classList.add("receitas");

    trDespesa.appendChild(montaTd(receita.id, "oculta-tabela"));
    trDespesa.appendChild(montaTd(status, classe));
    trDespesa.appendChild(montaTd(formataData(receita.data), "info-data"));
    trDespesa.appendChild(montaTd(receita.descricao, "info-descricao"));
    trDespesa.appendChild(montaTd(receita.categorias, "info-categoria"));
    trDespesa.appendChild(montaTd(receita.conta, "info-conta"));
    trDespesa.appendChild(montaTd(receita.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-valorReceita"));

    tdEfetiva.appendChild(btnEfetiva);
    trDespesa.appendChild(tdEfetiva);
    imgEfetiva.src = "./resourses/img/efetiva.png";
    imgEfetiva.classList.add(statusRecebido);
    btnEfetiva.title = "Efetuar";
    btnEfetiva.appendChild(imgEfetiva);
    btnEfetiva.classList.add("btn-efetuar");

    tdAltera.appendChild(btnAltera);
    trDespesa.appendChild(tdAltera);
    imgAltera.src = "./resourses/img/edita.png";
    imgAltera.classList.add("img-controler");
    btnAltera.title = "Editar";
    btnAltera.appendChild(imgAltera);
    btnAltera.classList.add("btn-altera");

    tdDeleta.appendChild(btnDeleta);
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
        editado: form.editarReceita.value,
        editadoId: form.editarReceitaId.value
      }
      form.reset();

      if (form.editarReceita.value === "Editado") {
        salvaLancamentoEditado(lancamento, form.editarReceitaId.value);
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      } else {
        salvaLancamento(lancamento);
      }
    }
  });

  function salvaLancamento(lancamento) {
    fetch("http://localhost:8080/api/lancamentos", {
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
    fetch("http://localhost:8080/api/lancamentos/" + pegaIdReceitaEditado, {
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
  tdIdEfetiva.setAttribute('onclick', efetivaReceita());

  function efetivaReceita() {
    $(document).on("click", ".btn-efetuar", function () {
      let pegaIdReceita = $(this).parent().parent().find(".oculta-tabela").text();

      let efetivado = {
        pago: true
      }

      fetch("http://localhost:8080/api/lancamentos/" + pegaIdReceita, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(efetivado),
      }).then(response => {
        if (response.ok) {
          toastr.success("Receita efetivada com sucesso!");
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
  tdIdEditar.setAttribute('onclick', editarReceita());

  function editarReceita() {
    $(document).on("click", ".btn-altera", function () {
      let pegaIdReceita = $(this).parent().parent().find(".oculta-tabela").text();
      receitas.map((item) => {
        if (item.categoria.tipo == "Receita") {
          if (pegaIdReceita == item.id) {
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
            let editado = document.querySelector("#editarReceita");
            editado.value = "Editado";
            let editadoId = document.querySelector("#editarReceitaId");
            editadoId.value = pegaIdReceita;
          }
        }
      });
    });
  }

  let tdIdDeletar = document.querySelector(".btn-deletar");
  tdIdDeletar.setAttribute('onclick', deletarReceita());

  function deletarReceita() {
    $(document).on("click", ".btn-deletar", function () {
      let pegaIdReceita = $(this).parent().parent().find(".oculta-tabela").text();

      fetch("http://localhost:8080/api/lancamentos/" + pegaIdReceita, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      }).then(response => {
        if (response.ok) {
          toastr.success("Receita deletada com sucesso!");
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


$(document).ready(function () {
  $('.input-valor').mask('000.000,00', { reverse: true });
  $(".input-valor").change(function () {
    $("#value").html($(this).val().replace(/\D/g, ''))
  });
});

xhr.send();

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