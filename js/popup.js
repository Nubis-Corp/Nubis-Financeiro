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

function fecharPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('ativo');
    document.body.style.overflowY = 'auto'; // libera scroll vertical
}

function verNotificacoes() {
    // Cria o conteúdo do popup com a mensagem de notificações
    const notificacoesHTML = `
        <div class="notificacoes-mensagem">
            <p>${abrirNotificacoes()}</p>
        </div>
    `;

    // Abre o popup com título "Notificações"
    abrirPopup('Notificações', notificacoesHTML);

    // Aqui não precisa de formulário nem submit, pois é só exibir mensagem
}

function abrirNotificacoes() {
    return "Não há notificações no momento";
}
