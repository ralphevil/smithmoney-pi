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
    let receitas = JSON.parse(resposta);
    console.log(receitas);

    let status;
    let classe;
    receitas.map((receita) => {
      (receita.pago == true) ? status = "Efetuada": status = "Pendente";
      (status == "Efetuada") ? classe = "status-efetuada" : classe = "status-pendente";
      
      if (receita.categoria.tipo == "Receita") {
        let buscaReceitas = obtemDadosDespesas(receita);
        let trReceitas = montaTr(buscaReceitas);
        let tabelaReceitas = document.querySelector("#tabela-receitas");
        tabelaReceitas.appendChild(trReceitas);
        console.log(receita.pago);
      }
    });

    function obtemDadosDespesas(receita) {
      let receitas = {
        valor: receita.valor,
        data: receita.dataVencimento,
        descricao: receita.descricao,
        categorias: receita.categoria.categoria,
        conta: receita.conta.nome,
        id: receita.id,
        pago: false
      }
      return receitas;
    }
    
    function montaTr(receita) {
      let statusRecebido;
      (receita.pago == true) ? statusRecebido = "img-controler" : statusRecebido = "status-invisivel";

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
      trDespesa.appendChild(montaTd(receita.data, "info-data"));
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
      btnDeleta.classList.add("btn-deleta");
    
      return trDespesa;
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
        adicionaMensageErro(campoTipoLancamento, "tipolancamento");
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
          valor: form.valor.value,
          data: form.data.value,
          descricao: form.descricao.value,
          categoria: form.categoria.value,
          conta: form.conta.value,
          tipo: form.tipolancamento.value 
        }
        console.log(lancamento);
        form.reset(); 
      }
    });

    let tdId = document.querySelector(".btn-efetuar");
    tdId.setAttribute('onclick', efetivaReceita());

    function efetivaReceita() {
      $(document).on("click", ".btn-efetuar", function(){
        let pegaIdReceita = $(this).parent().parent().find(".oculta-tabela").text();
        console.log(pegaIdReceita);
        let efetivado = {
          pago: true
        }

        fetch("http://localhost:8080/api/lancamentos/"+pegaIdReceita, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + token
            },
            body:JSON.stringify(efetivado),
        }).then(response => {
            if(response.ok) {
              toastr.success("Receita efetivada com sucesso!");
            } else {
              toastr.error("Ocorreu um erro no envio dos dados!");
            }
        });
      });
    }

    /*function efetivaReceita(receita) {
      fetch("http://localhost:8080/api/lancamentos/" + receitaId, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
          },
          body:JSON.stringify(receita),
      }).then(response => {
          if(response.ok) {
            toastr.success("Receita efetivada com sucesso!");
          } else {
            toastr.error("Ocorreu um erro no envio dos dados!");
          }
      });
    } */

    



    //let btnEfetivar = document.querySelectorAll(".btn-efetuar");
    //let btnEditar = document.querySelectorAll(".btn-altera");
    //let btnDelete = document.querySelectorAll(".btn-deleta");
    
    /*btnEfetivar.forEach(function(item) {
      item.addEventListener("click", function() {
   
      });
    }); */

    /*btnEditar.forEach(function(item) {
      item.addEventListener("click", function() {
        toastr.success("Dados salvo com sucesso!");
        toastr.error("Dados salvo com sucesso!");
      });
    }); */

    /*btnDelete.forEach(function(item) {
      item.addEventListener("click", function() {
        toastr.success("Dados salvo com sucesso!");
        toastr.error("Dados salvo com sucesso!");
      });
    });*/
  });

  $(document).ready(function(){
    $('.input-valor').mask('000.000,00', {reverse: true});
    $(".input-valor").change(function(){
      $("#value").html($(this).val().replace(/\D/g,''))
    });
  });
  
  xhr.send();
})();

/*$(document).ready( function(){
  $('.btn-addnova').click( function(){
    toastr.error("Dados salvo com sucesso!");
  });
});

$(document).ready( function(){
  $('.btn-addnova').click( function(){
    toastr.success("Dados salvo com sucesso!");
  });
}); */
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