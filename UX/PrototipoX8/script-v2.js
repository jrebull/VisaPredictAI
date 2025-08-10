// ===== VISA PREDICT AI v2.0 - SCRIPT MEJORADO =====

// Estado global
let currentScreen = 'homeScreen';
let previousScreen = '';
let screenHistory = [];
let predictionRunning = false;
let darkMode = false;

// Datos de la aplicación
const appData = {
    user: {
        name: 'Saul Gonzalez',
        profession: 'Ingeniero de Software Senior',
        country: 'México',
        currentLocation: 'California, USA',
        visaType: 'EB-2',
        profileCompletion: 75,
        predictionScore: 85
    },

    alerts: [
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
        }
    ],

    companies: [
        {
            id: 'google',
            name: 'Google',
            category: 'tech',
            logo: 'G',
            rating: 4.8,
            reviews: 342,
            visaTypes: ['H-1B', 'L-1', 'O-1'],
            sponsorshipRate: '95%',
            avgProcessTime: '4-6 meses',
            description: 'Líder mundial en tecnología con excelente soporte migratorio',
            fullDescription: 'Google es conocido por su excelente programa de patrocinio de visas, con un equipo legal dedicado que maneja todo el proceso. La empresa cubre todos los costos legales y de aplicación.',
            benefits: [
                'Cobertura total de gastos legales',
                'Premium processing incluido',
                'Soporte para familia (dependientes)',
                'Relocation package completo',
                'Green card sponsorship garantizado'
            ],
            timeline: 'Típicamente 4-6 meses desde la oferta hasta la aprobación'
        },
        {
            id: 'microsoft',
            name: 'Microsoft',
            category: 'tech',
            logo: 'M',
            rating: 4.7,
            reviews: 298,
            visaTypes: ['H-1B', 'EB-2', 'EB-3'],
            sponsorshipRate: '92%',
            avgProcessTime: '5-7 meses',
            description: 'Empresa establecida con proceso migratorio robusto',
            fullDescription: 'Microsoft ofrece uno de los programas de inmigración más completos en la industria tecnológica, con múltiples opciones de visa y camino claro hacia la residencia permanente.',
            benefits: [
                'Múltiples opciones de visa',
                'Proceso de green card desde día 1',
                'Abogados de inmigración top tier',
                'Backup plans para lottery H-1B'
            ],
            timeline: 'Proceso estándar de 5-7 meses con fast-track disponible'
        }
    ],

    news: [
        {
            id: 'news1',
            title: 'Gobierno exigirá depósitos de hasta $15,000 para visas',
            summary: 'Nueva política requiere depósitos significativos para viajeros de ciertos países.',
            image: 'noticia1.png',
            content: `
                <h2>Nueva Política de Depósitos para Visas de Turismo</h2>
                <p>El gobierno de Estados Unidos anunció hoy una nueva política que requerirá depósitos de seguridad de hasta $15,000 para solicitantes de visas de turismo y negocios (B1/B2) de países seleccionados.</p>
                
                <h3>Puntos Clave:</h3>
                <ul>
                    <li>Los depósitos serán reembolsables al salir del país</li>
                    <li>La medida afecta a 15 países inicialmente</li>
                    <li>Se implementará a partir de enero 2026</li>
                    <li>México no está en la lista inicial</li>
                </ul>
                
                <h3>¿Cómo afecta esto a los solicitantes?</h3>
                <p>Los solicitantes deberán demostrar capacidad financiera para hacer el depósito además de los requisitos tradicionales. El depósito se mantendrá en una cuenta del gobierno y será devuelto dentro de 30 días después de la salida del país.</p>
                
                <h3>Reacciones</h3>
                <p>Organizaciones de derechos civiles han expresado preocupación de que esto pueda limitar el turismo y los viajes de negocios legítimos. El Departamento de Estado defiende la medida como necesaria para garantizar el cumplimiento de los términos de visa.</p>
            `,
            date: 'Agosto 2025',
            source: 'El País',
            category: 'policy',
            featured: true
        },
        {
            id: 'news2',
            title: 'Reducen tiempos de procesamiento EB-2',
            summary: 'Los tiempos bajan de 12 a 8 meses en promedio.',
            image: 'noticia2.png',
            content: `
                <h2>USCIS Acelera Procesamiento de Visas EB-2</h2>
                <p>En una movida que beneficiará a miles de profesionales, USCIS anunció una reducción significativa en los tiempos de procesamiento para peticiones EB-2.</p>
                
                <h3>Cambios Implementados:</h3>
                <ul>
                    <li>Nuevo sistema de procesamiento digital</li>
                    <li>Más oficiales asignados a casos EB-2</li>
                    <li>Priorización de casos con premium processing</li>
                </ul>
                
                <h3>Impacto para Solicitantes</h3>
                <p>Los solicitantes actuales verán sus casos acelerados, mientras que las nuevas aplicaciones se beneficiarán inmediatamente del nuevo sistema.</p>
            `,
            date: 'Julio 2025',
            source: 'USCIS',
            category: 'policy'
        },
        {
            id: 'news3',
            title: 'Nueva ley favorece a profesionales STEM',
            summary: 'Cambios legislativos benefician a trabajadores en ciencia y tecnología.',
            image: 'noticia3.png',
            content: `
                <h2>Reforma Migratoria para Profesionales STEM</h2>
                <p>El Congreso aprobó nuevas medidas que facilitarán el proceso de inmigración para profesionales en campos de ciencia, tecnología, ingeniería y matemáticas.</p>
                
                <h3>Beneficios Principales:</h3>
                <ul>
                    <li>Exención del límite anual de visas H-1B para PhDs</li>
                    <li>Proceso acelerado para green cards en STEM</li>
                    <li>Extensión de OPT hasta 4 años</li>
                    <li>Permiso de trabajo automático para cónyuges</li>
                </ul>
                
                <h3>¿Quiénes califican?</h3>
                <p>Profesionales con títulos avanzados en campos STEM de universidades acreditadas, especialmente aquellos con doctorados o contribuciones significativas en investigación.</p>
            `,
            date: 'Junio 2025',
            source: 'Congress.gov',
            category: 'policy'
        }
    ],

    // Respuestas del ChatBot
    chatbotResponses: {
        greeting: [
            "¡Hola! Soy VisaBot 🤖 ¿En qué puedo ayudarte con tu proceso migratorio?",
            "¡Bienvenido! Estoy aquí para resolver todas tus dudas sobre visas y migración 🗽",
            "¡Saludos! Soy tu asistente de inmigración. ¿Qué necesitas saber hoy?"
        ],
        visa: [
            "Para visas de trabajo como H-1B, necesitas una oferta laboral de un empleador en USA. El proceso toma entre 6-8 meses típicamente. ¿Te gustaría saber más sobre algún tipo específico de visa?",
            "Existen varios tipos de visa: H-1B para profesionales, L-1 para transferencias, O-1 para habilidades extraordinarias, y EB-2/EB-3 para residencia permanente. ¿Cuál te interesa?",
            "El tipo de visa depende de tu situación: empleo, estudio, inversión o talento extraordinario. Basándome en tu perfil, la EB-2 parece ser una excelente opción."
        ],
        documents: [
            "Los documentos básicos incluyen: pasaporte vigente, títulos universitarios apostillados, cartas de empleo, estados de cuenta bancarios, y certificaciones profesionales. ¿Necesitas ayuda con algún documento específico?",
            "Para tu visa EB-2 necesitarás: diplomas, cartas de recomendación (mínimo 3), evidencia de logros profesionales, y certificación de inglés. Veo que ya tienes el 80% completado.",
            "Es crucial que todos los documentos estén traducidos al inglés por un traductor certificado y debidamente apostillados. ¿Ya tienes tus documentos traducidos?"
        ],
        timeline: [
            "El timeline típico es: H-1B (6-8 meses), EB-2 (12-18 meses), EB-3 (18-24 meses). Con premium processing puedes acelerar algunas etapas. Tu caso va muy bien encaminado.",
            "Según tu progreso actual, estimamos que tu proceso complete en 4-6 meses más. Estás en la etapa de revisión por oficial, que típicamente toma 2-3 semanas.",
            "Los tiempos han mejorado recientemente. USCIS redujo el procesamiento de EB-2 de 12 a 8 meses. Tu caso se beneficiará de estas mejoras."
        ],
        cost: [
            "Los costos varían: H-1B ($5,000-$7,000), EB-2 ($10,000-$15,000) incluyendo tarifas gubernamentales y abogados. Muchas empresas cubren estos gastos.",
            "Para tu visa EB-2, el costo total estimado es de $12,000. Esto incluye: tarifas USCIS ($2,805), abogado ($7,000-$9,000), y gastos adicionales. ¿Tu empleador cubrirá estos costos?",
            "Tip importante: Algunos gastos son deducibles de impuestos. Además, con el premium processing ($2,805 adicional) puedes acelerar el proceso a 15 días."
        ],
        interview: [
            "La entrevista consular es el paso final. Prepárate para preguntas sobre tu trabajo, planes en USA, y vínculos con tu país. La clave es ser honesto y conciso.",
            "Tips para la entrevista: 1) Lleva todos los documentos organizados, 2) Viste formal, 3) Sé puntual, 4) Responde solo lo que te pregunten, 5) Mantén la calma.",
            "Las preguntas comunes incluyen: ¿Por qué quieres ir a USA? ¿Qué harás allá? ¿Tienes familia? ¿Planeas regresar? Practica tus respuestas pero no las memorices."
        ],
        general: [
            "Interesante pregunta. Basándome en mi base de datos de más de 50,000 casos, puedo decirte que tu situación es favorable. ¿Hay algo específico que te preocupe?",
            "Entiendo tu consulta. En mi experiencia ayudando a miles de latinos, ese es un tema común. La clave es mantener toda la documentación actualizada y seguir el proceso paso a paso.",
            "Excelente punto. Muchos profesionales tienen esa misma duda. La respuesta depende de varios factores. ¿Podrías darme más detalles sobre tu situación específica?"
        ],
        motivation: [
            "¡No te desanimes! El proceso migratorio es largo pero vale la pena. Miles de latinos lo logran cada año, ¡tú también puedes! 💪",
            "Recuerda: cada documento que completas te acerca más a tu meta. Tu perfil es sólido con un 75% de probabilidad de éxito. ¡Sigue adelante! 🌟",
            "El camino al sueño americano no es fácil, pero con perseverancia se logra. Estás más cerca que nunca. ¡Vamos por ese último 25%! 🚀"
        ]
    },

    supportContent: {
        faq: {
            title: 'Preguntas Frecuentes',
            items: [
                {
                    question: '¿Cuánto tiempo toma el proceso completo?',
                    answer: 'El proceso completo de inmigración puede tomar entre 6-24 meses dependiendo del tipo de visa. H-1B típicamente 6-8 meses, EB-2 puede tomar 12-18 meses, y EB-3 hasta 24 meses.'
                },
                {
                    question: '¿Necesito una oferta laboral?',
                    answer: 'Para la mayoría de visas de trabajo (H-1B, EB-2, EB-3) sí necesitas una oferta laboral. Sin embargo, EB-2 NIW y EB-1A no requieren oferta laboral si cumples ciertos criterios de excelencia.'
                },
                {
                    question: '¿Puedo cambiar de empleo con visa?',
                    answer: 'Sí, pero con restricciones. Con H-1B puedes cambiar de empleador pero el nuevo empleador debe patrocinar tu transferencia. Con Green Card el proceso es más flexible.'
                },
                {
                    question: '¿Mi familia puede acompañarme?',
                    answer: 'Sí, tu cónyuge e hijos menores de 21 años pueden obtener visas derivadas (H-4, L-2, etc.). En algunos casos, el cónyuge puede obtener permiso de trabajo.'
                },
                {
                    question: '¿Cuánto cuesta el proceso?',
                    answer: 'Los costos varían: H-1B aproximadamente $5,000-$7,000, EB-2/EB-3 $10,000-$15,000. Muchas empresas cubren estos gastos.'
                }
            ]
        },
        guides: {
            title: 'Guías Paso a Paso',
            items: [
                {
                    title: 'Guía Completa H-1B',
                    description: 'Todo lo que necesitas saber sobre la visa H-1B',
                    content: 'Proceso detallado desde la LCA hasta la aprobación final, incluyendo lottery, RFEs comunes, y estrategias de éxito.'
                },
                {
                    title: 'Proceso EB-2 NIW',
                    description: 'Cómo calificar sin oferta laboral',
                    content: 'Requisitos de National Interest Waiver, cómo demostrar mérito excepcional, y preparación de evidencia.'
                },
                {
                    title: 'De F-1 a H-1B',
                    description: 'Transición de estudiante a trabajador',
                    content: 'Timeline óptimo, uso de OPT/STEM OPT, Cap-Gap, y mantener estatus legal durante la transición.'
                }
            ]
        },
        forum: {
            title: 'Foro de la Comunidad',
            topics: [
                {
                    title: '¡Aprobaron mi I-140!',
                    author: 'Juan P.',
                    replies: 234,
                    lastActivity: 'Hace 2 horas',
                    preview: 'Después de 8 meses de espera, finalmente recibí la aprobación...'
                },
                {
                    title: 'RFE recibido, ¿qué hacer?',
                    author: 'Maria L.',
                    replies: 156,
                    lastActivity: 'Hace 5 horas',
                    preview: 'Recibí RFE pidiendo más evidencia de specialized knowledge...'
                },
                {
                    title: 'Timeline EB-2 México 2025',
                    author: 'Carlos R.',
                    replies: 89,
                    lastActivity: 'Hace 1 día',
                    preview: 'Compartamos nuestros timelines para EB-2. Yo apliqué en marzo...'
                }
            ]
        },
        lawyers: {
            title: 'Directorio de Abogados',
            firms: [
                {
                    name: 'García Immigration Law',
                    rating: 4.9,
                    reviews: 156,
                    specialties: ['H-1B', 'EB-2', 'EB-1'],
                    priceRange: '$$$',
                    avgTime: '6-8 meses',
                    location: 'San Francisco, CA',
                    description: 'Firma boutique especializada en profesionales de tecnología'
                },
                {
                    name: 'Smith & Associates',
                    rating: 4.5,
                    reviews: 203,
                    specialties: ['Family', 'Employment', 'Asylum'],
                    priceRange: '$$',
                    avgTime: '8-10 meses',
                    location: 'Los Angeles, CA',
                    description: 'Firma de servicio completo con 30 años de experiencia'
                }
            ]
        },
        contact: {
            title: 'Información de Contacto',
            content: `
                <div class="detail-content-block">
                    <h2>📧 Contacto Directo</h2>
                    <p><strong>Email:</strong> soporte@visapredictai.com</p>
                    <p><strong>WhatsApp:</strong> +1-800-VISA-AI</p>
                    <p><strong>Teléfono:</strong> 1-800-847-224</p>
                    <p><strong>Horario:</strong> Lun-Vie 9AM-6PM PST</p>
                    
                    <h3>Oficinas</h3>
                    <p><strong>San Francisco:</strong> 123 Market St, Suite 456</p>
                    <p><strong>Los Angeles:</strong> 789 Wilshire Blvd, Floor 10</p>
                    <p><strong>Miami:</strong> 321 Biscayne Blvd, Office 789</p>
                    
                    <h3>Redes Sociales</h3>
                    <p>Facebook: @VisaPredictAI</p>
                    <p>Twitter: @VisaPredictAI</p>
                    <p>LinkedIn: VisaPredictAI</p>
                </div>
            `
        }
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    init();
    setupEventListeners(); // <--- AÑADE ESTA LÍNEA
});

function init() {
    console.log('🚀 Iniciando VisaPredictAI v2.0...');
    
    // Cargar tema guardado
    loadTheme();
    
    updateTime();
    setInterval(updateTime, 60000);
    
    generateAlerts();
    generateCompanies();
    generateNews();
    updateGreeting();
    
    // Simular carga
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
            document.getElementById('loginScreen').classList.add('active');
        }, 500);
    }, 2000);
}

function loadTheme() {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        darkMode = true;
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

// Navegación mejorada con historial
function showScreen(screenId, addToHistory = true) {
    console.log('🔄 Navegando a:', screenId);
    
    // Guardar en historial si no es navegación hacia atrás
    if (addToHistory && currentScreen !== screenId) {
        screenHistory.push(currentScreen);
    }

    // Ocultar todas las pantallas
    document.querySelectorAll('.app-screen').forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
    });

    // Mostrar pantalla seleccionada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.style.display = 'flex';
        setTimeout(() => {
            targetScreen.classList.add('active');
        }, 10);
        currentScreen = screenId;

        // Actualizar navegación si es una pantalla principal
        const mainScreens = ['homeScreen', 'profileScreen', 'predictionScreen', 'employmentScreen', 'supportScreen'];
        if (mainScreens.includes(screenId)) {
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            const navItem = document.querySelector(`.nav-item[data-screen="${screenId}"]`);
            if (navItem) navItem.classList.add('active');
        }

        // Ocultar o mostrar la navegación inferior dependiendo de la pantalla
        const bottomNav = document.querySelector('.bottom-nav');
        if (bottomNav) {
            if (screenId === 'chatbotScreen') {
                bottomNav.style.display = 'none';
            } else {
                bottomNav.style.display = 'flex';
            }
        }
    }
}

function goBack() {
    if (screenHistory.length > 0) {
        const previousScreen = screenHistory.pop();
        showScreen(previousScreen, false);
    } else {
        // Si no hay historial, ir a home
        showScreen('homeScreen', false);
    }
}

function showDetail(title, content) {
    document.getElementById('detailTitle').textContent = title;
    document.getElementById('detailContent').innerHTML = content;
    showScreen('detailScreen');
}

// Generar contenido dinámico
function generateAlerts() {
    const container = document.getElementById('alertsList');
    if (!container) return;

    container.innerHTML = appData.alerts.map(alert => `
        <div class="alert-item ${alert.type}" onclick="showAlertDetail('${alert.type}')">
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

    container.innerHTML = appData.companies.map(company => `
        <div class="company-card" data-category="${company.category}" onclick="showCompanyDetail('${company.id}')">
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
        </div>
    `).join('');
}

function generateNews() {
    const container = document.getElementById('newsFeed');
    if (!container) return;

    container.innerHTML = appData.news.map(news => `
        <div class="news-item ${news.featured ? 'featured' : ''}" onclick="showNewsDetail('${news.id}')">
            <div class="news-image">
                ${news.featured ? '<span class="news-badge">IMPORTANTE</span>' : ''}
                <img src="${news.image}" alt="${news.title}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'news-badge\\'>IMPORTANTE</span><div class=\\'news-image-fallback\\'>📰</div>';">
            </div>
            <div class="news-content">
                <h3>${news.title}</h3>
                <p>${news.summary}</p>
                <div class="news-meta">
                    <span>📅 ${news.date}</span>
                    <span>📰 ${news.source}</span>
                    <span class="news-link">Leer más →</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Funciones de detalle
function showAlertDetail(type) {
    const alert = appData.alerts.find(a => a.type === type);
    if (alert) {
        const content = `
            <div class="detail-content-block">
                <h2>${alert.icon} ${alert.title}</h2>
                <p>${alert.message}</p>
                <p style="color: var(--text-muted); margin-top: 20px;">${alert.time}</p>
                
                <h3 style="margin-top: 30px;">Acciones Recomendadas:</h3>
                <ul>
                    <li>Revisar el estado actual de tu caso</li>
                    <li>Verificar documentos pendientes</li>
                    <li>Contactar a tu abogado si es necesario</li>
                </ul>
            </div>
        `;
        showDetail(alert.title, content);
    }
}

function showCompanyDetail(companyId) {
    const company = appData.companies.find(c => c.id === companyId);
    if (company) {
        const content = `
            <div class="detail-content-block">
                <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                    <div class="company-logo" style="width: 80px; height: 80px; font-size: 36px;">${company.logo}</div>
                    <div>
                        <h2>${company.name}</h2>
                        <div>${'⭐'.repeat(Math.round(company.rating))} ${company.rating} (${company.reviews} reseñas)</div>
                    </div>
                </div>
                
                <p>${company.fullDescription}</p>
                
                <h3>Beneficios del Programa de Visa</h3>
                <ul>
                    ${company.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
                
                <h3>Tipos de Visa Patrocinados</h3>
                <div style="display: flex; gap: 8px; margin-top: 12px;">
                    ${company.visaTypes.map(visa => `<span class="visa-tag">${visa}</span>`).join('')}
                </div>
                
                <h3>Timeline Típico</h3>
                <p>${company.timeline}</p>
                
                <div style="margin-top: 30px; padding: 16px; background: var(--bg-tertiary); border-radius: 12px;">
                    <strong>Tasa de Éxito:</strong> ${company.sponsorshipRate}<br>
                    <strong>Tiempo Promedio:</strong> ${company.avgProcessTime}
                </div>
            </div>
        `;
        showDetail(company.name, content);
    }
}

function showNewsDetail(newsId) {
    const news = appData.news.find(n => n.id === newsId);
    if (news) {
        const content = `
            <div class="news-article">
                <h1>${news.title}</h1>
                <div class="article-meta" style="display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid var(--border-color);">
                    <span>📅 ${news.date}</span>
                    <span>📰 ${news.source}</span>
                </div>
                ${news.content}
            </div>
        `;
        showDetail('Noticias', content);
    }
}

function showProfileSection(section) {
    const sections = {
        personal: {
            title: 'Editar Datos Personales',
            content: `
                <div class="detail-section">
                    <h3>Editar Información Personal</h3>
                    <div class="detail-grid" style="display:flex; flex-direction:column; gap:16px;">
                        <label class="form-field" style="display:flex; flex-direction:column; gap:4px;">
                            <span>Nombre Completo</span>
                            <input type="text" id="editFullName" value="${appData.user.name}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px;">
                        </label>
                        <label class="form-field" style="display:flex; flex-direction:column; gap:4px;">
                            <span>Profesión</span>
                            <input type="text" id="editProfession" value="${appData.user.profession}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px;">
                        </label>
                        <label class="form-field" style="display:flex; flex-direction:column; gap:4px;">
                            <span>País</span>
                            <input type="text" id="editCountry" value="${appData.user.country}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px;">
                        </label>
                        <label class="form-field" style="display:flex; flex-direction:column; gap:4px;">
                            <span>Ubicación Actual</span>
                            <input type="text" id="editLocation" value="${appData.user.currentLocation}" style="padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 14px;">
                        </label>
                    </div>
                    <button id="savePersonalBtn" class="btn-primary-large" style="margin-top:24px;">💾 Guardar Cambios</button>
                </div>
            `
        },
        academic: {
            title: 'Formación Académica',
            content: `
                <div class="detail-section">
                    <h3>Educación</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <h4>Maestría en Inteligencia Artificial</h4>
                            <p>Stanford University (2020-2022)</p>
                            <p>GPA: 3.9/4.0</p>
                        </div>
                        <div class="detail-item">
                            <h4>Licenciatura en Ingeniería de Software</h4>
                            <p>ITAM, México (2014-2018)</p>
                            <p>Summa Cum Laude</p>
                        </div>
                    </div>
                </div>
            `
        },
        experience: {
            title: 'Experiencia Laboral',
            content: `
                <div class="detail-section">
                    <h3>Experiencia Profesional</h3>
                    <div class="detail-grid">
                        <div class="detail-item">
                            <h4>Senior Software Engineer</h4>
                            <p><strong>Tech Corp</strong> | 2022 - Presente</p>
                            <p>• Lideré equipo de 8 desarrolladores</p>
                            <p>• Implementé arquitectura microservicios</p>
                        </div>
                    </div>
                </div>
            `
        },
        documents: {
            title: 'Mis Documentos',
            content: `
                <div class="detail-section">
                    <h3>Documentos Subidos</h3>
                    <div class="detail-grid">
                        <div class="detail-item" style="background: #F0FDF4;">
                            <h4>✅ Pasaporte</h4>
                            <p>Válido hasta 2032</p>
                        </div>
                        <div class="detail-item" style="background: #F0FDF4;">
                            <h4>✅ Título Universitario</h4>
                            <p>Ingeniería de Software - ITAM</p>
                        </div>
                        <div class="detail-item" style="background: #FEFCE8;">
                            <h4>⚠️ Carta de Empleo</h4>
                            <p>Tech Corp - Pendiente actualización</p>
                        </div>
                        <div class="detail-item" style="background: #FEE2E2;">
                            <h4>❌ Estados de Cuenta</h4>
                            <p>Últimos 3 meses - Pendiente</p>
                        </div>
                    </div>
                </div>
                <!-- Botón e input para carga de documentos simulada -->
                <button id="uploadDocBtn" class="btn-primary-large" style="margin-top: 20px;">
                    ➕ Subir Nuevo Documento
                </button>
                <input type="file" id="fileUploadInput" style="display: none;" />
                <p id="fileUploadMessage" style="margin-top: 10px; font-size: 14px; color: var(--text-secondary);"></p>
            `
        }
    };

    const sectionData = sections[section];
    if (sectionData) {
        showDetail(sectionData.title, sectionData.content);
    }
}

function showSupportSection(type) {
    const content = appData.supportContent[type];
    if (content) {
        let html = '';
        
        switch(type) {
            case 'faq':
                html = `
                    <div class="detail-section">
                        <h3>${content.title}</h3>
                        ${content.items.map(item => `
                            <div class="detail-item" style="margin-bottom: 16px;">
                                <h4 style="color: var(--navy-medium);">❓ ${item.question}</h4>
                                <p style="margin-top: 8px;">${item.answer}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'guides':
                html = `
                    <div class="detail-section">
                        <h3>${content.title}</h3>
                        ${content.items.map(item => `
                            <div class="detail-item" style="margin-bottom: 16px;">
                                <h4>📖 ${item.title}</h4>
                                <p style="color: var(--text-secondary); margin: 8px 0;">${item.description}</p>
                                <p style="font-size: 13px;">${item.content}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'forum':
                html = `
                    <div class="detail-section">
                        <h3>${content.title}</h3>
                        ${content.topics.map(topic => `
                            <div class="detail-item" style="margin-bottom: 16px;">
                                <h4>${topic.title}</h4>
                                <p style="color: var(--text-secondary); font-size: 13px;">Por ${topic.author} • ${topic.replies} respuestas • ${topic.lastActivity}</p>
                                <p style="margin-top: 8px;">${topic.preview}</p>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'lawyers':
                html = `
                    <div class="detail-section">
                        <h3>${content.title}</h3>
                        ${content.firms.map(firm => `
                            <div class="detail-item" style="margin-bottom: 16px;">
                                <h4>${firm.name}</h4>
                                <div>${'⭐'.repeat(Math.round(firm.rating))} ${firm.rating} (${firm.reviews} reseñas)</div>
                                <p style="margin: 8px 0;">${firm.description}</p>
                                <p style="font-size: 13px;">
                                    📍 ${firm.location} • 
                                    💰 ${firm.priceRange} • 
                                    ⏱️ ${firm.avgTime}
                                </p>
                            </div>
                        `).join('')}
                    </div>
                `;
                break;
                
            case 'contact':
                html = content.content;
                break;
        }
        
        showDetail(content.title, html);
    }
}

// ChatBot VisaBot
function initChatbot() {
    showScreen('chatbotScreen');
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messagesContainer = document.getElementById('chatMessages');
    
    if (!input.value.trim()) return;
    
    const userMessage = input.value;
    
    // Agregar mensaje del usuario
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'chat-message user';
    userMsgDiv.innerHTML = `
        <div class="message-avatar">👤</div>
        <div class="message-content">
            <p>${userMessage}</p>
        </div>
    `;
    messagesContainer.appendChild(userMsgDiv);
    
    // Limpiar input
    input.value = '';
    
    // Simular typing
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        
        const botMsgDiv = document.createElement('div');
        botMsgDiv.className = 'chat-message bot';
        botMsgDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <p>${botResponse}</p>
            </div>
        `;
        messagesContainer.appendChild(botMsgDiv);
        
        // Scroll al final
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1000);
    
    // Scroll al final
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Detectar temas en el mensaje
    // Saludo específico "hola visa" para una respuesta personalizada
    if (lowerMessage.includes('hola visa')) {
        return '¡Hola! 👋 Soy VisaBot, tu asistente IA. ¿En qué puedo ayudarte?';
    } else if (lowerMessage.includes('hola') || lowerMessage.includes('hi') || lowerMessage.includes('buenos')) {
        return getRandomResponse(appData.chatbotResponses.greeting);
    } else if (lowerMessage.includes('visa') || lowerMessage.includes('h1b') || lowerMessage.includes('eb2') || lowerMessage.includes('green card')) {
        return getRandomResponse(appData.chatbotResponses.visa);
    } else if (lowerMessage.includes('documento') || lowerMessage.includes('papel') || lowerMessage.includes('requisito')) {
        return getRandomResponse(appData.chatbotResponses.documents);
    } else if (lowerMessage.includes('tiempo') || lowerMessage.includes('cuanto') || lowerMessage.includes('demora')) {
        return getRandomResponse(appData.chatbotResponses.timeline);
    } else if (lowerMessage.includes('costo') || lowerMessage.includes('precio') || lowerMessage.includes('dinero') || lowerMessage.includes('pagar')) {
        return getRandomResponse(appData.chatbotResponses.cost);
    } else if (lowerMessage.includes('entrevista') || lowerMessage.includes('consul') || lowerMessage.includes('embajada')) {
        return getRandomResponse(appData.chatbotResponses.interview);
    } else if (lowerMessage.includes('ayuda') || lowerMessage.includes('triste') || lowerMessage.includes('cansado') || lowerMessage.includes('dificil')) {
        return getRandomResponse(appData.chatbotResponses.motivation);
    } else {
        return getRandomResponse(appData.chatbotResponses.general);
    }
}

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

/**
 * Actualiza la interfaz de usuario con los datos del usuario almacenados en appData.user.
 * Se invoca tras guardar cambios en los datos personales.
 */
function updateUserUI() {
    // Actualizar nombre en tarjeta resumen de inicio
    const profileNameEl = document.querySelector('#profileSummaryCard .profile-info h3');
    if (profileNameEl) {
        profileNameEl.textContent = appData.user.name;
    }
    // Actualizar nombre y profesión en la vista de perfil
    const heroNameEl = document.querySelector('#profileScreen .profile-hero h2');
    const heroProfessionEl = document.querySelector('#profileScreen .profile-hero p');
    if (heroNameEl) heroNameEl.textContent = appData.user.name;
    if (heroProfessionEl) heroProfessionEl.textContent = appData.user.profession;
    // Actualizar etiquetas de país y ubicación en badges
    const badges = document.querySelectorAll('#profileScreen .profile-badges .badge');
    if (badges && badges.length >= 2) {
        // Primer badge: país
        badges[0].textContent = `🇲🇽 ${appData.user.country}`;
        // Segundo badge: ubicación actual
        badges[1].textContent = `📍 ${appData.user.currentLocation}`;
    }
    // Actualizar saludo en Home
    const greetingEl = document.getElementById('greetingText');
    if (greetingEl) {
        // Extraer solo el primer nombre para un saludo amigable
        const firstName = appData.user.name.split(' ')[0];
        greetingEl.textContent = `Buenos días, ${firstName}`;
    }
}

/**
 * Guarda los datos ingresados en el formulario de edición de datos personales.
 * Actualiza el objeto appData.user y refresca la interfaz.
 */
function savePersonalData() {
    const nameInput = document.getElementById('editFullName');
    const professionInput = document.getElementById('editProfession');
    const countryInput = document.getElementById('editCountry');
    const locationInput = document.getElementById('editLocation');
    if (nameInput) appData.user.name = nameInput.value.trim() || appData.user.name;
    if (professionInput) appData.user.profession = professionInput.value.trim() || appData.user.profession;
    if (countryInput) appData.user.country = countryInput.value.trim() || appData.user.country;
    if (locationInput) appData.user.currentLocation = locationInput.value.trim() || appData.user.currentLocation;
    // Refrescar UI
    updateUserUI();
    // Regresar a la pantalla previa
    goBack();
    // Mensaje breve de confirmación
    setTimeout(() => {
        alert('Datos personales actualizados exitosamente');
    }, 100);
}

// Mostrar modal informativo después de una predicción
function showPredictionModal() {
    const modal = document.getElementById('aiModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Manejar carga simulada de documentos
function handleUploadDoc() {
    const fileInput = document.getElementById('fileUploadInput');
    const messageEl = document.getElementById('fileUploadMessage');
    if (!fileInput) return;
    // Reset mensaje
    if (messageEl) messageEl.textContent = '';
    // Abrir selector de archivos
    fileInput.click();
    // Cuando el usuario selecciona un archivo, mostrar mensaje de éxito
    fileInput.onchange = function() {
        if (fileInput.files && fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            if (messageEl) {
                messageEl.textContent = `✅ Documento cargado: ${fileName}`;
                messageEl.style.color = '#10B981';
            }
        }
    };
}

// Predicción
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
        btn.innerHTML = '⏳ Analizando tu perfil...';
    }

    let current = 0;
    const target = Math.floor(Math.random() * 20) + 75;
    const circumference = 565;

    const interval = setInterval(() => {
        current += 2;
        if (current >= target) {
            current = target;
            clearInterval(interval);
            
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
                btn.innerHTML = '🎯 Ejecutar Nueva Predicción';
            }

            predictionRunning = false;
            updatePredictionHistory(target);
            // Mostrar modal informativo al completar predicción
            showPredictionModal();
        }

        if (percentEl) percentEl.textContent = current;
        if (arc) {
            const offset = circumference - (current / 100) * circumference;
            arc.style.strokeDashoffset = offset;
        }
    }, 30);
}

function updatePredictionHistory(score) {
    const container = document.getElementById('predictionTimeline');
    if (!container) return;

    const trend = score > 80 ? 'positive' : score > 60 ? 'neutral' : 'negative';
    const trendIcon = trend === 'positive' ? '📈' : trend === 'negative' ? '📉' : '➡️';
    const change = `+${Math.floor(Math.random() * 5)}%`;
    
    const newItem = document.createElement('div');
    newItem.className = 'timeline-item';
    newItem.innerHTML = `
        <div class="timeline-date">Ahora</div>
        <div class="timeline-content">
            <div class="timeline-score ${trend}">${score}%</div>
            <div class="timeline-trend">
                <span>${trendIcon}</span>
                <span>${change}</span>
            </div>
        </div>
    `;
    
    container.insertBefore(newItem, container.firstChild);
}

// Event Listeners
function setupEventListeners() {
    // Login
    document.getElementById('loginButton')?.addEventListener('click', performLogin);
    document.getElementById('faceIdButton')?.addEventListener('click', () => {
        document.getElementById('faceIdButton').innerHTML = '✓';
        setTimeout(performLogin, 500);
    });
    document.getElementById('googleLogin')?.addEventListener('click', performLogin);
    document.getElementById('appleLogin')?.addEventListener('click', performLogin);

    // Navegación
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const screen = this.dataset.screen;
            if (screen) {
                screenHistory = []; // Reset history when using nav
                showScreen(screen);
            }
        });
    });

    // Botones de volver (ARREGLADO)
    // Todos los botones con clase back-btn deben regresar a la pantalla anterior
    // Utilizamos querySelectorAll para asegurarnos de que se conecten correctamente
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', goBack);
    });

    // Algunos botones de chat pueden necesitar listeners explícitos si están reestructurados
    document.getElementById('chatBackButton')?.addEventListener('click', goBack);

    // Quick Actions
    document.querySelectorAll('.quick-action').forEach(action => {
        action.addEventListener('click', function() {
            const actionType = this.dataset.action;
            switch(actionType) {
                case 'prediction':
                    showScreen('predictionScreen');
                    break;
                case 'documents':
                    showProfileSection('documents');
                    break;
                case 'news':
                    showScreen('newsScreen');
                    break;
                case 'checklist':
                    showDetail('Checklist de Requisitos', generateChecklistContent());
                    break;
            }
        });
    });

    // Profile Card
    document.getElementById('profileSummaryCard')?.addEventListener('click', () => {
        showScreen('profileScreen');
    });

    // Profile Sections
    document.querySelectorAll('.profile-section-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.dataset.section;
            showProfileSection(section);
        });
    });

    // Profile Actions
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.dataset.action;
            if (action === 'cv') {
                showDetail('Curriculum Vitae', generateCVContent());
            } else if (action === 'export') {
                showDetail('Exportar Perfil', generateExportContent());
            } else if (action === 'improvements') {
                showDetail('Recomendaciones de Mejora', generateImprovementsContent());
            }
        });
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

    // News Categories
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.addEventListener('click', function() {
            document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            filterNews(this.dataset.category);
        });
    });

    // Support Tiles
    document.querySelectorAll('.support-tile').forEach(tile => {
        tile.addEventListener('click', function() {
            const supportType = this.dataset.support;
            if (supportType === 'chatbot') {
                initChatbot();
            } else {
                showSupportSection(supportType);
            }
        });
    });

    // Settings
    document.getElementById('settingsButton')?.addEventListener('click', () => {
        showScreen('settingsScreen');
    });

    // Dark Mode Toggle (IMPLEMENTADO)
    document.getElementById('darkModeToggle')?.addEventListener('change', function() {
        darkMode = this.checked;
        if (darkMode) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'false');
        }
    });

    // ChatBot
    document.getElementById('chatSendBtn')?.addEventListener('click', sendChatMessage);
    document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });

    // Botón flotante de regreso en chat
    document.getElementById('chatFloatingBackBtn')?.addEventListener('click', goBack);

    // Modal de predicción IA: cerrar
    document.getElementById('closeModalBtn')?.addEventListener('click', () => {
        const modal = document.getElementById('aiModal');
        if (modal) modal.classList.remove('show');
    });

    // Manejar clic en botón de subir documentos (delegación por si el elemento se crea dinámicamente)
    document.body.addEventListener('click', function(e) {
        const target = e.target;
        if (target && target.id === 'uploadDocBtn') {
            handleUploadDoc();
        }
    });

    // Guardar cambios de datos personales (delegación)
    // Escuchamos cualquier clic en el contenedor de detalle y ejecutamos la función si el botón de guardar está presente.
    document.getElementById('detailContent')?.addEventListener('click', function(e) {
        const target = e.target;
        if (target && target.id === 'savePersonalBtn') {
            savePersonalData();
        }
    });
}

// Funciones auxiliares
function performLogin() {
    const loginScreen = document.getElementById('loginScreen');
    if (loginScreen) {
        loginScreen.style.opacity = '0';
        setTimeout(() => {
            loginScreen.classList.remove('active');
            loginScreen.style.display = 'none';
            showScreen('homeScreen');
        }, 300);
    }
}

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

function filterNews(category) {
    const items = document.querySelectorAll('.news-item');
    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'block';
        } else {
            // Simulación de filtrado
            item.style.display = Math.random() > 0.3 ? 'block' : 'none';
        }
    });
}

// Generadores de contenido
function generateCVContent() {
    return `
        <div class="detail-content-block">
            <h2 style="text-align: center;">Saul Gonzalez Martinez</h2>
            <p style="text-align: center; color: var(--text-secondary);">
                Ingeniero de Software Senior<br>
                📧 saul.gonzalez@email.com | 📱 +1 (555) 123-4567<br>
                📍 San Francisco, CA | 🌐 linkedin.com/in/saulgonzalez
            </p>
            
            <h3>Resumen Profesional</h3>
            <p>Ingeniero de software con 5+ años de experiencia en desarrollo de aplicaciones escalables, 
            especializado en IA/ML y arquitectura cloud.</p>
            
            <h3>Experiencia Laboral</h3>
            <div style="margin-bottom: 20px;">
                <h4>Senior Software Engineer - Tech Corp</h4>
                <p style="color: var(--text-muted);">2022 - Presente | San Francisco, CA</p>
                <ul>
                    <li>Lideré equipo de 8 desarrolladores</li>
                    <li>Implementé arquitectura microservicios</li>
                    <li>Desarrollé sistema ML con mejora del 25%</li>
                </ul>
            </div>
        </div>
    `;
}

function generateExportContent() {
    return `
        <div class="detail-content-block">
            <h2>Exportar Perfil</h2>
            <p>Selecciona el formato en el que deseas exportar tu información:</p>
            
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
                <button class="btn-primary-large">📄 Exportar como PDF</button>
                <button class="btn-secondary" style="width: 100%; padding: 16px;">📊 Exportar como Excel</button>
                <button class="btn-secondary" style="width: 100%; padding: 16px;">📋 Exportar como JSON</button>
            </div>
        </div>
    `;
}

function generateImprovementsContent() {
    return `
        <div class="detail-content-block">
            <h2>📈 Recomendaciones para Mejorar tu Perfil</h2>
            
            <div style="padding: 16px; background: #F0FDF4; border-radius: 12px; margin-bottom: 20px;">
                <h3 style="color: var(--success);">Potencial de mejora: +20%</h3>
                <p>Siguiendo estas recomendaciones podrías alcanzar un 95% de probabilidad de éxito.</p>
            </div>
            
            <div class="detail-item" style="margin-bottom: 16px;">
                <h4>✅ Completar certificación AWS (+5%)</h4>
                <p>La certificación AWS Solutions Architect es altamente valorada.</p>
            </div>
            
            <div class="detail-item" style="margin-bottom: 16px;">
                <h4>✅ Agregar carta de recomendación de CEO (+3%)</h4>
                <p>Una carta del CEO fortalecería tu aplicación.</p>
            </div>
        </div>
    `;
}

function generateChecklistContent() {
    return `
        <div class="detail-content-block">
            <h2>✅ Checklist de Requisitos</h2>
            
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>Progreso Total</span>
                    <span style="font-weight: bold;">12 de 20 completados</span>
                </div>
                <div style="height: 8px; background: var(--border-color); border-radius: 4px; overflow: hidden;">
                    <div style="width: 60%; height: 100%; background: linear-gradient(90deg, var(--navy-medium), var(--blue-primary));"></div>
                </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F0FDF4; border-radius: 8px;">
                    <input type="checkbox" checked style="width: 20px; height: 20px;">
                    <span>Pasaporte vigente</span>
                </label>
                <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: #F0FDF4; border-radius: 8px;">
                    <input type="checkbox" checked style="width: 20px; height: 20px;">
                    <span>Fotografías formato visa</span>
                </label>
                <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-tertiary); border-radius: 8px;">
                    <input type="checkbox" style="width: 20px; height: 20px;">
                    <span>Cartas de recomendación</span>
                </label>
            </div>
        </div>
    `;
}

// Hacer funciones globales para onclick en HTML
window.showAlertDetail = showAlertDetail;
window.showCompanyDetail = showCompanyDetail;
window.showNewsDetail = showNewsDetail;