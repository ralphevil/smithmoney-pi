var ctx1 = document.getElementsByClassName("categoria-despesas");
let ctx2 = document.getElementsByClassName("categoria-receitas");

var chartGraph = new Chart(ctx1, {
  type: 'doughnut',
  data: {
    labels: ["Alimentação", "Lazer", "Transportes", "Moradia", "Vestuario"],
    datasets: [{
      label: "Despesas por categoria",
      data: [100, 200, 50, 60, 70, 300],
      borderWidth: 3,
      backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(54, 162, 235, 0.9)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)',
            'rgba(54, 162, 235, 0.9)'
        ],
    }]
  }
});

var chartGraph = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ["Salário", "Alugueis", "Dividendos"],
    datasets: [{
      label: "Despesas por categoria",
      data: [1500.00, 2.000, 500],
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

