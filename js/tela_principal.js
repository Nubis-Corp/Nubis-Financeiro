// Aguarda a página carregar completamente
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       GRÁFICO DE CATEGORIAS (ROSCA)
    ========================== */
    const ctxCategorias = document.getElementById('grafico-categorias');

    if (ctxCategorias) {
        new Chart(ctxCategorias, {
            type: 'doughnut',
            data: {
                labels: ['Alimentação', 'Lazer', 'Transporte', 'Compras'],
                datasets: [{
                    data: [60, 20, 15, 5],
                    backgroundColor: [
                        '#8BC34A', // verde
                        '#E57399', // rosa
                        '#FF8A50', // laranja
                        '#5C7CFA'  // azul
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#333',
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }

    /* =========================
       GRÁFICO DE BARRAS (MESES)
    ========================== */
    const ctxMeses = document.getElementById('grafico-meses');

    if (ctxMeses) {
        new Chart(ctxMeses, {
            type: 'bar',
            data: {
                labels: ['Set', 'Out', 'Nov', 'Dez', 'Jan', 'Fev', 'Mar'],
                datasets: [{
                    label: 'Saldo',
                    data: [2000, 1300, 1300, 1100, 1500, 1500, 700],
                    backgroundColor: '#28AE8F',
                    borderRadius: 8
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#e5e5e5'
                        }
                    }
                }
            }
        });
    }

});