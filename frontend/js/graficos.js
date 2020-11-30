
let xhrDespesa = new XMLHttpRequest();
xhrDespesa.open("GET", `http://localhost:8080/api/dashboard/categoria/mes/${mesTotal}/tipo/{tipo}?tipo=Despesa`);
xhrDespesa.setRequestHeader('Authorization', 'Bearer ' + token);

let listaCoresDespesas = [
  'rgba(255, 99, 132, 0.9)',
  'rgba(54, 162, 235, 0.9)',
  'rgba(255, 206, 86, 0.9)',
  'rgba(75, 192, 192, 0.9)',
  'rgba(153, 102, 255, 0.9)',
  'rgba(255, 159, 64, 0.9)'
];

let usaCoresDespesa = [];
let listaDespesas = [];
let valorDespesas = [];

xhrDespesa.addEventListener("load", function () {
  let resposta = xhrDespesa.responseText;
  let despesas = JSON.parse(resposta);
  
  despesas.map((categoria) => {
    listaDespesas.push(categoria.categoria);
    valorDespesas.push(categoria.total);
  });

  var ctx1 = document.getElementsByClassName("categoria-despesas");
  
  for (let i = 0; i < listaDespesas.length; i++) {
    usaCoresDespesa.push(listaCoresDespesas[i]);
  }

  if (valorDespesas.length == 0) {
    valorDespesas.push(1);
    listaDespesas.push("Não tem lançamento nesse periodo");
  } 

  var grafico01 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: listaDespesas,
      datasets: [{
        label: "Despesas por categoria",
        data: valorDespesas,
        borderWidth: 3,
        backgroundColor: usaCoresDespesa,
          borderColor: usaCoresDespesa,
      }]
    }
  });

});

xhrDespesa.send();

let xhrReceita = new XMLHttpRequest();
xhrReceita.open("GET", `http://localhost:8080/api/dashboard/categoria/mes/${mesTotal}/tipo/{tipo}?tipo=Receita`);
xhrReceita.setRequestHeader('Authorization', 'Bearer ' + token);

let listaCoresReceitas = [
  'rgba(82, 190, 128, 0.9)',
  'rgba(54, 162, 235, 0.9)',
  'rgba(25, 111, 61, 0.9)',
  'rgba(75, 192, 192, 0.9)',
  'rgba(153, 102, 255, 0.9)',
  'rgba(52, 152, 219, 0.9)'
];

let usaCoresReceitas = [];
let listaReceitas = [];
let valorReceitas = [];

xhrReceita.addEventListener("load", function () {
  let resposta = xhrReceita.responseText;
  let receitasDash = JSON.parse(resposta);

  receitasDash.map((receita) => {
    listaReceitas.push(receita.categoria);
    valorReceitas.push(receita.total);
  });

  var ctx2 = document.getElementsByClassName("categoria-receitas");

  for (let i = 0; i < listaReceitas.length; i++) {
    usaCoresReceitas.push(listaCoresReceitas[i]);
  }

  if (valorReceitas.length == 0) {
    valorReceitas.push(1);
    listaReceitas.push("Não tem lançamento nesse periodo");
  } 

  var grafico02 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: listaReceitas,
      datasets: [{
        label: "Receitas por categoria",
        data: valorReceitas,
        borderWidth: 3,
        backgroundColor: usaCoresReceitas,
          borderColor: usaCoresReceitas,
      }]
    }
  });
});

xhrReceita.send();

let xhrBalanco = new XMLHttpRequest();
xhrBalanco.open("GET", `http://localhost:8080/api/dashboard/total/mes/${mesTotal}`);
xhrBalanco.setRequestHeader('Authorization', 'Bearer ' + token);

let listaCoresBalanco = [
  'rgba(255, 99, 132, 0.9)',
  'rgba(25, 111, 61, 0.9)'
];

let usaCoresBalanco = [];
let valoresBalanco = [];

xhrBalanco.addEventListener("load", function () {
  let resposta = xhrBalanco.responseText;
  let balancos = JSON.parse(resposta);

  let despesaBalanco = balancos.despesaTotal;
  let receitaBalanco = balancos.receitaTotal;

  valoresBalanco.push(despesaBalanco, receitaBalanco);

  var ctx3 = document.getElementsByClassName("balanco");

  for (let i = 0; i < valoresBalanco.length; i++) {
    usaCoresBalanco.push(listaCoresBalanco[i]);
  }

  let mensagem = 'Balanço consolidado de depesas e receitas R$';

  if (despesaBalanco == 0) {
    valoresBalanco = [];
    valoresBalanco.push(0, 0);
    mensagem = "Não tem lançamento nesse periodo";
  } 

  var grafico03 = new Chart(ctx3, {
    type: 'bar',
    data: {
        labels: ['Despesa', 'Receita'],
        datasets: [{
            label: mensagem,
            data: valoresBalanco,
            backgroundColor: usaCoresBalanco,
            borderColor: usaCoresBalanco,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });

});

xhrBalanco.send();
