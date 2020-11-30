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

fetch(`http://localhost:8080/api/dashboard/total/mes/${mesTotal}`, {
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
xhr.open("GET", "http://localhost:8080/api/lancamentos");
xhr.setRequestHeader('Authorization', 'Bearer ' + token);

xhr.addEventListener("load", function () {
  let resposta = xhr.responseText;
  let lancamentosPendentes = JSON.parse(resposta);

  let status;
  let classe;
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

    let dataInput = pendentes.data;
    data = new Date(dataInput);
    dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    trDespesa.appendChild(montaTd(pendentes.id, "oculta-tabela"));
    trDespesa.appendChild(montaTd(status, classe));
    trDespesa.appendChild(montaTd(dataFormatada, "info-data"));
    trDespesa.appendChild(montaTd(pendentes.descricao, "info-descricao"));
    trDespesa.appendChild(montaTd(pendentes.tipo, "info-tipo"));
    trDespesa.appendChild(montaTd(pendentes.categorias, "info-categoria"));
    trDespesa.appendChild(montaTd(pendentes.conta, "info-conta"));
    trDespesa.appendChild(montaTd(pendentes.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-valor"));

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
  tdIdEfetiva.setAttribute('onclick', efetivaLancamento());

  function efetivaLancamento() {
    $(document).on("click", ".btn-efetuar", function () {
      let pegaIdLancamento = $(this).parent().parent().find(".oculta-tabela").text();

      let efetivado = {
        pago: true
      }

      fetch("http://localhost:8080/api/lancamentos/" + pegaIdLancamento, {
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

      fetch("http://localhost:8080/api/lancamentos/" + pegaIdLancamento, {
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