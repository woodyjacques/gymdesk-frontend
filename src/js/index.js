function addListeners() {

    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('button[type="button"]');
    if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', function () {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            toggleBtn.textContent = isPassword ? 'Ocultar' : 'Mostrar';
        });
    }

    const registerBtn = document.getElementById('openRegisterBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/register.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    addListeners(); 
                });
        });
    }

    const sesionBtn = document.getElementById('openLoginModal');
    if (sesionBtn) {
        sesionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/login.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    addListeners();
                });
        });
    }

    const recoverBtn = document.getElementById('openRecoverBtn');
    if (recoverBtn) {
        recoverBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/recoverPassword.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    addListeners();
                });
        });
    }
}

document.addEventListener('DOMContentLoaded', addListeners);