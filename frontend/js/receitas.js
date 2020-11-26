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
    let receitas = JSON.parse(resposta);

    let status;
    let classe;
    receitas.map((receita) => {
      (!despesa.recebido) ? status = "Pendente" : status = "Recebido";
      (status == "Paga") ? classe = "status-paga" : classe = "status-pendente";
      let buscaDespesa = obtemDadosDespesas(receita);
      let trDespesas = montaTr(buscaDespesa);
      let tabelaDespesas = document.querySelector("#tabela-receitas");
      tabelaDespesas.appendChild(trDespesas);
    });

    function obtemDadosDespesas(receita) {
      let receitas = {
        valor: receita.valor,
        data: receita.dataVencimento,
        descricao: receita.descricao,
        categorias: receita.categoria,
        conta: receita.conta
      }
      return receitas;
    }

    function montaTr(despesa) {
      let trDespesa = document.createElement("tr");
      trDespesa.classList.add("despesas");
    
      trDespesa.appendChild(montaTd('Pendente', "info-status"));
      trDespesa.appendChild(montaTd(despesa.data, "info-data"));
      trDespesa.appendChild(montaTd(despesa.descricao, "info-descricao"));
      trDespesa.appendChild(montaTd(despesa.categorias, "info-categoria"));
      trDespesa.appendChild(montaTd(despesa.conta, "info-conta"));
      trDespesa.appendChild(montaTd(despesa.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), "info-valor"));
      trDespesa.appendChild(montaTd("", "info-efetiva"));
      trDespesa.appendChild(montaTd("", "info-altera"));
      trDespesa.appendChild(montaTd("", "info-delete"));
    
      return trDespesa;
    }

    function  montaTd(dado, classe) {
      let td = document.createElement("td");
      td.textContent = dado;
      td.classList.add(classe);
      return td;
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