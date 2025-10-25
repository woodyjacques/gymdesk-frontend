function showMessage(msg, type = 'info') {
    showCustomMessage({
        msg,
        type,
        selector: '#main',
        id: 'registerMsg',
        duration: 4000
    });
}

function initRegisterForm() {

    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameEl = form.querySelector('#name');
        const emailEl = form.querySelector('#email');
        const passwordEl = form.querySelector('#password');
        const companyEl = form.querySelector('#company');
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!nameEl || !emailEl || !passwordEl || !submitBtn) return;

        const username = nameEl.value.trim();
        const email = emailEl.value.trim();
        const company = companyEl ? companyEl.value.trim() : undefined;
        const password = passwordEl.value;

        if (!username || !email || !password) {
            showMessage('Por favor completa usuario, email, empresa y contraseña.', 'error');
            return;
        }

        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="loader mr-2"></span>Registrando...`;

        if (!document.getElementById('loader-style')) {
            const style = document.createElement('style');
            style.id = 'loader-style';
            style.innerHTML = `.loader { display: inline-block; width: 1em; height: 1em; border: 2px solid #fff; border-top: 2px solid #333; border-radius: 50%; animation: spin 0.8s linear infinite; vertical-align: middle; } @keyframes spin { 100% { transform: rotate(360deg); } }`;
            document.head.appendChild(style);
        }

        const payload = { username, email, company, password };

        try {
            await axios.post(`${API_URL}/users`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            showMessage('Registrado correctamente.', 'success');
            form.reset();

            setTimeout(() => {
                fetch('src/html/verificationNumber.html')
                    .then(res => {
                        if (!res.ok) throw new Error('No se pudo cargar verificación');
                        return res.text();
                    })
                    .then(html => {
                        document.getElementById('main').innerHTML = html;
                        if (window.initVerificationForm) {
                            window.initVerificationForm();
                        }
                    })
                    .catch(err => {
                        console.error('Error al cargar verificación:', err);
                        showMessage('Error al cargar verificación', 'error');
                    });
            }, 2000);

        } catch (err) {
            if (err.response) {
                const serverMsg = err.response.data?.message || JSON.stringify(err.response.data) || `Status ${err.response.status}`;
                showMessage(serverMsg, 'error');
            } else if (err.request) {
                showMessage('No se recibió respuesta del servidor.', 'error');
            } else {
                showMessage(err.message || 'Error desconocido', 'error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}


window.initRegisterForm = initRegisterForm;


