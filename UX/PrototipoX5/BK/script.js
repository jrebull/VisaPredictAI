document.addEventListener('DOMContentLoaded', function() {

    // ===== ESTADO GLOBAL =====
    let currentScreen = 'homeScreen';
    let predictionRunning = false;
    let checklistCompleted = 12;
    let totalChecklistItems = 20;

    // ===== DATOS SIMULADOS =====
    const userData = {
        name: 'Saul Gonzalez',
        profession: 'Ingeniero de Software Senior',
        country: 'México',
        currentLocation: 'California, USA',
        visaType: 'EB-2',
        profileCompletion: 75,
        predictionScore: 85
    };

    const alerts = [
        {
            type: 'success',
            icon: '✅',
            title: 'Documento aprobado',
            message: 'Tu título universitario ha sido verificado exitosamente',
            time: 'Hace 2 horas'
        },
        {
            type: 'warning',
            icon: '⚠️',
            title: 'Acción requerida',
            message: 'Faltan 3 documentos por subir. Fecha límite: 15 días',
            time: 'Hace 1 día'
        },
        {
            type: 'info',
            icon: 'ℹ️',
            title: 'Actualización del caso',
            message: 'Tu caso ha sido asignado a un oficial. Tiempo estimado: 2-3 semanas',
            time: 'Hace 3 días'
        },
        {
            type: 'success',
            icon: '🎉',
            title: 'Hito alcanzado',
            message: 'Has completado el 75% de tu perfil. ¡Sigue así!',
            time: 'Hace 1 semana'
        }
    ];

    const companies = [
        {
            name: 'Google',
            category: 'tech',
            logo: 'G',
            rating: 4.8,
            reviews: 342,
            visaTypes: ['H-1B', 'L-1', 'O-1'],
            sponsorshipRate: '95%',
            avgProcessTime: '4-6 meses',
            description: 'Líder mundial en tecnología con excelente soporte migratorio',
            userReviews: [
                { name: 'Carlos M.', rating: 5, text: 'Proceso impecable, abogados de primer nivel' },
                { name: 'Ana L.', rating: 5, text: 'Green card en 10 meses, increíble soporte' }
            ]
        },
        {
            name: 'Microsoft',
            category: 'tech',
            logo: 'M',
            rating: 4.7,
            reviews: 298,
            visaTypes: ['H-1B', 'EB-2', 'EB-3'],
            sponsorshipRate: '92%',
            avgProcessTime: '5-7 meses',
            description: 'Empresa establecida con proceso migratorio robusto',
            userReviews: [
                { name: 'Juan P.', rating: 5, text: 'Excelente experiencia, muy organizados' },
                { name: 'Maria G.', rating: 4, text: 'Buen proceso pero algo lento' }
            ]
        },
        {
            name: 'JP Morgan',
            category: 'finance',
            logo: 'JP',
            rating: 4.5,
            reviews: 187,
            visaTypes: ['H-1B', 'L-1'],
            sponsorshipRate: '88%',
            avgProcessTime: '6-8 meses',
            description: 'Líder en servicios financieros con buen programa de visas',
            userReviews: [
                { name: 'Roberto S.', rating: 4, text: 'Proceso estándar bancario, muy formal' }
            ]
        },
        {
            name: 'Mayo Clinic',
            category: 'health',
            logo: 'MC',
            rating: 4.6,
            reviews: 156,
            visaTypes: ['H-1B', 'O-1', 'J-1'],
            sponsorshipRate: '90%',
            avgProcessTime: '3-5 meses',
            description: 'Top institución médica con excelente soporte para profesionales',
            userReviews: [
                { name: 'Dr. Kim', rating: 5, text: 'Proceso rápido para médicos, muy eficiente' }
            ]
        },
        {
            name: 'McKinsey',
            category: 'consulting',
            logo: 'Mc',
            rating: 4.4,
            reviews: 124,
            visaTypes: ['H-1B', 'L-1'],
            sponsorshipRate: '85%',
            avgProcessTime: '4-6 meses',
            description: 'Consultoría elite con buen soporte migratorio',
            userReviews: [
                { name: 'Luis T.', rating: 4, text: 'Buen proceso pero muy competitivo' }
            ]
        }
    ];

    const predictionHistory = [
        { date: '2025-01-15', score: 85, trend: 'up', change: '+5%' },
        { date: '2024-12-01', score: 80, trend: 'up', change: '+8%' },
        { date: '2024-10-15', score: 72, trend: 'up', change: '+12%' },
        { date: '2024-08-20', score: 60, trend: 'down', change: '-5%' },
        { date: '2024-06-10', score: 65, trend: 'stable', change: '0%' }
    ];

    const motivationalQuotes = [
        "Tu proceso está en marcha",
        "Cada paso cuenta hacia tu meta",
        "El éxito requiere persistencia",
        "Tu futuro en USA te espera",
        "Confía en el proceso",
        "La preparación es clave",
        "Mantén el enfoque en tu objetivo",
        "Tu dedicación dará frutos",
        "Un documento a la vez",
        "El sueño americano es posible"
    ];

    // ===== FUNCIONES DE INICIALIZACIÓN =====
    function init() {
        console.log('🚀 Iniciando VisaPredictAI...');
        
        // Cargar tema guardado
        loadTheme();
        
        // Actualizar hora
        updateTime();
        setInterval(updateTime, 60000);
        
        // Generar contenido
        generateAlerts();
        generateCompanies();
        generatePredictionHistory();
        updateGreeting();
        updateMotivationalQuote();
        
        // Configurar login
        initializeLoginScreen();
        
        // Simular carga y mostrar login
        setTimeout(() => {
            console.log('✅ Mostrando pantalla de login...');
            const loadingScreen = document.getElementById('loadingScreen');
            const loginScreen = document.getElementById('loginScreen');
            
            if (loadingScreen) {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    if (loginScreen) {
                        loginScreen.classList.add('active');
                        loginScreen.style.display = 'flex';
                    }
                }, 500);
            }
        }, 2000);
    }

    function loadTheme() {
        const darkMode = localStorage.getItem('darkMode') === 'true';
        if (darkMode) {
            document.body.classList.add('dark-mode');
            const toggle = document.getElementById('darkModeToggle');
            if (toggle) toggle.checked = true;
        }
    }

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const timeEl = document.getElementById('statusTime');
        if (timeEl) timeEl.textContent = `${hours}:${minutes}`;
    }

    function updateGreeting() {
        const hour = new Date().getHours();
        const greetingEl = document.getElementById('greetingText');
        if (greetingEl) {
            if (hour < 12) greetingEl.textContent = 'Buenos días, Saul';
            else if (hour < 19) greetingEl.textContent = 'Buenas tardes, Saul';
            else greetingEl.textContent = 'Buenas noches, Saul';
        }
    }

    function updateMotivationalQuote() {
        const quoteEl = document.getElementById('motivationalQuote');
        if (quoteEl) {
            const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
            quoteEl.textContent = randomQuote;
        }
    }

    // ===== NAVEGACIÓN =====
    function showScreen(screenId) {
        console.log('🔄 Navegando a:', screenId);
        
        // Ocultar todas las pantallas
        document.querySelectorAll('.app-screen').forEach(screen => {
            screen.classList.remove('active');
            screen.style.display = 'none';
        });

        // Mostrar la pantalla seleccionada
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.style.display = 'flex';
            setTimeout(() => {
                targetScreen.classList.add('active');
            }, 10);
            currentScreen = screenId;

            // Actualizar navegación
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const navItem = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
            if (navItem) navItem.classList.add('active');

            // Acciones específicas por pantalla
            if (screenId === 'homeScreen') {
                updateGreeting();
                updateMotivationalQuote();
            }
        } else {
            console.error('❌ No se encontró la pantalla:', screenId);
        }
    }

    // ===== LOGIN =====
    function initializeLoginScreen() {
        const loginBtn = document.getElementById('loginButton');
        const faceIdBtn = document.getElementById('faceIdButton');
        const googleBtn = document.getElementById('googleLogin');
        const appleBtn = document.getElementById('appleLogin');

        if (loginBtn) {
            loginBtn.addEventListener('click', performLogin);
        }

        if (faceIdBtn) {
            faceIdBtn.addEventListener('click', () => {
                faceIdBtn.innerHTML = '<span>✓</span>';
                setTimeout(performLogin, 500);
            });
        }

        if (googleBtn) {
            googleBtn.addEventListener('click', performLogin);
        }

        if (appleBtn) {
            appleBtn.addEventListener('click', performLogin);
        }
    }

    function performLogin() {
        console.log('🔑 Realizando login...');
        const loginScreen = document.getElementById('loginScreen');
        if (loginScreen) {
            loginScreen.style.opacity = '0';
            setTimeout(() => {
                loginScreen.classList.remove('active');
                loginScreen.style.display = 'none';
                console.log('🏠 Mostrando pantalla de inicio...');
                showScreen('homeScreen');
            }, 300);
        }
    }

    // ===== GENERAR CONTENIDO DINÁMICO =====
    function generateAlerts() {
        const container = document.getElementById('alertsList');
        if (!container) return;

        container.innerHTML = alerts.slice(0, 3).map(alert => `
            <div class="alert-item ${alert.type}">
                <div class="alert-icon">${alert.icon}</div>
                <div class="alert-content">
                    <h5>${alert.title}</h5>
                    <p>${alert.message}</p>
                    <span class="alert-time">${alert.time}</span>
                </div>
            </div>
        `).join('');
    }

    function generateCompanies() {
        const container = document.getElementById('companiesContainer');
        if (!container) return;

        container.innerHTML = companies.map(company => `
            <div class="company-card" data-category="${company.category}">
                <div class="company-header">
                    <div class="company-logo">${company.logo}</div>
                    <div class="company-info">
                        <h4>${company.name}</h4>
                        <div class="company-rating">
                            ${'⭐'.repeat(Math.round(company.rating))} ${company.rating} (${company.reviews})
                        </div>
                    </div>
                </div>
                <p class="company-description">${company.description}</p>
                <div class="company-stats">
                    <div class="stat">
                        <span class="stat-label">Tasa éxito</span>
                        <span class="stat-value">${company.sponsorshipRate}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Tiempo</span>
                        <span class="stat-value">${company.avgProcessTime}</span>
                    </div>
                </div>
                <div class="company-visas">
                    ${company.visaTypes.map(visa => `<span class="visa-tag">${visa}</span>`).join('')}
                </div>
                <div class="company-reviews">
                    ${company.userReviews.slice(0, 2).map(review => `
                        <div class="review">
                            <div class="review-header">
                                <strong>${review.name}</strong>
                                <span>${'⭐'.repeat(review.rating)}</span>
                            </div>
                            <p>"${review.text}"</p>
                        </div>
                    `).join('')}
                </div>
                <button class="btn-secondary" onclick="alert('Ver más detalles de ${company.name}')">
                    Ver más detalles →
                </button>
            </div>
        `).join('');
    }

    function generatePredictionHistory() {
        const container = document.getElementById('predictionTimeline');
        if (!container) return;

        container.innerHTML = predictionHistory.map(item => {
            const trendIcon = item.trend === 'up' ? '📈' : item.trend === 'down' ? '📉' : '➡️';
            const trendClass = item.trend === 'up' ? 'positive' : item.trend === 'down' ? 'negative' : 'neutral';
            
            return `
                <div class="timeline-item">
                    <div class="timeline-date">${new Date(item.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                    <div class="timeline-content">
                        <div class="timeline-score ${trendClass}">${item.score}%</div>
                        <div class="timeline-trend">
                            <span>${trendIcon}</span>
                            <span>${item.change}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function generateCV() {
        const cvBody = document.querySelector('.cv-body');
        if (!cvBody) return;

        cvBody.innerHTML = `
            <div class="cv-header">
                <h2>Saul Gonzalez</h2>
                <p>Ingeniero de Software Senior</p>
                <p>📧 saul.gonzalez@email.com | 📱 +1 (555) 123-4567</p>
                <p>📍 San Francisco, CA | 🌐 linkedin.com/in/saulgonzalez</p>
            </div>
            
            <div class="cv-section">
                <h3>Resumen Profesional</h3>
                <p>Ingeniero de software con 5+ años de experiencia en desarrollo de aplicaciones escalables, 
                especializado en IA/ML y arquitectura cloud. Experiencia liderando equipos multiculturales 
                y entregando proyectos de alto impacto.</p>
            </div>
            
            <div class="cv-section">
                <h3>Experiencia Laboral</h3>
                <div class="cv-entry">
                    <h4>Senior Software Engineer - Tech Corp</h4>
                    <p class="cv-date">2022 - Presente | San Francisco, CA</p>
                    <ul>
                        <li>Lideré equipo de 8 desarrolladores en proyecto de $2M</li>
                        <li>Implementé arquitectura microservicios reduciendo costos 35%</li>
                        <li>Desarrollé sistema ML que mejoró conversión 25%</li>
                    </ul>
                </div>
                <div class="cv-entry">
                    <h4>Software Developer - StartupXYZ</h4>
                    <p class="cv-date">2020 - 2022 | Ciudad de México</p>
                    <ul>
                        <li>Desarrollé aplicación móvil con 100K+ usuarios</li>
                        <li>Optimicé performance del backend en 50%</li>
                    </ul>
                </div>
            </div>
            
            <div class="cv-section">
                <h3>Educación</h3>
                <div class="cv-entry">
                    <h4>Maestría en Inteligencia Artificial</h4>
                    <p>Stanford University | 2020-2022 | GPA: 3.9/4.0</p>
                </div>
                <div class="cv-entry">
                    <h4>Licenciatura en Ingeniería de Software</h4>
                    <p>ITAM, México | 2014-2018 | Summa Cum Laude</p>
                </div>
            </div>
            
            <div class="cv-section">
                <h3>Habilidades Técnicas</h3>
                <p><strong>Lenguajes:</strong> Python, JavaScript, Java, Go, Swift</p>
                <p><strong>Frameworks:</strong> React, Node.js, Django, TensorFlow, PyTorch</p>
                <p><strong>Cloud:</strong> AWS (Certified), GCP, Azure, Kubernetes</p>
                <p><strong>Bases de Datos:</strong> PostgreSQL, MongoDB, Redis, Elasticsearch</p>
            </div>
            
            <div class="cv-section">
                <h3>Certificaciones</h3>
                <ul>
                    <li>AWS Solutions Architect Professional (2023)</li>
                    <li>Google Cloud Professional Data Engineer (2022)</li>
                    <li>Certified Kubernetes Administrator (2022)</li>
                </ul>
            </div>
            
            <div class="cv-section">
                <h3>Idiomas</h3>
                <p>Español (Nativo) | Inglés (Fluido - TOEFL 118/120) | Francés (Intermedio)</p>
            </div>
        `;
    }

    // ===== PREDICCIÓN =====
    function runPrediction() {
        if (predictionRunning) return;
        predictionRunning = true;

        const btn = document.getElementById('runPredictionBtn');
        const percentEl = document.getElementById('predictionPercent');
        const labelEl = document.getElementById('predictionLabel');
        const arc = document.getElementById('predictionArc');
        const factorsEl = document.getElementById('predictionFactors');

        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<span>⏳</span> Analizando tu perfil...';
        }

        let current = 0;
        const target = Math.floor(Math.random() * 20) + 75; // Entre 75-95
        const circumference = 565;

        const interval = setInterval(() => {
            current += 2;
            if (current >= target) {
                current = target;
                clearInterval(interval);
                
                // Mostrar resultado
                if (labelEl) {
                    if (target >= 85) {
                        labelEl.textContent = 'Excelente probabilidad';
                        labelEl.style.color = '#4CAF50';
                    } else if (target >= 70) {
                        labelEl.textContent = 'Buena probabilidad';
                        labelEl.style.color = '#FF9800';
                    } else {
                        labelEl.textContent = 'Necesita mejoras';
                        labelEl.style.color = '#f44336';
                    }
                }

                if (factorsEl) {
                    factorsEl.style.display = 'block';
                }

                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<span>🎯</span> Ejecutar Nueva Predicción';
                }

                predictionRunning = false;

                // Agregar al historial
                const newEntry = {
                    date: new Date().toISOString().split('T')[0],
                    score: target,
                    trend: target > 80 ? 'up' : 'stable',
                    change: `+${Math.floor(Math.random() * 5)}%`
                };
                predictionHistory.unshift(newEntry);
                generatePredictionHistory();
            }

            if (percentEl) percentEl.textContent = current;
            if (arc) {
                const offset = circumference - (current / 100) * circumference;
                arc.style.strokeDashoffset = offset;
            }
        }, 30);
    }

    // ===== FILTROS Y BÚSQUEDA =====
    function filterCompanies(category) {
        const cards = document.querySelectorAll('.company-card');
        cards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function searchCompanies(query) {
        const cards = document.querySelectorAll('.company-card');
        const lowerQuery = query.toLowerCase();
        
        cards.forEach(card => {
            const name = card.querySelector('h4').textContent.toLowerCase();
            const description = card.querySelector('.company-description').textContent.toLowerCase();
            
            if (name.includes(lowerQuery) || description.includes(lowerQuery)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // ===== CHECKLIST =====
    function updateChecklist() {
        const checkboxes = document.querySelectorAll('#checklistModal input[type="checkbox"]');
        let completed = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) completed++;
        });
        
        checklistCompleted = completed;
        const percentage = (completed / checkboxes.length) * 100;
        
        const progressBar = document.getElementById('checklistProgress');
        if (progressBar) {
            progressBar.style.width = percentage + '%';
        }
        
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${completed} de ${checkboxes.length} completados`;
        }
    }

    // ===== EVENT LISTENERS =====
    
    // Navegación principal
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const screen = this.dataset.screen;
            if (screen) showScreen(screen);
        });
    });

    // Quick Actions
    document.getElementById('quickPrediction')?.addEventListener('click', () => {
        showScreen('predictionScreen');
    });

    document.getElementById('quickDocuments')?.addEventListener('click', () => {
        document.getElementById('documentsModal').classList.add('active');
    });

    document.getElementById('quickNews')?.addEventListener('click', () => {
        showScreen('newsScreen');
    });

    document.getElementById('quickChecklist')?.addEventListener('click', () => {
        document.getElementById('checklistModal').classList.add('active');
    });

    // Profile Card
    document.getElementById('profileSummaryCard')?.addEventListener('click', () => {
        showScreen('profileScreen');
    });

    // Profile Sections
    document.querySelectorAll('.profile-section-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            if (section === 'documents') {
                document.getElementById('documentsModal').classList.add('active');
            } else {
                alert(`Sección ${section}: Esta funcionalidad simula la edición de ${section}`);
            }
        });
    });

    // CV Button
    document.getElementById('viewCVBtn')?.addEventListener('click', () => {
        generateCV();
        document.getElementById('cvModal').classList.add('active');
    });

    // Export Profile
    document.getElementById('exportProfileBtn')?.addEventListener('click', () => {
        alert('Exportando perfil en formato PDF...\n\nEsta es una simulación. El archivo se descargaría con toda tu información.');
    });

    // Prediction
    document.getElementById('runPredictionBtn')?.addEventListener('click', runPrediction);

    // Company Filters
    document.querySelectorAll('.pill').forEach(pill => {
        pill.addEventListener('click', function() {
            document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            filterCompanies(this.dataset.filter);
        });
    });

    // Company Search
    document.getElementById('companySearchInput')?.addEventListener('input', function() {
        searchCompanies(this.value);
    });

    // News Items
    document.querySelectorAll('.news-item').forEach(item => {
        item.addEventListener('click', function() {
            const link = this.dataset.link;
            if (link) {
                if (confirm(`¿Deseas abrir este enlace?\n\n${link}`)) {
                    // En un entorno real, esto abriría el enlace
                    alert('Abriendo noticia en navegador interno...');
                }
            } else {
                alert('Contenido completo de la noticia (simulado)');
            }
        });
    });

    // News Categories
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            alert(`Filtrando noticias por: ${this.textContent}`);
        });
    });

    // Support Tiles
    document.getElementById('supportFAQ')?.addEventListener('click', () => {
        alert('FAQ:\n\n• ¿Cuánto tiempo toma el proceso? R: 6-12 meses promedio\n• ¿Necesito oferta laboral? R: Depende del tipo de visa\n• ¿Puedo cambiar de empleo? R: Sí, con restricciones\n• ¿Mi familia puede acompañarme? R: Sí, con visa derivada');
    });

    document.getElementById('supportGuides')?.addEventListener('click', () => {
        alert('Guías Disponibles:\n\n📘 Guía completa H-1B (45 páginas)\n📗 Proceso EB-2 NIW paso a paso\n📙 Preparación para entrevista consular\n📕 Documentos necesarios por tipo de visa');
    });

    document.getElementById('supportForum')?.addEventListener('click', () => {
        alert('Foro de la Comunidad:\n\n💬 "¡Aprobaron mi I-140!" - Juan P. (234 respuestas)\n💬 "RFE recibido, ¿qué hacer?" - Maria L. (156 respuestas)\n💬 "Timeline EB-2 2025" - Carlos R. (89 respuestas)\n💬 "Cambio de estatus F1 a H1B" - Ana S. (67 respuestas)');
    });

    document.getElementById('supportLawyers')?.addEventListener('click', () => {
        alert('Directorio de Abogados:\n\n⚖️ García Immigration Law\n   ⭐⭐⭐⭐⭐ (4.9/5) • $$$ • 6-8 meses\n\n⚖️ Smith & Associates\n   ⭐⭐⭐⭐ (4.5/5) • $$ • 8-10 meses\n\n⚖️ Rodriguez Legal Group\n   ⭐⭐⭐⭐⭐ (4.8/5) • $$$$ • 4-6 meses');
    });

    document.getElementById('supportChat')?.addEventListener('click', () => {
        const response = prompt('Hola, soy tu asistente IA. ¿En qué puedo ayudarte?');
        if (response) {
            alert(`IA: Entiendo tu consulta sobre "${response}". \n\nBasándome en casos similares, te recomiendo:\n1. Verificar el estado actual en USCIS\n2. Preparar documentación adicional\n3. Considerar consulta con abogado\n\n¿Necesitas más detalles?`);
        }
    });

    document.getElementById('supportContact')?.addEventListener('click', () => {
        alert('Contacto Directo:\n\n📧 soporte@visapredictai.com\n📱 WhatsApp: +1-800-VISA-AI\n💬 Chat en vivo: Disponible\n📞 Teléfono: 1-800-847-224\n\nHorario: Lun-Vie 9AM-6PM PST');
    });

    // Settings
    document.getElementById('settingsButton')?.addEventListener('click', () => {
        document.getElementById('settingsModal').classList.add('active');
    });

    // Dark Mode
    document.getElementById('darkModeToggle')?.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // Checklist Items
    document.querySelectorAll('.checklist-item input').forEach(checkbox => {
        checkbox.addEventListener('change', updateChecklist);
    });

    // Modal Close Buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });

    // Profile improvement button
    document.querySelector('.improve-btn')?.addEventListener('click', () => {
        alert('📈 Recomendaciones para Mejorar tu Perfil:\n\n1. ✅ Completar certificación AWS (+5%)\n2. ✅ Agregar carta de recomendación de CEO (+3%)\n3. ✅ Documentar publicaciones técnicas (+4%)\n4. ✅ Certificar nivel de inglés TOEFL (+2%)\n5. ✅ Agregar evidencia de impacto nacional (+6%)\n\nPotencial mejora total: +20%');
    });

    // Initialize
    try {
        init();
        console.log('✅ VisaPredictAI iniciado correctamente');
    } catch (error) {
        console.error('❌ Error al iniciar la aplicación:', error);
    }
});