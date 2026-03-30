const cardsContainer = document.querySelectorAll('.cards');

cardsContainer.forEach(container => {
    container.addEventListener('click', (e) => {
        const botao = e.target.closest('button');
        if (!botao) return; // se não é botão, ignora

        const card = botao.closest('.meta-card');
        if (!card) return;

        // ---------------------
        // BOTÃO DE EDIÇÃO
        // ---------------------
        if (botao.classList.contains('btn-opcoes')) {
            const titulo = card.querySelector('.meta-titulo').innerText;
            const valorMeta = card.querySelector('.meta-info-topo .meta-info:nth-child(1) .meta-valor').innerText;
            const prazo = card.querySelector('.meta-info-topo .meta-info:nth-child(2) .meta-valor').innerText;
            const guardado = card.querySelector('.meta-info-progresso .meta-info:nth-child(1) .meta-valor').innerText;
            const mensal = card.querySelector('.meta-mensal .meta-valor').innerText;

            // Substitui textos por inputs
            card.querySelector('.meta-titulo').innerHTML = `<input type="text" class="edit-titulo" value="${titulo}">`;
            card.querySelector('.meta-info-topo .meta-info:nth-child(1) .meta-valor').innerHTML = `<input type="text" class="edit-meta" value="${valorMeta}">`;
            card.querySelector('.meta-info-topo .meta-info:nth-child(2) .meta-valor').innerHTML = `<input type="text" class="edit-prazo" value="${prazo}">`;
            card.querySelector('.meta-info-progresso .meta-info:nth-child(1) .meta-valor').innerHTML = `<input type="text" class="edit-guardado" value="${guardado}">`;
            card.querySelector('.meta-mensal .meta-valor').innerHTML = `<input type="text" class="edit-mensal" value="${mensal}">`;

            // Botões de ação
            card.querySelector('.meta-acoes').innerHTML = `
                <button class="btn-salvar">Salvar</button>
                <button class="btn-cancelar">Cancelar</button>
            `;
        }

        // ---------------------
        // BOTÃO DE SALVAR
        // ---------------------
        if (botao.classList.contains('btn-salvar')) {
            const novoTitulo = card.querySelector('.edit-titulo').value;
            const novoValor = card.querySelector('.edit-meta').value;
            const novoPrazo = card.querySelector('.edit-prazo').value;
            const novoGuardado = card.querySelector('.edit-guardado').value;
            const novoMensal = card.querySelector('.edit-mensal').value;

            // Atualiza os textos
            card.querySelector('.meta-titulo').innerText = novoTitulo;
            card.querySelector('.meta-info-topo .meta-info:nth-child(1) .meta-valor').innerText = novoValor;
            card.querySelector('.meta-info-topo .meta-info:nth-child(2) .meta-valor').innerText = novoPrazo;
            card.querySelector('.meta-info-progresso .meta-info:nth-child(1) .meta-valor').innerText = novoGuardado;

            // Recalcula "Faltam"
            const valorNum = parseFloat(novoValor.replace(/\D/g,'')) || 0;
            const guardadoNum = parseFloat(novoGuardado.replace(/\D/g,'')) || 0;
            card.querySelector('.meta-info-progresso .meta-info:nth-child(2) .meta-valor').innerText = `R$${(valorNum - guardadoNum).toLocaleString('pt-BR')}`;

            card.querySelector('.meta-mensal .meta-valor').innerText = novoMensal;

            // Volta os botões
            card.querySelector('.meta-acoes').innerHTML = `
                <button class="btn-adicionar-valor">Adicionar valor</button>
                <button class="btn-opcoes"><i class="fa-solid fa-pencil"></i></button>
            `;
        }

        // ---------------------
        // BOTÃO DE CANCELAR
        // ---------------------
        if (botao.classList.contains('btn-cancelar')) {
            const titulo = card.querySelector('.edit-titulo').defaultValue;
            const valorMeta = card.querySelector('.edit-meta').defaultValue;
            const prazo = card.querySelector('.edit-prazo').defaultValue;
            const guardado = card.querySelector('.edit-guardado').defaultValue;
            const mensal = card.querySelector('.edit-mensal').defaultValue;

            card.querySelector('.meta-titulo').innerText = titulo;
            card.querySelector('.meta-info-topo .meta-info:nth-child(1) .meta-valor').innerText = valorMeta;
            card.querySelector('.meta-info-topo .meta-info:nth-child(2) .meta-valor').innerText = prazo;
            card.querySelector('.meta-info-progresso .meta-info:nth-child(1) .meta-valor').innerText = guardado;
            card.querySelector('.meta-info-progresso .meta-info:nth-child(2) .meta-valor').innerText = `R$${(parseFloat(valorMeta.replace(/\D/g,'')) - parseFloat(guardado.replace(/\D/g,''))).toLocaleString('pt-BR')}`;
            card.querySelector('.meta-mensal .meta-valor').innerText = mensal;

            // Volta os botões
            card.querySelector('.meta-acoes').innerHTML = `
                <button class="btn-adicionar-valor">Adicionar valor</button>
                <button class="btn-opcoes"><i class="fa-solid fa-pencil"></i></button>
            `;
        }
    });
});

function adicionarMetaPopup() {
    // HTML do formulário dentro do popup
    const conteudoHTML = `
        <form id="form-adicionar-meta-popup">
            <label>
                Título da meta:
                <input type="text" name="titulo" required>
            </label>
            <label>
                Valor da meta:
                <input type="text" name="valor" required placeholder="R$">
            </label>
            <label>
                Prazo:
                <input type="text" name="prazo" required placeholder="Ex: Dez. 2026">
            </label>
            <label>
                Guardado:
                <input type="text" name="guardado" required placeholder="R$">
            </label>
            <label>
                Guardar por mês:
                <input type="text" name="mensal" required placeholder="R$">
            </label>
            <div class="popup-acoes">
                <button type="submit">Adicionar</button>
                <button type="button" onclick="fecharPopup()">Cancelar</button>
            </div>
        </form>
    `;

    abrirPopup('Adicionar nova meta', conteudoHTML);

    // Depois de abrir o popup, adiciona listener no form
    const form = document.getElementById('form-adicionar-meta-popup');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Pega os dados do formulário
        const dados = {
            titulo: form.titulo.value,
            valor: form.valor.value,
            prazo: form.prazo.value,
            guardado: form.guardado.value,
            mensal: form.mensal.value
        };

        // Cria o novo card
        const novoCard = document.createElement('article');
        novoCard.classList.add('meta-card');
        novoCard.innerHTML = `
            <h3 class="meta-titulo">${dados.titulo}</h3>

            <div class="meta-info-topo">
                <div class="meta-info">
                    <span class="meta-label">Meta</span>
                    <span class="meta-valor meta">${dados.valor}</span>
                </div>
                <div class="meta-info">
                    <span class="meta-label">Prazo</span>
                    <span class="meta-valor">${dados.prazo}</span>
                </div>
            </div>

            <div class="meta-info-progresso">
                <div class="meta-info">
                    <span class="meta-label">Guardado</span>
                    <span class="meta-valor guardado">${dados.guardado}</span>
                </div>
                <div class="meta-info">
                    <span class="meta-label">Faltam</span>
                    <span class="meta-valor meta">${parseFloat(dados.valor.replace(/\D/g,'')) - parseFloat(dados.guardado.replace(/\D/g,''))}</span>
                </div>
                <div class="barra-progresso">
                    <div class="barra-preenchida"></div>
                </div>
            </div>

            <div class="meta-mensal">
                <div class="meta-info">
                    <span class="meta-label">Guardar por mês</span>
                    <span class="meta-valor" style="color: #606060;">${dados.mensal}</span>
                </div>
            </div>

            <div class="meta-acoes">
                <button class="btn-adicionar-valor">Adicionar valor</button>
                <button class="btn-opcoes"><i class="fa-solid fa-pencil"></i></button>
            </div>
        `;

        // Insere o card antes do card "Adicionar nova meta"
        const containerCards = document.querySelector('.cards');
        const cardAdicionar = containerCards.querySelector('.meta-adicionar');
        containerCards.insertBefore(novoCard, cardAdicionar);

        // Fecha o popup
        fecharPopup();
    });
}

document.querySelectorAll('.meta-adicionar').forEach(card => {
    card.addEventListener('click', () => {
        adicionarMetaPopup();
    });
});