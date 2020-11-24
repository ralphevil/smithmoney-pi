var ctx1 = document.getElementsByClassName("categoria-despesas");
var ctx2 = document.getElementsByClassName("categoria-receitas");
var ctx3 = document.getElementsByClassName("balanco");

let despesa = {
  categoria: "Alimnetação",
  valor: 15
}

let arr = ["Alimentação", "Lazer", "Saúde", "Trasporte", "Moradia", "vestuariooooo"];

var grafico01 = new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: arr,
    datasets: [{
      label: "Despesas por categoria",
      data: ["350", 200, 50, 60, 70, 300],
      borderWidth: 3,
      backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)'
        ],
    }]
  }
});

var grafico02 = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ["Salário", "Alugueis", "Dividendos"],
    datasets: [{
      label: "Receitas por categoria",
      data: [1500, 2000, 500],
      borderWidth: 3,
      backgroundColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)'   
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.9)',
          'rgba(54, 162, 235, 0.9)',
          'rgba(255, 206, 86, 0.9)' 
        ],
    }]
  }
});

var grafico03 = new Chart(ctx3, {
  type: 'bar',
  data: {
      labels: ['Despesa', 'Receita'],
      datasets: [{
          label: 'Balanço consolidado de depesas e receitas R$',
          data: [2000, 1000],
          backgroundColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(75, 192, 192, 0.9)',
              
          ],
          borderColor: [
              'rgba(255, 99, 132, 0.9)',
              'rgba(75, 192, 192, 0.9)',
          ],
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

