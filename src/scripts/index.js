// Мобильное меню бургер
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  burger.classList.toggle("active");
});

// Закрытие мобильного меню
document.querySelectorAll(".header__nav-links").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    burger.classList.remove("active");
  });
});

// Включается лоадер
window.addEventListener("load", () => {
  const loading = document.getElementById("loading");
  setTimeout(() => {
    loading.classList.add("hidden");
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
  const heroTitle = document.querySelector(".services__title");
  const originalText = heroTitle.textContent;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeWriter(heroTitle, originalText, 50);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3, // Запускать когда 30% элемента видно
      rootMargin: "0px 0px -50px 0px", // Небольшой отступ снизу
    },
  );
  observer.observe(heroTitle); // Начинаем наблюдение за элементом
}
document.addEventListener("DOMContentLoaded", initTypeWriterOnScroll);

// Плавное перемещение по якорным ссылкам
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Плавная анимация при прокрутке
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Еффект печатания строки h1 title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

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
const scrollIndicator = document.createElement("div");
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

window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollIndicator.style.width = scrollPercent + "%";
});

// Добавить анимацию щелчков к кнопкам
document.querySelectorAll(".form__button").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
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
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - rect.left - size / 2 + "px";
    ripple.style.top = e.clientY - rect.top - size / 2 + "px";

    this.style.position = "relative";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// // Увеличение карточек при попадании в область видимости и возвращение обратно
// function initCardAnimation() {
//   const cards = document.querySelectorAll(".card");
//   if (cards.length === 0) return;
//   // Проверяем, что это мобильное устройство
//   const isMobile = window.innerWidth <= 768;

//   if (!isMobile) {
//     // На десктопе сразу показываем все карточки
//     cards.forEach((card) => card.classList.add("visible"));
//     return;
//   }
//   // Создаем Map для отслеживания состояния анимации карточек
//   const cardAnimationState = new Map();
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         const card = entry.target;
//         if (entry.isIntersecting) {
//           // Карточка появляется в области видимости
//           // Проверяем, была ли уже запущена анимация для этой карточки
//           if (cardAnimationState.has(card)) {
//             // Отменяем предыдущий таймаут, если он есть
//             clearTimeout(cardAnimationState.get(card));
//           }
//           // Добавляем класс с небольшой задержкой для плавности
//           const timeoutId = setTimeout(() => {
//             card.classList.add("visible");
//             cardAnimationState.delete(card); // Удаляем из Map после выполнения
//           }, 100);
//           cardAnimationState.set(card, timeoutId);
//         } else {
//           // Карточка уходит из области видимости
//           // Отменяем анимацию появления, если она еще не выполнилась
//           if (cardAnimationState.has(card)) {
//             clearTimeout(cardAnimationState.get(card));
//             cardAnimationState.delete(card);
//           }
//           // Убираем класс visible с небольшой задержкой
//           const timeoutId = setTimeout(() => {
//             card.classList.remove("visible");
//             cardAnimationState.delete(card);
//           }, 50);
//           cardAnimationState.set(card, timeoutId);
//         }
//       });
//     },
//     {
//       threshold: 0.2, // Запускать когда 20% карточкивидно
//       rootMargin: "0px 0px -50px 0px", // Небольшой отступ снизу
//     },
//   );
//   cards.forEach((card) => observer.observe(card));
//   // Возвращаем observer для возможности его отключения
//   return observer;
// }
// // Сохраняем ссылку на observer для возможности очистки
// let cardObserver = null;
// // Инициализация при загрузке
// document.addEventListener("DOMContentLoaded", () => {
//   cardObserver = initCardAnimation();
// });
// // Переинициализация при изменении размера окна
// window.addEventListener("resize", () => {
//   // Отключаем старый observer
//   if (cardObserver) {
//     cardObserver.disconnect();
//   }
//   // Удаляем все классы visible
//   document.querySelectorAll(".card").forEach((card) => {
//     card.classList.remove("visible");
//   });
//   // Заново инициализируем с небольшой задержкой
//   setTimeout(() => {
//     cardObserver = initCardAnimation();
//   }, 100);
// });
// // Инициализация при загрузке
// document.addEventListener("DOMContentLoaded", initCardAnimation);
// // Переинициализация при изменении размера окна
// window.addEventListener("resize", () => {
//   // Удаляем старые классы
//   document.querySelectorAll(".card").forEach((card) => {
//     card.classList.remove("visible");
//   });
//   // Заново инициализируем
//   setTimeout(initCardAnimation, 100);
// });

// Продвинутая версия с настройками
class CardAnimator {
  constructor(options = {}) {
    this.options = {
      selector: ".card",
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
      animationType: "slide-up", // 'slide-up', 'slide-left', 'slide-right', 'scale', 'rotate'
      once: true, // Анимация только один раз или при каждом появлении
      ...options,
    };

    this.cards = document.querySelectorAll(this.options.selector);
    this.init();
  }

  init() {
    // Fallback для старых браузеров
    if (!("IntersectionObserver" in window)) {
      this.showAllCards();
      return;
    }

    // Добавляем класс типа анимации
    this.cards.forEach((card) => {
      card.classList.add(this.options.animationType);
    });

    // Создаем observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCard(entry.target);

            // Если анимация только один раз
            if (this.options.once) {
              this.observer.unobserve(entry.target);
            }
          } else if (!this.options.once) {
            // Убираем класс если карточка ушла из видимости
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: this.options.threshold,
        rootMargin: this.options.rootMargin,
      },
    );

    // Наблюдаем за карточками
    this.cards.forEach((card) => this.observer.observe(card));
  }

  animateCard(card) {
    card.classList.add("visible");

    // Опциональный callback
    if (typeof this.options.onAnimate === "function") {
      this.options.onAnimate(card);
    }
  }

  showAllCards() {
    this.cards.forEach((card) => card.classList.add("visible"));
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Использование
document.addEventListener("DOMContentLoaded", () => {
  new CardAnimator();
});

//////////////////////////////////////////////////////////////////////////////////////

// Отправка формы
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.submitButton = null;
    this.originalButtonText = "";
    this.serverUrl = "/api"; // URL вашего backend сервера
    // this.serverUrl = "http://localhost:3000"; // URL вашего backend сервера

    this.init();
  }

  init() {
    if (!this.form) {
      console.error('Форма с ID "contactForm" не найдена');
      return;
    }

    this.setupSubmitButton();
    this.bindEvents();
    this.setupCharCounter();
  }

  setupSubmitButton() {
    // Ищем кнопку отправки или создаем её
    this.submitButton =
      this.form.querySelector('button[type="submit"]') ||
      this.form.querySelector('input[type="submit"]');

    if (!this.submitButton) {
      // Если кнопки нет, создаем её
      this.submitButton = document.createElement("button");
      this.submitButton.type = "submit";
      this.submitButton.textContent = "Отправить заявку";
      this.submitButton.className = "form__submit-button";
      this.form.appendChild(this.submitButton);
    }

    this.originalButtonText = this.submitButton.textContent;
  }

  bindEvents() {
    this.form.addEventListener("submit", (e) => this.handleSubmit(e));
  }

  setupCharCounter() {
    // Ищем textarea и счетчик
    const textarea = this.form.querySelector("textarea");
    const charCount = document.getElementById("charCount");

    if (textarea && charCount) {
      // Устанавливаем начальное значение
      this.updateCharCount(textarea, charCount);

      // Добавляем обработчики событий
      textarea.addEventListener("input", () => {
        this.updateCharCount(textarea, charCount);
      });

      textarea.addEventListener("keyup", () => {
        this.updateCharCount(textarea, charCount);
      });

      textarea.addEventListener("paste", () => {
        // Небольшая задержка для paste события
        setTimeout(() => {
          this.updateCharCount(textarea, charCount);
        }, 10);
      });
    }
  }

  updateCharCount(textarea, charCountElement) {
    const currentLength = textarea.value.length;
    charCountElement.textContent = currentLength;

    // Можно добавить визуальную индикацию при приближении к лимиту
    const maxLength = 500;
    const parentCounter = charCountElement.closest(".form__char-counter");

    if (parentCounter) {
      if (currentLength > maxLength * 0.9) {
        // 90% от лимита
        parentCounter.style.color = "#ff6b6b";
      } else if (currentLength > maxLength * 0.7) {
        // 70% от лимита
        parentCounter.style.color = "#ffa500";
      } else {
        parentCounter.style.color = "#666";
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = this.collectFormData();
    console.log("Отправляем данные:", formData); // Для отладки

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
      name: this.getFieldValue("profileName"),
      phone: this.getFieldValue("profileNumber"),
      company: this.getFieldValue("profileCompany"),
      budget: this.getSelectText("profileMoney"),
      services: this.getSelectedServices(),
      message: this.generateMessage(),
      aboutCompany: this.getFieldValue("profileAboutCompany"),
    };

    // Используем телефон как email если email не указан отдельно
    data.email = this.getFieldValue("profileEmail") || data.phone + "@temp.com";

    return data;
  }

  getFieldValue(fieldId) {
    const field = document.getElementById(fieldId);
    return field ? field.value.trim() : "";
  }

  getSelectText(selectId) {
    const select = document.getElementById(selectId);
    if (!select || !select.value) return "";

    const selectedOption = select.options[select.selectedIndex];
    return selectedOption ? selectedOption.textContent : "";
  }

  getSelectedServices() {
    const services = [];
    const checkboxes = this.form.querySelectorAll(
      'input[type="checkbox"]:checked',
    );

    checkboxes.forEach((checkbox) => {
      const label = this.form.querySelector(`label[for="${checkbox.id}"]`);
      if (label) {
        services.push(label.textContent.trim());
      }
    });

    return services;
  }

  generateMessage() {
    const name = this.getFieldValue("profileName");
    const description = this.getFieldValue("profileAboutCompany");
    const company = this.getFieldValue("profileCompany");
    const phone = this.getFieldValue("profileNumber");
    const budget = this.getSelectText("profileMoney");
    const services = this.getSelectedServices();

    let message = `Новая заявка с сайта:\n\n`;
    if (name) message += `Имя: ${name}\n`;
    if (company) message += `Компания: ${company}\n`;
    if (phone) message += `Телефон: ${phone}\n`;
    if (budget) message += `Бюджет: ${budget}\n`;
    if (services.length > 0) {
      message += `Услуги: ${services.join(", ")}\n`;
    }
    if (description) message += `О проекте: ${description}\n`;

    return message;
  }

  async sendFormData(data) {
    const response = await fetch(`${this.serverUrl}/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  setLoadingState(isLoading) {
    if (!this.submitButton) return;

    if (isLoading) {
      this.submitButton.disabled = true;
      this.submitButton.textContent = "Отправка...";
    } else {
      this.submitButton.disabled = false;
      this.submitButton.textContent = this.originalButtonText;
    }
  }

  handleSuccess() {
    this.showNotification("Заявка успешно отправлена!", "success");
    this.form.reset();

    // Сбрасываем счетчик символов
    const charCount = document.getElementById("charCount");
    if (charCount) {
      charCount.textContent = "0";
      const parentCounter = charCount.closest(".form__char-counter");
      if (parentCounter) {
        parentCounter.style.color = "#666";
      }
    }
  }

  handleError(error) {
    console.error("Ошибка отправки формы:", error);
    this.showNotification(
      "Произошла ошибка при отправке. Попробуйте еще раз.",
      "error",
    );
  }

  showNotification(message, type = "info") {
    // Создаем уведомление
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          background: ${type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"};
          color: white;
          border-radius: 4px;
          z-index: 1000;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          opacity: 0;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          `;

    document.body.appendChild(notification);

    // Анимация появления
    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateY(0)";
    }, 100);

    // Удаление через 5 секунд
    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-10px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  new ContactForm();
});

/////////////////////////////////////////////////////////////////////
// Валидация полей формы

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const submitButton = document.querySelector(".form__submit-button");
  const charCountSpan = document.getElementById("charCount");
  const charCountContainer = document.querySelector(".form__char-counter");

  // Объект с правилами валидации
  const validationRules = {
    profileName: {
      required: true,
      minLength: 2,
      maxLength: 40, // Добавлено ограничение в 40 символов
      pattern: /^[а-яА-Яa-zA-Z\s]+$/,
      errorMessage: "От 2 до 40 символов",
    },
    profileNumber: {
      required: true,
      pattern: /^[\+]?[0-9\s\-\(\)]{10,15}$/,
      errorMessage: "Введите корректный номер телефона",
    },
    profileCompany: {
      required: false,
      minLength: 2,
      maxLength: 40, // Добавлено ограничение в 40 символов
      errorMessage: "От 2 до 40 символов",
    },
    profileMoney: {
      required: true,
      errorMessage: "Выберите примерный бюджет",
    },
    profileAbout: {
      required: true,
      minLength: 10,
      maxLength: 500,
      errorMessage: "Описание проекта должно быть от 10 до 500 символов",
    },
    profilePrivacy: {
      // замените на ID вашего чекбокса
      required: true,
      errorMessage: "Необходимо принять условия",
    },
  };

  // Объект для отслеживания состояния полей
  const fieldStates = {};

  // Функция сброса формы в исходное состояние
  function resetFormToInitialState() {
    const formFields = form.querySelectorAll("input, select, textarea");

    formFields.forEach((field) => {
      const fieldName = field.id;
      const errorSpan = document.getElementById(`error-${fieldName}`);

      // Сбрасываем значения
      field.value = "";

      // Убираем все классы состояний
      field.classList.remove("typing", "invalid", "valid");

      // Скрываем ошибки
      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.classList.remove("show");
      }

      // Сбрасываем состояние поля
      fieldStates[fieldName] = {
        hasStartedTyping: false,
        isEmpty: true,
      };
    });

    // Сбрасываем счетчик символов
    if (charCountSpan) {
      charCountSpan.textContent = "0";
      charCountContainer.classList.remove("over-limit");
    }

    // Блокируем кнопку
    if (submitButton) {
      submitButton.disabled = true;
    }
  }

  // Функция валидации отдельного поля
  function validateField(field) {
    const fieldName = field.id;
    const rules = validationRules[fieldName];
    const value = field.value.trim();

    if (!rules)
      return { isValid: true, errorMessage: "", hasValue: value.length > 0 };

    let isValid = true;
    let errorMessage = "";

    // Для чекбокса проверяем checked
    if (field.type === "checkbox") {
      if (rules.required && !field.checked) {
        isValid = false;
        errorMessage = rules.errorMessage;
      }
      return { isValid, errorMessage, hasValue: field.checked };
    }

    // Проверка обязательности
    if (rules.required && !value) {
      isValid = false;
      errorMessage = "Это поле обязательно для заполнения";
    }
    // Проверка минимальной длины
    else if (
      rules.minLength &&
      value.length > 0 &&
      value.length < rules.minLength
    ) {
      isValid = false;
      errorMessage = rules.errorMessage;
    }
    // Проверка максимальной длины
    else if (rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      errorMessage = rules.errorMessage;
    }
    // Проверка паттерна
    else if (rules.pattern && value.length > 0 && !rules.pattern.test(value)) {
      isValid = false;
      errorMessage = rules.errorMessage;
    }
    // Для select проверяем выбранное значение
    else if (field.tagName === "SELECT" && rules.required && !value) {
      isValid = false;
      errorMessage = rules.errorMessage;
    }

    return { isValid, errorMessage, hasValue: value.length > 0 };
  }

  // Функция обновления визуального состояния поля
  function updateFieldState(field, validationResult) {
    const fieldName = field.id;
    const errorSpan = document.getElementById(`error-${fieldName}`);
    const state = fieldStates[fieldName];

    // Обновляем классы поля
    field.classList.remove("invalid", "valid", "typing");

    if (state.hasStartedTyping) {
      if (!state.isEmpty) {
        if (validationResult.isValid) {
          field.classList.add("valid");
        } else {
          field.classList.add("invalid");
        }
      }
    }

    // Обновляем сообщение об ошибке
    if (errorSpan) {
      if (
        state.hasStartedTyping &&
        !validationResult.isValid &&
        !state.isEmpty
      ) {
        errorSpan.textContent = validationResult.errorMessage;
        errorSpan.classList.add("show");
      } else {
        errorSpan.textContent = "";
        errorSpan.classList.remove("show");
      }
    }
  }

  // Функция проверки валидности всей формы
  function checkFormValidity() {
    const formFields = form.querySelectorAll("input, select, textarea");
    let isFormValid = true;

    formFields.forEach((field) => {
      const validation = validateField(field);
      if (!validation.isValid && validationRules[field.id]?.required) {
        isFormValid = false;
      }
    });

    if (submitButton) {
      submitButton.disabled = !isFormValid;
    }

    return isFormValid;
  }

  // Инициализация обработчиков событий
  function initEventListeners() {
    const formFields = form.querySelectorAll("input, select, textarea");

    formFields.forEach((field) => {
      const fieldName = field.id;

      // Инициализируем состояние поля
      fieldStates[fieldName] = {
        hasStartedTyping: false,
        isEmpty: true,
      };

      // Обработчик для checkbox
      if (field.type === "checkbox") {
        field.addEventListener("change", function () {
          const state = fieldStates[fieldName];
          state.hasStartedTyping = true;
          state.isEmpty = !this.checked;

          const validation = validateField(this);
          updateFieldState(this, validation);
          checkFormValidity();
        });
      }

      // Обработчик ввода
      field.addEventListener("input", function () {
        const state = fieldStates[fieldName];
        state.hasStartedTyping = true;
        state.isEmpty = this.value.trim().length === 0;

        // Валидируем поле
        const validation = validateField(this);
        updateFieldState(this, validation);
        // Проверяем валидность формы
        checkFormValidity();
      });

      // Обработчик потери фокуса
      field.addEventListener("blur", function () {
        const state = fieldStates[fieldName];
        if (state.hasStartedTyping) {
          const validation = validateField(this);
          updateFieldState(this, validation);
        }
      });

      // Обработчик для select
      if (field.tagName === "SELECT") {
        field.addEventListener("change", function () {
          const state = fieldStates[fieldName];
          state.hasStartedTyping = true;
          state.isEmpty = !this.value;

          const validation = validateField(this);
          updateFieldState(this, validation);
          checkFormValidity();
        });
      }
    });

    // Обработчик отправки формы
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (checkFormValidity()) {
          // Здесь код отправки формы
          // console.log("Форма валидна, можно отправлять");
          resetFormToInitialState(); // Раскомментировать после успешной отправки
        }
      });
    }
  }

  // Инициализация
  initEventListeners();
  checkFormValidity(); // Проверяем начальное состояние формы
});

//////////////////////////////////////////////////////////////////////////////////////////////////

// Функция замена текста в h2 каждые 2 секунды покругу .landing__title
// Универсальная функция для слайдера текста
function initTextSlider(selector, texts, interval = 2000) {
  const titleElement = document.querySelector(selector);

  if (!titleElement) {
    return;
  }

  let currentIndex = 0;

  // Создаем все элементы сразу
  titleElement.innerHTML = "";
  texts.forEach((text, index) => {
    const span = document.createElement("span");
    span.className = `text-slide ${index === 0 ? "active" : ""}`;
    span.textContent = text;
    titleElement.appendChild(span);
  });

  function changeText() {
    const currentSpan = titleElement.children[currentIndex];
    const nextIndex = (currentIndex + 1) % texts.length;
    const nextSpan = titleElement.children[nextIndex];

    currentSpan.classList.add("slide-out-up");
    currentSpan.classList.remove("active");
    nextSpan.classList.add("slide-in-down");

    setTimeout(() => {
      currentSpan.classList.remove("slide-out-up");
      nextSpan.classList.remove("slide-in-down");
      nextSpan.classList.add("active");
      currentIndex = nextIndex;
    }, 300);
  }

  setInterval(changeText, interval);
}

// Инициализация всех слайдеров
document.addEventListener("DOMContentLoaded", () => {
  // Главная страница
  if (document.querySelector(".landing__title")) {
    initTextSlider(".landing__title", [
      "Контекстная реклама",
      "Таргетинговая реклама",
      "SMM-продвижение",
      "SEO-продвижение",
    ]);
  }

  // Страница лендингов
  if (document.querySelector(".landing__title-websait")) {
    initTextSlider(".landing__title-websait", [
      "Лендинг",
      "Сайт-визитка",
      "Квиз",
      "Многостраничный сайт",
      "Информационный сайт",
    ]);
  }

  // Страница context
  if (document.querySelector(".landing__title-multipage")) {
    initTextSlider(".landing__title-multipage", [
      "Многостраничные сайты",
      "Корпоративные сайты",
      "Сайты-каталоги",
      "Бизнес-сайты",
    ]);
  }

  // Страница target
  if (document.querySelector(".landing__title-shop")) {
    initTextSlider(".landing__title-shop", [
      "Интернет-магазины",
      "E-commerce сайты",
      "Онлайн-магазины",
      "Торговые площадки",
    ]);
  }

  // Страница SEO
  if (document.querySelector(".landing__title-seo")) {
    initTextSlider(".landing__title-seo", [
      "SEO-продвижение",
      "Поисковая оптимизация",
      "Продвижение в Google",
      "Рост позиций в поиске",
    ]);
  }
});

////////////////////////////////////////////////////////////////////////////

// Cookie Notice Manager (Simplified)
class CookieNotice {
  constructor() {
    this.notice = document.getElementById("cookieNotice");
    this.acceptBtn = document.getElementById("cookieAccept");
    this.init();
  }

  init() {
    // Check if user already accepted
    if (!this.getCookie("cookieAccepted")) {
      this.show();
    }

    // Accept button click
    this.acceptBtn?.addEventListener("click", () => {
      this.accept();
    });
  }

  show() {
    if (this.notice) {
      this.notice.classList.add("show");
    }
  }

  hide() {
    if (this.notice) {
      this.notice.classList.remove("show");
    }
  }

  accept() {
    // Set cookie for 1 year
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookieAccepted=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

    this.hide();
    console.log("Cookies accepted");
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new CookieNotice();
});

/////////////////////////////////////////////////////////////////////////////////////////////////

// секция FAQ ответы на вопросы - открытие

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq__item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq__question");

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Закрываем все элементы
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });

      // Если элемент не был активным, открываем его
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////

// Обработка кликов по кнопкам
document.querySelectorAll(".btn-order").forEach((button) => {
  button.addEventListener("click", function () {
    const card = this.closest(".pricing-card");
    const planName = card.querySelector(".card-title").textContent;
    const price = card.querySelector(".card-price").textContent;

    alert(`Вы выбрали план: ${planName}\nЦена: ${price}`);

    // Здесь можно добавить:
    // - Открытие модального окна
    // - Переход на страницу оформления заказа
    // - Отправку данных на сервер

    console.log("Выбран тариф:", planName);
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////

// EXAMPLE SECTION

// Переключение между категориями лендингов
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const contentContainers = document.querySelectorAll(".content-container");

  console.log("=== ИНИЦИАЛИЗАЦИЯ ===");
  console.log("Найдено кнопок:", categoryButtons.length);
  console.log("Найдено контейнеров:", contentContainers.length);

  // Проверяем все кнопки
  categoryButtons.forEach((btn, index) => {
    console.log(`Кнопка ${index}:`, {
      текст: btn.textContent.trim(),
      "data-category": btn.getAttribute("data-category"),
      элемент: btn,
    });
  });

  // Проверяем все контейнеры
  contentContainers.forEach((container, index) => {
    console.log(`Контейнер ${index}:`, {
      "data-content": container.getAttribute("data-content"),
      элемент: container,
    });
  });

  // Функция переключения контента
  function switchCategory(category) {
    console.log("=== ПЕРЕКЛЮЧЕНИЕ НА:", category, "===");

    // 1. Убираем active у всех кнопок
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    // 2. Добавляем active к нужной кнопке
    const activeButton = document.querySelector(
      `.category-btn[data-category="${category}"]`,
    );
    if (activeButton) {
      activeButton.classList.add("active");
      console.log("✓ Кнопка активирована:", category);
    } else {
      console.error("✗ Кнопка не найдена:", category);
    }

    // 3. Скрываем все контейнеры
    contentContainers.forEach((container) => {
      container.classList.remove("active");
      container.style.display = "none";
      console.log("Скрыт контейнер:", container.getAttribute("data-content"));
    });

    // 4. Показываем нужный контейнер
    const targetContainer = document.querySelector(
      `.content-container[data-content="${category}"]`,
    );

    console.log('Ищем контейнер с data-content="' + category + '"');
    console.log("Найденный контейнер:", targetContainer);

    if (targetContainer) {
      targetContainer.classList.add("active");
      targetContainer.style.display = "grid";
      console.log("✓ Контейнер показан:", category);
    } else {
      console.error("✗ ОШИБКА: Контейнер не найден для категории:", category);
      console.log("Доступные контейнеры:");
      contentContainers.forEach((c) => {
        console.log("  -", c.getAttribute("data-content"));
      });
    }
  }

  // Добавляем обработчики на кнопки
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const category = this.getAttribute("data-category");
      console.log("\n>>> КЛИК ПО КНОПКЕ:", category);
      switchCategory(category);
    });
  });

  // Инициализация - показываем первую категорию
  if (categoryButtons.length > 0) {
    const firstCategory = categoryButtons[0].getAttribute("data-category");
    console.log("\n=== НАЧАЛЬНАЯ ИНИЦИАЛИЗАЦИЯ ===");
    switchCategory(firstCategory);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////

// Данные для разных категорий лендингов
const landingData = {
  ecommerce: {
    title: "Лендинги для интернет-магазинов",
    description:
      "Страницы, ориентированные на товары, разработанные для стимулирования продаж с убедительными презентациями товаров, отзывами клиентов и упрощенным процессом оформления заказа.",
    features: [
      "Витрина товаров с качественными изображениями",
      "Отзывы и рецензии клиентов",
      "Значки доверия и индикаторы безопасности",
      "Упрощенный процесс покупки",
      "Элементы срочности и дефицита",
    ],
    idealFor:
      "Запуск товаров, сезонные распродажи, д�опшиппинг, коробки подписок, цифровые товары",
    image: "",
  },
  services: {
    title: "Лендинги для услуг",
    description:
      "Профессиональные страницы для презентации ваших услуг с акцентом на экспертность, результаты работы и простоту связи с клиентами.",
    features: [
      "Описание услуг и преимуществ",
      "Портфолио выполненных проектов",
      "Отзывы довольных клиентов",
      "Простая форма заявки",
      "Калькулятор стоимости услуг",
    ],
    idealFor:
      "Консалтинг, юридические услуги, ремонт, обучение, маркетинговые агентства",
    image: "",
  },
  // saas: {
  //   title: 'Лендинги для SaaS',
  //   description: 'Современные страницы для программных продуктов с демонстрацией функционала, тарифных планов и возможностью бесплатного тестирования.',
  //   features: [
  //     'Интерактивная демонстрация продукта',
  //     'Сравнение тарифных планов',
  //     'Интеграции с другими сервисами',
  //     'Бесплатный пробный период',
  //     'Видео-презентация функционала'
  //   ],
  //   idealFor: 'Облачные сервисы, CRM-системы, инструменты автоматизации, аналитические платформы',
  //       image: ''
  // },
  events: {
    title: "Лендинги для мероприятий",
    description:
      "Яркие и информативные страницы для продвижения мероприятий с расписанием, информацией о спикерах и удобной регистрацией.",
    features: [
      "Таймер обратного отсчета",
      "Информация о спикерах и программе",
      "Форма быстрой регистрации",
      "Карта проезда к месту события",
      "Галерея прошлых мероприятий",
    ],
    idealFor:
      "Конференции, вебинары, концерты, выставки, корпоративные мероприятия",
    image: "./image/2366e356d88b71b6d77794281e247b5d.jpg",
  },
};

// Инициализация при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-btn");
  const contentCard = document.querySelector(".content-card");

  // Добавляем классы для идентификации
  categoryButtons.forEach((btn, index) => {
    const categories = ["ecommerce", "services", "events"];
    btn.setAttribute("data-category", categories[index]);
  });

  // Обработчик клика на кнопки категорий
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.getAttribute("data-category");

      // Убираем активный класс со всех кнопок
      categoryButtons.forEach((btn) => {
        btn.classList.remove("active", "bg-blue-600", "text-white");
        btn.classList.add("text-gray-600", "hover:bg-gray-100");
      });

      // Добавляем активный класс к текущей кнопке
      this.classList.add("active", "bg-blue-600", "text-white");
      this.classList.remove("text-gray-600", "hover:bg-gray-100");

      // Обновляем контент
      updateContent(category);
    });
  });

  // Функция обновления контента
  function updateContent(category) {
    const data = landingData[category];
    const contentCard = document.querySelector(".content-card");

    setTimeout(() => {
      // Обновляем заголовок
      const title = contentCard.querySelector("h3");
      title.textContent = data.title;

      // Обновляем описание
      const description = contentCard.querySelector("p.text-lg");
      description.textContent = data.description;

      // Обновляем список функций
      const featuresList = contentCard.querySelector(".space-y-4");
      featuresList.innerHTML = "";
      data.features.forEach((feature, index) => {
        const featureItem = document.createElement("div");
        featureItem.className = "flex items-center space-x-3 checklist-item";
        featureItem.innerHTML = `
          <i class="ri-check-line text-green-500 check-icon"></i>
          <span>${feature}</span>
        `;
        featuresList.appendChild(featureItem);
      });

      // Обновляем блок "Идеально для"
      const idealForText = contentCard.querySelector(".bg-blue-50 p");
      idealForText.textContent = data.idealFor;

      // Обновляем изображение
      const image = contentCard.querySelector("img");
      image.src = data.image;
      image.alt = data.title;

      // Добавляем анимацию появления
      contentCard.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      contentCard.style.opacity = "1";
      contentCard.style.transform = "translateY(0)";
    }, 300);
  }

  // Добавляем классы для анимации
  const contentCardElement = document.querySelector(".bg-white.rounded-3xl");
  if (contentCardElement) {
    contentCardElement.classList.add("content-card");
  }

  // Добавляем классы к чек-листу
  const checklistItems = document.querySelectorAll(".space-y-4 > div");
  checklistItems.forEach((item) => {
    item.classList.add("checklist-item");
  });

  // Добавляем класс к блоку "Идеально для"
  const idealForBlock = document.querySelector(".bg-blue-50");
  if (idealForBlock) {
    idealForBlock.classList.add("ideal-for-block");
  }

  // Добавляем класс к �зображению
  const image = document.querySelector(".rounded-2xl.shadow-lg.w-full");
  if (image) {
    image.classList.add("landing-image");
  }

  // Intersection Observer для анимации при скролле
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, observerOptions);

  // Наблюдаем за секцией
  const section = document.querySelector(".landing-examples");
  if (section) {
    observer.observe(section);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////

// Анимация появления карточек при скролле
// const observerOptions = {
//     threshold: 0.1,
//     rootMargin: '0px 0px -50px 0px'
// };

// const observer = new IntersectionObserver(function(entries) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             entry.target.style.opacity = '0';
//             entry.target.style.transform = 'translateY(20px)';

//             setTimeout(() => {
//                 entry.target.style.transition = 'all 0.6s ease';
//                 entry.target.style.opacity = '1';
//                 entry.target.style.transform = 'translateY(0)';
//             }, 100);

//             observer.unobserve(entry.target);
//         }
//     });
// }, observerOptions);

document.querySelectorAll(".pricing-card").forEach((card) => {
  observer.observe(card);
});

// Сайт успешно загружен
// console.log("DigitalStart сайт успешно загружен! 🚀");

// Инициализация эффекта набора текста при загрузке страницы
// setTimeout(() => {
//     const heroTitle = document.querySelector('.services__title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }, 1500);

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
// function initTypeWriterOnScroll() {
//   const heroTitle = document.querySelector(".services__title");
//   const originalText = heroTitle.textContent;
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           typeWriter(heroTitle, originalText, 50);
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     {
//       threshold: 0.3, // Запускать когда 30% элемента видно
//       rootMargin: "0px 0px -50px 0px", // Небольшой отступ снизу
//     },
//   );
//   observer.observe(heroTitle); // Начинаем наблюдение за элементом
// }
// document.addEventListener("DOMContentLoaded", initTypeWriterOnScroll);

// // Плавное перемещение по якорным ссылкам
// document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
//   anchor.addEventListener("click", function (e) {
//     e.preventDefault();
//     const target = document.querySelector(this.getAttribute("href"));
//     if (target) {
//       target.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   });
// });
