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
        const card = loading.parentElement;

        reasonEl.style.display = 'none';
        loading.classList.add('active');
        valueEl.style.opacity = '0';
        statusEl.style.opacity = '0';

        setTimeout(() => {
            loading.classList.remove('active');
            const newValue = Math.floor(Math.random() * 45) + 55; // Genera un valor entre 55 y 99
            valueEl.textContent = `${newValue}%`;
            valueEl.style.opacity = '1';
            statusEl.style.opacity = '1';

            if (newValue >= 80) {
                statusEl.textContent = '✓ Aprobado';
            } else if (newValue >= 70) {
                statusEl.textContent = '✓ Probabilidad Alta';
            } else {
                statusEl.textContent = '⚠️ Requiere Revisión';
                reasonEl.textContent = 'Posible razón: Inconsistencias entre empleo y solvencia.';
                reasonEl.style.display = 'block';
            }
        }, 3000);
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
            <div class="lawyer-card">
                <div class="lawyer-avatar">LG</div>
                <div class="lawyer-info">
                    <div class="lawyer-name">Laura Garza Immigration</div>
                    <div class="lawyer-specialty">Visas de Inversión y Talento</div>
                    <div class="lawyer-rating">★★★★☆</div>
                </div>
            </div>
        `;
    }
    
    /**
     * Lógica del Chatbot
     */
    function handleChat() {
        const userMessage = chatInput.value.trim();
        if (userMessage === '') return;

        // Añadir burbuja del usuario
        chatMessages.innerHTML += `<div class="chat-bubble user">${userMessage}</div>`;
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simular respuesta del bot
        setTimeout(() => {
            let botResponse = "No estoy seguro de cómo responder a eso. ¿Puedes intentar preguntar sobre 'documentos', 'tiempos' o 'costos'?";
            if (userMessage.toLowerCase().includes('hola')) {
                botResponse = "¡Hola! Soy tu asistente de VisaPredictAI. ¿En qué puedo ayudarte hoy?";
            } else if (userMessage.toLowerCase().includes('documentos')) {
                botResponse = "Los documentos clave suelen ser: pasaporte, oferta de empleo, títulos académicos y estados de cuenta. Puedes ver tu checklist completo en la pantalla de Inicio.";
            } else if (userMessage.toLowerCase().includes('tiempos')) {
                botResponse = "Los tiempos de procesamiento varían mucho. La predicción en la app te dará un estimado basado en casos similares al tuyo.";
            } else if (userMessage.toLowerCase().includes('gracias')) {
                botResponse = "¡De nada! Estoy aquí para ayudarte en lo que necesites.";
            }
            chatMessages.innerHTML += `<div class="chat-bubble bot">${botResponse}</div>`;
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }


    // --- 3. INICIALIZACIÓN DE LA APP ---

    // Aplicar tema guardado (oscuro o claro)
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Simular carga inicial y mostrar pantalla de login
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loginScreen.classList.add('active');
            }, 600);
        }
    }, 1500);

    // Actualizar la hora en la barra de estado
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
    setInterval(updateTime, 10000); // Actualizar cada 10 segundos


    // --- 4. ASIGNACIÓN DE EVENTOS (EVENT LISTENERS) ---
    
    // News Search and Filter Functionality
    const newsSearchInput = document.getElementById('newsSearchInput');
    const newsContainer = document.getElementById('newsContainer');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const filterPills = document.querySelectorAll('.filter-pill');
    let currentFilter = 'all';

    function filterNews() {
        const searchTerm = newsSearchInput?.value.toLowerCase() || '';
        const newsCards = newsContainer?.querySelectorAll('.news-card');
        let visibleCount = 0;

        newsCards?.forEach(card => {
            const title = card.querySelector('.news-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.news-excerpt')?.textContent.toLowerCase() || '';
            const tags = card.dataset.tags || '';
            
            const matchesSearch = !searchTerm || title.includes(searchTerm) || excerpt.includes(searchTerm);
            const matchesFilter = currentFilter === 'all' || tags.includes(currentFilter);
            
            if (matchesSearch && matchesFilter) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (noResultsMessage) {
            noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    newsSearchInput?.addEventListener('input', filterNews);

    filterPills.forEach(pill => {
        pill.addEventListener('click', function() {
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter || 'all';
            filterNews();
        });
    });
    
    // In-App Browser for News
    const webViewScreen = document.getElementById('webViewScreen');
    const webViewFrame = webViewScreen?.querySelector('iframe');
    const newsScreen = document.getElementById('newsScreen');

    function openInAppBrowser(url) {
        if (!webViewFrame) return;
        webViewFrame.src = url;
        showScreen('webViewScreen');
    }

    newsScreen?.addEventListener('click', function(e) {
        const card = e.target.closest('.news-card');
        if (card && card.dataset.link) {
            const url = card.dataset.link;
            openInAppBrowser(url);
        }
    });

    document.querySelector('[data-action="back-to-news"]')?.addEventListener('click', () => {
        showScreen('newsScreen');
        if (webViewFrame) {
            webViewFrame.src = 'about:blank'; // Detiene la carga de la página anterior
        }
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
    checklistOverlay.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
            updateChecklistProgress();
        }
    });
    checklistOverlay.addEventListener('click', () => checklistOverlay.classList.remove('active'));
    checklistOverlay.querySelector('.checklist-panel').addEventListener('click', (e) => e.stopPropagation());

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
    modalOverlay.querySelector('.modal-btn.cancel').addEventListener('click', closeModal);
    modalOverlay.querySelector('.modal-btn.confirm').addEventListener('click', closeModal);
    
    // Toggle de Modo Oscuro
    document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);

    // FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => toggleFAQ(item));
    });
    
    // Navegación desde tarjeta de Soporte a Noticias
    document.querySelector('.card[data-screen="newsScreen"]')?.addEventListener('click', function() {
        const screenId = this.dataset.screen;
        showScreen(screenId);
        document.querySelector('.nav-item.active')?.classList.remove('active');
        document.querySelector(`.nav-item[data-screen="${screenId}"]`)?.classList.add('active');
    });

    // Evento para búsqueda legal
    legalSearchInput?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchLegalAssistance();
        }
    });
    
    // Chatbot
    chatSendButton?.addEventListener('click', handleChat);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });

    // Iniciar con una frase aleatoria
    showRandomQuote();
});