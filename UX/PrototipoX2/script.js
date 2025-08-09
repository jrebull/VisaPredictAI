document.addEventListener('DOMContentLoaded', function() {

    // --- 1. SELECTORES DE ELEMENTOS ---
    const loadingScreen = document.getElementById('loadingScreen');
    const loginScreen = document.getElementById('loginScreen');
    const registerScreen = document.getElementById('registerScreen');
    const checklistOverlay = document.getElementById('checklistOverlay');
    const modalOverlay = document.getElementById('modalOverlay');
    const motivationalQuoteEl = document.getElementById('motivationalQuote');
    const legalSearchInput = document.getElementById('legalSearchInput');
    const legalAssistanceResults = document.getElementById('legalAssistanceResults');

    // --- NUEVO: Frases motivacionales ---
    const motivationalQuotes = [
        "Cada paso que das te acerca a tu meta.",
        "La perseverancia es clave en este viaje.",
        "Un documento a la vez, estás avanzando.",
        "Mantén el enfoque, tu oportunidad te espera.",
        "Confía en tu preparación y en el proceso.",
        "Tu futuro profesional está en construcción.",
        "La paciencia hoy es una visa mañana.",
        "Organización es sinónimo de éxito.",
        "Estás invirtiendo en tu futuro. ¡Sigue así!",
        "Cada requisito completado es una victoria."
    ];

    // --- 2. FUNCIONES PRINCIPALES ---

    function showRandomQuote() {
        if (motivationalQuoteEl) {
            const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
            motivationalQuoteEl.textContent = motivationalQuotes[randomIndex];
        }
    }

    function showScreen(screenId) {
        document.querySelectorAll('.app-screen, .profile-form-screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const screenToShow = document.getElementById(screenId);
        if (screenToShow) {
            screenToShow.classList.add('active');
            if (screenId === 'homeScreen') {
                showRandomQuote();
            }
             // NUEVO: Populate company reviews when entering the employment screen
            if (screenId === 'employmentScreen') {
                populateCompanyReviews();
            }
        }
    }

    function goToHome() {
        showScreen('homeScreen');
        document.querySelector('.nav-item.active')?.classList.remove('active');
        document.querySelector('.nav-item[data-screen="homeScreen"]')?.classList.add('active');
    }

    function performLogin() {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.classList.remove('active');
            goToHome();
        }, 400);
    }

    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    function showModal(type, message = '') {
        const title = document.getElementById('modalTitle');
        const content = document.getElementById('modalContent');
        if (type === 'success') {
            title.textContent = 'Éxito';
            content.textContent = message;
        } else if (type === 'history') {
            title.textContent = 'Historial de Predicciones';
            content.innerHTML = `<div class="history-list">...</div>`;
        } else if (type === 'factors') {
            title.textContent = 'Factores Clave';
            content.innerHTML = `<ul style="list-style: none; padding: 0;">...</ul>`;
        }
        modalOverlay.classList.add('active');
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    // --- NUEVO: Logica de Animación de Predicción Mejorada ---
    function startPrediction() {
        const loading = document.getElementById('predictionLoading');
        const valueEl = document.getElementById('predictionValue');
        const statusEl = document.getElementById('predictionStatus');
        const reasonEl = document.getElementById('predictionReason');
        const card = document.querySelector('.prediction-card');

        // Reset state
        reasonEl.style.display = 'none';
        statusEl.classList.remove('visible');
        card.classList.add('analyzing');
        loading.classList.add('active');
        valueEl.textContent = '0%';
        document.getElementById('confetti-container').innerHTML = '';

        setTimeout(() => {
            loading.classList.remove('active');
            card.classList.remove('analyzing');
            
            const finalValue = Math.floor(Math.random() * (98 - 65 + 1)) + 65; // Random value between 65 and 98

            // Animate number count-up
            let currentValue = 0;
            const interval = setInterval(() => {
                currentValue++;
                valueEl.textContent = `${currentValue}%`;
                if (currentValue >= finalValue) {
                    clearInterval(interval);
                    
                    // Show final status
                    statusEl.classList.add('visible');
                    if (finalValue >= 85) {
                        statusEl.textContent = '✓ Aprobado';
                        triggerConfetti();
                    } else if (finalValue >= 75) {
                        statusEl.textContent = '✓ Probabilidad Alta';
                    } else {
                        statusEl.textContent = '⚠️ Requiere Revisión';
                        reasonEl.textContent = 'Posible razón: Inconsistencias entre empleo y solvencia.';
                        reasonEl.style.display = 'block';
                    }
                }
            }, 25); // Adjust speed of count-up here

        }, 3000);
    }

    // --- NUEVO: Lógica de Confetti ---
    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti', `confetti-${(i % 4) + 1}`);
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.animation = `confetti-fall ${Math.random() * 2 + 3}s linear ${Math.random() * 2}s infinite`;
            container.appendChild(confetti);
        }
    }
    
    // --- NUEVO: Lógica de Carga de Documentos ---
    window.simulateUpload = function(element) {
        const docItem = element.closest('.document-item');
        const file = element.files[0];
        if (!file) return;

        const statusEl = docItem.querySelector('.doc-status');
        const progressContainer = docItem.querySelector('.upload-progress');
        const progressBar = docItem.querySelector('.upload-progress-bar');
        const fileNameEl = docItem.querySelector('.file-name');
        const uploadButton = docItem.querySelector('.btn-upload');

        // Start upload simulation
        statusEl.textContent = 'Subiendo...';
        statusEl.className = 'doc-status uploading';
        fileNameEl.textContent = file.name;
        progressContainer.style.display = 'block';
        uploadButton.style.display = 'none';

        let width = 0;
        const interval = setInterval(() => {
            width += 10;
            progressBar.style.width = `${width}%`;
            if (width >= 100) {
                clearInterval(interval);
                statusEl.textContent = '✓ Subido';
                statusEl.className = 'doc-status uploaded';
                progressContainer.style.display = 'none';
            }
        }, 150);
    };

    // --- NUEVO: Lógica de Reseñas de Empresas ---
    function populateCompanyReviews() {
        const container = document.getElementById('company-reviews-container');
        container.innerHTML = ''; // Clear existing content

        const companies = [
            { name: 'Innovatech Solutions', logo: '🏢', rating: 4.5, summary: 'Excelente ambiente para H-1B, el equipo legal es muy proactivo. El proceso fue largo pero bien gestionado.', comments: [{author: 'C. Lopez', text: 'Mi proceso tomó 8 meses, pero el equipo de RRHH siempre estuvo al pendiente. Muy recomendable.'}, {author: 'R. Singh', text: 'Good support, but the RFE was stressful. They helped me through it.'}] },
            { name: 'QuantumLeap AI', logo: '🧪', rating: 5, summary: 'Proceso de visa increíblemente rápido y eficiente. Patrocinaron mi EB-1 sin problemas. La mejor decisión.', comments: [{author: 'A. Petrova', text: 'From start to finish in 6 months. Their lawyers are top-notch.'}, {author: 'J. Chen', text: '¡Increíble! Me sentí apoyado en todo momento.'}] },
            { name: 'HealthBridge Medical', logo: '⚕️', rating: 3.5, summary: 'El proceso para visas O-1 es complejo y a veces lento. RRHH podría mejorar la comunicación.', comments: [{author: 'M. Garcia', text: 'Tuve que preguntar varias veces por actualizaciones. El resultado fue positivo, pero el proceso fue estresante.'}] },
        ];

        companies.forEach(company => {
            const card = document.createElement('div');
            card.className = 'company-card';
            
            const commentsHTML = company.comments.map(c => `
                <div class="comment">
                    <div class="comment-avatar">${c.author.charAt(0)}</div>
                    <div class="comment-content">
                        <div class="author">${c.author}</div>
                        <div class="text">"${c.text}"</div>
                    </div>
                </div>
            `).join('');

            card.innerHTML = `
                <div class="company-header">
                    <div class="company-logo">${company.logo}</div>
                    <div class="company-info">
                        <div class="company-name">${company.name}</div>
                        <div class="company-rating">${'★'.repeat(Math.round(company.rating))}${'☆'.repeat(5 - Math.round(company.rating))}</div>
                    </div>
                </div>
                <p class="company-summary">${company.summary}</p>
                <button class="view-comments-btn">Ver Comentarios (${company.comments.length})</button>
                <div class="company-comments">${commentsHTML}</div>
            `;
            container.appendChild(card);
        });

        // Add event listeners for the new buttons
        container.querySelectorAll('.view-comments-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const comments = this.nextElementSibling;
                const isVisible = comments.style.display === 'flex';
                comments.style.display = isVisible ? 'none' : 'flex';
                this.textContent = isVisible ? `Ver Comentarios (${comments.children.length})` : 'Ocultar Comentarios';
            });
        });
    }


    // --- 3. INICIALIZACIÓN Y EVENTOS ---
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loginScreen.classList.add('active');
            }, 600);
        }
    }, 1500);

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        document.getElementById('statusTime').textContent = `${hours}:${minutes}`;
    }
    updateTime();
    setInterval(updateTime, 10000);

    // Event Listeners
    document.getElementById('loginButton')?.addEventListener('click', performLogin);
    document.getElementById('faceIdButton')?.addEventListener('click', performLogin);
    document.getElementById('showRegisterButton')?.addEventListener('click', () => registerScreen.classList.add('active'));
    document.getElementById('backToLoginButton')?.addEventListener('click', () => registerScreen.classList.remove('active'));
    
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            document.querySelector('.nav-item.active')?.classList.remove('active');
            this.classList.add('active');
            showScreen(this.dataset.screen);
        });
    });

    document.querySelectorAll('[data-form]').forEach(item => {
        item.addEventListener('click', () => showScreen(item.dataset.form));
    });

    document.querySelectorAll('[data-action="back-to-profile"]').forEach(button => {
        button.addEventListener('click', () => showScreen('profileScreen'));
    });

    document.querySelectorAll('[data-action="go-home"]').forEach(button => button.addEventListener('click', goToHome));
    document.querySelector('[data-action="show-prediction"]')?.addEventListener('click', () => showScreen('predictionScreen'));
    document.getElementById('openChecklistButton')?.addEventListener('click', () => checklistOverlay.classList.add('active'));
    document.getElementById('closeChecklistButton')?.addEventListener('click', () => checklistOverlay.classList.remove('active'));
    document.getElementById('startPredictionButton')?.addEventListener('click', startPrediction);
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);
    
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => item.classList.toggle('expanded'));
    });

    showRandomQuote();
});