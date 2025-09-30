// Мобильное меню бургер
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

// Закрытие мобильного меню
document.querySelectorAll('.header__nav-links').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('active');
    });
});






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




// Увеличение карточек при попадании в область видимости и возвращение обратно
function initCardAnimation() {
    const cards = document.querySelectorAll('.card');
    if (cards.length === 0) return;
    // Проверяем, что это мобильное устройство
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile) {
        // На десктопе сразу показываем все карточки
        cards.forEach(card => card.classList.add('visible'));
        return;
    }
    // Создаем Map для отслеживания состояния анимации карточек
    const cardAnimationState = new Map();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const card = entry.target;
            if (entry.isIntersecting) {
                // Карточка появляется в области видимости
                // Проверяем, была ли уже запущена анимация для этой карточки
                if (cardAnimationState.has(card)) {
                    // Отменяем предыдущий таймаут, если он есть
                    clearTimeout(cardAnimationState.get(card));
                }
                // Добавляем класс с небольшой задержкой для плавности
                const timeoutId = setTimeout(() => {
                    card.classList.add('visible');
                    cardAnimationState.delete(card); // Удаляем из Map после выполнения
                }, 100);
                cardAnimationState.set(card, timeoutId);
            } else {
                // Карточка уходит из области видимости
                // Отменяем анимацию появления, если она еще не выполнилась
                if (cardAnimationState.has(card)) {
                    clearTimeout(cardAnimationState.get(card));
                    cardAnimationState.delete(card);
                }
                // Убираем класс visible с небольшой задержкой
                const timeoutId = setTimeout(() => {
                    card.classList.remove('visible');
                    cardAnimationState.delete(card);
                }, 50);
                cardAnimationState.set(card, timeoutId);
            }
        });
    }, {
        threshold: 0.2, // Запускать когда 20% карточкивидно
        rootMargin: '0px 0px -50px 0px' // Небольшой отступ снизу
    });
    cards.forEach(card => observer.observe(card));
    // Возвращаем observer для возможности его отключения
    return observer;
}
// Сохраняем ссылку на observer для возможности очистки
let cardObserver = null;
// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    cardObserver = initCardAnimation();
});
// Переинициализация при изменении размера окна
window.addEventListener('resize', () => {
    // Отключаем старый observer
    if (cardObserver) {
        cardObserver.disconnect();
    }
    // Удаляем все классы visible
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('visible');
    });
    // Заново инициализируем с небольшой задержкой
    setTimeout(() => {
        cardObserver = initCardAnimation();
    }, 100);
});
// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initCardAnimation);
// Переинициализация при изменении размера окна
window.addEventListener('resize', () => {
    // Удаляем старые классы
    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('visible');
    });
    // Заново инициализируем
    setTimeout(initCardAnimation, 100);
});





// Сайт успешно загружен
console.log('DigitalStart сайт успешно загружен! 🚀');