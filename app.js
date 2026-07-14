document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // -------------------------------------------------------------
    // Internationalization (i18n) Data
    // -------------------------------------------------------------
    let currentLang = 'es';
    
    const translations = {
        es: {
            // Header / Nav
            logoText: 'Clinic<span>AI</span>',
            navBeneficios: 'Beneficios',
            navSimulador: 'Simulador',
            navCalculadora: 'Calcular ROI',
            navPlanes: 'Precios',
            navPreguntas: 'Preguntas',
            navDemo: 'Solicitar Demo',
            portalClientes: 'Portal Clientes',
            
            // Hero
            heroTitle: 'Multiplica la rentabilidad de tu clínica con <span class="text-gradient">Chatbots de IA</span>',
            heroSubtitle: 'Automatiza la agenda de citas, procesa pagos de forma segura y mantén un seguimiento post-consulta impecable con agentes conversacionales inteligentes entrenados con Gemini.',
            heroCtaRoi: 'Calcula tu Ahorro (ROI)',
            heroCtaSim: 'Probar Simulador',
            metricNoShows: 'Ausentismo (No-shows)',
            metricAuto: 'Atención Automatizada',
            metricRet: 'Retención de Pacientes',
            
            // ROI Calculator Inputs
            roiHeaderTag: 'Calculadora de Retorno de Inversión',
            roiHeaderTitle: 'Mira cuánto dinero recuperas con ClinicAI',
            roiHeaderDesc: 'Ingresa los datos promedio de tu clínica o consultorio y observa el impacto financiero de automatizar tus flujos operativos.',
            roiParamsTitle: 'Parámetros de tu clínica',
            lblConsultas: 'Consultas Mensuales',
            lblCosto: 'Costo Promedio de Consulta',
            lblNoShows: 'Tasa Actual de Ausentismo (No-shows)',
            lblAdmin: 'Horas Semanales en Administración',
            
            // ROI Calculator Outputs
            roiResultsTitle: 'Ahorro e Ingresos Recuperados',
            lblSavingNoShows: 'Ingresos Recuperados por No-Shows',
            subSavingNoShows: 'Reducimos tu ausentismo al 4% con recordatorios automáticos e interactivos',
            lblSavingTime: 'Tiempo Administrativo Liberado',
            subSavingTime: 'Menos llamadas de agendamiento y seguimiento manual de pacientes',
            lblTotalSaving: 'Impacto Financiero Mensual Estimado',
            subTotalSaving: '¡Eso equivale a un retorno de inversión de más del 800%!',
            btnFreeTrial: 'Asegurar mi Prueba Gratuita',
            
            // Benefits
            benefitsTag: 'Características de Alto Impacto',
            benefitsTitle: 'El poder de Gemini optimizando la salud de tus pacientes y tu negocio',
            benefitsDesc: 'Nuestra tecnología está enfocada en tres pilares fundamentales que impactan directamente en tu cuenta de resultados.',
            b1Title: 'Agenda de Citas Inteligente',
            b1Desc: 'Los pacientes agendan, cancelan o reprograman citas directamente desde WhatsApp, Telegram o Web a cualquier hora, sin intervención de tu recepcionista.',
            b1Stat: '90% de automatización de agenda',
            b2Title: 'Cobros e Integración de Pagos',
            b2Desc: 'Asegura el pago total o el anticipo de consultas a través de pasarelas seguras integradas. Disminuye las cancelaciones de último minuto y mejora el flujo de caja.',
            b2Stat: 'Reduce pérdidas por cancelaciones vacías',
            b3Title: 'Seguimiento Activo de Pacientes',
            b3Desc: 'El bot contacta al paciente a las 24h, 7 días y 30 días para evaluar síntomas, adherencia al tratamiento y sugerir nuevas visitas periódicas de control.',
            b3Stat: '+45% de recompra en consultas de control',
            
            // Contact
            ctaTitle: '¿Listo para transformar tu práctica médica?',
            ctaDesc: 'Únete a la fase de pruebas de ClinicAI en el marco del Gemini XPrize. Obtén configuración gratuita y 3 meses sin costo de suscripción básica.',
            ctali1: 'Configuración del chatbot a la medida de tu especialidad.',
            ctali2: 'Cumplimiento con estándares HIPAA y protección de datos.',
            ctali3: 'Integración transparente con tu software médico actual.',
            lblFormName: 'Nombre del profesional/clínica',
            lblFormEmail: 'Correo Electrónico',
            lblFormSpecialty: 'Especialidad Médica',
            btnFormSubmit: 'Solicitar Acceso Prioritario',
            lblFormNote: 'Cupos limitados para el programa piloto internacional.',
            
            // FAQs
            faqTitle: 'Preguntas Frecuentes',
            faq1Q: '¿Cómo se integra el chatbot con mis sistemas actuales?',
            faq1A: 'ClinicAI cuenta con integraciones API para los principales softwares de expediente médico y calendarios (Google Calendar, Outlook, Doctoralia, etc.), permitiendo que las citas agendadas se sincronicen en tiempo real.',
            faq2Q: '¿Cómo ayuda el bot en el seguimiento clínico y tratamiento del paciente?',
            faq2A: 'Posterior a la consulta, el bot envía cuestionarios interactivos diseñados para el bienestar del paciente (adherencia al tratamiento, efectos secundarios, etc.). Si detecta anomalías o síntomas de alerta, notifica de inmediato al consultorio.',
            faq3Q: '¿Los datos de mis pacientes están seguros?',
            faq3A: 'Absolutamente. Encriptamos de extremo a extremo toda la información de salud del paciente y estamos alineados con las regulaciones internacionales de seguridad clínica (HIPAA/GDPR).',
            
            // Pricing Section
            pricingTagline: 'Planes y Precios',
            pricingTitle: 'Elige el plan ideal para tu práctica médica',
            pricingDesc: 'Comienza con una prueba y automatiza tus cobros y citas hoy mismo con Stripe de manera segura.',
            planStarterName: 'Plan Starter',
            planStarterDesc: 'Ideal para consultorios independientes y médicos particulares.',
            planStarterPrice: '$49<span>/mes</span>',
            featS1: '1 Asistente de IA (Gemini)',
            featS2: 'Hasta 200 citas mensuales',
            featS3: 'Seguimiento automático (24h)',
            featS4: 'Integración con PayPal',
            btnStarter: 'Adquirir Plan Starter',
            planProName: 'Plan Professional',
            planProDesc: 'Perfecto para clínicas pequeñas y centros médicos multi-doctor.',
            planProPrice: '$99<span>/mes</span>',
            featP1: 'Asistentes de IA ilimitados',
            featP2: 'Citas mensuales ilimitadas',
            featP3: 'Seguimiento avanzado (24h, 7d, 30d)',
            featP4: 'Soporte y Setup personalizado',
            btnPro: 'Adquirir Plan Pro',

            // Footer
            footerDesc: 'Tecnología de Inteligencia Artificial que conecta clínicas y pacientes con un propósito de salud y eficiencia económica.',
            footerNav: 'Navegación',
            footerXprize: 'Desarrollado para la competencia global de innovación de Google Gemini.',
            footerBottom: '&copy; 2026 ClinicAI. Todos los derechos reservados. Diseñado para un impacto global de salud digital.'
        },
        en: {
            // Header / Nav
            logoText: 'Clinic<span>AI</span>',
            navBeneficios: 'Benefits',
            navSimulador: 'Simulator',
            navCalculadora: 'Calculate ROI',
            navPlanes: 'Pricing',
            navPreguntas: 'FAQs',
            navDemo: 'Request Demo',
            portalClientes: 'Client Portal',
            
            // Hero
            heroTitle: 'Multiply your clinic\'s revenue with <span class="text-gradient">AI Chatbots</span>',
            heroSubtitle: 'Automate appointment scheduling, process secure payments, and maintain outstanding post-consultation follow-up with intelligent Gemini-powered agents.',
            heroCtaRoi: 'Calculate Your Savings (ROI)',
            heroCtaSim: 'Try Simulator',
            metricNoShows: 'No-shows Reduced',
            metricAuto: 'Automated Attention',
            metricRet: 'Patient Retention',
            
            // ROI Calculator Inputs
            roiHeaderTag: 'Return on Investment Calculator',
            roiHeaderTitle: 'See how much revenue you recover with ClinicAI',
            roiHeaderDesc: 'Enter your clinic or private practice metrics to observe the financial impact of automating operational tasks.',
            roiParamsTitle: 'Clinic Parameters',
            lblConsultas: 'Monthly Consultations',
            lblCosto: 'Average Consultation Fee',
            lblNoShows: 'Current No-show Rate',
            lblAdmin: 'Weekly Administrative Hours',
            
            // ROI Calculator Outputs
            roiResultsTitle: 'Savings & Recovered Income',
            lblSavingNoShows: 'Revenue Recovered from No-Shows',
            subSavingNoShows: 'We reduce your no-shows to 4% via dynamic, interactive reminders',
            lblSavingTime: 'Administrative Time Freed',
            subSavingTime: 'Fewer scheduling calls and manual patient follow-ups',
            lblTotalSaving: 'Estimated Monthly Financial Impact',
            subTotalSaving: 'This equals an ROI of over 800%!',
            btnFreeTrial: 'Secure My Free Trial',
            
            // Benefits
            benefitsTag: 'High-Impact Features',
            benefitsTitle: 'The power of Gemini optimizing patient health and business growth',
            benefitsDesc: 'Our technology focuses on three core pillars that directly affect your bottom line.',
            b1Title: 'Smart Appointment Booking',
            b1Desc: 'Patients schedule, cancel, or reschedule appointments 24/7 directly on WhatsApp, Telegram, or Web, without front desk intervention.',
            b1Stat: '90% scheduling automation',
            b2Title: 'Payments & Checkout Integration',
            b2Desc: 'Secure full or partial payment upfront. Eliminate empty slots and maintain a positive cash flow with built-in Stripe & PayPal integrations.',
            b2Stat: 'Reduce losses from last-minute cancellations',
            b3Title: 'Active Patient Follow-up',
            b3Desc: 'The core of our platform. The bot automatically reaches out at 24h, 7 days, and 30 days post-appointment to check symptoms, medication adherence, and prompt control visits.',
            b3Stat: '+45% return rate on control visits',
            
            // Contact
            ctaTitle: 'Ready to transform your medical practice?',
            ctaDesc: 'Join the pilot phase of ClinicAI for the Gemini XPrize. Get free custom setup and 3 months of free basic subscription.',
            ctali1: 'Custom chatbot personality trained for your specialty.',
            ctali2: 'Strictly secure, HIPAA-compliant patient communication.',
            ctali3: 'Seamless syncing with your current Electronic Health Record software.',
            lblFormName: 'Practitioner/Clinic Name',
            lblFormEmail: 'Email Address',
            lblFormSpecialty: 'Medical Specialty',
            btnFormSubmit: 'Request Priority Access',
            lblFormNote: 'Limited spots available for the global pilot program.',
            
            // FAQs
            faqTitle: 'Frequently Asked Questions',
            faq1Q: 'How does the chatbot integrate with my current software?',
            faq1A: 'ClinicAI provides secure API integrations with leading EHR and calendar applications (Google Calendar, Outlook, etc.), ensuring booking updates occur in real-time.',
            faq2Q: 'How does the bot assist with clinical care and patient safety?',
            faq2A: 'Post-consultation, the bot prompts patients with structured queries (medication intake, pain levels, side-effects). If any alert values are triggered, it immediately notifications the clinic staff.',
            faq3Q: 'Is patient data completely secure?',
            faq3A: 'Absolutely. We utilize end-to-end encryption for all conversations and conform strictly to global security regulations including HIPAA and GDPR.',
            
            // Pricing Section
            pricingTagline: 'Plans & Pricing',
            pricingTitle: 'Choose the ideal plan for your medical practice',
            pricingDesc: 'Start with a trial and automate your billing and appointments today with Stripe securely.',
            planStarterName: 'Starter Plan',
            planStarterDesc: 'Ideal for independent practices and private doctors.',
            planStarterPrice: '$49<span>/month</span>',
            featS1: '1 AI Assistant (Gemini-powered)',
            featS2: 'Up to 200 appointments/mo',
            featS3: 'Automated follow-up (24h)',
            featS4: 'PayPal Integration',
            btnStarter: 'Get Starter Plan',
            planProName: 'Professional Plan',
            planProDesc: 'Perfect for small clinics and multi-doctor health centers.',
            planProPrice: '$99<span>/month</span>',
            featP1: 'Unlimited AI Assistants',
            featP2: 'Unlimited appointments/mo',
            featP3: 'Advanced follow-up (24h, 7d, 30d)',
            featP4: 'Personalized Support & Setup',
            btnPro: 'Get Pro Plan',

            // Footer
            footerDesc: 'AI technology bridging the gap between healthcare clinics and patients with care quality and economic efficiency.',
            footerNav: 'Navigation',
            footerXprize: 'Developed for the Google Gemini XPrize global innovation competition.',
            footerBottom: '&copy; 2026 ClinicAI. All rights reserved. Built for international digital health impact.'
        }
    };

    function updateLanguageUI() {
        const t = translations[currentLang];

        // Nav
        document.querySelector('.logo-text').innerHTML = t.logoText;
        // Bug Fix #7: use data attributes to target nav links unambiguously,
        // avoiding querySelector order-dependency bugs
        document.querySelector('[data-nav="beneficios"]').textContent = t.navBeneficios;
        document.querySelector('[data-nav="simulador"]').textContent = t.navSimulador;
        document.querySelector('[data-nav="calculadora"]').textContent = t.navCalculadora;
        document.querySelector('[data-nav="planes"]').textContent = t.navPlanes;
        document.querySelector('[data-nav="faqs"]').textContent = t.navPreguntas;
        // Bug Fix #8: target Demo button specifically by its ID to avoid fragile class match
        document.getElementById('clientPortalBtn').querySelector('span').textContent = t.portalClientes;
        document.getElementById('demoBtn').textContent = t.navDemo;
        document.querySelector('#langToggle span').textContent = currentLang === 'es' ? 'EN' : 'ES';

        // Hero
        document.querySelector('.hero-title').innerHTML = t.heroTitle;
        document.querySelector('.hero-subtitle').textContent = t.heroSubtitle;
        document.querySelectorAll('.hero-cta-group a')[0].querySelector('span').textContent = t.heroCtaRoi;
        document.querySelectorAll('.hero-cta-group a')[1].querySelector('span').textContent = t.heroCtaSim;
        
        const heroMetrics = document.querySelectorAll('.metric-item');
        heroMetrics[0].querySelector('.metric-lbl').textContent = t.metricNoShows;
        heroMetrics[1].querySelector('.metric-lbl').textContent = t.metricAuto;
        heroMetrics[2].querySelector('.metric-lbl').textContent = t.metricRet;

        // ROI Slider Headers
        document.querySelector('.section-roi .section-tagline').textContent = t.roiHeaderTag;
        document.querySelector('.section-roi .section-title').textContent = t.roiHeaderTitle;
        document.querySelector('.section-roi .section-desc').textContent = t.roiHeaderDesc;
        document.querySelector('.roi-card-inputs .card-title').innerHTML = `<i data-lucide="sliders" class="icon-inline"></i> ${t.roiParamsTitle}`;
        
        document.querySelector('label[for="numConsultas"]').textContent = t.lblConsultas;
        document.querySelector('label[for="costoConsulta"]').textContent = t.lblCosto;
        document.querySelector('label[for="noShows"]').textContent = t.lblNoShows;
        document.querySelector('label[for="horasAdmin"]').textContent = t.lblAdmin;

        // ROI Outputs
        document.querySelector('.roi-card-results .card-title').innerHTML = `<i data-lucide="trending-up" class="icon-inline"></i> ${t.roiResultsTitle}`;
        
        const roiResults = document.querySelectorAll('.roi-result-item');
        roiResults[0].querySelector('.roi-result-label').textContent = t.lblSavingNoShows;
        roiResults[0].querySelector('.roi-result-sub').textContent = t.subSavingNoShows;
        roiResults[1].querySelector('.roi-result-label').textContent = t.lblSavingTime;
        roiResults[1].querySelector('.roi-result-sub').textContent = t.subSavingTime;
        
        document.querySelector('.total-saving .roi-result-label').textContent = t.lblTotalSaving;
        document.querySelector('.total-saving .roi-result-sub').textContent = t.subTotalSaving;
        document.querySelector('.roi-action .btn').textContent = t.btnFreeTrial;

        // Benefits
        document.querySelector('.section-benefits .section-tagline').textContent = t.benefitsTag;
        document.querySelector('.section-benefits .section-title').textContent = t.benefitsTitle;
        document.querySelector('.section-benefits .section-desc').textContent = t.benefitsDesc;
        
        const bCards = document.querySelectorAll('.benefit-card');
        bCards[0].querySelector('h3').textContent = t.b1Title;
        bCards[0].querySelector('p').textContent = t.b1Desc;
        bCards[0].querySelector('.benefit-stat').textContent = t.b1Stat;
        
        bCards[1].querySelector('h3').textContent = t.b2Title;
        bCards[1].querySelector('p').textContent = t.b2Desc;
        bCards[1].querySelector('.benefit-stat').textContent = t.b2Stat;
        
        bCards[2].querySelector('h3').textContent = t.b3Title;
        bCards[2].querySelector('p').textContent = t.b3Desc;
        bCards[2].querySelector('.benefit-stat').textContent = t.b3Stat;

        // Contact Section
        document.querySelector('.contact-info .section-title').textContent = t.ctaTitle;
        document.querySelector('.contact-info p').textContent = t.ctaDesc;
        const ctaLis = document.querySelectorAll('.benefit-list li');
        ctaLis[0].innerHTML = `<i data-lucide="check-circle" class="icon-success"></i> ${t.ctali1}`;
        ctaLis[1].innerHTML = `<i data-lucide="check-circle" class="icon-success"></i> ${t.ctali2}`;
        ctaLis[2].innerHTML = `<i data-lucide="check-circle" class="icon-success"></i> ${t.ctali3}`;
        
        document.querySelector('label[for="name"]').textContent = t.lblFormName;
        document.querySelector('label[for="email"]').textContent = t.lblFormEmail;
        document.querySelector('label[for="specialty"]').textContent = t.lblFormSpecialty;
        // Bug Fix #13: target submit button by type to avoid fragile class selector
        document.querySelector('.contact-form button[type="submit"]').textContent = t.btnFormSubmit;
        document.querySelector('.form-note').textContent = t.lblFormNote;

        // FAQs
        document.querySelector('.section-faqs .section-title').textContent = t.faqTitle;
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems[0].querySelector('h4').textContent = t.faq1Q;
        faqItems[0].querySelector('p').textContent = t.faq1A;
        faqItems[1].querySelector('h4').textContent = t.faq2Q;
        faqItems[1].querySelector('p').textContent = t.faq2A;
        faqItems[2].querySelector('h4').textContent = t.faq3Q;
        faqItems[2].querySelector('p').textContent = t.faq3A;

        // Pricing
        document.getElementById('pricingTagline').textContent = t.pricingTagline;
        document.getElementById('pricingTitle').textContent = t.pricingTitle;
        document.getElementById('pricingDesc').textContent = t.pricingDesc;

        document.getElementById('planStarterName').textContent = t.planStarterName;
        document.getElementById('planStarterDesc').textContent = t.planStarterDesc;
        document.querySelector('.pricing-card:not(.popular) .price').innerHTML = t.planStarterPrice;

        document.getElementById('planProName').textContent = t.planProName;
        document.getElementById('planProDesc').textContent = t.planProDesc;
        document.querySelector('.pricing-card.popular .price').innerHTML = t.planProPrice;

        document.querySelector('[data-feat="s1"]').textContent = t.featS1;
        document.querySelector('[data-feat="s2"]').textContent = t.featS2;
        document.querySelector('[data-feat="s3"]').textContent = t.featS3;
        document.querySelector('[data-feat="s4"]').textContent = t.featS4;

        document.querySelector('[data-feat="p1"]').textContent = t.featP1;
        document.querySelector('[data-feat="p2"]').textContent = t.featP2;
        document.querySelector('[data-feat="p3"]').textContent = t.featP3;
        document.querySelector('[data-feat="p4"]').textContent = t.featP4;

        // Footer
        document.querySelector('.footer-brand p').textContent = t.footerDesc;
        document.querySelector('.footer-links h4').textContent = t.footerNav;
        document.querySelector('.footer-info p').textContent = t.footerXprize;
        document.querySelector('.footer-bottom p').innerHTML = t.footerBottom;

        lucide.createIcons();
        calculateROI();
    }

    // Toggle Language
    document.getElementById('langToggle').addEventListener('click', () => {
        currentLang = currentLang === 'es' ? 'en' : 'es';
        updateLanguageUI();
        // Bug Fix #12: Don't force-reset the chat when the user toggles language
        // mid-conversation. Instead, just refresh the quick-reply buttons' language
        // if at the start node; otherwise preserve conversation flow.
        // We still reset only if the chat is empty (fresh state).
        if (chatMessages.children.length === 0) {
            resetChat();
        }
    });


    // -------------------------------------------------------------
    // ROI Calculator Functionality
    // -------------------------------------------------------------
    const numConsultasEl = document.getElementById('numConsultas');
    const costoConsultaEl = document.getElementById('costoConsulta');
    const noShowsEl = document.getElementById('noShows');
    const horasAdminEl = document.getElementById('horasAdmin');

    const numConsultasVal = document.getElementById('numConsultasVal');
    const costoConsultaVal = document.getElementById('costoConsultaVal');
    const noShowsVal = document.getElementById('noShowsVal');
    const horasAdminVal = document.getElementById('horasAdminVal');

    const savingNoShowsVal = document.getElementById('savingNoShows');
    const savingTimeVal = document.getElementById('savingTime');
    const totalMonthlySavingVal = document.getElementById('totalMonthlySaving');

    function calculateROI() {
        const numConsultas = parseInt(numConsultasEl.value);
        const costoConsulta = parseInt(costoConsultaEl.value);
        const currentNoShowRate = parseInt(noShowsEl.value);
        const adminHours = parseInt(horasAdminEl.value);

        // Update labels
        numConsultasVal.textContent = numConsultas;
        costoConsultaVal.textContent = `$${costoConsulta} USD`;
        noShowsVal.textContent = `${currentNoShowRate}%`;
        horasAdminVal.textContent = `${adminHours} hrs`;

        // Mathematical model for savings:
        // No-show reduction from current down to 4%
        const noShowReduction = Math.max(0, currentNoShowRate - 4);
        const appointmentsSaved = (numConsultas * noShowReduction) / 100;
        const revenueRecoveredNoShow = appointmentsSaved * costoConsulta;

        // Admin time saved: roughly 75% reduction in appointment management hours
        // Estimated receptionist/administrative hour value: $22 USD/hr
        const adminHoursSavedPerMonth = adminHours * 0.75 * 4.3; 
        const savingsAdminTime = adminHoursSavedPerMonth * 22;

        // Combined Savings
        const totalMonthlySaving = revenueRecoveredNoShow + savingsAdminTime;

        // Counter Animation
        animateCounter(savingNoShowsVal, revenueRecoveredNoShow, '$', ' USD');
        animateCounter(savingTimeVal, adminHoursSavedPerMonth, '', ' hrs');
        animateCounter(totalMonthlySavingVal, totalMonthlySaving, '$', ' USD');
    }

    // Bug Fix #10: locale-safe number parsing — strip everything except digits and decimal point
    function parseDisplayedNumber(str) {
        // Remove currency symbols, spaces, letters, commas (thousands separators)
        const cleaned = str.replace(/[^\d.]/g, '');
        return parseFloat(cleaned) || 0;
    }

    function animateCounter(element, target, prefix = '', suffix = '') {
        const duration = 400; // ms
        const start = parseDisplayedNumber(element.textContent);
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quad
            const value = start + (target - start) * (progress * (2 - progress));
            
            if (suffix.trim() === 'hrs') {
                element.textContent = `${prefix}${Math.round(value)} ${suffix.trim()}`;
            } else {
                element.textContent = `${prefix}${Math.round(value).toLocaleString('en-US')}${suffix}`;
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        requestAnimationFrame(update);
    }

    // Attach ROI event listeners
    [numConsultasEl, costoConsultaEl, noShowsEl, horasAdminEl].forEach(slider => {
        slider.addEventListener('input', calculateROI);
    });


    // -------------------------------------------------------------
    // Interactive Chatbot Simulator Sandbox
    // -------------------------------------------------------------
    const chatMessages = document.getElementById('chatMessages');
    const quickRepliesContainer = document.getElementById('quickReplies');
    
    // Conversation tree node definitions
    const chatData = {
        es: {
            start: {
                message: "¡Hola! Bienvenido a la demo interactiva de ClinicAI. ¿En qué puedo ayudarte hoy?",
                options: [
                    { text: "Agendar Cita 📅", next: "booking_1" },
                    { text: "Seguimiento Médico 🩺", next: "followup_1" },
                    { text: "Ahorro/ROI 💰", next: "roi_explain" }
                ]
            },
            booking_1: {
                message: "Con gusto. ¿Qué especialidad médica estás buscando?",
                options: [
                    { text: "Dermatología", next: "booking_2" },
                    { text: "Odontología", next: "booking_2" },
                    { text: "Medicina General", next: "booking_2" }
                ]
            },
            booking_2: {
                message: "Perfecto. Tenemos citas disponibles para mañana. Elige el horario de tu preferencia:",
                options: [
                    { text: "10:00 AM", next: "booking_confirm" },
                    { text: "02:30 PM", next: "booking_confirm" },
                    { text: "04:00 PM", next: "booking_confirm" }
                ]
            },
            booking_confirm: {
                message: "¡Cita agendada! Te enviamos un link de pago seguro (Stripe/PayPal) para confirmar el cupo. Además, recibirás un recordatorio dinámico 24 horas antes.",
                options: [
                    { text: "Volver al inicio 🏠", next: "start" }
                ]
            },
            followup_1: {
                message: "Hola Dr. Gómez. Aquí simulamos el seguimiento activo de pacientes. Bot: 'Hola Juan, hace 24 horas saliste de tu consulta dental. ¿Cómo evalúas tu nivel de dolor hoy del 1 al 5?'",
                options: [
                    { text: "1 - Sin dolor", next: "followup_good" },
                    { text: "4 - Dolor moderado", next: "followup_alert" }
                ]
            },
            followup_good: {
                message: "Excelente. Recuerda tomar tu medicamento recetado. El bot volverá a contactarte en 6 días para agendar tu consulta de control de seguimiento automático.",
                options: [
                    { text: "Volver al inicio 🏠", next: "start" }
                ]
            },
            followup_alert: {
                message: "Entiendo. Ya hemos notificado de forma automática a la recepción de la clínica. Un asistente se pondrá en contacto contigo en breve para evaluar si requieres adelantar tu cita.",
                options: [
                    { text: "Volver al inicio 🏠", next: "start" }
                ]
            },
            roi_explain: {
                message: "ClinicAI reduce el ausentismo (no-shows) de tu clínica del 18% al 4%. Al automatizar las confirmaciones e integrar pasarelas de pago, los pacientes no olvidan ni cancelan a última hora.",
                options: [
                    { text: "Probar flujo de Cita 📅", next: "booking_1" },
                    { text: "Volver al inicio 🏠", next: "start" }
                ]
            }
        },
        en: {
            start: {
                message: "Hello! Welcome to the interactive ClinicAI demo. How can I help you today?",
                options: [
                    { text: "Book an Appointment 📅", next: "booking_1" },
                    { text: "Medical Follow-up 🩺", next: "followup_1" },
                    { text: "Savings/ROI Info 💰", next: "roi_explain" }
                ]
            },
            booking_1: {
                message: "Sure. Which medical specialty are you looking for?",
                options: [
                    { text: "Dermatology", next: "booking_2" },
                    { text: "Dentistry", next: "booking_2" },
                    { text: "General Medicine", next: "booking_2" }
                ]
            },
            booking_2: {
                message: "Excellent. We have open slots tomorrow. Choose your preferred time:",
                options: [
                    { text: "10:00 AM", next: "booking_confirm" },
                    { text: "02:30 PM", next: "booking_confirm" },
                    { text: "04:00 PM", next: "booking_confirm" }
                ]
            },
            booking_confirm: {
                message: "Appointment scheduled! We've sent you a secure payment link (Stripe/PayPal) to confirm your slot. You will receive an automated check-in reminder 24 hours prior.",
                options: [
                    { text: "Go to Main Menu 🏠", next: "start" }
                ]
            },
            followup_1: {
                message: "Let's test patient follow-up. Bot: 'Hi John, it has been 24 hours since your dental procedure. How would you rate your discomfort/pain today from 1 to 5?'",
                options: [
                    { text: "1 - No pain", next: "followup_good" },
                    { text: "4 - Moderate pain", next: "followup_alert" }
                ]
            },
            followup_good: {
                message: "Perfect. Please remember to complete your prescribed treatment. The bot will automatically check-in in 6 days to confirm your clinical follow-up.",
                options: [
                    { text: "Go to Main Menu 🏠", next: "start" }
                ]
            },
            followup_alert: {
                message: "Understood. The system has automatically alerted the clinic's front desk. A member of our staff will reach out shortly to evaluate your recovery status.",
                options: [
                    { text: "Go to Main Menu 🏠", next: "start" }
                ]
            },
            roi_explain: {
                message: "ClinicAI reduces patient no-shows from an average of 18% to just 4%. By utilizing conversational reminders and secure prepayment deposits, practice revenue spikes instantly.",
                options: [
                    { text: "Try booking flow 📅", next: "booking_1" },
                    { text: "Go to Main Menu 🏠", next: "start" }
                ]
            }
        }
    };

    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function loadNode(nodeKey) {
        // Clear quick replies
        quickRepliesContainer.innerHTML = '';
        
        // Load custom config from LocalStorage if available
        try {
            const savedConfig = localStorage.getItem('clinicai_config');
            if (savedConfig) {
                const config = JSON.parse(savedConfig);
                if (config.botName) {
                    const simulatorTitle = document.querySelector('.chat-header-info h3');
                    if (simulatorTitle) {
                        simulatorTitle.textContent = config.botName;
                    }
                }
                if (config.botGreeting && chatData.es && chatData.es.start) {
                    chatData.es.start.message = config.botGreeting;
                }
                if (config.botGreetingEn && chatData.en && chatData.en.start) {
                    chatData.en.start.message = config.botGreetingEn;
                }
            }
        } catch (e) {
            console.error('Error loading custom chatbot config in simulator:', e);
        }
        
        const node = chatData[currentLang][nodeKey];
        if (!node) return;

        // Typing indicator simulator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot');
        // Bug Fix #11: typing indicator text is now language-aware
        const typingText = currentLang === 'es' ? 'ClinicAI está escribiendo...' : 'ClinicAI is typing...';
        typingIndicator.innerHTML = `<span class="text-muted">${typingText}</span>`;
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.remove();
            appendMessage('bot', node.message);

            // Render options
            node.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.classList.add('quick-reply-btn');
                btn.textContent = opt.text;
                btn.addEventListener('click', () => {
                    appendMessage('user', opt.text);
                    loadNode(opt.next);
                });
                quickRepliesContainer.appendChild(btn);
            });
        }, 600);
    }

    function resetChat() {
        chatMessages.innerHTML = '';
        loadNode('start');
    }

    document.getElementById('resetChatBtn').addEventListener('click', resetChat);

    // Form Submission Alert
    document.getElementById('leadForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const feedbackMsg = currentLang === 'es' 
            ? '¡Gracias! Nos pondremos en contacto contigo en las próximas 24 horas para programar tu demo de ClinicAI.'
            : 'Thank you! We will contact you in the next 24 hours to schedule your ClinicAI demo.';
        alert(feedbackMsg);
        e.target.reset();
    });

    // -------------------------------------------------------------
    // PayPal Smart Payment Buttons (SDK integration)
    // -------------------------------------------------------------
    function initPayPalButtons() {
        if (typeof paypal === 'undefined') {
            console.warn('PayPal SDK is not loaded yet.');
            return;
        }

        // Render Starter Plan Button ($49.00 USD)
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'silver',
                layout: 'vertical',
                label: 'pay'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: "ClinicAI - Plan Starter (1 Mes)",
                        amount: {
                            currency_code: "USD",
                            value: "49.00"
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert(currentLang === 'es' 
                        ? '¡Pago completado con éxito por ' + details.payer.name.given_name + '! Bienvenido a ClinicAI.'
                        : 'Payment successfully completed by ' + details.payer.name.given_name + '! Welcome to ClinicAI.');
                    window.location.href = "dashboard.html";
                });
            },
            onError: function(err) {
                console.error('PayPal Starter Button Error: ', err);
            }
        }).render('#paypal-button-container-starter');

        // Render Professional Plan Button ($99.00 USD)
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'gold',
                layout: 'vertical',
                label: 'pay'
            },
            createOrder: function(data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        description: "ClinicAI - Plan Professional (1 Mes)",
                        amount: {
                            currency_code: "USD",
                            value: "99.00"
                        }
                    }]
                });
            },
            onApprove: function(data, actions) {
                return actions.order.capture().then(function(details) {
                    alert(currentLang === 'es' 
                        ? '¡Pago completado con éxito por ' + details.payer.name.given_name + '! Bienvenido al Plan Professional.'
                        : 'Payment successfully completed by ' + details.payer.name.given_name + '! Welcome to the Professional Plan.');
                    window.location.href = "dashboard.html";
                });
            },
            onError: function(err) {
                console.error('PayPal Pro Button Error: ', err);
            }
        }).render('#paypal-button-container-pro');
    }

    // Initialize PayPal Buttons
    if (typeof paypal !== 'undefined') {
        initPayPalButtons();
    } else {
        window.addEventListener('load', initPayPalButtons);
    }

    // -------------------------------------------------------------
    // Initial Setup
    // -------------------------------------------------------------
    updateLanguageUI();
    resetChat();
});
