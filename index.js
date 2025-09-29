// Включается лоадер 
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 10);
});

// // Меняет цвет хедера при прокрутке
// const header = document.querySelector('header');
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 100) {
//         header.classList.add('scrolled');
//     } else {
//         header.classList.remove('scrolled');
//     }
// });


// Функция для запуска эффекта при появлении в области видимости
function initTypeWriterOnScroll() {
    const heroTitle = document.querySelector('.services__title');
    const originalText = heroTitle.textContent;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroTitle, originalText, 50);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3, // Запускать когда 30% элемента видно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    });
    observer.observe(heroTitle);  // Начинаем наблюдение за элементом
}
document.addEventListener('DOMContentLoaded', initTypeWriterOnScroll);


// Плавное перемещение по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Плавная анимация при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

 document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Еффект печатания строки h1 title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
            
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Инициализация эффекта набора текста при загрузке страницы
// setTimeout(() => {
//     const heroTitle = document.querySelector('.services__title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }, 1500);

// Добавить индикатор прокрутки
const scrollIndicator = document.createElement('div');
scrollIndicator.style.cssText = `
    position: fixed;
    top: 0;            left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(135deg, #0027d6ff 0%, #764ba2 100%);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollIndicator);

window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollIndicator.style.width = scrollPercent + '%';
});

// Добавить анимацию щелчков к кнопкам
document.querySelectorAll('.form__button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255,255,255,0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
        ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Сайт успешно загружен
console.log('DigitalStart сайт успешно загружен! 🚀');