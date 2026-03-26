document.addEventListener("DOMContentLoaded", () => {
    const footer = `
    <footer class="footer">

        <div class="footer-container container">

            <div class="footer-marca">
                <img src="/imagens/Nubis.png" alt="Logo">
                <h4>© 2026 Nubis™. Todos os direitos reservados.</h4>
            </div>

            <div class="footer-coluna">

                <h3>Explorar</h3>

                <ul>
                    <li><a href="#">Saiba mais</a></li>
                    <li><a href="./paginas/planos.html">Planos</a></li>
                    <li><a href="./paginas/login.html">Login</a></li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3>Contato</h3>

                <ul>
                    <li><i></i> nubis@gmail.com</li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3>Redes sociais</h3>

                <ul>
                    <li><a href="#"><i></i>@nubisfinanceiro</a></li>
                    <li><a href="#"><i></i>@nubisfinanceiro</a></li>
                    <li><a href="#"><i></i>Nubis Financeiro</a></li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3>Legal</h3>

                <ul>
                    <li><a href="#">Política de privacidade</a></li>
                    <li><a href="#">Termos de uso</a></li>
                </ul>

            </div>

        </div>

    </footer>
    `;

    document.body.insertAdjacentHTML("beforeend", footer);
});