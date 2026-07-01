/* =============================================================
   ClinicAI SaaS Client Dashboard Logic
   Secure SHA-256 Authentication & Local Database Simulator
   ============================================================= */

document.addEventListener('DOMContentLoaded', async () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // ---------------------------------------------------------
    // 1. CRIPTOGRAFÍA: Algoritmo SHA-256 (Client-side)
    // ---------------------------------------------------------
    async function hashPassword(password) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }

    // ---------------------------------------------------------
    // 2. BASE DE DATOS LOCAL: Datos semilla en LocalStorage
    // ---------------------------------------------------------
    async function initializeDatabase() {
        // Inicializar usuarios
        if (!localStorage.getItem('clinicai_users')) {
            // Contraseña por defecto: clinicai2026
            const defaultUser = {
                email: 'doctor@clinicai.com',
                name: 'Dr. Alejandro Gómez',
                specialty: 'Dermatología',
                clinicName: 'Clínica Dermacare',
                passwordHash: await hashPassword('clinicai2026')
            };
            localStorage.setItem('clinicai_users', JSON.stringify([defaultUser]));
        }

        // Inicializar configuración del bot
        if (!localStorage.getItem('clinicai_config')) {
            const defaultConfig = {
                botName: 'Asistente Dermacare',
                botGreeting: '¡Hola! Bienvenido al consultorio del Dr. Alejandro Gómez. ¿En qué puedo ayudarte hoy?',
                botGreetingEn: "Hello! Welcome to Dr. Alejandro Gómez's office. How can I help you today?",
                systemInstructions: 'Eres un asistente de IA empático y profesional para la Clínica Dermacare del Dr. Alejandro Gómez. Tu objetivo es agendar citas, responder dudas generales sobre los tratamientos de dermatología (limpiezas, acné, verrugas, etc.) y realizar el seguimiento post-consulta de pacientes. Nunca des diagnósticos médicos definitivos, siempre sugiere una consulta de control. Las consultas tienen un costo de $80 USD.',
                consultationPrice: 80,
                workingHours: 'Lunes a Viernes 9:00 AM - 6:00 PM',
                botTemperature: 0.3,
                botActive: true
            };
            localStorage.setItem('clinicai_config', JSON.stringify(defaultConfig));
        }

        // Inicializar citas simuladas
        if (!localStorage.getItem('clinicai_appointments')) {
            const defaultAppointments = [
                { id: '1', patient: 'Carlos Mendoza', phone: '+52 55 4321 0987', specialty: 'Limpieza Facial', date: '2026-07-02', time: '10:00', status: 'Confirmada' },
                { id: '2', patient: 'Sofía Ruiz', phone: '+52 55 9876 5432', specialty: 'Tratamiento de Acné', date: '2026-07-02', time: '11:30', status: 'Confirmada' },
                { id: '3', patient: 'Miguel Ángel Ortega', phone: '+52 55 1122 3344', specialty: 'Retiro de Verrugas', date: '2026-07-03', time: '15:00', status: 'Pendiente' },
                { id: '4', patient: 'Elena Fuentes', phone: '+52 55 5566 7788', specialty: 'Consulta General', date: '2026-07-03', time: '16:30', status: 'Cancelada' },
                { id: '5', patient: 'David Silva', phone: '+52 55 8899 0011', specialty: 'Control Post-Operación', date: '2026-07-04', time: '09:30', status: 'Confirmada' }
            ];
            localStorage.setItem('clinicai_appointments', JSON.stringify(defaultAppointments));
        }

        // Inicializar historial de chats
        if (!localStorage.getItem('clinicai_chat_logs')) {
            const defaultChatLogs = [
                {
                    id: 'chat-1',
                    patient: 'Carlos Mendoza',
                    phone: '+52 55 4321 0987',
                    date: '2026-07-01 12:45',
                    lastMessage: 'Perfecto, nos vemos el jueves a las 10:00 AM.',
                    statusType: 'alert-booking',
                    statusText: 'Cita Agendada por IA',
                    messages: [
                        { sender: 'patient', text: 'Hola buenas tardes, quería información para una cita.', time: '12:40 PM' },
                        { sender: 'bot', text: '¡Hola! Bienvenido al consultorio del Dr. Alejandro Gómez. ¿En qué puedo ayudarte hoy?', time: '12:41 PM' },
                        { sender: 'patient', text: 'Quisiera agendar una limpieza facial por favor.', time: '12:42 PM' },
                        { sender: 'bot', text: 'Con gusto. Para limpieza facial tenemos citas disponibles para mañana jueves. Elige el horario de tu preferencia: 10:00 AM, 02:30 PM, 04:00 PM.', time: '12:43 PM' },
                        { sender: 'patient', text: 'A las 10:00 AM me parece muy bien.', time: '12:44 PM' },
                        { sender: 'bot', text: '¡Excelente! Cita agendada para Carlos Mendoza mañana a las 10:00 AM. Te enviamos un link de pago seguro para confirmar tu lugar. ¡Que tengas un excelente día!', time: '12:45 PM' }
                    ]
                },
                {
                    id: 'chat-2',
                    patient: 'Sofía Ruiz',
                    phone: '+52 55 9876 5432',
                    date: '2026-07-01 09:12',
                    lastMessage: 'Entendido, esperaré la llamada.',
                    statusType: 'alert-high',
                    statusText: 'Alerta Médica Activa',
                    messages: [
                        { sender: 'bot', text: 'Hola Sofía, hace 24 horas saliste de tu tratamiento de Acné. ¿Cómo evalúas tu nivel de dolor hoy del 1 al 5?', time: '09:08 AM' },
                        { sender: 'patient', text: 'Hola, diría que 4. Me duele bastante y lo tengo muy rojo e inflamado.', time: '09:10 AM' },
                        { sender: 'bot', text: 'Entiendo perfectamente. Un dolor de nivel 4 no es el comportamiento esperado. Ya he notificado de forma automática a la recepción de la clínica. Un asistente se pondrá en contacto contigo en breve para evaluar si requieres adelantar tu cita de control.', time: '09:11 AM' },
                        { sender: 'patient', text: 'Entendido, esperaré la llamada. Muchas gracias.', time: '09:12 AM' }
                    ]
                },
                {
                    id: 'chat-3',
                    patient: 'Esteban Rojas',
                    phone: '+52 55 3344 5566',
                    date: '2026-06-30 18:22',
                    lastMessage: '¿Cuál es el costo de la consulta dermatológica?',
                    statusType: 'alert-normal',
                    statusText: 'Conversación Normal',
                    messages: [
                        { sender: 'patient', text: 'Hola, disculpa, ¿el Dr. atiende los sábados?', time: '06:20 PM' },
                        { sender: 'bot', text: '¡Hola! El horario de atención del consultorio es de Lunes a Viernes de 9:00 AM a 6:00 PM. Los sábados no abrimos de forma regular, pero si es una urgencia podemos evaluarlo.', time: '06:21 PM' },
                        { sender: 'patient', text: 'Ah okay, entiendo. ¿Cuál es el costo de la consulta dermatológica?', time: '06:22 PM' },
                        { sender: 'bot', text: 'La consulta de valoración general con el Dr. Alejandro Gómez tiene un costo de $80 USD. ¿Te gustaría que te ayude a agendar una cita para la próxima semana?', time: '06:22 PM' }
                    ]
                }
            ];
            localStorage.setItem('clinicai_chat_logs', JSON.stringify(defaultChatLogs));
        }

        // Inicializar configuración de WhatsApp
        if (!localStorage.getItem('clinicai_whatsapp_config')) {
            const defaultWaConfig = {
                mode: 'link',
                metaToken: '',
                metaPhoneId: '',
                metaTemplateName: 'confirmacion_citas',
                templateConfirm: 'Hola {{paciente}}, tu cita para {{especialidad}} ha sido confirmada en {{clinica}} para el {{fecha}} a las {{hora}} hrs.',
                templateFollowup: 'Hola {{paciente}}, ha pasado 24 horas desde tu consulta de {{especialidad}} en {{clinica}}. ¿Cómo evalúas tu recuperación?'
            };
            localStorage.setItem('clinicai_whatsapp_config', JSON.stringify(defaultWaConfig));
        }
    }

    await initializeDatabase();

    // ---------------------------------------------------------
    // 3. CONTROL DE SESIÓN Y VISTAS
    // ---------------------------------------------------------
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');

    function checkSession() {
        const loggedIn = sessionStorage.getItem('clinicai_logged_in');
        if (loggedIn === 'true') {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            document.body.classList.remove('dashboard-body'); // Remove center layout
            loadDashboardData();
        } else {
            loginSection.classList.remove('hidden');
            dashboardSection.classList.add('hidden');
            document.body.classList.add('dashboard-body'); // Keep center layout for login
        }
    }

    // ---------------------------------------------------------
    // 4. FLUJO DE LOGIN
    // ---------------------------------------------------------
    const loginForm = document.getElementById('loginForm');
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const loginErrorMessage = document.getElementById('loginErrorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginErrorMessage.classList.add('hidden');

        const emailVal = loginEmail.value.trim().toLowerCase();
        const passwordVal = loginPassword.value;
        const hashedInput = await hashPassword(passwordVal);

        const users = JSON.parse(localStorage.getItem('clinicai_users') || '[]');
        const matchedUser = users.find(u => u.email === emailVal && u.passwordHash === hashedInput);

        if (matchedUser) {
            sessionStorage.setItem('clinicai_logged_in', 'true');
            sessionStorage.setItem('clinicai_current_user', JSON.stringify(matchedUser));
            
            showToast('¡Inicio de sesión exitoso!');
            checkSession();
        } else {
            loginErrorMessage.classList.remove('hidden');
        }
    });

    // ---------------------------------------------------------
    // 5. CERRAR SESIÓN
    // ---------------------------------------------------------
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.clear();
        showToast('Sesión cerrada correctamente', 'success');
        checkSession();
    });

    // ---------------------------------------------------------
    // 6. NAVEGACIÓN DE PESTAÑAS (TABS)
    // ---------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    window.switchTab = function(tabId) {
        // Quitar clases activas de navegación y tab-panes
        navItems.forEach(item => {
            if (item.getAttribute('data-tab') === tabId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        tabPanes.forEach(pane => {
            if (pane.id === `tab-${tabId}`) {
                pane.classList.add('active');
            } else {
                pane.classList.remove('active');
            }
        });
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // ---------------------------------------------------------
    // 7. CARGA Y RENDERIZADO DE DATOS DEL DASHBOARD
    // ---------------------------------------------------------
    let currentFilteredStatus = 'all';

    function loadDashboardData() {
        const currentUser = JSON.parse(sessionStorage.getItem('clinicai_current_user'));
        const config = JSON.parse(localStorage.getItem('clinicai_config'));

        if (!currentUser || !config) return;

        // Renderizar datos del perfil en Topbar y Sidebar
        document.getElementById('userProfileName').textContent = currentUser.name;
        document.getElementById('userProfileClinic').textContent = currentUser.clinicName;
        document.getElementById('topbarUserName').textContent = currentUser.name.split(' ')[1] || currentUser.name;
        
        // Cargar estado de la UI según el estado del Bot
        const botActivePill = document.getElementById('botStatusPill');
        const botActiveText = document.getElementById('botStatusText');
        
        if (config.botActive) {
            botActivePill.className = 'status-pill bot-active';
            botActiveText.textContent = 'Bot Activo';
        } else {
            botActivePill.className = 'status-pill bot-inactive';
            botActiveText.textContent = 'Bot Inactivo';
        }

        // Cargar Citas en la tabla
        renderAppointments();

        // Cargar Historial de Chats
        renderChatLogs();

        // Cargar Formularios con valores guardados
        loadFormValues(currentUser, config);

        // Recalcular KPIs
        calculateKPIs(config);
    }

    // ---------------------------------------------------------
    // 8. CÁLCULO DE KPIs
    // ---------------------------------------------------------
    function calculateKPIs(config) {
        const appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
        const chatLogs = JSON.parse(localStorage.getItem('clinicai_chat_logs') || '[]');
        
        // Citas agendadas (que no estén canceladas)
        const activeAppointments = appointments.filter(a => a.status !== 'Cancelada');
        document.getElementById('kpiCitas').textContent = activeAppointments.length;

        // Ingresos recuperados (solo confirmadas)
        const confirmedApps = appointments.filter(a => a.status === 'Confirmada');
        const price = config.consultationPrice || 80;
        const totalRevenue = confirmedApps.length * price;
        document.getElementById('kpiIngresos').textContent = `$${totalRevenue.toLocaleString('en-US')} USD`;

        // Tasa de Ausentismo (Simulada basada en cancelaciones)
        const totalApps = appointments.length;
        const canceledApps = appointments.filter(a => a.status === 'Cancelada').length;
        const noShowRate = totalApps > 0 ? Math.round((canceledApps / totalApps) * 100) : 4;
        document.getElementById('kpiNoShows').textContent = `${noShowRate}%`;

        // Tiempo Ahorrado (citas * 1.5 horas + chats * 0.25 horas)
        const timeSaved = Math.round((appointments.length * 1.5) + (chatLogs.length * 0.5));
        document.getElementById('kpiTiempo').textContent = `${timeSaved} hrs`;
    }

    // ---------------------------------------------------------
    // 9. GESTIÓN DE CITAS (CRUD)
    // ---------------------------------------------------------
    const appointmentsTableBody = document.getElementById('appointmentsTableBody');
    const appointmentModal = document.getElementById('appointmentModal');
    const appointmentForm = document.getElementById('appointmentForm');

    // Renderizar tabla
    function renderAppointments() {
        const appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
        appointmentsTableBody.innerHTML = '';

        const filtered = appointments.filter(app => {
            if (currentFilteredStatus === 'all') return true;
            return app.status === currentFilteredStatus;
        });

        if (filtered.length === 0) {
            appointmentsTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center" style="color: var(--text-muted); padding: 3rem;">
                        <i data-lucide="calendar-x" style="width: 32px; height: 32px; margin-bottom: 0.5rem; display: inline-block;"></i>
                        <p>No se encontraron citas en esta categoría.</p>
                    </td>
                </tr>
            `;
            if (window.lucide) lucide.createIcons();
            return;
        }

        // Ordenar citas por fecha y hora (más recientes primero)
        filtered.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

        filtered.forEach(app => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: var(--text-primary);">${app.patient}</td>
                <td>${app.phone}</td>
                <td>${app.specialty}</td>
                <td>${formatDate(app.date)}</td>
                <td>${app.time}</td>
                <td>
                    <span class="app-status status-${app.status.toLowerCase()}">${app.status}</span>
                </td>
                <td>
                    <div class="actions-cell">
                        ${app.status !== 'Confirmada' ? `
                            <button class="action-btn-sm btn-confirm" data-id="${app.id}" title="Confirmar Cita">
                                <i data-lucide="check"></i>
                            </button>
                        ` : ''}
                        ${app.status !== 'Cancelada' ? `
                            <button class="action-btn-sm btn-cancel" data-id="${app.id}" title="Cancelar Cita">
                                <i data-lucide="x"></i>
                            </button>
                        ` : ''}
                        <button class="action-btn-sm btn-whatsapp" data-id="${app.id}" title="Enviar Recordatorio WhatsApp">
                            <i data-lucide="message-square"></i>
                        </button>
                        <button class="action-btn-sm btn-delete" data-id="${app.id}" title="Eliminar Registro">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </td>
            `;
            appointmentsTableBody.appendChild(tr);
        });

        // Registrar listeners para botones de acción en la tabla
        document.querySelectorAll('.btn-confirm').forEach(btn => {
            btn.addEventListener('click', () => updateAppointmentStatus(btn.getAttribute('data-id'), 'Confirmada'));
        });
        document.querySelectorAll('.btn-cancel').forEach(btn => {
            btn.addEventListener('click', () => updateAppointmentStatus(btn.getAttribute('data-id'), 'Cancelada'));
        });
        document.querySelectorAll('.btn-whatsapp').forEach(btn => {
            btn.addEventListener('click', () => sendWhatsAppMessage(btn.getAttribute('data-id'), 'confirm'));
        });
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', () => deleteAppointment(btn.getAttribute('data-id')));
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    // Cambiar estado de cita
    function updateAppointmentStatus(id, newStatus) {
        let appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
        appointments = appointments.map(app => {
            if (app.id === id) {
                app.status = newStatus;
            }
            return app;
        });
        localStorage.setItem('clinicai_appointments', JSON.stringify(appointments));
        showToast(`Cita marcada como ${newStatus}`);
        loadDashboardData();
    }

    // Eliminar cita
    function deleteAppointment(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este registro de cita?')) {
            let appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
            appointments = appointments.filter(app => app.id !== id);
            localStorage.setItem('clinicai_appointments', JSON.stringify(appointments));
            showToast('Cita eliminada correctamente');
            loadDashboardData();
        }
    }

    // Modal de Citas
    const btnAddNewAppointment = document.getElementById('btnAddNewAppointment');
    const btnQuickAppointment = document.getElementById('btnQuickAppointment');
    const btnCloseAppointmentModal = document.getElementById('btnCloseAppointmentModal');
    const btnCancelAppointmentModal = document.getElementById('btnCancelAppointmentModal');

    function openAppModal() {
        appointmentForm.reset();
        // Colocar fecha de hoy por defecto
        document.getElementById('newAppDate').value = new Date().toISOString().split('T')[0];
        appointmentModal.classList.remove('hidden');
    }

    btnAddNewAppointment.addEventListener('click', openAppModal);
    btnQuickAppointment.addEventListener('click', openAppModal);

    function closeAppModal() {
        appointmentModal.classList.add('hidden');
    }

    btnCloseAppointmentModal.addEventListener('click', closeAppModal);
    btnCancelAppointmentModal.addEventListener('click', closeAppModal);

    // Guardar nueva cita
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const patient = document.getElementById('newAppPatient').value.trim();
        const phone = document.getElementById('newAppPhone').value.trim();
        const specialty = document.getElementById('newAppSpecialty').value.trim();
        const date = document.getElementById('newAppDate').value;
        const time = document.getElementById('newAppTime').value;
        const status = document.getElementById('newAppStatus').value;

        const appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
        const newApp = {
            id: Date.now().toString(),
            patient,
            phone,
            specialty,
            date,
            time,
            status
        };

        appointments.push(newApp);
        localStorage.setItem('clinicai_appointments', JSON.stringify(appointments));

        closeAppModal();
        showToast('Cita agendada exitosamente');
        loadDashboardData();
    });

    // Filtros de Citas
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilteredStatus = btn.getAttribute('data-filter');
            renderAppointments();
        });
    });

    // Helper para formatear fecha en español
    function formatDate(dateStr) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        // Compensation for timezone offset when parsing YYYY-MM-DD
        const parts = dateStr.split('-');
        const date = new Date(parts[0], parts[1] - 1, parts[2]);
        return date.toLocaleDateString('es-ES', options);
    }

    // ---------------------------------------------------------
    // 10. HISTORIAL DE CHATS & MODAL WHATSAPP
    // ---------------------------------------------------------
    const chatsTableBody = document.getElementById('chatsTableBody');
    const chatModal = document.getElementById('chatModal');
    const chatModalPatientName = document.getElementById('chatModalPatientName');
    const chatModalPatientPhone = document.getElementById('chatModalPatientPhone');
    const chatModalMessages = document.getElementById('chatModalMessages');
    const btnCloseChatModal = document.getElementById('btnCloseChatModal');

    function renderChatLogs() {
        const chatLogs = JSON.parse(localStorage.getItem('clinicai_chat_logs') || '[]');
        chatsTableBody.innerHTML = '';

        chatLogs.forEach(chat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="font-weight: 600; color: var(--text-primary);">${chat.patient}</td>
                <td>${chat.date}</td>
                <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${chat.lastMessage}</td>
                <td>
                    <span class="chat-analysis-badge ${chat.statusType}">
                        <i data-lucide="${chat.statusType === 'alert-high' ? 'alert-triangle' : chat.statusType === 'alert-booking' ? 'calendar-check' : 'message-circle'}"></i>
                        <span>${chat.statusText}</span>
                    </span>
                </td>
                <td>
                    <button class="action-btn-text btn-view-chat" data-id="${chat.id}">
                        <span>Ver Conversación</span>
                        <i data-lucide="eye"></i>
                    </button>
                </td>
            `;
            chatsTableBody.appendChild(tr);
        });

        document.querySelectorAll('.btn-view-chat').forEach(btn => {
            btn.addEventListener('click', () => openChatLogModal(btn.getAttribute('data-id')));
        });

        if (window.lucide) {
            lucide.createIcons();
        }
    }

    function openChatLogModal(chatId) {
        const chatLogs = JSON.parse(localStorage.getItem('clinicai_chat_logs') || '[]');
        const chat = chatLogs.find(c => c.id === chatId);
        if (!chat) return;

        chatModalPatientName.textContent = chat.patient;
        chatModalPatientPhone.textContent = chat.phone;
        
        // Obtener nombre del bot personalizado
        const config = JSON.parse(localStorage.getItem('clinicai_config'));
        document.getElementById('waBotName').textContent = config.botName || 'Asistente ClinicAI';

        chatModalMessages.innerHTML = '';
        chat.messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `wa-msg ${msg.sender === 'patient' ? 'patient' : 'bot-ai'}`;
            msgDiv.innerHTML = `
                <span>${msg.text}</span>
                <span class="wa-time">${msg.time}</span>
            `;
            chatModalMessages.appendChild(msgDiv);
        });

        chatModal.classList.remove('hidden');
        chatModalMessages.scrollTop = chatModalMessages.scrollHeight;
    }

    btnCloseChatModal.addEventListener('click', () => {
        chatModal.classList.add('hidden');
    });

    // ---------------------------------------------------------
    // 11. FORMULARIOS DE CONFIGURACIÓN & AJUSTES
    // ---------------------------------------------------------
    const botConfigForm = document.getElementById('botConfigForm');
    const clinicConfigForm = document.getElementById('clinicConfigForm');
    const profileForm = document.getElementById('profileForm');
    const passwordForm = document.getElementById('passwordForm');

    function loadFormValues(currentUser, config) {
        // Cargar Configuración del Bot
        document.getElementById('botNameInput').value = config.botName;
        document.getElementById('botGreetingInput').value = config.botGreeting;
        document.getElementById('botGreetingEnInput').value = config.botGreetingEn;
        document.getElementById('botPromptInput').value = config.systemInstructions;

        // Cargar Parámetros Operativos
        document.getElementById('configPrice').value = config.consultationPrice;
        document.getElementById('configHours').value = config.workingHours;
        document.getElementById('configTemperature').value = config.botTemperature;
        document.getElementById('tempBadge').textContent = config.botTemperature;
        document.getElementById('configBotActive').checked = config.botActive;

        // Cargar Perfil de Ajustes
        document.getElementById('profileDoctorName').value = currentUser.name;
        document.getElementById('profileClinicName').value = currentUser.clinicName;
        document.getElementById('profileSpecialty').value = currentUser.specialty;

        // Cargar Configuración de WhatsApp
        const waConfig = JSON.parse(localStorage.getItem('clinicai_whatsapp_config'));
        if (waConfig) {
            document.getElementById('waModeSelect').value = waConfig.mode;
            document.getElementById('waMetaToken').value = waConfig.metaToken || '';
            document.getElementById('waMetaPhoneId').value = waConfig.metaPhoneId || '';
            document.getElementById('waMetaTemplateName').value = waConfig.metaTemplateName || '';
            document.getElementById('waTemplateConfirm').value = waConfig.templateConfirm || '';
            document.getElementById('waTemplateFollowup').value = waConfig.templateFollowup || '';
            
            // Toggle Meta Fields visibility
            if (waConfig.mode === 'meta') {
                document.getElementById('metaFields').classList.remove('hidden');
            } else {
                document.getElementById('metaFields').classList.add('hidden');
            }
        }
    }

    // Actualizar Creatividad (Temperatura) badge
    document.getElementById('configTemperature').addEventListener('input', (e) => {
        document.getElementById('tempBadge').textContent = e.target.value;
    });

    // Envío del Formulario: Personalizar Bot
    botConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const config = JSON.parse(localStorage.getItem('clinicai_config'));
        config.botName = document.getElementById('botNameInput').value.trim();
        config.botGreeting = document.getElementById('botGreetingInput').value.trim();
        config.botGreetingEn = document.getElementById('botGreetingEnInput').value.trim();
        config.systemInstructions = document.getElementById('botPromptInput').value.trim();

        localStorage.setItem('clinicai_config', JSON.stringify(config));
        showToast('Instrucciones del Chatbot guardadas exitosamente');
        loadDashboardData();
    });

    // Envío del Formulario: Parámetros Clínicos
    clinicConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const config = JSON.parse(localStorage.getItem('clinicai_config'));
        config.consultationPrice = parseInt(document.getElementById('configPrice').value);
        config.workingHours = document.getElementById('configHours').value.trim();
        config.botTemperature = parseFloat(document.getElementById('configTemperature').value);
        config.botActive = document.getElementById('configBotActive').checked;

        localStorage.setItem('clinicai_config', JSON.stringify(config));
        showToast('Parámetros operativos actualizados');
        loadDashboardData();
    });

    // Envío del Formulario: Perfil del Doctor
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('profileDoctorName').value.trim();
        const clinicName = document.getElementById('profileClinicName').value.trim();
        const specialty = document.getElementById('profileSpecialty').value.trim();

        // Actualizar datos del usuario actual
        const currentUser = JSON.parse(sessionStorage.getItem('clinicai_current_user'));
        currentUser.name = name;
        currentUser.clinicName = clinicName;
        currentUser.specialty = specialty;
        
        sessionStorage.setItem('clinicai_current_user', JSON.stringify(currentUser));

        // Actualizar en el "servidor" localStorage
        let users = JSON.parse(localStorage.getItem('clinicai_users') || '[]');
        users = users.map(u => {
            if (u.email === currentUser.email) {
                u.name = name;
                u.clinicName = clinicName;
                u.specialty = specialty;
            }
            return u;
        });
        localStorage.setItem('clinicai_users', JSON.stringify(users));

        showToast('Perfil de consultorio actualizado');
        loadDashboardData();
    });

    // Envío del Formulario: Cambiar Contraseña Encriptada
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const currentPassInput = document.getElementById('currentPassword').value;
        const newPassInput = document.getElementById('newPassword').value;
        const confirmNewPassInput = document.getElementById('confirmNewPassword').value;

        const currentUser = JSON.parse(sessionStorage.getItem('clinicai_current_user'));
        
        // Cargar base de datos
        let users = JSON.parse(localStorage.getItem('clinicai_users') || '[]');
        const userDbIndex = users.findIndex(u => u.email === currentUser.email);
        
        if (userDbIndex === -1) return;

        // Validar contraseña actual
        const currentHashed = await hashPassword(currentPassInput);
        if (currentHashed !== users[userDbIndex].passwordHash) {
            showToast('La contraseña actual es incorrecta', 'error');
            return;
        }

        // Validar nueva contraseña
        if (newPassInput.length < 6) {
            showToast('La nueva contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (newPassInput !== confirmNewPassInput) {
            showToast('Las contraseñas nuevas no coinciden', 'error');
            return;
        }

        // Encriptar y guardar nueva contraseña
        const newHashed = await hashPassword(newPassInput);
        users[userDbIndex].passwordHash = newHashed;
        localStorage.setItem('clinicai_users', JSON.stringify(users));

        passwordForm.reset();
        showToast('Contraseña cambiada y encriptada exitosamente');
    });

    // ---------------------------------------------------------
    // 12. INTEGRACIÓN FUNCIONAL CON WHATSAPP
    // ---------------------------------------------------------
    const whatsappConfigForm = document.getElementById('whatsappConfigForm');
    const waModeSelect = document.getElementById('waModeSelect');
    const metaFields = document.getElementById('metaFields');
    
    // Toggle Meta fields on select change
    waModeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'meta') {
            metaFields.classList.remove('hidden');
        } else {
            metaFields.classList.add('hidden');
        }
    });

    // Form submit to save config
    whatsappConfigForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const config = {
            mode: waModeSelect.value,
            metaToken: document.getElementById('waMetaToken').value.trim(),
            metaPhoneId: document.getElementById('waMetaPhoneId').value.trim(),
            metaTemplateName: document.getElementById('waMetaTemplateName').value.trim(),
            templateConfirm: document.getElementById('waTemplateConfirm').value.trim(),
            templateFollowup: document.getElementById('waTemplateFollowup').value.trim()
        };
        
        localStorage.setItem('clinicai_whatsapp_config', JSON.stringify(config));
        showToast('Configuración de WhatsApp guardada');
        loadDashboardData();
    });

    // Helper: Replace placeholders with real values
    function replacePlaceholders(template, app) {
        const currentUser = JSON.parse(sessionStorage.getItem('clinicai_current_user')) || { clinicName: 'ClinicAI' };
        
        return template
            .replace(/\{\{paciente\}\}/g, app.patient || '')
            .replace(/\{\{telefono\}\}/g, app.phone || '')
            .replace(/\{\{especialidad\}\}/g, app.specialty || '')
            .replace(/\{\{fecha\}\}/g, formatDate(app.date) || '')
            .replace(/\{\{hora\}\}/g, app.time || '')
            .replace(/\{\{clinica\}\}/g, currentUser.clinicName || 'ClinicAI');
    }

    // Send WhatsApp Logic
    async function sendWhatsAppMessage(appId, templateType, testPhoneNumber = null) {
        const config = JSON.parse(localStorage.getItem('clinicai_whatsapp_config'));
        if (!config) return;

        let app = null;
        if (testPhoneNumber) {
            const currentUser = JSON.parse(sessionStorage.getItem('clinicai_current_user')) || { clinicName: 'ClinicAI' };
            app = {
                patient: 'Paciente de Prueba',
                phone: testPhoneNumber,
                specialty: 'Consulta de Test',
                date: new Date().toISOString().split('T')[0],
                time: '12:00',
                clinicName: currentUser.clinicName
            };
        } else {
            const appointments = JSON.parse(localStorage.getItem('clinicai_appointments') || '[]');
            app = appointments.find(a => a.id === appId);
        }

        if (!app) {
            showToast('No se encontró información de la cita', 'error');
            return;
        }

        // Get matching template
        const rawTemplate = templateType === 'confirm' ? config.templateConfirm : config.templateFollowup;
        const messageText = replacePlaceholders(rawTemplate, app);
        
        // Clean phone number (leave only digits, remove starting + if any, but wa.me works best with digits only)
        const cleanPhone = app.phone.replace(/[^\d]/g, '');

        if (!cleanPhone) {
            showToast('El teléfono del paciente no es válido', 'error');
            return;
        }

        if (config.mode === 'link') {
            // Direct link mode: Open in new tab
            const url = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageText)}`;
            window.open(url, '_blank');
            showToast('Abriendo enlace de envío de WhatsApp...');
        } else {
            // Meta API mode
            if (!config.metaToken || !config.metaPhoneId || !config.metaTemplateName) {
                showToast('Configura las credenciales de Meta API primero', 'error');
                return;
            }

            try {
                showToast('Enviando a través de Meta API...', 'success');
                console.log('--- ENVIANDO MENSAJE WHATSAPP API (META) ---');
                console.log(`URL: https://graph.facebook.com/v17.0/${config.metaPhoneId}/messages`);
                console.log('Mensaje:', messageText);

                // Meta Cloud API template parameters mapping
                const metaPayload = {
                    messaging_product: "whatsapp",
                    to: cleanPhone,
                    type: "template",
                    template: {
                        name: config.metaTemplateName,
                        language: {
                            code: "es"
                        },
                        components: [
                            {
                                type: "body",
                                parameters: [
                                    { type: "text", text: app.patient },
                                    { type: "text", text: app.specialty },
                                    { type: "text", text: formatDate(app.date) },
                                    { type: "text", text: app.time }
                                ]
                            }
                        ]
                    }
                };

                const response = await fetch(`https://graph.facebook.com/v17.0/${config.metaPhoneId}/messages`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${config.metaToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(metaPayload)
                });

                const data = await response.json();
                
                if (response.ok) {
                    showToast('Mensaje enviado exitosamente vía Meta API');
                    console.log('Respuesta Meta API exitosa:', data);
                } else {
                    throw new Error(data.error?.message || 'Error desconocido');
                }
            } catch (error) {
                console.error('Error de red al llamar a Meta API:', error);
                showToast(`Error al enviar por Meta: ${error.message}`, 'error');
            }
        }
    }

    // Connect test button
    document.getElementById('btnSendTestWa').addEventListener('click', () => {
        const phone = document.getElementById('waTestPhone').value.trim();
        const template = document.getElementById('waTestTemplate').value;
        if (!phone) {
            showToast('Ingresa un número para la prueba', 'error');
            return;
        }
        sendWhatsAppMessage(null, template, phone);
    });

    // ---------------------------------------------------------
    // 12. NOTIFICACIONES TOAST
    // ---------------------------------------------------------
    const toastNotification = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');
    let toastTimeout = null;

    function showToast(message, type = 'success') {
        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        toastMessage.textContent = message;
        
        // Modificar icono y color según el tipo
        const icon = toastNotification.querySelector('.toast-icon');
        if (type === 'success') {
            toastNotification.style.borderColor = 'var(--color-primary)';
            toastNotification.style.boxShadow = '0 10px 30px rgba(0, 242, 254, 0.15)';
            if (icon) icon.setAttribute('data-lucide', 'check-circle');
        } else {
            toastNotification.style.borderColor = '#ef4444';
            toastNotification.style.boxShadow = '0 10px 30px rgba(239, 68, 68, 0.15)';
            if (icon) icon.setAttribute('data-lucide', 'alert-circle');
        }

        if (window.lucide) lucide.createIcons();

        toastNotification.classList.remove('hidden');

        toastTimeout = setTimeout(() => {
            toastNotification.classList.add('hidden');
        }, 3000);
    }

    // ---------------------------------------------------------
    // 13. INICIALIZACIÓN
    // ---------------------------------------------------------
    checkSession();
});
