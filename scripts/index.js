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

//////////////////////////////////////////////////////////////////////////////////////
// Отправка формы
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitButton = null;
        this.originalButtonText = '';
        this.serverUrl = 'http://localhost:3000'; // URL вашего backend сервера
        
        this.init();
    }

    init() {
        if (!this.form) {
            console.error('Форма с ID "contactForm" не найдена');
            return;
        }

        this.setupSubmitButton();
        this.bindEvents();
        this.setupValidation();
    }

    setupSubmitButton() {
        // Ищем кнопку отправки или создаем её
        this.submitButton = this.form.querySelector('button[type="submit"]') || 
                           this.form.querySelector('input[type="submit"]');
        
        if (!this.submitButton) {
            // Если кнопки нет, создаем её
            this.submitButton = document.createElement('button');
            this.submitButton.type = 'submit';
            this.submitButton.textContent = 'Отправить заявку';
            this.submitButton.className = 'form__submit-button';
            this.form.appendChild(this.submitButton);
        }

        this.originalButtonText = this.submitButton.textContent;
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Добавляем валидацию в реальном времени
        const inputs = this.form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    setupValidation() {
        // Настройка валидации для телефона
        const phoneInput = document.getElementById('profileNumber');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                // Оставляем только цифры, +, -, (, ), пробелы
                e.target.value = e.target.value.replace(/[^\d\+\-\(\)\s]/g, '');
            });
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        const formData = this.collectFormData();
        console.log('Отправляем данные:', formData); // Для отладки
        
        try {
            this.setLoadingState(true);
            await this.sendFormData(formData);
            this.handleSuccess();
        } catch (error) {
            this.handleError(error);
        } finally {
            this.setLoadingState(false);
        }
    }

    collectFormData() {
        const data = {
            name: this.getFieldValue('profileName'),
            phone: this.getFieldValue('profileNumber'),
            company: this.getFieldValue('profileCompany'),
            budget: this.getSelectText('profileMoney'),
            services: this.getSelectedServices(),
            message: this.generateMessage()
        };

        // Используем телефон как email если email не указан отдельно
        data.email = this.getFieldValue('profileEmail') || data.phone + '@temp.com';

        return data;
    }

    getFieldValue(fieldId) {
        const field = document.getElementById(fieldId);
              return field ? field.value.trim() : '';
    }

    getSelectText(selectId) {
        const select = document.getElementById(selectId);
        if (!select || !select.value) return '';
        
        const selectedOption = select.options[select.selectedIndex];
        return selectedOption ? selectedOption.textContent : '';
    }

    getSelectedServices() {
        const services = [];
        const checkboxes = this.form.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(checkbox => {
            const label = this.form.querySelector(`label[for="${checkbox.id}"]`);
            if (label) {
                services.push(label.textContent.trim());
            }
        });

        return services;
    }

    generateMessage() {
        const name = this.getFieldValue('profileName');
        const company = this.getFieldValue('profileCompany');
        const budget = this.getSelectText('profileMoney');
        const services = this.getSelectedServices();

        let message = `Заявка от ${name}`;
        
        if (company) {
            message += ` из компании "${company}"`;
        }

        if (budget) {
            message += `\n\nБюджет: ${budget}`;
        }

        if (services.length > 0) {
            message += `\n\nИнтересующие услуги: ${services.join(', ')}`;
        }

        message += `\n\nДата подачи заявки: ${new Date().toLocaleString('ru-RU')}`;

        return message;
    }

    async sendFormData(data) {
        const response = await fetch(`${this.serverUrl}/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка отправки формы');
        }

        return await response.json();
    }

    validateForm() {
        let isValid = true;
        
        // Обязательные поля
        const requiredFields = [
            { id: 'profileName', name: 'Имя' },
            { id: 'profileNumber', name: 'Контакт' },
            { id: 'profileMoney', name: 'Бюджет' }
        ];

        requiredFields.forEach(field => {
            const fieldElement = document.getElementById(field.id);
            if (fieldElement && !this.validateField(fieldElement)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        if (!field) return true;

        const value = field.value.trim();
        let errorMessage = '';

        // Проверка обязательных полей
        if (field.hasAttribute('required') && !value) {
            errorMessage = 'Это поле обязательно для заполнения';
        }
        
        // Специфичная валидация
        else if (field.id === 'profileName' && value.length < 2) {
            errorMessage = 'Имя должно содержать минимум 2 символа';
        }
        
        else if (field.id === 'profileNumber' && value && !this.isValidPhone(value)) {
            errorMessage = 'Введите корректный номер телефона';
        }

        this.showFieldError(field, errorMessage);
        return !errorMessage;
    }

    isValidPhone(phone) {
        // Простая проверка телефона (минимум 10 цифр)
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    }

    showFieldError(field, message) {
        const errorElement = document.getElementById(`error-${field.id}`);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }

        // Добавляем/убираем класс ошибки
        if (field && field.classList) {
            field.classList.toggle('error', !!message);
        }
    }

    clearError(field) {
        this.showFieldError(field, '');
    }

    setLoadingState(isLoading) {
        if (this.submitButton) {
            this.submitButton.disabled = isLoading;
            this.submitButton.textContent = isLoading ? 'Отправка...' : this.originalButtonText;
        }

        // Блокируем все поля формы
        const formElements = this.form.querySelectorAll('input, select, textarea, button');
        formElements.forEach(element => {
            element.disabled = isLoading;
        });
    }

    handleSuccess() {
        this.showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
        this.form.reset();
        this.clearAllErrors();
    }

    handleError(error) {
        console.error('Ошибка отправки формы:', error);
        this.showNotification(
            error.message || 'Произошла ошибка при отправке заявки. Попробуйте еще раз.', 
            'error'
        );
    }

    clearAllErrors() {
        const errorElements = this.form.querySelectorAll('[id^="error-"]');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });

        const fields = this.form.querySelectorAll('.error');
        fields.forEach(field => field.classList.remove('error'));
    }

    showNotification(message, type = 'info') {
        // Удаляем предыдущие уведомления
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Создаем уведомление
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <span class="notification__message">${message}</span>
                <button class="notification__close">&times;</button>
            </div>
        `;

        // Добавляем стили если их нет
        this.ensureNotificationStyles();

        // Добавляем в DOM
        document.body.appendChild(notification);

        // Обработчик закрытия
        const closeBtn = notification.querySelector('.notification__close');
        closeBtn.addEventListener('click', () => {
            notification.remove();
        });

        // Автоматическое скрытие через 5 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Анимация появления
        setTimeout(() => {
            notification.classList.add('notification--show');
        }, 100);
    }

    ensureNotificationStyles() {
        if (document.getElementById('notification-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
                opacity: 0;
                transform: translateX(100%);
                transition: all 0.3s ease;
            }
            
            .notification--show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .notification__content {
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-family: inherit;
            }
            
            .notification--success .notification__content {
                background: #4CAF50;
                color: white;
            }
            
            .notification--error .notification__content {
                background: #f44336;
                color: white;
            }
            
            .notification--info .notification__content {
                background: #2196F3;
                color: white;
            }
            
            .notification__message {
                margin-right: 12px;
                line-height: 1.4;
            }
            
            .notification__close {
                background: none;
                border: none;
                color: inherit;
                font-size: 20px;
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: background-color 0.2s ease;
            }
            
            .notification__close:hover {
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .form__table_data-input.error {
                border-color: #f44336 !important;
                box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
            }
            
            .form__error {
                display: none;
                color: #f44336;
                font-size: 12px;
                margin-top: 4px;
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Инициализация формы
export default function initContactForm() {
    if (document.getElementById('contactForm')) {
        new ContactForm();
    }
}

// Инициализация после загрузки DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactForm);
} else {
    initContactForm();
}









//////////////////////////////////////////////////////////////////////////////////////////////////
// Сайт успешно загружен
console.log('DigitalStart сайт успешно загружен! 🚀');