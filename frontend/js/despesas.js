
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

  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3333/despesas");

  xhr.addEventListener("load", function() {
    let resposta = xhr.responseText;
    let despesas = JSON.parse(resposta);
    
    let status;
    let classe;
    despesas.map((despesa) => {
      (!despesa.pago) ? status = "Pendente" : status = "Paga";
      (status == "Paga") ? classe = "status-paga" : classe = "status-pendente";
      let buscaDespesa = obtemDadosLancamento(despesa);
      let trDespesas = montaTr(buscaDespesa);
      let tabelaDespesas = document.querySelector("#tabela-despesas");
      tabelaDespesas.appendChild(trDespesas);
    });

    function obtemDadosLancamento(lancamento) {
      let despesas = {
        valor: lancamento.valor,
        data: lancamento.dataVencimento,
        descricao: lancamento.descricao,
        categorias: lancamento.categoria,
        conta: lancamento.conta,
        pago: lancamento.pago
      }
      return despesas;
    }

    function montaTr(despesa) {
      let statusPago;
      (!despesa.pago) ? statusPago = "img-controler" : statusPago = "status-invisivel";

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

      trDespesa.appendChild(montaTd(status, classe));
      trDespesa.appendChild(montaTd(despesa.data, "info-data"));
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
      btnEfetiva.classList.add("btn-pagar");
  
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

    let btnAdicionaLancamento = document.querySelector("#btn-add");
    btnAdicionaLancamento.addEventListener("click", function(event) {
      event.preventDefault();
  
      let form = document.querySelector("#formulario-lancamento");

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
    });

    let btnPagar = document.querySelectorAll(".btn-pagar");
    let btnEditar = document.querySelectorAll(".btn-altera");
    let btnDelete = document.querySelectorAll(".btn-deleta");

    btnPagar.forEach(function(item) {
      item.addEventListener("click", function() {
        alert("Pago com sucesso!");
      });
    });

    btnEditar.forEach(function(item) {
      item.addEventListener("click", function() {
        alert("Pago com sucesso!");
      });
    });

    btnDelete.forEach(function(item) {
      item.addEventListener("click", function() {
        alert("Pago com sucesso!");
      });
    });
  });

  $(document).ready(function(){
    $('.input-valor').mask('000.000,00', {reverse: true});
    $(".input-valor").change(function(){
      $("#value").html($(this).val().replace(/\D/g,''))
    });
  });

  xhr.send();
})();

$(document).ready( function(){
  $('.btn-addnova').click( function(){
    toastr.success("Dados salvo com sucesso!");
  } );

} );

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

