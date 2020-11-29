
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
  xhr.open("GET", "http://localhost:8080/api/contas");
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  xhr.addEventListener("load", function() {
    let resposta = xhr.responseText;
    let contas = JSON.parse(resposta);

    console.log(contas);


    contas.map((conta) => {

      if (conta.id > 0 ){ 
        let buscaConta = obtemDadosContas(conta);
        let trContas = montaTr(buscaConta);
        let tabelaContas = document.querySelector("#tabela-contas");
        tabelaContas.appendChild(trContas);
      }
    });

    function obtemDadosContas(conta) {
      let contas = {
        saldo: conta.saldo,
        nome: conta.nome,
        tipoConta: conta.tipoConta,
        banco: conta.banco,
        id: conta.id
      }
      return contas;
    }

    function montaTr(conta) {
      let tdAltera = document.createElement("td");
      let tdDeleta = document.createElement("td");

      let btnAltera = document.createElement("button");
      let btnDeleta = document.createElement("button");
      let imgAltera = document.createElement("img");
      let imgDeleta = document.createElement("img");
      
      let trConta = document.createElement("tr");
      trConta.classList.add("contas");

      trConta.appendChild(montaTd(conta.id, "oculta-tabela"));
      trConta.appendChild(montaTd(conta.tipoConta, "info-tipoConta"));
      trConta.appendChild(montaTd(conta.banco, "info-banco"));
      trConta.appendChild(montaTd(conta.nome, "info-nome"));
      trConta.appendChild(montaTd(conta.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-saldo"));
  
      tdAltera.appendChild(btnAltera);
      trConta.appendChild(tdAltera);
      imgAltera.src = "./resourses/img/edita.png";
      imgAltera.classList.add("img-controler");
      btnAltera.title = "Editar";
      btnAltera.appendChild(imgAltera);
      btnAltera.classList.add("btn-altera");

      tdDeleta.appendChild(btnDeleta);
      trConta.appendChild(tdDeleta);
      imgDeleta.src = "./resourses/img/lixeira.png";
      imgDeleta.classList.add("img-controler");
      btnDeleta.title = "Deletar";
      btnDeleta.appendChild(imgDeleta);
      btnDeleta.classList.add("btn-deletar");
      
      return trConta;
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
        let erroSaldo = document.querySelector(erro);
        erroSaldo.classList.remove("erro-texto");
        erroSaldo.classList.add("erro-invisivel");
      }, 3000);
    }

    function validaCampos(form) {
     let campoSaldo = "#erro-saldo";
      let campoNome = "#erro-nome";
      let campoTipoConta = "#erro-tipoConta";
      let campoBanco = "#erro-banco";

      let validado = true;

       if (form.saldo.value == 0) {
        adicionaMensageErro(campoSaldo, "saldo");
        removeMensagemErro(campoSaldo);
        validado = false;
      }  

      if (form.nome.value === "") {
        adicionaMensageErro(campoNome, "nome");
        removeMensagemErro(campoNome);
        validado = false;
      }

      if (form.tipoConta.value === "Selecione") {
        adicionaMensageErro(campoTipoConta, "tipoConta");
        removeMensagemErro(campoTipoConta);
        validado = false;
      }

      if (form.banco.value === "") {
        adicionaMensageErro(campoBanco, "banco");
        removeMensagemErro(campoBanco);
        validado = false;
      }


      if (validado) {
        return true;
      } else {
        return false;
      }
    }

    let btnAdicionaConta = document.querySelector("#btn-add");
    btnAdicionaConta.addEventListener("click", function(event) {
      event.preventDefault();
      let form = document.querySelector("#formulario-contas");

      let camposSemErros = validaCampos(form);

      if (camposSemErros) {
        let conta = {
          saldo: parseFloat(form.saldo.value.toString().replace(/\./g,'').replace(',', '.')),
          nome: form.nome.value,
          banco: form.banco.value,
          tipo_Conta: form.tipoConta.value,
          editado: form.editarConta.value,
          editadoId: form.editarContaId.value 
        }
        console.log(conta);
        form.reset(); 

        if (form.editarConta.value === "Editado") {
          salvaContaEditado(conta, form.editarContaId.value);
          setTimeout(function() {
            window.location.reload();
          }, 3000);
        } else {
          salvaConta(conta);
        }
      }
    });

    function salvaConta(conta) {
      fetch("http://localhost:8080/api/contas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + token
          },
          body:JSON.stringify(conta),
      }).then(response => {
          if(response.ok) {
            toastr.success("Conta cadastrada com sucesso!");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            toastr.error("Ocorreu um erro no envio dos dados!");
          }
      });
    }

    function salvaContaEditado(conta, pegaIdContaEditado) {
      fetch("http://localhost:8080/api/contas/" + pegaIdContaEditado, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body:JSON.stringify(conta),
      }).then(response => {
          if(response.ok) {
            toastr.success("Conta editada com sucesso!");
            setTimeout(function () {
              window.location.reload();
            }, 2000);
          } else {
            toastr.error("Ocorreu um erro no envio dos dados!");
            console.log(response.status);
          }
      });
    }

    let tdIdEditar = document.querySelector(".btn-altera");
    tdIdEditar.setAttribute('onclick', editarConta());

    function editarConta() {
      $(document).on("click", ".btn-altera", function(){
        let pegaIdConta = $(this).parent().parent().find(".oculta-tabela").text();
        contas.map((item) => {
            if (pegaIdConta == item.id) {
              setTimeout(function() {
                iniciaModal('modal-adiciona');
              }, 500);

              let modalTipoConta = document.querySelector("#tipoConta");
              modalTipoConta.value = item.tipoConta;
              let modalSaldo = document.querySelector("#saldo");
              let campoSaldo = item.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              let novoSaldo = campoSaldo.replace("R$", " ");
              modalSaldo.value = novoSaldo;
              let modalNome = document.querySelector("#nome");
              modalNome.value = item.nome;
              let modalBanco = document.querySelector("#banco");
              modalBanco.value = item.banco;
              let editado = document.querySelector("#editarConta");
              editado.value = "Editado";
              let editadoId = document.querySelector("#editarContaId");
              editadoId.value = pegaIdConta;
            }
        });
      });
    }

    let tdIdDeletar = document.querySelector(".btn-deletar");
    tdIdDeletar.setAttribute('onclick', deletarConta());

    function deletarConta() {
      $(document).on("click", ".btn-deletar", function(){
        let pegaIdConta = $(this).parent().parent().find(".oculta-tabela").text();

        fetch("http://localhost:8080/api/contas/" + pegaIdConta, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + token
            },
        }).then(response => {
            if(response.ok) {
              toastr.success("Conta deletada com sucesso!");
              setTimeout(function() {
                window.location.reload();
              }, 2000);
            } else {
              toastr.error("Ocorreu um erro no envio dos dados!");
              console.log(response.status);
            }
        });
      });
    }
  });


  fetch("http://localhost:8080/api/contas/total", {
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
  },
  method: 'GET'
}).then(response => response.json())
.then(item=>{

  let totalCorrente = item.corrente.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalPoupanca = item.poupanca.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalCarteira = item.carteira.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  let totalTotal = item.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  preencheTotais(totalCorrente, totalPoupanca, totalCarteira, totalTotal);
})

function preencheTotais(corrente, poupanca, carteira, total) {
  let contaCorrente = document.querySelector("#conta-corrente");
  let contaPoupanca = document.querySelector("#conta-poupanca");
  let contaCarteira = document.querySelector("#conta-carteira");
  let contaTotal = document.querySelector("#conta-total");
  contaCorrente.textContent = corrente;
  contaPoupanca.textContent = poupanca;
  contaCarteira.textContent = carteira;
  contaTotal.textContent = total;
}



  $(document).ready(function(){
    $('.input-saldo').mask('000.000,00', {reverse: true});
    $(".input-saldo").change(function(){
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

