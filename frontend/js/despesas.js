
let btnAdd = document.querySelector("#btn-adiciona");
let btnFechar = document.querySelector('#btn-fechar');

btnAdd.addEventListener('click', function(event) {
  iniciaModal('modal-adiciona');
});

function iniciaModal(modalId) {
  let modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('mostrar');
    modal.addEventListener('click', function(event) {
      if (event.target.id == modalId || event.target.className == 'fechar') {
        modal.classList.add('fadeOut');
        setTimeout(function() {
          modal.classList.remove('mostrar');
          modal.classList.remove('fadeOut');
          window.location.reload();
        }, 1000)
      }
    });
  }
}

(function() {
  const token = window.localStorage.getItem('token');

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/lancamentos");
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  xhr.addEventListener("load", function() {
    let resposta = xhr.responseText;
    let despesas = JSON.parse(resposta);

    console.log(despesas);
    
    let status;
    let classe;
    despesas.map((despesa) => {
      (!despesa.pago) ? status = "Pendente" : status = "Paga";
      (status == "Paga") ? classe = "status-paga" : classe = "status-pendente";

      if (despesa.categoria.tipo == "Despesa") {
        let buscaDespesa = obtemDadosLancamento(despesa);
        let trDespesas = montaTr(buscaDespesa);
        let tabelaDespesas = document.querySelector("#tabela-despesas");
        tabelaDespesas.appendChild(trDespesas);
      }
    });

    function obtemDadosLancamento(despesa) {
      let despesas = {
        valor: despesa.valor,
        data: despesa.dataVencimento,
        descricao: despesa.descricao,
        categorias: despesa.categoria.categoria,
        conta: despesa.conta.nome,
        id: despesa.id,
        pago: despesa.pago
      }
      return despesas;
    }

    function montaTr(despesa) {
      let statusPago;
      (!despesa.pago) ? statusPago = "img-controler" : statusPago = "status-invisivel";

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
      trDespesa.classList.add("despesas");

      let dataInput = despesa.data;
      data = new Date(dataInput);
      dataFormatada = data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});

      trDespesa.appendChild(montaTd(despesa.id, "oculta-tabela"));
      trDespesa.appendChild(montaTd(status, classe));
      trDespesa.appendChild(montaTd(dataFormatada, "info-data"));
      trDespesa.appendChild(montaTd(despesa.descricao, "info-descricao"));
      trDespesa.appendChild(montaTd(despesa.categorias, "info-categoria"));
      trDespesa.appendChild(montaTd(despesa.conta, "info-conta"));
      trDespesa.appendChild(montaTd(despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-valor"));

      tdEfetiva.appendChild(btnEfetiva);
      trDespesa.appendChild(tdEfetiva);
      imgEfetiva.src = "./resourses/img/efetiva.png";
      imgEfetiva.classList.add(statusPago);
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

      tdDeleta.appendChild(btnDeleta);
      trDespesa.appendChild(tdDeleta);
      imgDeleta.src = "./resourses/img/lixeira.png";
      imgDeleta.classList.add("img-controler");
      btnDeleta.title = "Deletar";
      btnDeleta.appendChild(imgDeleta);
      btnDeleta.classList.add("btn-deletar");
      
      return trDespesa;
    }

    function  montaTd(dado, classe) {
      let td = document.createElement("td");
      td.textContent = dado;
      td.classList.add(classe);
      return td;
    }

    function  montaTd(dado, classe) {
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
      setTimeout(function() {
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
    btnAdicionaLancamento.addEventListener("click", function(event) {
      event.preventDefault();
      let form = document.querySelector("#formulario-lancamento");

      let camposSemErros = validaCampos(form);

      if (camposSemErros) {
        let lancamento = {
          valor: parseFloat(form.valor.value.toString().replace(/\./g,'').replace(',', '.')),
          dataVencimento: form.data.value,
          descricao: form.descricao.value,
          categoriaId: parseInt(form.categoria.value),
          contaId: parseInt(form.conta.value),
          tipo: form.tipo.value,
          editado: form.editarDespesa.value,
          editadoId: form.editarDespesaId.value 
        }
        console.log(lancamento);
        form.reset(); 

        if (form.editarDespesa.value === "Editado") {
          salvaLancamentoEditado(lancamento, form.editarDespesaId.value);
          setTimeout(function() {
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
          body:JSON.stringify(lancamento),
      }).then(response => {
          if(response.ok) {
            toastr.success("Lançamento salvo com sucesso!");
          } else {
            toastr.error("Ocorreu um erro no envio dos dados!");
          }
      });
    }

    function salvaLancamentoEditado(lancamento, pegaIdDepesaEditado) {
      fetch("http://localhost:8080/api/lancamentos/" + pegaIdDepesaEditado, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body:JSON.stringify(lancamento),
      }).then(response => {
          if(response.ok) {
            toastr.success("Despesa editada com sucesso!");
          } else {
            toastr.error("Ocorreu um erro no envio dos dados!");
            console.log(response.status);
          }
      });
    }

    let tdIdEfetiva = document.querySelector(".btn-efetuar");
    tdIdEfetiva.setAttribute('onclick', efetivaDespesa());

    function efetivaDespesa() {
      $(document).on("click", ".btn-efetuar", function(){
        let pegaIdDespesa = $(this).parent().parent().find(".oculta-tabela").text();
        
        let efetivado = {
          pago: true
        }

        fetch("http://localhost:8080/api/lancamentos/" + pegaIdDespesa, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + token
            },
            body:JSON.stringify(efetivado),
        }).then(response => {
            if(response.ok) {
              toastr.success("Despesa efetivada com sucesso!");
              setTimeout(function() {
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
    tdIdEditar.setAttribute('onclick', editarDespesa());

    function editarDespesa() {
      $(document).on("click", ".btn-altera", function(){
        let pegaIdDespesa = $(this).parent().parent().find(".oculta-tabela").text();
        despesas.map((item) => {
          if (item.categoria.tipo == "Despesa") {
            if (pegaIdDespesa == item.id) {
              setTimeout(function() {
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
              let editado = document.querySelector("#editarDespesa");
              editado.value = "Editado";
              let editadoId = document.querySelector("#editarDespesaId");
              editadoId.value = pegaIdDespesa;
            }
          }
        });
      });
    }

    let tdIdDeletar = document.querySelector(".btn-deletar");
    tdIdDeletar.setAttribute('onclick', deletarDespesa());

    function deletarDespesa() {
      $(document).on("click", ".btn-deletar", function(){
        let pegaIdDespesa = $(this).parent().parent().find(".oculta-tabela").text();

        fetch("http://localhost:8080/api/lancamentos/" + pegaIdDespesa, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            if(response.ok) {
              toastr.success("Despesa deletada com sucesso!");
              setTimeout(function() {
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

  $(document).ready(function(){
    $('.input-valor').mask('000.000,00', {reverse: true});
    $(".input-valor").change(function(){
      $("#value").html($(this).val().replace(/\D/g,''))
    });
  });

  xhr.send();
})();

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

