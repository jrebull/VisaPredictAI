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
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const chatSendButton = document.getElementById('chatSendButton');

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

    /**
     * Muestra una frase motivacional aleatoria.
     */
    function showRandomQuote() {
        if (motivationalQuoteEl) {
            const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
            motivationalQuoteEl.textContent = motivationalQuotes[randomIndex];
        }
    }

    /**
     * Oculta todas las pantallas y muestra la que corresponde al ID proporcionado.
     * @param {string} screenId - El ID de la pantalla a mostrar.
     */
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

    /**
     * Navega a la pantalla de inicio y actualiza la barra de navegación.
     */
    function goToHome() {
        showScreen('homeScreen');
        document.querySelector('.nav-item.active')?.classList.remove('active');
        const navItem = document.querySelector('.nav-item[data-screen="homeScreen"]');
        if (navItem) {
            navItem.classList.add('active');
        }
    }

    /**
     * Simula el inicio de sesión y navega a la pantalla de inicio.
     */
    function performLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        if (email && password) {
            loginScreen.style.opacity = '0';
            loginScreen.style.transform = 'scale(0.95)';
            setTimeout(() => {
                loginScreen.classList.remove('active');
                goToHome();
            }, 400);
        }
    }

    /**
     * Activa o desactiva el modo oscuro y lo guarda en localStorage.
     */
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    }

    /**
     * Muestra un modal con contenido dinámico.
     * @param {string} type - El tipo de modal a mostrar ('history', 'factors', 'success').
     * @param {string} [message] - Un mensaje personalizado para modales de éxito.
     */
    function showModal(type, message = '') {
        const title = document.getElementById('modalTitle');
        const content = document.getElementById('modalContent');

        if (type === 'success') {
            title.textContent = 'Éxito';
            content.textContent = message;
        } else if (type === 'history') {
            title.textContent = 'Historial de Predicciones';
            content.innerHTML = `
                <div class="history-list">
                  <div class="history-item"><div class="history-left"><div class="score trend-up">85%</div><span>Hace 1 mes</span></div><span class="badge good">Aprobado</span></div>
                  <div class="history-item"><div class="history-left"><div class="score trend-up">78%</div><span>Hace 3 meses</span></div><span class="badge good">Aprobado</span></div>
                  <div class="history-item"><div class="history-left"><div class="score trend-down">72%</div><span>Hace 6 meses</span></div><span class="badge warn">Revisión</span></div>
                </div>`;
        } else if (type === 'factors') {
            title.textContent = 'Factores Clave';
            content.innerHTML = `
                <ul style="list-style: none; padding: 0; text-align: left;">
                    <li style="margin-bottom: 8px;">✅ Perfil académico: <strong>+20%</strong></li>
                    <li style="margin-bottom: 8px;">✅ Experiencia laboral: <strong>+15%</strong></li>
                    <li>✅ Patrocinador confiable: <strong>+10%</strong></li>
                </ul>`;
        }
        
        modalOverlay.classList.add('active');
    }

    /**
     * Cierra cualquier modal que esté activo.
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
    }

    /**
     * Inicia la animación de la tarjeta de predicción.
     */
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
        document.getElementById('confetti-container').innerHTML = ''; // Clear old confetti

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
            }, 30);

        }, 3000);
    }
    
    /**
     * NUEVO: Dispara la animación de confetti.
     */
    function triggerConfetti() {
        const container = document.getElementById('confetti-container');
        if (!container) return;
        for (let i = 0; i < 50; i++) { // 50 confetti pieces
            const confetti = document.createElement('div');
            confetti.classList.add('confetti', `confetti-${(i % 4) + 1}`);
            confetti.style.left = `${Math.random() * 100}%`;
            const animDuration = Math.random() * 2 + 3; // duration between 3s and 5s
            const animDelay = Math.random() * 1; // delay up to 1s
            confetti.style.animation = `confetti-fall ${animDuration}s linear ${animDelay}s forwards`;
            
            container.appendChild(confetti);

            // Remove confetti after animation to prevent DOM clutter
            setTimeout(() => {
                confetti.remove();
            }, (animDuration + animDelay) * 1000);
        }
    }

    /**
     * Expande o contrae un elemento de FAQ.
     * @param {HTMLElement} faqItem - El elemento .faq-item que fue clickeado.
     */
    function toggleFAQ(faqItem) {
        faqItem.classList.toggle('expanded');
    }
    
    /**
     * Actualiza la barra de progreso del checklist.
     */
    function updateChecklistProgress() {
        const inputs = checklistOverlay.querySelectorAll('input[type="checkbox"]');
        const total = inputs.length;
        if (total === 0) return;
        
        let checkedCount = 0;
        inputs.forEach(input => { if (input.checked) checkedCount++; });
        
        const percentage = (checkedCount / total) * 100;
        const progressBar = document.getElementById('checklistProgress');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }

    /**
     * Simula la búsqueda de abogados y muestra los resultados.
     */
    function searchLegalAssistance() {
        legalAssistanceResults.style.display = 'flex';
        legalAssistanceResults.innerHTML = `
            <div class="lawyer-card">
                <div class="lawyer-avatar">AR</div>
                <div class="lawyer-info">
                    <div class="lawyer-name">Ana Rodríguez & Asoc.</div>
                    <div class="lawyer-specialty">Especialistas en Visas H-1B</div>
                    <div class="lawyer-rating">★★★★★</div>
                </div>
            </div>
            <div class="lawyer-card">
                <div class="lawyer-avatar">MJ</div>
                <div class="lawyer-info">
                    <div class="lawyer-name">Martínez & Jiménez</div>
                    <div class="lawyer-specialty">Derecho Migratorio Corporativo</div>
                    <div class="lawyer-rating">★★★★☆</div>
                </div>
            </div>
        `;
    }

    /**
     * NUEVO: Simula la carga de un archivo.
     * @param {HTMLInputElement} input - El input de tipo file que inició el evento.
     */
    function simulateUpload(input) {
        const docItem = input.closest('.document-item');
        const file = input.files[0];
        if (!file || !docItem) return;

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
        progressBar.style.width = '0%';

        let width = 0;
        const interval = setInterval(() => {
            width += 10;
            progressBar.style.width = `${width}%`;
            if (width >= 100) {
                clearInterval(interval);
                statusEl.textContent = '✓ Subido';
                statusEl.className = 'doc-status uploaded';
                progressContainer.style.display = 'none';
                 // Opcional: mostrar el botón de nuevo para cambiar el archivo
                // uploadButton.style.display = 'block';
                // uploadButton.textContent = 'Cambiar Archivo';
            }
        }, 150);
    }
    
    /**
     * NUEVO: Popula la sección de reseñas de empresas.
     */
    function populateCompanyReviews() {
        const container = document.getElementById('company-reviews-container');
        if (!container) return;
        container.innerHTML = ''; // Limpiar contenido existente para evitar duplicados

        const companies = [
            { name: 'Innovatech Solutions', logo: '🏢', rating: 4.5, summary: 'Excelente ambiente para H-1B, el equipo legal es muy proactivo. El proceso fue largo pero bien gestionado.', comments: [{author: 'C. Lopez', text: 'Mi proceso tomó 8 meses, pero el equipo de RRHH siempre estuvo al pendiente. Muy recomendable.'}, {author: 'R. Singh', text: 'Good support, but the RFE was stressful. They helped me through it.'}] },
            { name: 'QuantumLeap AI', logo: '🧪', rating: 5, summary: 'Proceso de visa increíblemente rápido y eficiente. Patrocinaron mi EB-1 sin problemas. La mejor decisión.', comments: [{author: 'A. Petrova', text: 'From start to finish in 6 months. Their lawyers are top-notch.'}, {author: 'J. Chen', text: '¡Increíble! Me sentí apoyado en todo momento.'}] },
            { name: 'HealthBridge Medical', logo: '⚕️', rating: 3.5, summary: 'El proceso para visas O-1 es complejo y a veces lento. RRHH podría mejorar la comunicación.', comments: [{author: 'M. Garcia', text: 'Tuve que preguntar varias veces por actualizaciones. El resultado fue positivo, pero el proceso fue estresante.'}, {author: 'D. Kim', text: 'It took almost a year. Be patient.'}] },
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
                <button class="view-comments-btn btn-secondary">Ver Comentarios (${company.comments.length})</button>
                <div class="company-comments">${commentsHTML}</div>
            `;
            container.appendChild(card);
        });

        // Add event listeners for the new buttons
        container.querySelectorAll('.view-comments-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const comments = this.nextElementSibling;
                const isVisible = comments.style.display === 'flex';
                comments.style.display = isVisible ? 'none' : 'flex';
                this.textContent = isVisible ? `Ver Comentarios (${comments.children.length})` : 'Ocultar Comentarios';
            });
        });
    }

    /**
     * Lógica del Chatbot
     */
    function handleChat() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        chatMessages.innerHTML += `<div class="chat-bubble user">${userMessage}</div>`;
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            let botResponse = "No estoy seguro de cómo responder a eso. ¿Puedes intentar preguntar sobre 'documentos', 'tiempos' o 'costos'?";
            if (userMessage.toLowerCase().includes('hola')) {
                botResponse = "¡Hola! Soy tu asistente de VisaPredictAI. ¿En qué puedo ayudarte hoy?";
            } else if (userMessage.toLowerCase().includes('documentos')) {
                botResponse = "Los documentos clave suelen ser: pasaporte, oferta de empleo, títulos académicos y estados de cuenta. Puedes ver tu checklist completo en la pantalla de Inicio.";
            }
            chatMessages.innerHTML += `<div class="chat-bubble bot">${botResponse}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }


    // --- 3. INICIALIZACIÓN DE LA APP ---

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
        const statusTimeElement = document.getElementById('statusTime');
        if (statusTimeElement) {
            statusTimeElement.textContent = `${hours}:${minutes}`;
        }
    }
    updateTime();
    setInterval(updateTime, 10000); 


    // --- 4. ASIGNACIÓN DE EVENTOS (EVENT LISTENERS) ---
    
    // News Search and Filter Functionality
    const newsSearchInput = document.getElementById('newsSearchInput');
    const newsContainer = document.getElementById('newsContainer');
    
    newsSearchInput?.addEventListener('input', filterNews);

    // Document Upload Listeners
    document.querySelectorAll('.doc-upload-input').forEach(input => {
        input.addEventListener('change', () => simulateUpload(input));
    });
    
    // Pantalla de Login y Registro
    document.getElementById('loginButton')?.addEventListener('click', performLogin);
    document.getElementById('faceIdButton')?.addEventListener('click', performLogin);
    document.getElementById('showRegisterButton')?.addEventListener('click', () => registerScreen.classList.add('active'));
    document.getElementById('loginPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performLogin();
    });
    document.getElementById('backToLoginButton')?.addEventListener('click', () => registerScreen.classList.remove('active'));
    document.getElementById('createAccountButton')?.addEventListener('click', () => {
        alert('Cuenta creada exitosamente.');
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

    // Navegación a Formularios del Perfil
    document.querySelectorAll('[data-form]').forEach(item => {
        item.addEventListener('click', function() {
            const formScreenId = this.dataset.form;
            showScreen(formScreenId);
        });
    });

    // Botones para volver de un formulario al perfil
    document.querySelectorAll('[data-action="back-to-profile"]').forEach(button => {
        button.addEventListener('click', () => showScreen('profileScreen'));
    });
    
    // Botón para volver al Inicio desde el header
    document.querySelectorAll('[data-action="go-home"]').forEach(button => {
        button.addEventListener('click', goToHome);
    });

    // Botones de guardar en formularios
    document.querySelectorAll('[data-action="save-form"]').forEach(button => {
        button.addEventListener('click', () => {
            showModal('success', 'Tus cambios han sido guardados.');
            setTimeout(() => {
                closeModal();
                showScreen('profileScreen');
            }, 1500);
        });
    });

    // Botones de acción en el Inicio
    document.querySelector('[data-action="show-prediction"]')?.addEventListener('click', () => {
        showScreen('predictionScreen');
        const navItem = document.querySelector('.nav-item[data-screen="predictionScreen"]');
        if (navItem) {
            document.querySelector('.nav-item.active')?.classList.remove('active');
            navItem.classList.add('active');
        }
    });
    document.getElementById('openChecklistButton')?.addEventListener('click', () => {
        checklistOverlay.classList.add('active');
        updateChecklistProgress();
    });

    // Checklist
    document.getElementById('closeChecklistButton')?.addEventListener('click', () => checklistOverlay.classList.remove('active'));
    document.getElementById('checklistDoneButton')?.addEventListener('click', () => checklistOverlay.classList.remove('active'));

    // Pantalla de Predicción
    document.getElementById('startPredictionButton')?.addEventListener('click', startPrediction);

    // Modales (Historial, Factores)
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', function() {
            const modalType = this.dataset.modal;
            showModal(modalType);
        });
    });
    modalOverlay.addEventListener('click', closeModal);
    modalOverlay.querySelector('.modal').addEventListener('click', (e) => e.stopPropagation());
    
    // Toggle de Modo Oscuro
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);

    // FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => toggleFAQ(item));
    });
    
    // Chatbot
    chatSendButton?.addEventListener('click', handleChat);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleChat();
    });

    // Iniciar con una frase aleatoria
    showRandomQuote();
});