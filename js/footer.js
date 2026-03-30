document.addEventListener("DOMContentLoaded", () => {
    const footer = `
    <footer class="footer">

        <div class="footer-container container">

            <div class="footer-marca">
                <img src="./../imagens/Nubis.png" alt="Logo">
                <h4 class="titulos">© 2026 Nubis™. Todos os direitos reservados.</h4>
            </div>

            <div class="footer-coluna">

                <h3 class="titulos">Explorar</h3>

                <ul>
                    <li><a href="#">Saiba mais</a></li>
                    <li><a href="./paginas/planos.html">Planos</a></li>
                    <li><a href="./paginas/login.html">Login</a></li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3 class="titulos">Contato</h3>

                <ul>
                    <li><i class="fa fa-envelope"></i> <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=nubisfinancas@gmail.com"
                            target="_blank">nubisfinancas@gmail.com</a></li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3 class="titulos">Redes sociais</h3>

                <ul class="redes-sociais">
                    <li><i class="fa-brands fa-x-twitter"></i><a href="https://twitter.com/nubisfinancas"
                            target="_blank">@nubisfinancas</a></li>
                    <li><i class="fa-brands fa-instagram"></i><a href="https://instagram.com/nubisfinancas"
                            target="_blank">@nubisfinancas</a></li>
                    <li><i class="fa-brands fa-youtube"></i><a href="https://www.youtube.com/@nubis_financas"
                            target="_blank">Nubis Finanças</a></li>
                </ul>

            </div>

            <div class="footer-coluna">

                <h3 class="titulos">Legal</h3>

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