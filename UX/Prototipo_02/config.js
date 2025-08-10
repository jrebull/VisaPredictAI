// ===== VISA PREDICT AI - ARCHIVO DE CONFIGURACIÓN =====
// Modifica este archivo para personalizar el prototipo con tus propios datos

const CONFIG = {
    // ===== INFORMACIÓN DEL USUARIO =====
    user: {
        firstName: 'Saul',
        lastName: 'Gonzalez',
        fullName: 'Saul Gonzalez Martinez',
        email: 'saul.gonzalez@email.com',
        phone: '+1 (555) 123-4567',
        profession: 'Ingeniero de Software Senior',
        country: 'México',
        currentLocation: 'California, USA',
        visaType: 'EB-2',
        profileCompletion: 75,
        predictionScore: 85,
        birthDate: '15 de Marzo, 1990',
        passport: 'G12345678',
        passportExpiry: '2032',
        yearsExperience: 5,
        currentEmployer: 'Tech Corp',
        avatar: 'SG' // Iniciales para el avatar
    },

    // ===== CONFIGURACIÓN DE LA APP =====
    app: {
        name: 'VisaPredictAI',
        tagline: 'Tu camino al sueño americano',
        version: '2.0',
        language: 'es', // es | en | pt
        theme: 'light', // light | dark
        animationSpeed: 300, // milisegundos
        loadingTime: 2000, // tiempo de pantalla de carga en ms
    },

    // ===== COLORES PERSONALIZADOS =====
    colors: {
        primary: '#1B3A61',
        secondary: '#3B82F6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6'
    },

    // ===== EDUCACIÓN =====
    education: [
        {
            degree: 'Maestría en Inteligencia Artificial',
            institution: 'Stanford University',
            period: '2020-2022',
            gpa: '3.9/4.0',
            honors: 'Cum Laude'
        },
        {
            degree: 'Licenciatura en Ingeniería de Software',
            institution: 'ITAM, México',
            period: '2014-2018',
            gpa: '9.5/10',
            honors: 'Summa Cum Laude'
        }
    ],

    // ===== EXPERIENCIA LABORAL =====
    experience: [
        {
            position: 'Senior Software Engineer',
            company: 'Tech Corp',
            period: '2022 - Presente',
            location: 'San Francisco, CA',
            achievements: [
                'Lideré equipo de 8 desarrolladores en proyecto de $2M',
                'Implementé arquitectura microservicios reduciendo costos 35%',
                'Desarrollé sistema ML que mejoró conversión 25%'
            ]
        },
        {
            position: 'Software Developer',
            company: 'StartupXYZ',
            period: '2020 - 2022',
            location: 'Ciudad de México',
            achievements: [
                'Desarrollé aplicación móvil con 100K+ usuarios',
                'Optimicé performance del backend en 50%',
                'Implementé CI/CD pipeline'
            ]
        },
        {
            position: 'Junior Developer',
            company: 'Digital Agency',
            period: '2018 - 2020',
            location: 'Ciudad de México',
            achievements: [
                'Participé en 15+ proyectos web',
                'Especialización en React y Node.js',
                'Mentoría a 3 desarrolladores junior'
            ]
        }
    ],

    // ===== CERTIFICACIONES =====
    certifications: [
        {
            name: 'AWS Solutions Architect Professional',
            issuer: 'Amazon Web Services',
            date: 'Enero 2023',
            credentialId: 'AWS-PSA-2023-001'
        },
        {
            name: 'Google Cloud Professional Data Engineer',
            issuer: 'Google Cloud',
            date: 'Junio 2022',
            credentialId: 'GCP-PDE-2022-123'
        },
        {
            name: 'Certified Kubernetes Administrator',
            issuer: 'CNCF',
            date: 'Marzo 2022',
            credentialId: 'CKA-2022-456'
        }
    ],

    // ===== HABILIDADES =====
    skills: {
        languages: ['Python', 'JavaScript', 'Java', 'Go', 'Swift'],
        frameworks: ['React', 'Node.js', 'Django', 'TensorFlow', 'PyTorch'],
        cloud: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker'],
        databases: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch'],
        tools: ['Git', 'Jenkins', 'Terraform', 'Ansible', 'Grafana'],
        spoken: [
            { language: 'Español', level: 'Nativo' },
            { language: 'Inglés', level: 'Fluido (TOEFL 118/120)' },
            { language: 'Francés', level: 'Intermedio' }
        ]
    },

    // ===== DOCUMENTOS =====
    documents: [
        {
            name: 'Pasaporte',
            status: 'uploaded', // uploaded | pending | missing
            description: 'Válido hasta 2032',
            uploadDate: '15/06/2024',
            icon: '📄'
        },
        {
            name: 'Título Universitario',
            status: 'uploaded',
            description: 'Ingeniería de Software - ITAM',
            uploadDate: '20/06/2024',
            icon: '🎓'
        },
        {
            name: 'Título de Maestría',
            status: 'uploaded',
            description: 'IA - Stanford University',
            uploadDate: '22/06/2024',
            icon: '🎓'
        },
        {
            name: 'Carta de Empleo',
            status: 'pending',
            description: 'Tech Corp - Pendiente actualización',
            note: 'Requiere firma del CEO',
            icon: '💼'
        },
        {
            name: 'Estados de Cuenta',
            status: 'missing',
            description: 'Últimos 3 meses',
            note: 'Pendiente de subir',
            icon: '💰'
        },
        {
            name: 'Certificación TOEFL',
            status: 'uploaded',
            description: 'Puntaje: 118/120',
            uploadDate: '10/07/2024',
            icon: '📋'
        }
    ],

    // ===== CHECKLIST DE REQUISITOS =====
    checklist: [
        { item: 'Pasaporte vigente (mínimo 6 meses)', completed: true },
        { item: 'Fotografías formato visa (2)', completed: true },
        { item: 'Título universitario apostillado', completed: true },
        { item: 'Certificados de empleo anteriores', completed: true },
        { item: 'Cartas de recomendación (3)', completed: false },
        { item: 'Evidencia de logros profesionales', completed: false },
        { item: 'Publicaciones o patentes', completed: false },
        { item: 'Certificación de inglés (TOEFL/IELTS)', completed: true },
        { item: 'Estados financieros', completed: false },
        { item: 'Certificados de nacimiento', completed: true },
        { item: 'Antecedentes penales', completed: true },
        { item: 'Examen médico', completed: false },
        { item: 'Formulario DS-160', completed: true },
        { item: 'Pago de tarifas consulares', completed: true },
        { item: 'Carta de no impedimento', completed: false },
        { item: 'Evidencia de vínculos con México', completed: true },
        { item: 'Plan de negocios (si aplica)', completed: false },
        { item: 'Currículum actualizado', completed: true },
        { item: 'Formulario I-140', completed: false },
        { item: 'Labor Certification', completed: false }
    ],

    // ===== PROCESO DE VISA - PASOS =====
    visaProcess: [
        {
            step: 1,
            name: 'Documentos',
            status: 'completed', // completed | active | pending
            description: 'Recopilación y verificación de documentos'
        },
        {
            step: 2,
            name: 'Revisión',
            status: 'completed',
            description: 'Revisión inicial por el equipo legal'
        },
        {
            step: 3,
            name: 'Oficial',
            status: 'active',
            description: 'En revisión por oficial de USCIS'
        },
        {
            step: 4,
            name: 'Entrevista',
            status: 'pending',
            description: 'Programación de entrevista consular'
        },
        {
            step: 5,
            name: 'Decisión',
            status: 'pending',
            description: 'Decisión final y emisión de visa'
        }
    ],

    // ===== HISTORIAL DE PREDICCIONES =====
    predictionHistory: [
        { date: '2025-01-15', score: 85, trend: 'up', change: '+5%' },
        { date: '2024-12-01', score: 80, trend: 'up', change: '+8%' },
        { date: '2024-10-15', score: 72, trend: 'up', change: '+12%' },
        { date: '2024-08-20', score: 60, trend: 'down', change: '-5%' },
        { date: '2024-06-10', score: 65, trend: 'stable', change: '0%' }
    ],

    // ===== FACTORES DE PREDICCIÓN =====
    predictionFactors: {
        positive: [
            'Perfil académico sólido (Stanford)',
            'Experiencia relevante en tecnología',
            'Empresa Fortune 500 como empleador',
            'Sin rechazos previos de visa',
            'Inglés fluido certificado'
        ],
        warning: [
            'Mejorar certificaciones técnicas',
            'Documentar más publicaciones',
            'Ampliar red profesional en USA'
        ],
        negative: [
            'Falta carta de recomendación del CEO',
            'Sin patentes registradas'
        ]
    },

    // ===== RECOMENDACIONES DE MEJORA =====
    improvements: [
        {
            title: 'Completar certificación AWS DevOps',
            impact: '+5%',
            description: 'Esta certificación es altamente valorada en el mercado actual',
            priority: 'high'
        },
        {
            title: 'Obtener carta de recomendación del CEO',
            impact: '+3%',
            description: 'Una carta del CEO fortalecería significativamente tu aplicación',
            priority: 'high'
        },
        {
            title: 'Documentar publicaciones técnicas',
            impact: '+4%',
            description: 'Incluir artículos técnicos o contribuciones open source',
            priority: 'medium'
        },
        {
            title: 'Registrar patente de software',
            impact: '+7%',
            description: 'Una patente demuestra innovación y expertise único',
            priority: 'medium'
        },
        {
            title: 'Completar curso de liderazgo',
            impact: '+2%',
            description: 'Certificación en liderazgo de equipos internacionales',
            priority: 'low'
        }
    ],

    // ===== FRASES MOTIVACIONALES =====
    motivationalQuotes: [
        "Tu proceso está en marcha 🚀",
        "Cada paso cuenta hacia tu meta 🎯",
        "El éxito requiere persistencia 💪",
        "Tu futuro en USA te espera 🗽",
        "Confía en el proceso ⭐",
        "La preparación es clave 🔑",
        "Mantén el enfoque en tu objetivo 🎯",
        "Tu dedicación dará frutos 🌱",
        "Un documento a la vez 📄",
        "El sueño americano es posible 🇺🇸",
        "Paso a paso hacia el éxito 👣",
        "Tu visa está más cerca cada día 📅",
        "La paciencia es tu mejor aliada ⏳",
        "Visualiza tu éxito 🌟",
        "Todo esfuerzo vale la pena 💎"
    ],

    // ===== MENSAJES DE ESTADO =====
    statusMessages: {
        processing: 'Analizando tu perfil...',
        success: '¡Análisis completado con éxito!',
        error: 'Hubo un error. Intenta nuevamente.',
        loading: 'Cargando información...',
        saving: 'Guardando cambios...',
        updating: 'Actualizando datos...'
    },

    // ===== CONFIGURACIÓN DE NOTIFICACIONES =====
    notifications: {
        enabled: true,
        types: {
            alerts: true,
            news: true,
            reminders: true,
            updates: true
        },
        frequency: 'daily', // realtime | daily | weekly
        email: true,
        push: false
    },

    // ===== PREFERENCIAS DE EXPORTACIÓN =====
    exportSettings: {
        formats: ['PDF', 'Excel', 'JSON', 'CSV'],
        includePhotos: true,
        includeDocuments: true,
        includeHistory: true,
        language: 'es'
    }
};

// Hacer la configuración disponible globalmente
window.APP_CONFIG = CONFIG;

// Función helper para obtener configuración
function getConfig(path) {
    const keys = path.split('.');
    let value = CONFIG;
    for (const key of keys) {
        value = value[key];
        if (value === undefined) return null;
    }
    return value;
}

// Función helper para actualizar configuración
function updateConfig(path, newValue) {
    const keys = path.split('.');
    let obj = CONFIG;
    for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = newValue;
}

// Exportar funciones helper
window.getConfig = getConfig;
window.updateConfig = updateConfig;