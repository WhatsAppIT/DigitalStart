
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
function initContactForm() {
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
