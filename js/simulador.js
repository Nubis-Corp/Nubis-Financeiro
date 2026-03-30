// simulador-interativo.js
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formulario-simulacao");
    const btnSimular = form.querySelector(".botao-simular");

    btnSimular.addEventListener("click", (e) => {
        e.preventDefault(); // evita envio de formulário
        atualizarSimulacao();
    });

    function atualizarSimulacao() {
        // =========================
        // 1️⃣ Ler inputs principais
        // =========================
        const investimentoInicial = parseFloat(document.getElementById("investimentoInicial").value.replace(/[R$\s,.]/g,'')) || 0;
        const aportesMensais = parseFloat(document.getElementById("aportesMensais").value.replace(/[R$\s,.]/g,'')) || 0;
        const periodo = parseFloat(document.getElementById("periodoAplicacao").value) || 0;
        const tipoPeriodo = document.getElementById("tipoPeriodoAplicacao").value;

        // converter período para meses
        let meses;
        switch(tipoPeriodo) {
            case "anos": meses = periodo*12; break;
            case "meses": meses = periodo; break;
            case "semanas": meses = Math.round(periodo*7/30); break;
            case "dias": meses = Math.round(periodo/30); break;
            default: meses = periodo;
        }

        // =========================
        // 2️⃣ Ler taxas de investimentos
        // =========================
        const taxa = {
            selic: parseFloat(document.getElementById("selicEfetivada1").value.replace("%","")) || 0,
            cdb: parseFloat(document.getElementById("rentabilidadeCDB").value.replace("%","")) || 0,
            lci: parseFloat(document.getElementById("rentabilidadeLCI").value.replace("%","")) || 0,
            poupanca: parseFloat(document.getElementById("rentabilidadePoupanca").value.replace("%","")) || 0,
            tesouroPrefixado: parseFloat(document.getElementById("juroTesouroPrefixado").value.replace("%","")) || 0,
            tesouroIPCA: parseFloat(document.getElementById("juroTesouroIPCA").value.replace("%","")) || 0,
            fundoDI: parseFloat(document.getElementById("rentabilidadeDI").value.replace("%","")) || 0
        };

        const taxaCustodia = parseFloat(document.getElementById("taxaCustodia").value.replace("%","")) || 0;
        const taxaFundoDI = parseFloat(document.getElementById("taxaDI").value.replace("%","")) || 0;

        // =========================
        // 3️⃣ Juros compostos com aporte
        // =========================
        function valorFinal(P, PMT, i, n) {
            if(i === 0) return P + PMT*n;
            return P*Math.pow(1+i,n) + PMT*(Math.pow(1+i,n)-1)/i;
        }

        // =========================
        // 4️⃣ Converter taxas anuais para mensais
        // =========================
        const iMensal = {};
        for(const key in taxa){
            iMensal[key] = Math.pow(1 + taxa[key]/100, 1/12) - 1;
        }

        // =========================
        // 5️⃣ Aplicar taxa de custodia/admin
        // =========================
        function aplicarTaxa(valor, taxaPercentual, n){
            const i = taxaPercentual/100/12;
            return valorFinal(valor, 0, -i, n);
        }

        // =========================
        // 6️⃣ Calcular IR (renda fixa)
        // =========================
        function aplicarIR(valor, meses, P, PMT){
            let aliquota;
            if(meses<=6) aliquota=0.225;
            else if(meses<=12) aliquota=0.2;
            else if(meses<=24) aliquota=0.175;
            else aliquota=0.15;

            const ganho = valor - P - PMT*meses;
            const ir = ganho>0 ? ganho*aliquota : 0;
            return {liquido: valor - ir, ir: ir};
        }

        // =========================
        // 7️⃣ Calcular investimentos
        // =========================
        const resultados = {};

        resultados["LCI e LCA"] = aplicarIR(valorFinal(investimentoInicial, aportesMensais, iMensal.lci, meses), meses, investimentoInicial, aportesMensais);
        resultados["CDB"] = aplicarIR(aplicarTaxa(valorFinal(investimentoInicial, aportesMensais, iMensal.cdb, meses), taxaCustodia, meses), meses, investimentoInicial, aportesMensais);
        resultados["Tesouro Selic"] = aplicarIR(aplicarTaxa(valorFinal(investimentoInicial, aportesMensais, iMensal.selic, meses), taxaCustodia, meses), meses, investimentoInicial, aportesMensais);
        resultados["Poupança"] = {liquido: valorFinal(investimentoInicial, aportesMensais, iMensal.poupanca, meses), ir:0};
        resultados["Tesouro Prefixado"] = aplicarIR(aplicarTaxa(valorFinal(investimentoInicial, aportesMensais, iMensal.tesouroPrefixado, meses), taxaCustodia, meses), meses, investimentoInicial, aportesMensais);
        resultados["Tesouro IPCA+"] = aplicarIR(aplicarTaxa(valorFinal(investimentoInicial, aportesMensais, iMensal.tesouroIPCA, meses), taxaCustodia, meses), meses, investimentoInicial, aportesMensais);
        resultados["Fundo DI"] = aplicarIR(aplicarTaxa(valorFinal(investimentoInicial, aportesMensais, iMensal.fundoDI, meses), taxaFundoDI, meses), meses, investimentoInicial, aportesMensais);

        // =========================
        // 8️⃣ Atualizar cards
        // =========================
        const maxValor = Math.max(...Object.values(resultados).map(r=>r.liquido));

        document.querySelectorAll(".cartao-investimento").forEach(card=>{
            const nome = card.querySelector(".nome-investimento").innerText;
            if(resultados[nome]){
                const barra = card.querySelector(".barra-padrao, .barra-ipca");
                barra.style.width = `${(resultados[nome].liquido/maxValor)*100}%`;
            }
        });

        // =========================
        // 9️⃣ Atualizar tabela e resumo
        // =========================
        const resumo = document.querySelectorAll(".resumo-investimentos .resumo-item");
        resumo[0].querySelector(".valor-item").innerText = `R$ ${investimentoInicial.toFixed(2)}`;
        resumo[1].querySelector(".valor-item").innerText = `R$ ${aportesMensais.toFixed(2)}`;
        resumo[2].querySelector(".valor-item").innerText = `${periodo} ${tipoPeriodo}`;
        resumo[3].querySelector(".valor-item").innerText = `R$ ${(investimentoInicial + aportesMensais*meses).toFixed(2)}`;

        const tbody = document.querySelector(".tabela-investimentos .corpo-tabela");
        const nomesColunas = ["LCI e LCA","CDB","Tesouro Selic","Fundo DI","Tesouro Prefixado","Poupança","Tesouro IPCA+"];

        tbody.querySelectorAll("tr").forEach((tr, i)=>{
            tr.querySelectorAll("td").forEach((td,j)=>{
                const nome = nomesColunas[j];
                if(resultados[nome]){
                    switch(i){
                        case 0: td.innerText = `R$ ${ (resultados[nome].liquido).toFixed(2) }`; break; // Valor bruto acumulado
                        case 1: td.innerText = `R$ ${ ((resultados[nome].liquido - investimentoInicial - aportesMensais*meses) + resultados[nome].ir).toFixed(2) }`; break; // Rentabilidade bruta
                        case 2: td.innerText = `R$ ${ resultados[nome].ir.toFixed(2) }`; break; // Custos/IR
                        case 3: td.innerText = `R$ ${ resultados[nome].ir.toFixed(2) }`; break; // Valor pago em IR (separado)
                        case 4: td.innerText = `R$ ${ resultados[nome].liquido.toFixed(2) }`; break; // Valor líquido
                        case 5: td.innerText = `R$ ${ (resultados[nome].liquido - investimentoInicial - aportesMensais*meses).toFixed(2) }`; break; // Rentabilidade líquida
                    }
                }
            });
        });

        // Ganho líquido no tfoot
        const tfoot = document.querySelector(".tabela-investimentos tfoot");
        nomesColunas.forEach((nome, idx)=>{
            tfoot.querySelectorAll("td")[idx].innerText = `R$ ${(resultados[nome].liquido - investimentoInicial - aportesMensais*meses).toFixed(2)}`;
        });
    }

});