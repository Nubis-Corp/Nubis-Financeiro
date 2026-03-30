// ============================
// Seleção de elementos principais
// ============================
const sidebarLinks = document.querySelectorAll('.menu-lateral a[data-section]');
const mainContent = document.querySelector('.content-area');

// ============================
// Funções auxiliares
// ============================
function limparMain() {
    mainContent.innerHTML = '';
}

function inicializarSecao(secao) {
    carregarSecao(secao);

    // Marca link ativo na sidebar
    const linkAtivo = document.querySelector(`[data-section="${secao}"]`);
    if (linkAtivo) {
        sidebarLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        linkAtivo.classList.add('active');
        linkAtivo.setAttribute('aria-current', 'page');
    }
}

// ============================
// Carrega seção dinamicamente
// ============================
function carregarSecao(secao) {
    limparMain();

    switch (secao) {
        case 'perfil':
            mainContent.innerHTML = `
            <section class="perfil-container">
                <div class="informacoes-pessoais">
                    <div class="foto-perfil">
                        <figure class="imagem-perfil">
                            <img src="./../imagens/usuario.png" alt="Foto de perfil do usuário">
                            <button type="button"><i class="fas fa-camera"></i></button>
                        </figure>
                    </div>

                    <div class="informacoes">
                        <dl>
                            <div><dt>Nome</dt><dd>Fulano de Tal</dd></div>
                            <div><dt>Data de Nascimento</dt><dd>00/00/0000</dd></div>
                            <div><dt>E-mail</dt><dd>fulaninho@gmail.com</dd></div>
                            <div><dt>Telefone</dt><dd>+00 (00) 00000-0000</dd></div>
                            <div><dt>CPF</dt><dd>000.000.000-00</dd></div>
                        </dl>
                    </div>

                    <div class="info-clicks">
                        <button type="button" class="botao">Editar</button>
                        <a href="#">Como usamos esses dados?</a>
                    </div>
                </div>
            </section>`;
            break;

        case 'preferencias':
            mainContent.innerHTML = `
            <section class="perfil-container">
                <form class="preferencias">
                    <fieldset class="form-visual">
                        <legend>Modos</legend>
                        <label class="opcao">
                            <span>Modo escuro</span>
                            <input type="checkbox" name="modo-escuro" id="modo-escuro">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </fieldset>

                    <fieldset class="form-acessibilidade">
                        <legend>Acessibilidade</legend>
                        <div class="opcao">
                            <span>Tamanho da fonte</span>
                            <div class="acessibilidade-opcoes">
                                <button type="button" class="aumentar-fonte">+</button>
                                <button type="button" class="diminuir-fonte">-</button>
                            </div>
                        </div>
                    </fieldset>

                    <fieldset class="notificacoes">
                        <legend>Notificações</legend>
                        <label class="opcao">
                            <span>Receber notificações e novidades por e-mail</span>
                            <input type="checkbox" name="ativar-notificacoes" id="ativar-notificacoes">
                            <span class="checkbox-personalizado"></span>
                        </label>
                        <label class="opcao">
                            <span>Ativar som ao receber notificações</span>
                            <input type="checkbox" name="som-notificacoes" id="som-notificacoes">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </fieldset>
                </form>
            </section>`;
            break;

        case 'assinatura':
            mainContent.innerHTML = `
            <section class="perfil-container">
                <div class="planos">
                    <h2>Plano</h2>
                    <dl>
                        <div><dt>Plano atual</dt><dd>Plano Essencial</dd></div>
                        <div><dt>Valor mensal</dt><dd>R$XX,XX</dd></div>
                        <div><dt>Próxima cobrança</dt><dd>15/04/2026</dd></div>
                    </dl>
                </div>
                <div class="cobrancas">
                    <header>
                        <h2>Cobrança</h2>
                        <button>Ver dados do cartão cadastrado <i class="fas fa-lock"></i></button>
                    </header>
                    <dl>
                        <div><dt>Bandeira</dt><dd>Mastercard</dd></div>
                        <div><dt>Número</dt><dd>*** *** *** ***</dd></div>
                        <div><dt>Titular</dt><dd>Fulano de Tal</dd></div>
                        <div><dt>Validade</dt><dd>08/27</dd></div>
                    </dl>
                    <div class="info-clicks">
                        <button class="botao" type="button">Alterar cartão</button>
                    </div>
                    <form class="form-cobranca">
                        <label class="opcao">
                            <span>Ativar cobrança automática no cartão</span>
                            <input type="checkbox" name="ativar-cobranca" id="ativar-cobranca">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </form>
                </div>
            </section>`;
            break;

        case 'privacidade':
            mainContent.innerHTML = `
            <section class="perfil-container">
                <form class="privacidade-e-seguranca">
                    <fieldset class="seguranca">
                        <legend>Segurança da conta</legend>
                        <dl><dt>Senha</dt><dd>********</dd></dl>
                        <div class="info-clicks">
                            <button class="botao" type="button">Alterar senha</button>
                        </div>
                        <label class="opcao">
                            <span>Verificação em duas etapas</span>
                            <input type="checkbox" name="verificacao-duas-etapas" id="verificacao-duas-etapas">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </fieldset>

                    <fieldset class="privacidade">
                        <legend>Privacidade de dados</legend>
                        <label class="opcao">
                            <span>Permitir uso de dados para melhorar o serviço</span>
                            <input type="checkbox" name="uso-dados" id="uso-dados">
                            <span class="checkbox-personalizado"></span>
                        </label>
                        <label class="opcao">
                            <span>Compartilhar dados anonimizados para análise</span>
                            <input type="checkbox" name="uso-anonimo-dados" id="uso-anonimo-dados">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </fieldset>

                    <fieldset class="alertas">
                        <legend>Alertas de segurança</legend>
                        <label class="opcao">
                            <span>Avisar quando houver login em novo dispositivo</span>
                            <input type="checkbox" name="avisar-login" id="avisar-login">
                            <span class="checkbox-personalizado"></span>
                        </label>
                        <label class="opcao">
                            <span>Avisar quando senha for alterada</span>
                            <input type="checkbox" name="avisar-senha" id="avisar-senha">
                            <span class="checkbox-personalizado"></span>
                        </label>
                    </fieldset>

                    <fieldset class="excluir-conta">
                        <legend>Excluir conta</legend>
                        <div class="opcao">
                            <span>Remover permanentemente sua conta e todos os dados.</span>
                            <button class="botao btn-excluir-conta" type="button">Excluir conta</button>
                        </div>
                    </fieldset>
                    <a href="#">Leia nossos Termos de Uso e Condições</a>
                </form>
            </section>`;
            break;

        case 'ajuda':
            mainContent.innerHTML = `
            <div class="content-inner">
                <section class="section-block">
                    <h2>Perguntas frequentes</h2>
                    <div class="faq-list">
                        <details class="faq-item">
                            <summary>Como adicionar gastos?<span class="faq-icon"></span></summary>
                            <p>Para adicionar gastos, vá até a aba "Geral" ou "Simulador".</p>
                        </details>
                        <details class="faq-item">
                            <summary>Como funciona o simulador?<span class="faq-icon"></span></summary>
                            <p>O simulador permite prever seus saldos futuros.</p>
                        </details>
                    </div>
                </section>
            </div>`;
            break;

        default:
            mainContent.innerHTML = `<p>Seção não encontrada.</p>`;
    }

    // Inicializa interações da seção
    inicializarInteracoesSecao(secao);
}

// ============================
// Funções de interação
// ============================
function inicializarEdicaoPerfil() {
    const botaoEditar = mainContent.querySelector('.informacoes-pessoais .botao');
    const campos = mainContent.querySelectorAll('.informacoes-pessoais dl div dd');

    if (!botaoEditar || campos.length === 0) return;

    if (botaoEditar.dataset.editando === "true") {
        // salvar valores
        campos.forEach(dd => {
            const input = dd.querySelector('input');
            if (input) dd.textContent = input.value;
        });
        botaoEditar.textContent = "Editar";
        botaoEditar.dataset.editando = "false";
    } else {
        // modo edição
        campos.forEach(dd => {
            const valorAtual = dd.textContent;
            dd.innerHTML = `<input type="text" value="${valorAtual}">`;
        });
        botaoEditar.textContent = "Salvar";
        botaoEditar.dataset.editando = "true";
    }
}

function inicializarAlterarSenha() {
    const botaoSenha = mainContent.querySelector('.seguranca .botao');
    const ddSenha = mainContent.querySelector('.seguranca dd');
    if (!botaoSenha || !ddSenha) return;

    const novaSenha = prompt("Digite a nova senha:");
    if (novaSenha) {
        ddSenha.textContent = "*".repeat(novaSenha.length);
        alert("Senha alterada com sucesso!");
    }
}

// Inicializa interações de acordo com a seção
function inicializarInteracoesSecao(secao) {
    if (secao === 'perfil') {
        const botaoEditar = mainContent.querySelector('.informacoes-pessoais .botao');
        if (botaoEditar) botaoEditar.addEventListener('click', inicializarEdicaoPerfil);
    }

    if (secao === 'privacidade') {
        const botaoAlterarSenha = mainContent.querySelector('.seguranca .botao');
        if (botaoAlterarSenha) botaoAlterarSenha.addEventListener('click', inicializarAlterarSenha);
    }
}

// ============================
// Eventos da sidebar
// ============================
sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        carregarSecao(link.dataset.section);
        sidebarLinks.forEach(l => {
            l.classList.remove('active');
            l.removeAttribute('aria-current');
        });
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
    });
});

// ============================
// Sair da conta
// ============================
function sairConta() {
    window.location.href = './login.html';
}

// ============================
// Inicialização
// ============================
inicializarSecao('perfil');