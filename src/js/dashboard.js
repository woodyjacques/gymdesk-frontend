function initDashboard() {
    // Verificar si existe token
    const token = localStorage.getItem('authToken');
    const userDataStr = localStorage.getItem('userData');

    if (!token || !userDataStr) {
        // No hay sesión, redirigir a login
        console.log('No hay sesión activa, redirigiendo a login...');
        fetch('src/html/login.html')
            .then(res => res.text())
            .then(html => {
                document.getElementById('main').innerHTML = html;
                if (window.initLoginForm) {
                    window.initLoginForm();
                }
            });
        return;
    }

    // Parsear datos del usuario
    const userData = JSON.parse(userDataStr);

    // Mostrar datos del usuario en el dashboard
    const userNameElements = document.querySelectorAll('#userName, #userWelcome, #userNameDetail');
    userNameElements.forEach(el => {
        if (el) el.textContent = userData.username || 'Usuario';
    });

    const userEmailEl = document.getElementById('userEmail');
    if (userEmailEl) userEmailEl.textContent = userData.email || '-';

    const userCompanyElements = document.querySelectorAll('#userCompany, #userCompanyDetail');
    userCompanyElements.forEach(el => {
        if (el) el.textContent = userData.company || 'Gimnasio';
    });

    const userRoleElements = document.querySelectorAll('#userRole, #userRoleDetail');
    userRoleElements.forEach(el => {
        if (el) el.textContent = userData.role === 'admin' ? 'Administrador' : 'Cliente';
    });

    // Mostrar fecha actual
    const currentDateEl = document.getElementById('currentDate');
    if (currentDateEl) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        currentDateEl.textContent = now.toLocaleDateString('es-ES', options);
    }

    // Botón de cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Eliminar token y datos del usuario
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            
            console.log('Sesión cerrada correctamente');
            
            // Redirigir a login
            fetch('src/html/login.html')
                .then(res => res.text())
                .then(html => {
                    document.getElementById('main').innerHTML = html;
                    if (window.initLoginForm) {
                        window.initLoginForm();
                    }
                })
                .catch(err => {
                    console.error('Error al cargar login:', err);
                });
        });
    }

    console.log('Dashboard inicializado para:', userData.username);
}

window.initDashboard = initDashboard;
