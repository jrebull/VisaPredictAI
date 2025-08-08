document.addEventListener('DOMContentLoaded', function() {

    // --- SELECTORES DE ELEMENTOS ---
    // Guardamos los elementos que usamos a menudo en variables
    const loginScreen = document.getElementById('loginScreen');
    const homeScreen = document.getElementById('homeScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const registerScreen = document.getElementById('registerScreen');

    // --- FUNCIONES ---

    function showScreen(screenId) {
        document.querySelectorAll('.app-screen, .profile-form-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const screen = document.getElementById(screenId);
        if (screen) {
            screen.classList.add('active');
        }
    }
    
    function performLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (email && password) {
            loginScreen.style.opacity = '0';
            loginScreen.style.transform = 'scale(0.95)';
            setTimeout(() => {
                loginScreen.classList.remove('active');
                showScreen('homeScreen');
                // Al mostrar la home screen, activamos el item de nav correspondiente
                document.querySelector('.nav-item.active').classList.remove('active');
                document.querySelector('.nav-item[data-screen="homeScreen"]').classList.add('active');
            }, 400);
        }
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    // --- INICIALIZACIÓN DE LA APP ---

    // 1. Aplicar tema guardado
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // 2. Simular carga y mostrar pantalla de login
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loginScreen.classList.add('active');
            }, 600);
        }
    }, 1500); // Tiempo de carga reducido para pruebas

    // 3. Actualizar la hora
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const statusTimeElement = document.getElementById('statusTime');
        if (statusTimeElement) {
            statusTimeElement.textContent = `${hours}:${minutes}`;
        }
    }
    updateTime();
    setInterval(updateTime, 10000); // Actualiza cada 10 segundos para no gastar tantos recursos

    // --- ASIGNACIÓN DE EVENTOS (EVENT LISTENERS) ---
    
    // Pantalla de Login
    document.getElementById('loginButton')?.addEventListener('click', performLogin);
    document.getElementById('faceIdButton')?.addEventListener('click', performLogin); // Simplificado para que haga login directo
    document.getElementById('showRegisterButton')?.addEventListener('click', () => registerScreen.classList.add('active'));
    document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performLogin();
    });

    // Pantalla de Registro
    document.getElementById('backToLoginButton')?.addEventListener('click', () => registerScreen.classList.remove('active'));
    document.getElementById('createAccountButton')?.addEventListener('click', () => {
        alert('Cuenta creada exitosamente');
        registerScreen.classList.remove('active');
    });

    // Navegación Principal (Bottom Nav)
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.nav-item.active')?.classList.remove('active');
            this.classList.add('active');
            const screenId = this.dataset.screen;
            showScreen(screenId);
        });
    });

    // Botones de acción y modales
    document.querySelector('[data-action="show-prediction"]')?.addEventListener('click', () => showScreen('predictionScreen'));
    document.getElementById('openChecklistButton')?.addEventListener('click', () => document.getElementById('checklistOverlay').classList.add('active'));
    document.getElementById('closeChecklistButton')?.addEventListener('click', () => document.getElementById('checklistOverlay').classList.remove('active'));
    document.getElementById('checklistDoneButton')?.addEventListener('click', () => document.getElementById('checklistOverlay').classList.remove('active'));
    
    // Toggle de Modo Oscuro
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);

    // Y así sucesivamente para todos los demás elementos interactivos...
    // Esto es un ejemplo, para una app completa se añadirían todos los botones aquí.
});