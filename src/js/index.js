
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
                .then(res => {
                    if (!res.ok) throw new Error('No se pudo cargar el formulario');
                    return res.text();
                })
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    if (window.initRegisterForm) {
                        window.initRegisterForm();
                    }
                    addListeners();
                })
                .catch(err => {
                    console.error('Error al cargar registro:', err);
                    alert('Error al cargar el formulario de registro');
                });
        });
    }

    const verificationBtn = document.getElementById('openVerificationBtn');
    if (verificationBtn) {
        verificationBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/verificationNumber.html')
                .then(res => {
                    if (!res.ok) throw new Error('No se pudo cargar el formulario');
                    return res.text();
                })
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    if (window.initVerificationForm) {
                        window.initVerificationForm();
                    }
                    addListeners();
                })
                .catch(err => {
                    console.error('Error al cargar verificación:', err);
                    alert('Error al cargar el formulario de verificación');
                });
        });
    }

    const sesionBtn = document.getElementById('openLoginModal');
    if (sesionBtn) {
        sesionBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/login.html')
                .then(res => {
                    if (!res.ok) throw new Error('No se pudo cargar el formulario');
                    return res.text();
                })
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    if (window.initLoginForm) {
                        window.initLoginForm();
                    }
                    addListeners();
                })
                .catch(err => {
                    console.error('Error al cargar login:', err);
                    alert('Error al cargar el formulario de login');
                });
        });
    }

    const recoverBtn = document.getElementById('openRecoverBtn');
    if (recoverBtn) {
        recoverBtn.addEventListener('click', function (e) {
            e.preventDefault();
            fetch('src/html/recoverPassword.html')
                .then(res => {
                    if (!res.ok) throw new Error('No se pudo cargar el formulario');
                    return res.text();
                })
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    if (window.initRecoverPasswordForm) {
                        window.initRecoverPasswordForm();
                    }
                    addListeners();
                })
                .catch(err => {
                    console.error('Error al cargar recuperación:', err);
                    alert('Error al cargar el formulario de recuperación');
                });
        });
    }
}

    document.addEventListener('DOMContentLoaded', addListeners);