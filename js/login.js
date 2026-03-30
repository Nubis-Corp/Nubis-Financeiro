const usuario = {
    email: "gabrielsantos25@gmail.com",
    senha: "NubisFinanceiro2026"
}

    const senhaInput = document.getElementById('senha');
    const ativar = document.getElementById('ativarSenha');

    ativar.addEventListener('click', (e) => {
        if (senhaInput.type === "password") {
            senhaInput.type = 'text';
            ativar.innerHTML = `<i class="fa-solid fa-eye-slash"></i>`
;        } else {
        senhaInput.type = 'password'
        ativar.innerHTML = `<i class="fa-solid fa-eye"></i>`;
}
    })

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const erroDiv = document.getElementById('erro');


    if (usuario.email === email && usuario.senha === senha) {
        window.location.href = "./tela_principal.html"
    }
    else {
        erroDiv.textContent = "Email ou senha incorretos.";
        erroDiv.style.display = "block";
    }
})