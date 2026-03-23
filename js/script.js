document.addEventListener("DOMContentLoaded", () => {

  const botoes = document.querySelectorAll(".botao-menu-lateral");
  const conteudo = document.getElementById("conteudo-dinamico");
  const titulo = document.querySelector(".titulo-pagina");

  function carregarSecao(secao) {

    if (secao === "informacoes") {
      titulo.textContent = "Informações pessoais";
      conteudo.innerHTML = `
        <p>Nome: Fulano de Tal</p>
        <p>Email: fulano@email.com</p>
        <button>Editar</button>
      `;
    }

    if (secao === "preferencias") {
      titulo.textContent = "Preferências";
      conteudo.innerHTML = `
        <p>Modo escuro</p>
        <input type="checkbox">
      `;
    }

    if (secao === "assinatura") {
      titulo.textContent = "Assinatura";
      conteudo.innerHTML = `
        <p>Plano atual: Básico</p>
        <button>Alterar plano</button>
      `;
    }

    if (secao === "privacidade") {
      titulo.textContent = "Privacidade e segurança";
      conteudo.innerHTML = `
        <p>Alterar senha</p>
        <button>Atualizar</button>
      `;
    }

    if (secao === "ajuda") {
      titulo.textContent = "Ajuda";
      conteudo.innerHTML = `
        <p>Central de ajuda</p>
      `;
    }

    if (secao === "logout") {
      titulo.textContent = "Sair";
      conteudo.innerHTML = `
        <p>Tem certeza que deseja sair?</p>
        <button>Sair</button>
      `;
    }
  }

  // eventos
  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const secao = botao.getAttribute("data-secao");
      carregarSecao(secao);
    });
  });

  // inicial
  carregarSecao("informacoes");

});