// calculadora.js
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formulario-calculo");
    const selectMetodo = document.getElementById("metodoDivisao");
    const inputSalario = document.getElementById("salarioUsuario");

    const barraEssencial = document.querySelector(".parte.essencial");
    const barraLazer = document.querySelector(".parte.lazer");
    const barraPoupanca = document.querySelector(".parte.poupanca");

    const listaResultados = document.querySelectorAll(".lista-resultados li span:last-child");

    // Função que realiza o cálculo e atualiza a interface
    function calcularDivisao() {
        // 1️⃣ Pegar valores do usuário
        let salario = parseFloat(inputSalario.value.replace(/[R$\s,.]/g, ''));
        if(isNaN(salario) || salario <= 0) salario = 0;

        const metodo = selectMetodo.value;

        // 2️⃣ Definir percentuais baseados no método
        let percEssencial = 0, percLazer = 0, percPoupanca = 0;

        switch(metodo) {
            case "50-30-20":
                percEssencial = 50; percLazer = 30; percPoupanca = 20;
                break;
            case "60-20-20":
                percEssencial = 60; percLazer = 20; percPoupanca = 20;
                break;
            case "70-20-10":
                percEssencial = 70; percLazer = 20; percPoupanca = 10;
                break;
            default:
                percEssencial = 50; percLazer = 30; percPoupanca = 20;
        }

        // 3️⃣ Calcular valores
        const valorEssencial = salario * percEssencial / 100;
        const valorLazer = salario * percLazer / 100;
        const valorPoupanca = salario * percPoupanca / 100;

        // 4️⃣ Atualizar barras (largura proporcional)
        barraEssencial.style.width = percEssencial + "%";
        barraLazer.style.width = percLazer + "%";
        barraPoupanca.style.width = percPoupanca + "%";

        // Atualizar texto dentro das barras
        barraEssencial.innerText = percEssencial + "%";
        barraLazer.innerText = percLazer + "%";
        barraPoupanca.innerText = percPoupanca + "%";

        // 5️⃣ Atualizar lista de resultados
        listaResultados[0].innerText = `R$ ${valorEssencial.toFixed(2)}`;
        listaResultados[1].innerText = `R$ ${valorLazer.toFixed(2)}`;
        listaResultados[2].innerText = `R$ ${valorPoupanca.toFixed(2)}`;
    }

    // 6️⃣ Disparar cálculo apenas quando o botão for clicado
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita que a página recarregue
        calcularDivisao();
    });

    // Opcional: inicializa com os valores padrão ao carregar
    calcularDivisao();
});