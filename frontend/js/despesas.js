
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

let btnAddDespesa = document.querySelector("#btn-add");
btnAddDespesa.addEventListener("click", function(event) {
  event.preventDefault();

  let form = document.querySelector("#formulario-despesa");
  let despesa = obtemDadosDespesas(form);
  let trDespesas = montaTr(despesa);

  let tabelaDespesas = document.querySelector("#tabela-despesas");

  tabelaDespesas.appendChild(trDespesas);

  form.reset(); 
});

function obtemDadosDespesas(form) {
  let despesa = {
    valor: form.valor.value,
    data: form.data.value,
    descricao: form.descricao.value,
    categorias: form.categorias.value,
    contas: form.contas.value
  }
  return despesa;
}

function montaTr(despesa) {
  let trDespesa = document.createElement("tr");
  trDespesa.classList.add("despesas");

  trDespesa.appendChild(montaTd('Pendente', "info-status"))
  trDespesa.appendChild(montaTd(despesa.data, "info-data"));
  trDespesa.appendChild(montaTd(despesa.descricao, "info-descricao"));
  trDespesa.appendChild(montaTd(despesa.categorias, "info-categoria"));
  trDespesa.appendChild(montaTd(despesa.contas, "info-contas"));
  trDespesa.appendChild(montaTd(despesa.valor, "info-valor"));
  trDespesa.appendChild(montaTd("Efetivar", "info-efetiva"));
  trDespesa.appendChild(montaTd("Editar", "info-altera"));
  trDespesa.appendChild(montaTd("Deletar", "info-delete"));

  return trDespesa;
}

function  montaTd(dado, classe) {
  let td = document.createElement("td");
  td.textContent = dado;
  td.classList.add(classe);
  return td;
}

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
