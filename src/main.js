import { createIcons, Zap, RefreshCw, ShieldCheck, Target, Mail, Phone, X, ChevronDown, ArrowDown, ArrowUp, Instagram, Facebook, Clapperboard, Globe, Music2, Menu } from 'lucide';
import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import collapse from '@alpinejs/collapse';

Alpine.plugin(intersect);
Alpine.plugin(collapse);

// --- GALAXY ANIMATION ---
function initGalaxyParticles() {
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function resize() {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
        initStars();
    }
    window.addEventListener('resize', resize);

    class Star {
        constructor() {
            this.reset(true); // true = random initial pos
        }
        reset(initial = false) {
            this.x = initial ? Math.random() * width : Math.random() * width;
            this.y = initial ? Math.random() * height : height + Math.random() * 100;
            this.size = Math.random() * 2 + 0.5;
            this.speed = Math.random() * 0.5 + 0.1;
            this.opacity = Math.random();
            this.fade = 0.01;
        }
        update() {
            this.y -= this.speed; // Move up
            this.opacity += this.fade;
            if (this.opacity >= 1 || this.opacity <= 0) this.fade = -this.fade;

            if (this.y < -50) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        const count = (width * height) / 4000;
        for (let i = 0; i < count; i++) stars.push(new Star());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }

    resize();
    animate();
}

// Ensure elements created by Alpine (like x-for loops) are ready before observing

// Initialize Alpine data
document.addEventListener('alpine:init', () => {
    Alpine.store('lang', {
        current: 'en',
        t(key) {
            return this.translations[this.current][key] || key;
        },
        set(lang) {
            this.current = lang;
        },
        translations: {
            en: {
                nav_why: "Why us?",
                nav_showroom: "Showroom",
                nav_pricing: "Pricing",
                nav_faq: "FAQ",
                nav_contact: "Get in touch!",
                hero_title_1: "STOP THE SCROLL.",
                hero_title_2: "GET THE CLICK.",
                hero_desc: "We design thumbnails that bypass logic and target the viewer's instinct. High-end visual engineering for creators who don't settle for \"average\".",
                btn_pricing: "VIEW PRICING",
                btn_gallery: "SEE GALLERY",
                trusted_by: "TRUSTED BY",
                creators: "CREATORS",
                real_results: "Real results from real channels",
                showroom_essential: "For channels who look for functional thumbnails and manage many uploads per month without sacrificing quality.",
                showroom_pro: "For enthusiast videos with a top-notch mastery thumbnail... designed for high-budget storytelling and extreme complexity.",
                why_us_title: "Why us?",
                why_us_desc: "We don't just \"make images\". We engineer points of interest that force a click through data-backed design patterns.",
                why_us_quote: "\"A thumbnail is 90% of your success. We handle that 90% with mastery.\"",
                delivery_title: "24H DELIVERY",
                delivery_desc: "Your upload schedule is sacred. We deliver high-quality drafts within 24-48 hours, guaranteed.",
                edits_title: "UNLIMITED EDITS",
                edits_desc: "We iterate until it hits your exact vision. No extra charges, no friction. Just results.",
                warranty_title: "MONEY WARRANTY",
                warranty_desc: "Not feeling the draft? We offer a total refund. We believe in our quality that much.",
                ctr_title: "CTR PSYCHOLOGY",
                ctr_desc: "Applying color theory, facial expression analysis, and elite framing to stop the scroll.",
                workflow_title: "The ",
                workflow_word: "Workflow",
                workflow_desc: "Easy, simple and quick, asking for a thumbnail doesn't mean a head-ache",
                step1_title: "CHOOSE A PLAN",
                step1_desc: "Select the tier that fits your content strategy and goals.",
                step2_title: "SECURE PAY",
                step2_desc: "Fast and secure payments via Payoneer, PayPal or Kontigo invoices.",
                step3_title: "SEND THE BRIEF",
                step3_desc: "Provide details for your first thumbnail.",
                step4_title: "REVISE",
                step4_desc: "You get the draft in less than 48h. We tweak every detail until it’s a verified click-magnet.",
                step5_title: "DONE!",
                step5_desc: "Final files delivered in ultra-high resolution. Ready to scale.",
                btn_choose_plan: "Choose a plan",
                essential_title: "Essential ",
                essential_word: "Plans",
                starter_title: "Starter",
                starter_credits: "1 thumbnail credit",
                starter_features: ["✓ 1 Functional Design", "✓ 24h Delivery", "✓ 2 Revision rounds", "✓ Money Warranty"],
                master_title: "Master",
                master_credits: "8 thumbnail credits",
                master_features: ["✓ 8 Functional Designs", "✓ Priority Allocation", "✓ Unlimited Revisions", "✓ Money Warranty"],
                growth_title: "Growth",
                growth_credits: "4 thumbnail credits",
                growth_features: ["✓ 4 Functional Designs", "✓ Strategy Insight", "✓ 4 Revision Rounds", "✓ Money Warranty"],
                select_plan: "Select Plan",
                pay_with: "Pay with",
                save_160: "SAVE $160",
                save_60: "SAVE $60",
                pro_plans_title: "PRO ",
                pro_plans_word: "Plans",
                pro_desc: "For agencies and creators who need high-volume, top-tier thumbnail production.",
                apex_credits: "1 PRO thumbnail credit",
                apex_features: ["✓ 3D Blender Sketch", "✓ Top notch AI", "✓ Dedicated Designer", "✓ Custom Asset Creation", "✓ Unlimited Revisions", "✓ Money Warranty"],
                empire_credits: "4 PRO thumbnail credits",
                empire_features: ["✓ 4 Elite Masterpieces", "✓ 3D Blender Sketch", "✓ Top notch AI", "✓ Dedicated Designer", "✓ Strategic Consultation", "✓ Unlimited Revisions", "✓ Money Warranty"],
                best_value: "BEST VALUE",
                faq_title: "Questions? Answers:",
                q1: "What information do I need to provide you to create a thumbnail?",
                a1: "Video topic, quick sum-up, and some questions replied.",
                q2: "Do you help me brainstorm a thumbnail concept?",
                a2: "Yep, that's exactly what we're here for you, you don't waste your time by how to create a functional design, that all is on us.",
                q3: "Do you work with YouTube clients of all sizes?",
                a3: "Even the greatest channels started with zero subscribers… Of course we will work with you and we will love it. :)",
                q4: "How do I pay?",
                a4_1: "Main ones: Payoneer, Kontigo, PayPal. (in that order)",
                a4_2: "Secondary: Zinli, Meru, Binance Pay, AirTM, Cryptos.",
                q5: "What is a 3D blender sketch?",
                a5: "For PRO thumbnails to ensure we match the realism needed we work on realistic environments created on Blender with custom 3D models, so that you get an accurate idea for the thumbnail.",
                q6: "Can I get a free trial?",
                a6_p1: "Yes! If you meet these requirements:",
                a6_l1: "+100k subscribers.",
                a6_l2: "Consistency (posting at least once/week)",
                ready_takeoff: "Ready for ",
                takeoff_word: "Takeoff?",
                fill_form: "Fill the form and let's work on your next thumbnail",
                sent_msg: "SENT!",
                contact_soon: "We'll get in touch ASAP.",
                outside_hours: "If we don't contact you within the next 2-3 hours, we are probably strictly outside working hours.",
                send_new: "Send new Inquire",
                name_holder: "Name",
                email_holder: "Email",
                msg_holder: "tell us about your channel...",
                send_inq: "Send Inquiry",
                contact: "Contact",
                our_socials: "Our Socials",
                rights: "© 2026 PRO MINIATURAS • ALL CLICKS RESERVED",
                footer_desc: "PRO Miniaturas is a design agency specializing in high-CTR thumbnails for YouTube creators.",
                footer_business: "For business inquiries, please prefer email or just fill the form.",
                about_us: "About Us",
                about_desc: "Professional visual design for creators and brands worldwide.",
                get_help: "Get Help",
                read_faq: "Read our FAQ",
                chat_ig: "Chat via Instagram",
                links: "Links",
                footer_workflow: "The Workflow",
                t1_text: "Thank you so much for everything because you are a very respectful person and never contradicted my ideas and in fact took them all into account. I found this very good... Thank you very much for all your good work.",
                t1_author: "Arsenia Fernandez-Uckele",
                t1_role: "Creator",
                lewis_text: "Michael and his team have been creating thumbnails for my channel for a long time now and we've seen incredible results. Not only are the designs professional and eye-catching, a lot of the time his team think of things you wouldn't of. Couldn't recommend him more.",
                lewis_author: "Lewis Menelaws",
                lewis_role: "Creator - Coding With Lewis",
                mitchell_text: "I have worked with proministuras for about a year now and took my channel from averaging 2-3% Ctr to now 6-8% Ctr. If you’re wanting more views on YouTube this is the only person I would recommend.",
                mitchell_author: "Mitchell Wright",
                mitchell_role: "Creator",
                t6_text: "Working with Pro Miniaturas has been an absolute game changer for my YouTube channel. He consistently exceeds my expectations and brings even my wildest ideas to life exactly how I picture them. His turnaround time is fast, his communication is incredible, and he’s always open to feedback.\n\nMost importantly, switching to him for thumbnails has had a real, noticeable impact on the engagement and performance of my videos. I couldn’t recommend him more.",
                t6_author: "Zach McDermott",
                t6_role: "Spark Media Management",
                btn_gallery: "SEE GALLERY",
                select_msg_start: "Hi! I'm interested on",
                select_msg_end: "plan, please send over the invoice link so I'm paying asap"
            },
            es: {
                nav_why: "¿Por qué nosotros?",
                nav_showroom: "Portafolio",
                nav_pricing: "Precios",
                nav_faq: "FAQ",
                nav_contact: "¡Contáctanos!",
                hero_title_1: "DETÉN EL SCROLL.",
                hero_title_2: "TEN EL CLICK.",
                hero_desc: "Diseñamos miniaturas que evaden la lógica y apuntan al instinto del espectador. Ingeniería visual de alta gama para creadores que no se conforman con el \"promedio\".",
                btn_pricing: "VER PRECIOS",
                btn_gallery: "VER GALERÍA",
                trusted_by: "CONFIADO POR",
                creators: "CREADORES",
                real_results: "Resultados reales de canales reales",
                showroom_essential: "Para canales que buscan miniaturas funcionales y manejan mucha demanda por mes sin sacrificar calidad.",
                showroom_pro: "Para canales entusiastas con una miniatura de primer nivel... diseñado para videos de alto presupuesto.",
                why_us_title: "¿Por qué nosotros?",
                why_us_desc: "No solo \"hacemos imágenes\". Diseñamos puntos de interés que fuerzan el click a través de patrones de diseño respaldados por datos.",
                why_us_quote: "\"Una miniatura es el 90% de tu éxito. Manejamos ese 90% con excelencia.\"",
                delivery_title: "ENTREGA 24H",
                delivery_desc: "Tu calendario de subidas es sagrado. Entregamos borradores de alta calidad en 24-48 horas, garantizado.",
                edits_title: "EDICIONES ILIMITADAS",
                edits_desc: "Iteramos hasta que coincida con tu visión exacta. Sin cargos extra, sin fricción. Solo resultados.",
                warranty_title: "GARANTÍA DE REEMBOLSO",
                warranty_desc: "¿No te convence el borrador? Ofrecemos un reembolso total. Creemos en nuestra calidad así de mucho.",
                ctr_title: "PSICOLOGÍA DE CTR",
                ctr_desc: "Aplicando teoría del color, análisis de expresiones faciales y encuadre de élite para detener el scroll.",
                workflow_title: "El ",
                workflow_word: "Proceso",
                workflow_desc: "Fácil, simple y rápido, hacer una miniatura no significa un dolor de cabeza",
                step1_title: "ELIGE UN PLAN",
                step1_desc: "Selecciona el nivel que se ajuste a tu estrategia de contenido y metas.",
                step2_title: "PAGO SEGURO",
                step2_desc: "Pagos rápidos y seguros vía Payoneer, PayPal o facturas Kontigo.",
                step3_title: "ENVÍA EL BRIEF",
                step3_desc: "Proporciona detalles para tu primera miniatura.",
                step4_title: "REVISIÓN",
                step4_desc: "Recibes el borrador en menos de 48h. Ajustamos cada detalle hasta que sea un imán de clicks verificado.",
                step5_title: "¡LISTO!",
                step5_desc: "Archivos finales entregados en ultra-alta resolución. Listos para escalar.",
                btn_choose_plan: "Elegir plan",
                essential_title: "Essential ",
                essential_word: "Plans",
                starter_title: "Starter",
                starter_credits: "1 crédito de miniatura",
                starter_features: ["✓ 1 Diseño Funcional", "✓ Entrega 24h", "✓ 2 Rondas de revisión", "✓ Garantía de Reembolso"],
                master_title: "Master",
                master_credits: "8 créditos de miniatura",
                master_features: ["✓ 8 Diseños Funcionales", "✓ Asignación Prioritaria", "✓ Revisiones Ilimitadas", "✓ Garantía de Reembolso"],
                growth_title: "Growth",
                growth_credits: "4 créditos de miniatura",
                growth_features: ["✓ 4 Diseños Funcionales", "✓ Insight de Estrategia", "✓ 4 Rondas de revisión", "✓ Garantía de Reembolso"],
                select_plan: "Seleccionar Plan",
                pay_with: "Pagar con",
                save_160: "AHORRA $160",
                save_60: "AHORRA $60",
                pro_plans_title: "PRO ",
                pro_plans_word: "Plans",
                pro_desc: "Para agencias y creadores que necesitan producción de alto volumen y nivel superior.",
                apex_credits: "1 crédito de miniatura PRO",
                apex_features: ["✓ Boceto 3D Blender", "✓ Top notch AI", "✓ Diseñador dedicado", "✓ Creación de Activos Custom", "✓ Revisiones Ilimitadas", "✓ Garantía de Reembolso"],
                empire_credits: "4 créditos de miniatura PRO",
                empire_features: ["✓ 4 Obras Maestras Elite", "✓ Boceto 3D Blender", "✓ Top notch AI", "✓ Diseñador dedicado", "✓ Consultoría Estratégica", "✓ Revisiones Ilimitadas", "✓ Garantía de Reembolso"],
                best_value: "MEJOR VALOR",
                faq_title: "¿Preguntas? Respuestas:",
                q1: "¿Qué información necesito darte para crear una miniatura?",
                a1: "Tema del video, resumen rápido y algunas preguntas respondidas.",
                q2: "¿Me ayudan a pensar el concepto de la miniatura?",
                a2: "Sí, exactamente para eso estamos. No pierdas tiempo pensando cómo hacer un diseño funcional, eso déjanoslo a nosotros.",
                q3: "¿Trabajan con canales de YouTube de todos los tamaños?",
                a3: "Hasta los canales más grandes empezaron con cero suscriptores... Claro que trabajaremos contigo y nos encantará. :)",
                q4: "¿Cómo pago?",
                a4_1: "Principales: Payoneer, Kontigo, PayPal. (en ese orden)",
                a4_2: "Secundarios: Zinli, Meru, Binance Pay, AirTM, Criptos.",
                q5: "¿Qué es un boceto 3D en Blender?",
                a5: "Para miniaturas PRO, para asegurar el realismo, trabajamos en entornos realistas creados en Blender con modelos 3D custom, para que tengas una idea precisa de la miniatura.",
                q6: "¿Puedo tener una prueba gratis?",
                a6_p1: "¡Sí! Si cumples estos requisitos:",
                a6_l1: "+100k suscriptores.",
                a6_l2: "Consistencia (publicar al menos una vez/semana)",
                ready_takeoff: "¿Listo para el ",
                takeoff_word: "Despegue?",
                fill_form: "Llena el formulario y a trabajar en tu próxima miniatura",
                sent_msg: "¡ENVIADO!",
                contact_soon: "Nos pondremos en contacto ASAP.",
                outside_hours: "Si no te contactamos en las próximas 2-3 horas, probablemente estamos fuera de horario laboral.",
                send_new: "Enviar nueva consulta",
                name_holder: "Nombre",
                email_holder: "Email",
                msg_holder: "cuéntanos sobre tu canal...",
                send_inq: "Enviar Consulta",
                about_us: "Nosotros",
                about_desc: "Diseño visual profesional para creadores y marcas de todo el mundo.",
                get_help: "Ayuda",
                read_faq: "Lee nuestras FAQ",
                chat_ig: "Chat vía Instagram",
                links: "Enlaces",
                footer_workflow: "El proceso",
                contact: "Contacto",
                our_socials: "Síguenos",
                rights: "© 2026 PRO MINIATURAS • TODOS LOS CLICKS RESERVADOS",
                footer_desc: "PRO Miniaturas es una agencia de diseño especializada en miniaturas de alto CTR para creadores de YouTube.",
                footer_business: "Para consultas de negocios, por favor enviar el correo @prominiaturas.com o simplemente llena el formulario.",
                t1_text: "Muchísimas gracias por todo porque usted es una persona muy respetuosa y nunca contradijo mis ideas y de hecho las tomaba en cuenta todas. Esto me pareció muy bueno... Muchas gracias por todo su buen trabajo.",
                t1_author: "Arsenia Fernandez-Uckele",
                t1_role: "Creadora",
                lewis_text: "Michael y su equipo han estado creando miniaturas para mi canal desde hace mucho tiempo y hemos visto resultados increíbles. No solo los diseños son profesionales y llamativos, sino que muchas veces su equipo piensa en cosas que a uno no se le ocurrirían. No podría recomendarlos más.",
                lewis_author: "Lewis Menelaws",
                lewis_role: "Creador - Coding With Lewis",
                mitchell_text: "He trabajado con proministuras por un año y mi canal pasó de un CTR promedio de 2-3% a 6-8%. Si quieres más vistas en YouTube, esta es la única persona que recomendaría.",
                mitchell_author: "Mitchell Wright",
                mitchell_role: "Creador",
                t6_text: "Trabajar con Pro Miniaturas ha sido un cambio absoluto para mi canal de YouTube. Constantemente superan mis expectativas y dan vida incluso a mis ideas más locas exactamente como las imagino. Su tiempo de respuesta es rápido, su comunicación es increíble y siempre están abiertos a comentarios.\n\nLo más importante, cambiar a ellos para las miniaturas tuvo un impacto real y notable en la participación y el rendimiento de mis videos. No podría recomendarlos más.",
                t6_author: "Zach McDermott",
                t6_role: "Spark Media Management",
                btn_gallery: "VER GALERÍA",
                select_msg_start: "¡Hola! Me interesa el plan",
                select_msg_end: ", por favor envíame el enlace de pago para hacerlo lo más pronto posible."
            }
        }
    });
});

Alpine.data('app', () => ({
    galleryTab: 'essential',
    mobileMenuOpen: false,
    lightboxOpen: false,
    activeImg: '',
    inquiry: '',
    openKontigo(amountUsd, planName) {
        const slug = 'ee782fe5-2c70-4744-a0ed-43467de5468a';
        const amountCents = amountUsd * 100;
        const url = `https://app.kontigo.lat/pay/${slug}?amount=${amountCents}&redirect_url=${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
    },
    setInquiry(plan) {
        const start = Alpine.store('lang').t('select_msg_start');
        const end = Alpine.store('lang').t('select_msg_end');
        this.inquiry = `${start} ${plan} ${end}`;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    },
    formSuccess: false,
    async submitForm(e) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxwdg2d1ePxuDUB2AsDA-AuhmsWCLW3j574BV7UXg2NCWC_V0g6woOy4wc0AWYHy1N_/exec';
        const form = e.target;
        const btn = form.querySelector('button');
        const originalText = btn.innerText;

        btn.disabled = true;
        btn.innerText = "SENDING...";

        try {
            await fetch(scriptURL, { method: 'POST', body: new FormData(form), mode: 'no-cors' });
            this.formSuccess = true;
            form.reset();
            this.inquiry = '';
        } catch (error) {
            console.error('Error!', error.message);
            alert("Error sending message. Please contact us via email.");
        } finally {
            btn.disabled = false;
            btn.innerText = originalText;
        }
    },
    pricingMode: 'essential',
    init() {
        this.startTestimonialLoop();
        // Pricing scroll trigger
        window.addEventListener('scroll', () => {
            const proSection = document.getElementById('pro-plans');
            if (proSection) {
                const rect = proSection.getBoundingClientRect();
                const triggerPoint = window.innerHeight / 1.5;
                if (rect.top <= triggerPoint) {
                    this.pricingMode = 'pro';
                } else {
                    this.pricingMode = 'essential';
                }
            }
        });
    },
    limit: 9,
    essentialImages: [
        '/thumbnails/essential-25.jpg',
        '/thumbnails/essential-26.jpg',
        '/thumbnails/essential-6.jpg',
        '/thumbnails/essential-10.jpg',
        '/thumbnails/essential-30.jpg',
        '/thumbnails/essential-38.jpg',
        '/thumbnails/essential-33.jpg',
        '/thumbnails/essential-24.jpg',
        '/thumbnails/essential-18.jpg',
        // Remaining images (1-39 excluding above)
        '/thumbnails/essential-1.jpg',
        '/thumbnails/essential-2.jpg',
        '/thumbnails/essential-3.jpg',
        '/thumbnails/essential-4.jpg',
        '/thumbnails/essential-5.jpg',
        '/thumbnails/essential-7.jpg',
        '/thumbnails/essential-8.jpg',
        '/thumbnails/essential-9.jpg',
        '/thumbnails/essential-11.jpg',
        '/thumbnails/essential-12.jpg',
        '/thumbnails/essential-13.jpg',
        '/thumbnails/essential-14.jpg',
        '/thumbnails/essential-15.jpg',
        '/thumbnails/essential-16.jpg',
        '/thumbnails/essential-17.jpg',
        '/thumbnails/essential-19.jpg',
        '/thumbnails/essential-20.jpg',
        '/thumbnails/essential-21.jpg',
        '/thumbnails/essential-22.jpg',
        '/thumbnails/essential-23.jpg',
        '/thumbnails/essential-27.jpg',
        '/thumbnails/essential-28.jpg',
        '/thumbnails/essential-29.jpg',
        '/thumbnails/essential-31.jpg',
        '/thumbnails/essential-32.jpg',
        '/thumbnails/essential-34.jpg',
        '/thumbnails/essential-35.jpg',
        '/thumbnails/essential-36.jpg',
        '/thumbnails/essential-37.jpg',
        '/thumbnails/essential-39.jpg'
    ],
    testimonials: [
        {
            key: 'lewis',
            image: "/lewis.png"
        },
        {
            key: 'mitchell',
            image: "/mitchell.png"
        },
        {
            key: 't6', // Zach
            image: "/zach.png"
        },
        {
            key: 't1', // Arsenia
            image: "/arsenia.png"
        }
    ],
    activeTestimonial: 0,
    testimonialInterval: null,
    startTestimonialLoop() {
        this.testimonialInterval = setInterval(() => {
            this.activeTestimonial = (this.activeTestimonial + 1) % this.testimonials.length;
        }, 5000);
    },
    stopTestimonialLoop() {
        clearInterval(this.testimonialInterval);
    }
}));

window.Alpine = Alpine;
Alpine.start();

// Initialize Lucide Icons
createIcons({
    icons: {
        Zap,
        RefreshCw,
        ShieldCheck,
        Target,
        Mail,
        Phone,
        X,
        ChevronDown,
        ArrowDown,
        ArrowUp,
        Instagram,
        Facebook,
        Clapperboard,
        Globe,
        Music2,
        Menu
    }
});

// Star animation (Footer)
document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.getElementById('stars');
    if (starContainer) {
        for (let i = 0; i < 80; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.top = Math.random() * 100 + '%';
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            starContainer.appendChild(star);
        }
    }
});

// --- REVEAL ANIMATIONS (BLUR ON SCROLL) ---
function initRevealAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
            // Disabled 'else' to prevent scroll up glitch (animate once)
            /* else {
                entry.target.classList.remove('active');
            } */
        });
    }, observerOptions);

    const elements = document.querySelectorAll('.reveal-blur');
    elements.forEach(el => observer.observe(el));
}
window.initRevealAnimations = initRevealAnimations;

// --- HERO GRID ANIMATION (RESTORED) ---
function initHeroGrid() {
    const gridContainer = document.getElementById('hero-grid');
    if (!gridContainer) return;

    function createGrid() {
        gridContainer.innerHTML = '';
        const width = gridContainer.offsetWidth;
        const height = gridContainer.offsetHeight;
        const boxSize = 30;
        const cols = Math.ceil(width / boxSize);
        const rows = Math.ceil(height / boxSize);

        gridContainer.style.setProperty('--cols', cols);
        gridContainer.style.setProperty('--rows', rows);

        const totalBoxes = cols * rows;

        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('hero-grid-cell');
            gridContainer.appendChild(box);
        }
    }

    // NEW: Global mouse track to bypass overlay issues
    // NEW: Global mouse track to bypass overlay issues
    let lastIndex = -1;
    const cellTimeouts = new Map();

    window.addEventListener('mousemove', (e) => {
        const gridContainer = document.getElementById('hero-grid');
        if (!gridContainer) return;

        const rect = gridContainer.getBoundingClientRect();

        // Check if mouse is within grid bounds
        if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const boxSize = 30;
            const col = Math.floor(x / boxSize);
            const row = Math.floor(y / boxSize);

            const cols = Math.ceil(rect.width / boxSize);

            const index = col + (row * cols);
            const cells = gridContainer.children;

            if (cells[index]) {
                const currentCell = cells[index];

                // 1. Enter/Stay on Current: Ensure it's active immediately
                currentCell.classList.add('active');

                // If this cell was scheduled to fade out, cancel it (we returned to it)
                if (cellTimeouts.has(index)) {
                    clearTimeout(cellTimeouts.get(index));
                    cellTimeouts.delete(index);
                }

                // 2. Leave Previous: If we changed cells, schedule fade out for the old one
                if (lastIndex !== -1 && lastIndex !== index) {
                    const prevCell = cells[lastIndex];
                    if (prevCell) {
                        // Clear any old timer to be safe (though should be none if it was active)
                        if (cellTimeouts.has(lastIndex)) clearTimeout(cellTimeouts.get(lastIndex));

                        // Set trail decay (e.g. 150ms)
                        const timeoutId = setTimeout(() => {
                            prevCell.classList.remove('active');
                            cellTimeouts.delete(lastIndex);
                        }, 150);

                        cellTimeouts.set(lastIndex, timeoutId);
                    }
                }

                lastIndex = index;
            }
        } else {
            // Mouse left the grid area vertically
            if (lastIndex !== -1) {
                const cells = gridContainer.children;
                const prevCell = cells[lastIndex];
                if (prevCell) {
                    if (cellTimeouts.has(lastIndex)) clearTimeout(cellTimeouts.get(lastIndex));

                    const timeoutId = setTimeout(() => {
                        prevCell.classList.remove('active');
                        cellTimeouts.delete(lastIndex);
                    }, 150);
                    cellTimeouts.set(lastIndex, timeoutId);
                }
                lastIndex = -1;
            }
        }
    });

    let timeout;
    window.addEventListener('resize', () => {

        clearTimeout(timeout);
        timeout = setTimeout(createGrid, 100);
    });
    createGrid();
}

// --- HERO 3D ROULETTE SLIDER ---
// --- HERO 3D ROULETTE SLIDER (INFINITE FAN) ---
function initHeroSlider() {
    const track = document.getElementById('hero-slider-track');
    const container = document.getElementById('hero-slider-container');
    if (!track || !container) return;

    // Use a nice subset of images
    const images = [
        '/thumbnails/essential-25.jpg', '/thumbnails/essential-26.jpg', '/thumbnails/essential-6.jpg',
        '/thumbnails/essential-10.jpg', '/thumbnails/essential-30.jpg', '/thumbnails/essential-38.jpg',
        '/thumbnails/essential-33.jpg', '/thumbnails/essential-24.jpg', '/thumbnails/essential-18.jpg',
        '/thumbnails/essential-1.jpg', '/thumbnails/essential-2.jpg', '/thumbnails/essential-3.jpg'
    ];

    // Populate
    track.innerHTML = '';
    const cards = [];
    images.forEach(src => {
        const div = document.createElement('div');
        div.className = 'hero-card';
        const img = document.createElement('img');
        img.src = src;
        div.appendChild(img);
        track.appendChild(div);
        cards.push(div);
    });

    // START IN THE MIDDLE (e.g. index 4) to avoid empty left side initially
    let progress = 4;
    let targetProgress = 4;

    let isDown = false;
    let isHovered = false; // New state
    let startX = 0;
    let startProgress = 0;
    const autoSpeed = 0.002; // Slower speed

    // Config
    const CARD_SPACING = 0.55;
    const DRAG_SPEED = 0.003;
    const MAX_ROTATION = 40;

    function render() {
        if (!isDown && !isHovered) { // Pause on hover
            targetProgress += autoSpeed;
        }

        // Smooth Lerp
        progress += (targetProgress - progress) * 0.08;


        cards.forEach((card, i) => {
            // Infinite Scroll Math
            // We want 'i' to be relative to 'progress' in a looping world.
            const total = cards.length;

            // Calculate warped index distance (shortest path around the circle)
            let pos = ((i - progress) % total);
            if (pos < -total / 2) pos += total;
            if (pos > total / 2) pos -= total;

            // Hide items that are too far to save render cost/glitches
            if (Math.abs(pos) > 4) {
                card.style.display = 'none';
            } else {
                card.style.display = 'block';
            }

            // Visual Params
            const dist = Math.abs(pos);
            const active = 1 - Math.min(dist, 1);

            // 1. Spacing (X)
            const xOffset = pos * 350; // Pixels separation

            // 2. Scale (Center biggest)
            const scale = 1 - (dist * 0.15); // Decrease size as it goes out

            // 3. Rotation (Fan effect: Anchor is bottom)
            // Left items (pos < 0) rotate negative? No, fan style.
            const rotate = pos * 15; // 15 deg per unit distance

            // 4. Height/Y Offset (Arch effect)
            const yArch = Math.abs(pos * pos) * 10;

            // 5. Blur
            const blur = dist * 4; // 0 at center, increases outwardly

            // 6. Z-Index
            const zIndex = 100 - Math.round(dist * 10);

            // Apply
            // Combine translation + fan rotation
            card.style.transform = `
                translateX(${xOffset}px) 
                translateY(${yArch}px) 
                scale(${Math.max(0, scale)}) 
                rotate(${rotate}deg)
            `;
            card.style.zIndex = zIndex;
            card.style.filter = `blur(${blur}px)`;
            card.style.opacity = 1 - (dist * 0.15); // Slight fade

            // Highlight Center
            if (dist < 0.3) {
                card.style.borderColor = 'var(--green)';
                card.style.boxShadow = '0 0 50px var(--green)';
            } else {
                card.style.borderColor = 'rgba(255,255,255,0.1)';
                card.style.boxShadow = '0 20px 50px rgba(0,0,0,0.8)';
            }
        });

        requestAnimationFrame(render);
    }
    render();

    // Interaction
    const maxProg = (cards.length - 1) * CARD_SPACING;

    container.addEventListener('mouseenter', () => isHovered = true);
    container.addEventListener('mouseleave', () => isHovered = false);

    container.addEventListener('mousedown', e => {
        isDown = true;
        e.preventDefault(); // Stop text/image selection
        startX = e.clientX;
        startProgress = targetProgress;
        container.classList.add('active');
    });

    window.addEventListener('mousemove', e => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        // Infinite? We just let targetProgress go +/- infinity 
        // and the modulo logic in render handles the wrapping visual.
        targetProgress = startProgress - (dx * DRAG_SPEED);
    });

    window.addEventListener('mouseup', () => { isDown = false; container.classList.remove('active'); });

    // Touch
    container.addEventListener('touchstart', e => {
        isDown = true;
        startX = e.touches[0].clientX;
        startProgress = targetProgress;
    }, { passive: true });

    window.addEventListener('touchmove', e => {
        if (!isDown) return;
        const dx = e.touches[0].clientX - startX;
        targetProgress = startProgress - (dx * DRAG_SPEED);
        // Infinite on mobile: bounds checks removed so it keeps spinning
    }, { passive: false });

    window.addEventListener('touchend', () => { isDown = false; });
}

// --- INTERACTIVE BUBBLE (FAQ) ---
function initInteractiveBubble() {
    const interBubble = document.querySelector('.interactive');
    if (!interBubble) return;

    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(move);
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
}

// Ensure elements created by Alpine (like x-for loops) are ready before observing
// --- INITIALIZATION ORCHESTRATION ---
function startApp() {
    initHeroGrid();
    initHeroSlider();
    initGalaxyParticles();
    initRevealAnimations();
    initInteractiveBubble();
}

// 1. Run immediately (Module scripts defer automatically)
startApp();

// 2. Re-run animations after Alpine renders dynamic content (loops)
document.addEventListener('alpine:initialized', () => {
    setTimeout(() => {
        initRevealAnimations(); // Re-scan for new elements
    }, 100);
});

// 3. Fallback for any other load timing issues
window.addEventListener('load', startApp);
