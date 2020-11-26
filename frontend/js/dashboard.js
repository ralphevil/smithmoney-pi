
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
      if (!despesa.pago) {
        let buscaDespesa = obtemDadosDespesas(despesa);
        let trDespesas = montaTr(buscaDespesa);
        let tabelaDespesas = document.querySelector("#tabela-pendencia");
        tabelaDespesas.appendChild(trDespesas);
      }
    });

    function obtemDadosDespesas(despesa) {
      let despesas = {
        valor: despesa.valor,
        data: despesa.dataVencimento,
        descricao: despesa.descricao,
        categorias: despesa.categoria,
        conta: despesa.conta
      }
      return despesas;
    }

    function montaTr(despesa) {
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

      tdDeleta.appendChild(btnDeleta)
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