function alternarEdicao(botao) {
    const li = botao.closest('li.item-gasto');
    const descricao = li.querySelector('.item-descricao');

    // Seleciona todos os spans que têm valores a editar (classe .valor-editar)
    const spans = descricao.querySelectorAll('.valor-editar');

    const editando = botao.textContent === 'Alterar';

    if (editando) {
        // Modo edição: transforma spans em inputs
        spans.forEach(span => {
            const valor = span.textContent;
            // tipo number se for número, text se for texto (aqui todos como text por simplicidade)
            span.innerHTML = `<input type="text" value="${valor}">`;
        });
        botao.textContent = 'Salvar';
    } else {
        // Modo salvar: pega valores dos inputs e volta para spans
        spans.forEach(span => {
            const input = span.querySelector('input');
            span.textContent = input.value;
        });
        botao.textContent = 'Alterar';
    }
}

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
                responsive: true,
                maintainAspectRatio: false, // respeita o tamanho do canvas
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#333',
                            font: { size: 12 }
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
                responsive: true,
                maintainAspectRatio: false, // respeita o tamanho do canvas
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        // Faz as barras preencherem melhor o espaço horizontal
                        barPercentage: 0.8,
                        categoryPercentage: 0.9
                    },
                    y: {
                        beginAtZero: true,
                        grid: { color: '#e5e5e5' }
                    }
                }
            }
        });
    }

});

// Pega o container
const listas = document.querySelectorAll('.lista-gastos');

listas.forEach(lista => {
    lista.addEventListener('click', e => {
        // Verifica se o clique foi num botão com a classe btn-opcao
        if (e.target.closest('.btn-opcao')) {
            const li = e.target.closest('li.item-gasto');
            const descricao = li.querySelector('.item-descricao');

            // Alterna entre mostrar/esconder
            if (descricao.style.display === 'none' || descricao.style.display === '') {
                descricao.style.display = 'block';
                descricao.innerHTML = `
                <ul>
    <li>
        <span>Vencimento:</span>
        <span class="valor-editar">XX/XX/XXXX</span>
    </li>
    <li>
        <span>Parcelas</span>
        <span class="valor-editar">X</span>
    </li>
    <button class="item-botao" onclick="alternarEdicao(this)">Alterar</button>
</ul>
`;
            } else {
                descricao.style.display = 'none';
            }
        }
    });
});

function editarEntradas() {
    const lista = document.querySelector('.lista-resumo');
    const itens = lista.querySelectorAll('li:not(.total)');

    // Evita duplicar edição
    if (lista.classList.contains('editando')) return;
    lista.classList.add('editando');

    // Transforma spans em inputs
    itens.forEach(li => {
        const spans = li.querySelectorAll('span');

        spans.forEach(span => {
            const input = document.createElement('input');
            input.value = span.textContent.replace('R$ ', '');
            input.classList.add('input-edicao');

            // Se for valor, mantém só número
            if (span.textContent.includes('R$')) {
                input.type = 'number';
                input.value = input.value.replace(/\D/g, '');
            }

            span.replaceWith(input);
        });
    });

    // Botão adicionar nova entrada
    const btnAdd = document.createElement('button');
    btnAdd.textContent = '+ Nova entrada';
    btnAdd.classList.add('btn-add');

    btnAdd.onclick = () => {
        const novoLi = document.createElement('li');

        novoLi.innerHTML = `
            <input type="text" placeholder="Nome">
            <input type="number" placeholder="Valor">
        `;

        lista.insertBefore(novoLi, lista.querySelector('.total'));
    };

    // Botão salvar
    const btnSalvar = document.createElement('button');
    btnSalvar.textContent = 'Salvar';
    btnSalvar.classList.add('btn-salvar');

    btnSalvar.onclick = () => salvarEntradas(lista);

    // Cria a div container dos botões
    const cardBotoes = document.createElement('div');
    cardBotoes.classList.add('card-botoes');

    // Coloca os botões dentro da div
    cardBotoes.appendChild(btnAdd);
    cardBotoes.appendChild(btnSalvar);

    // Adiciona a div no DOM
    lista.parentElement.appendChild(cardBotoes);
}


function salvarEntradas(lista) {
    const itens = lista.querySelectorAll('li:not(.total)');
    let total = 0;

    itens.forEach(li => {
        const inputs = li.querySelectorAll('input');

        const nome = inputs[0].value;
        const valor = parseFloat(inputs[1].value) || 0;

        total += valor;

        li.innerHTML = `
            <span>${nome}</span>
            <span>R$ ${valor}</span>
        `;
    });

    // Atualiza total
    const totalSpan = lista.querySelector('.total span:last-child');
    totalSpan.textContent = `R$ ${total}`;

    // Remove modo edição
    lista.classList.remove('editando');

    document.querySelector('.card-botoes')?.remove();
}

// ============================
// 1️⃣ Arrays de dados
// ============================
const gastos = [
    { tipo: 'fixa', nome: 'Aluguel', valor: 1000, pago: true, vencimento: '2026-04-05', parcelas: 1 },
    { tipo: 'fixa', nome: 'Internet', valor: 100, pago: false, vencimento: '2026-04-10', parcelas: 1 },
    { tipo: 'fixa', nome: 'Academia', valor: 100, pago: false, vencimento: '2026-04-12', parcelas: 1 },
    { tipo: 'variavel', nome: 'Tênis', valor: 80, pago: false },
    { tipo: 'variavel', nome: 'Celular', valor: 300, pago: false },
    { tipo: 'alimentacao', nome: 'Feira', valor: 100, pago: false },
    { tipo: 'alimentacao', nome: 'iFood', valor: 30, pago: false },
    { tipo: 'lazer', nome: 'Cinema', valor: 60, pago: false },
    { tipo: 'transporte', nome: 'Uber', valor: 15, pago: false },
    { tipo: 'compras', nome: 'Riachuelo', valor: 50, pago: false },
];

// ============================
// 2️⃣ Função para renderizar itens
// ============================
function renderizarGastos(tipo, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // limpa antes de renderizar

    gastos
        .filter(g => g.tipo === tipo)
        .forEach((gasto, index) => {
            const li = document.createElement('li');
            li.classList.add('item-gasto');

            // guarda o índice do array no li
            li.dataset.index = index;

            const checked = gasto.pago ? 'checked' : '';
            const checado = gasto.pago ? 'checado' : '';
            const negativo = gasto.pago ? 'negativo' : '';
            const valorText = gasto.pago ? `-R$${gasto.valor}` : `R$${gasto.valor}`;

            li.innerHTML = `
          <div class="item-principal">
            <label class="checkbox-customizada">
              <input type="checkbox" ${checked} data-index="${index}">
              <span class="checkmark"></span>
              <span class="${checado}">${gasto.nome}</span>
            </label>
            <span class="valor ${negativo}">${valorText}</span>
            <button class="btn-opcao"><i class="fa-solid fa-angle-down"></i></button>
          </div>
          <div class="item-descricao" style="display:none"></div>
        `;
            container.appendChild(li);
        });
}

// ============================
// 3️⃣ Função para delegar eventos do checkbox
// ============================
// Delegação global para checkboxes
document.addEventListener('change', (e) => {
    const checkbox = e.target;
    if (checkbox && checkbox.type === 'checkbox' && checkbox.dataset.index) {
        const li = checkbox.closest('li.item-gasto');
        const index = parseInt(checkbox.dataset.index);
        const gasto = gastos[index];

        const nomeItem = li.querySelector('label span:last-of-type');
        const valorItem = li.querySelector('span.valor');

        if (checkbox.checked) {
            nomeItem.classList.add('checado');
            valorItem.classList.add('negativo');
            if (!valorItem.textContent.startsWith('-')) {
                valorItem.textContent = '-' + valorItem.textContent.replace('-', '');
            }
            gasto.pago = true;
        } else {
            nomeItem.classList.remove('checado');
            valorItem.classList.remove('negativo');
            valorItem.textContent = valorItem.textContent.replace('-', '');
            gasto.pago = false;
        }
    }
});

// ============================
// 4️⃣ Função para alternar descrição
// ============================
// ============================
// Ativar botões de descrição
// ============================
function ativarBotoesDescricao() {
    document.querySelectorAll('.lista-gastos').forEach(lista => {
        // Remove listeners antigos, evitando duplicidade
        lista.replaceWith(lista.cloneNode(true));
    });

    document.querySelectorAll('.lista-gastos').forEach(lista => {
        lista.addEventListener('click', e => {
            if (e.target.closest('.btn-opcao')) {
                const li = e.target.closest('li.item-gasto');
                const descricao = li.querySelector('.item-descricao');
                const index = parseInt(li.dataset.index); // pega índice do li
                const gasto = gastos[index]; // pega objeto correto

                if (!gasto) return; // segurança

                if (descricao.style.display === 'none' || descricao.style.display === '') {
                    descricao.style.display = 'block';

                    // Só mostra vencimento e parcelas se for conta fixa
                    let detalhesHTML = '';
                    if (gasto.tipo === 'fixa') {
                        detalhesHTML = `
                            <li>
                                <span>Vencimento:</span>
                                <span class="valor-editar">${gasto.vencimento || 'XX/XX/XXXX'}</span>
                            </li>
                            <li>
                                <span>Parcelas:</span>
                                <span class="valor-editar">${gasto.parcelas || 1}</span>
                            </li>
                        `;
                    }

                    descricao.innerHTML = `
                        <ul>
                            ${detalhesHTML}
                            <button class="item-botao" onclick="alternarEdicao(this)">Alterar</button>
                        </ul>
                    `;
                } else {
                    descricao.style.display = 'none';
                }
            }
        });
    });
}
// ============================
// 5️⃣ Função para adicionar novo gasto
// ============================
function adicionarGasto(tipo, containerId) {
    const container = document.getElementById(containerId);

    const nome = prompt('Nome do gasto:');
    const valor = parseFloat(prompt('Valor do gasto:')) || 0;

    // adiciona ao array
    gastos.push({ tipo, nome, valor, pago: false });

    // re-renderiza
    renderizarGastos(tipo, containerId);
}

// ============================
// 6️⃣ Inicialização
// ============================
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza todos os tipos
    renderizarGastos('fixa', 'listaFixas');
    renderizarGastos('variavel', 'listaVariaveis');
    renderizarGastos('alimentacao', 'listaAlimentacao');
    ativarBotoesDescricao(); // ⚠️ necessário
    renderizarGastos('lazer', 'listaLazer');    
    renderizarGastos('transporte', 'listaTransporte');
    renderizarGastos('compras', 'listaCompras');

    // Ativa listeners
    ativarCheckboxes();
    ativarBotoesDescricao();

    // Botões de adicionar
    document.getElementById('btnAdicionarFixas').addEventListener('click', () => adicionarGasto('fixa', 'listaFixas'));
    document.getElementById('btnAdicionarVariaveis').addEventListener('click', () => adicionarGasto('variavel', 'listaVariaveis'));
    // ... repetir para outros tipos
});

// Array de cartões (exemplo)
const cartoes = [
    { nome: 'Nubank', limite: 2000, usado: 1000 },
    { nome: 'Inter', limite: 2000, usado: 225.5 },
];

// Renderiza os cartões
function renderizarCartoes() {
    const container = document.querySelector('.cartoes-grid');
    container.innerHTML = '';

    cartoes.forEach((cartao, index) => {
        const article = document.createElement('article');
        article.classList.add('card-cartao');

        article.innerHTML = `
            <header class="cartao-header">
                <h3>${cartao.nome}</h3>
                <button onclick="editarCartao(${index})"><i class="fas fa-pencil"></i></button>
            </header>

            <ul class="info-cartao">
                <li>
                    <span>Limite</span>
                    <span class="limite">${cartao.limite}</span>
                </li>
                <li>
                    <span>Usado</span>
                    <span class="usado">${cartao.usado}</span>
                </li>
            </ul>
        `;
        container.appendChild(article);
    });

    // Adicionar card de "Novo"
    const novoCard = document.createElement('article');
    novoCard.classList.add('card-cartao', 'adicionar');
    novoCard.innerHTML = `
        <button class="btn-novo-cartao btn-adicionar" onclick="abrirFormularioCartao()">
            <i class="fas fa-plus"></i>
            Novo
        </button>
    `;
    container.appendChild(novoCard);
}

// Função de edição inline
function editarCartao(index) {
    const card = document.querySelectorAll('.card-cartao')[index];
    const cartao = cartoes[index];

    const nomeH3 = card.querySelector('h3');
    const limiteSpan = card.querySelector('.limite');
    const usadoSpan = card.querySelector('.usado');

    // Transforma em inputs
    nomeH3.innerHTML = `<input type="text" value="${cartao.nome}">`;
    limiteSpan.innerHTML = `<input type="number" value="${cartao.limite}" min="0" step="0.01">`;
    usadoSpan.innerHTML = `<input type="number" value="${cartao.usado}" min="0" step="0.01">`;

    // Botão salvar
    let salvarBtn = card.querySelector('.btn-salvar');
    if (!salvarBtn) {
        salvarBtn = document.createElement('button');
        salvarBtn.classList.add('btn-salvar');
        salvarBtn.textContent = 'Salvar';
        salvarBtn.addEventListener('click', () => {
            // Atualiza valores no array
            cartao.nome = nomeH3.querySelector('input').value;
            cartao.limite = parseFloat(limiteSpan.querySelector('input').value) || 0;
            cartao.usado = parseFloat(usadoSpan.querySelector('input').value) || 0;

            // Re-renderiza
            renderizarCartoes();
        });
        card.appendChild(salvarBtn);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderizarCartoes();
});
// popup

function abrirPopup(tipo, conteudoHTML = '') {
    const popup = document.querySelector('.popup');
    const titulo = popup.querySelector('.popup-titulo');
    const conteudo = popup.querySelector('.popup-conteudo');

    // Define o título e o conteúdo
    titulo.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
    conteudo.innerHTML = conteudoHTML;

    popup.classList.add('ativo');
    document.body.style.overflowY = 'hidden'; // bloqueia scroll vertical do body
}

function abrirFormularioContaFixa() {
    const formularioHTML = `
        <form id="formNovaContaFixa" class="form-conta-fixa">
            <label for="nomeConta">Nome da conta:</label>
            <input type="text" id="nomeConta" name="nomeConta" placeholder="Ex: Aluguel" required>

            <label for="valorConta">Valor:</label>
            <input type="number" id="valorConta" name="valorConta" placeholder="Ex: 1000" min="0" step="0.01" required>

            <label for="vencimentoConta">Vencimento:</label>
            <input type="date" id="vencimentoConta" name="vencimentoConta" required>

            <label for="parcelasConta">Parcelas:</label>
            <input type="number" id="parcelasConta" name="parcelasConta" placeholder="Ex: 1" min="1" required>

            <label for="pagoConta">
                <input type="checkbox" id="pagoConta" name="pagoConta">
                Pago
            </label>

            <button type="submit">Adicionar Conta Fixa</button>
        </form>
    `;

    abrirPopup('Nova Conta Fixa', formularioHTML);

    // Captura o submit do formulário
    const form = document.getElementById('formNovaContaFixa');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeConta.value;
        const valor = parseFloat(this.valorConta.value) || 0;
        const vencimento = this.vencimentoConta.value;
        const parcelas = parseInt(this.parcelasConta.value) || 1;
        const pago = this.pagoConta.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'fixa',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e fecha popup
        renderizarGastos('fixa', 'listaFixas');
        ativarBotoesDescricao(); // adiciona listener aos novos itens
        fecharPopup();
    });
}

function abrirFormularioContaVariavel() {
    const formularioHTML = `
        <form id="formNovaContaVariavel" class="form-conta-variavel">
            <label for="nomeContaVar">Nome da conta:</label>
            <input type="text" id="nomeContaVar" name="nomeContaVar" placeholder="Ex: Celular" required>

            <label for="valorContaVar">Valor:</label>
            <input type="number" id="valorContaVar" name="valorContaVar" placeholder="Ex: 300" min="0" step="0.01" required>

            <label for="vencimentoContaVar">Vencimento:</label>
            <input type="date" id="vencimentoContaVar" name="vencimentoContaVar">

            <label for="parcelasContaVar">Parcelas:</label>
            <input type="number" id="parcelasContaVar" name="parcelasContaVar" placeholder="Ex: 1" min="1">

            <label for="pagoContaVar">
                <input type="checkbox" id="pagoContaVar" name="pagoContaVar">
                Pago
            </label>

            <button type="submit">Adicionar Conta Variável</button>
        </form>
    `;

    abrirPopup('Nova Conta Variável', formularioHTML);

    const form = document.getElementById('formNovaContaVariavel');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeContaVar.value;
        const valor = parseFloat(this.valorContaVar.value) || 0;
        const vencimento = this.vencimentoContaVar.value || '';
        const parcelas = parseInt(this.parcelasContaVar.value) || 1;
        const pago = this.pagoContaVar.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'variavel',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e fecha popup
        renderizarGastos('variavel', 'listaVariaveis');
        ativarBotoesDescricao();
        fecharPopup();
    });
}

function abrirFormularioAlimentacao() {
    const formularioHTML = `
        <form id="formNovaAlimentacao" class="form-alimentacao">
            <label for="nomeAlim">Nome da conta:</label>
            <input type="text" id="nomeAlim" name="nomeAlim" placeholder="Ex: iFood" required>

            <label for="valorAlim">Valor:</label>
            <input type="number" id="valorAlim" name="valorAlim" placeholder="Ex: 30" min="0" step="0.01" required>

            <label for="vencimentoAlim">Vencimento:</label>
            <input type="date" id="vencimentoAlim" name="vencimentoAlim">

            <label for="parcelasAlim">Parcelas:</label>
            <input type="number" id="parcelasAlim" name="parcelasAlim" placeholder="Ex: 1" min="1">

            <label for="pagoAlim">
                <input type="checkbox" id="pagoAlim" name="pagoAlim">
                Pago
            </label>

            <button type="submit">Adicionar Alimentação</button>
        </form>
    `;

    abrirPopup('Nova Alimentação', formularioHTML);

    const form = document.getElementById('formNovaAlimentacao');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeAlim.value;
        const valor = parseFloat(this.valorAlim.value) || 0;
        const vencimento = this.vencimentoAlim.value || '';
        const parcelas = parseInt(this.parcelasAlim.value) || 1;
        const pago = this.pagoAlim.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'alimentacao',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e fecha popup
        renderizarGastos('alimentacao', 'listaAlimentacao');
        ativarBotoesDescricao();
        fecharPopup();
    });
}

function abrirFormularioLazer() {
    const formularioHTML = `
        <form id="formNovoLazer" class="form-lazer">
            <label for="nomeLazer">Nome da conta:</label>
            <input type="text" id="nomeLazer" name="nomeLazer" placeholder="Ex: Cinema" required>

            <label for="valorLazer">Valor:</label>
            <input type="number" id="valorLazer" name="valorLazer" placeholder="Ex: 60" min="0" step="0.01" required>

            <label for="vencimentoLazer">Vencimento:</label>
            <input type="date" id="vencimentoLazer" name="vencimentoLazer">

            <label for="parcelasLazer">Parcelas:</label>
            <input type="number" id="parcelasLazer" name="parcelasLazer" placeholder="Ex: 1" min="1">

            <label for="pagoLazer">
                <input type="checkbox" id="pagoLazer" name="pagoLazer">
                Pago
            </label>

            <button type="submit">Adicionar Lazer</button>
        </form>
    `;

    abrirPopup('Novo Lazer', formularioHTML);

    const form = document.getElementById('formNovoLazer');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeLazer.value;
        const valor = parseFloat(this.valorLazer.value) || 0;
        const vencimento = this.vencimentoLazer.value || '';
        const parcelas = parseInt(this.parcelasLazer.value) || 1;
        const pago = this.pagoLazer.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'lazer',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e ativa listeners
        renderizarGastos('lazer', 'listaLazer');
        ativarBotoesDescricao();
        fecharPopup();
    });
}

function abrirFormularioTransporte() {
    const formularioHTML = `
        <form id="formNovoTransporte" class="form-transporte">
            <label for="nomeTransporte">Nome da conta:</label>
            <input type="text" id="nomeTransporte" name="nomeTransporte" placeholder="Ex: Uber" required>

            <label for="valorTransporte">Valor:</label>
            <input type="number" id="valorTransporte" name="valorTransporte" placeholder="Ex: 15" min="0" step="0.01" required>

            <label for="vencimentoTransporte">Vencimento:</label>
            <input type="date" id="vencimentoTransporte" name="vencimentoTransporte">

            <label for="parcelasTransporte">Parcelas:</label>
            <input type="number" id="parcelasTransporte" name="parcelasTransporte" placeholder="Ex: 1" min="1">

            <label for="pagoTransporte">
                <input type="checkbox" id="pagoTransporte" name="pagoTransporte">
                Pago
            </label>

            <button type="submit">Adicionar Transporte</button>
        </form>
    `;

    abrirPopup('Novo Transporte', formularioHTML);

    const form = document.getElementById('formNovoTransporte');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeTransporte.value;
        const valor = parseFloat(this.valorTransporte.value) || 0;
        const vencimento = this.vencimentoTransporte.value || '';
        const parcelas = parseInt(this.parcelasTransporte.value) || 1;
        const pago = this.pagoTransporte.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'transporte',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e ativa listeners
        renderizarGastos('transporte', 'listaTransporte');
        ativarBotoesDescricao();
        fecharPopup();
    });
}

function abrirFormularioCompras() {
    const formularioHTML = `
        <form id="formNovaCompra" class="form-compras">
            <label for="nomeCompra">Nome da conta:</label>
            <input type="text" id="nomeCompra" name="nomeCompra" placeholder="Ex: Riachuelo" required>

            <label for="valorCompra">Valor:</label>
            <input type="number" id="valorCompra" name="valorCompra" placeholder="Ex: 50" min="0" step="0.01" required>

            <label for="vencimentoCompra">Vencimento:</label>
            <input type="date" id="vencimentoCompra" name="vencimentoCompra">

            <label for="parcelasCompra">Parcelas:</label>
            <input type="number" id="parcelasCompra" name="parcelasCompra" placeholder="Ex: 1" min="1">

            <label for="pagoCompra">
                <input type="checkbox" id="pagoCompra" name="pagoCompra">
                Pago
            </label>

            <button type="submit">Adicionar Compra</button>
        </form>
    `;

    abrirPopup('Nova Compra', formularioHTML);

    const form = document.getElementById('formNovaCompra');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = this.nomeCompra.value;
        const valor = parseFloat(this.valorCompra.value) || 0;
        const vencimento = this.vencimentoCompra.value || '';
        const parcelas = parseInt(this.parcelasCompra.value) || 1;
        const pago = this.pagoCompra.checked;

        // Adiciona ao array
        gastos.push({
            tipo: 'compras',
            nome: nome,
            valor: valor,
            pago: pago,
            vencimento: vencimento,
            parcelas: parcelas
        });

        // Atualiza a lista e ativa listeners
        renderizarGastos('compras', 'listaCompras');
        ativarBotoesDescricao();
        fecharPopup();
    });
}

// ============================
// 3️⃣ Função para abrir formulário de novo cartão
// ============================
function abrirFormularioCartao() {
    const formularioHTML = `
        <form id="formNovoCartao" class="form-cartao">
            <label for="nomeCartao">Nome do cartão:</label>
            <input type="text" id="nomeCartao" name="nomeCartao" placeholder="Ex: Nubank" required>

            <label for="limiteCartao">Limite:</label>
            <input type="number" id="limiteCartao" name="limiteCartao" placeholder="Ex: 2000" min="0" step="0.01" required>

            <label for="usadoCartao">Valor usado:</label>
            <input type="number" id="usadoCartao" name="usadoCartao" placeholder="Ex: 1000" min="0" step="0.01" required>

            <button type="submit">Adicionar Cartão</button>
        </form>
    `;

    abrirPopup('Novo Cartão', formularioHTML);

    const form = document.getElementById('formNovoCartao');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = this.nomeCartao.value;
        const limite = parseFloat(this.limiteCartao.value) || 0;
        const usado = parseFloat(this.usadoCartao.value) || 0;

        // Adiciona ao array de cartões
        cartoes.push({
            nome: nome,
            limite: limite,
            usado: usado
        });

        // Atualiza a grid e fecha popup
        renderizarCartoes();
        fecharPopup();
    });
}



