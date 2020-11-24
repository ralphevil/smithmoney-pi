
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
    despesas.map((despesa) => {
      let buscaDespesa = obtemDadosDespesas(despesa);
      let trDespesas = montaTr(buscaDespesa);
      let tabelaDespesas = document.querySelector("#tabela-pendencia");
      tabelaDespesas.appendChild(trDespesas);
    });

    function obtemDadosDespesas(despesa) {
      let despesas = {
        valor: despesa.valor,
        data: despesa.dataVencimento,
        descricao: despesa.descricao,
        categorias: despesa.categoria,
      }
      return despesas;
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
  });

  xhr.send();
})();