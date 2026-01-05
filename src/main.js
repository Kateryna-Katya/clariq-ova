document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Mobile Menu
    const burger = document.getElementById('burgerBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if(burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
            document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
        });
    }

    // 3. Animations
    const tl = gsap.timeline();
    tl.to('.loader-overlay', { scaleY: 0, duration: 1, ease: "expo.inOut" })
      .from('.hero__content > *', { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 });

    gsap.utils.toArray('.fade-up').forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: "top 90%" },
            y: 50, opacity: 0, duration: 1
        });
    });

    // 4. Captcha Logic
    const captchaLabel = document.getElementById('captchaLabel');
    const captchaInput = document.getElementById('captchaInput');
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    if(captchaLabel) captchaLabel.innerText = `${num1} + ${num2} = ?`;

    // 5. Form Validation & AJAX
    const form = document.getElementById('mainForm');
    const phoneInput = document.getElementById('phoneInput');
    const status = document.getElementById('formStatus');

    if(form) {
        // Только цифры в телефон
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (parseInt(captchaInput.value) !== (num1 + num2)) {
                alert('Неверный ответ капчи!');
                return;
            }

            // Имитация AJAX
            status.innerText = "Отправка...";
            status.className = "form-status success";
            status.style.display = "block";

            setTimeout(() => {
                status.innerText = "Спасибо! Мы свяжемся с вами в ближайшее время.";
                form.reset();
                // Обновляем капчу
                num1 = Math.floor(Math.random() * 10);
                num2 = Math.floor(Math.random() * 10);
                captchaLabel.innerText = `${num1} + ${num2} = ?`;
            }, 1500);
        });
    }

    // 6. Cookie Logic
    const cookie = document.getElementById('cookiePopup');
    if(!localStorage.getItem('clariq_cookies') && cookie) {
        setTimeout(() => cookie.classList.add('is-show'), 3000);
    }
    window.acceptCookies = () => {
        cookie.classList.remove('is-show');
        localStorage.setItem('clariq_cookies', 'true');
    };
    document.getElementById('acceptCookies').addEventListener('click', window.acceptCookies);
});