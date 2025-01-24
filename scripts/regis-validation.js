let form = document.querySelector('#regis-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputLogin = document.querySelector('.js-input-login'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPassword = document.querySelector('.js-input-password'),
    inputConfirmPassword = document.querySelector('.js-input-password-confirm');

function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validateLogin(login) {
    let re = /^[a-zA-Zа-яА-Я]{3,15}$/;
    return re.test(login);
}

function validatePassword(password) {
    let re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

formInputs.forEach(input => {
    // При фокусе возвращаем плейсхолдер
    input.addEventListener('focus', function () {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.style.color = '';  // Возвращаем нормальный цвет
            this.placeholder = this.dataset.placeholder;  // Вернуть оригинальный плейсхолдер
        }
    });
});

form.onsubmit = async function (event) {
    event.preventDefault();

    let loginVal = inputLogin.value.trim(),
        emailVal = inputEmail.value.trim(),
        passwordVal = inputPassword.value.trim(),
        confirmPasswordVal = inputConfirmPassword.value.trim(),
        isValid = true;

    /* Очистка ошибок перед проверкой */
    formInputs.forEach(function(input) {
        input.classList.remove("error");
        input.placeholder = input.dataset.placeholder;  // Восстанавливаем оригинальный плейсхолдер
    });

    if (loginVal === '') {
        inputLogin.classList.add('error');
        inputLogin.value = '';
        inputLogin.style.color = 'red';
        inputLogin.placeholder = "Введите Login";
        isValid = false;
    } else if (!validateLogin(loginVal)) {
        inputLogin.classList.add('error');
        inputLogin.value = '';
        inputLogin.style.color = 'red';
        inputLogin.placeholder = "Введите от 3 до 15 симв.";
        isValid = false;
    }

    if (emailVal === '') {
        inputEmail.classList.add("error");
        inputEmail.value = '';  
        inputEmail.style.color = 'red';
        inputEmail.placeholder = "Введите Email!";
        isValid = false;
    } else if (!validateEmail(emailVal)) {
        inputEmail.classList.add("error");
        inputEmail.value = '';  
        inputEmail.style.color = 'red';
        inputEmail.placeholder = "Некорректный Email!";
        isValid = false;
    }

    if (passwordVal === '') {
        inputPassword.classList.add("error");
        inputPassword.value = '';  
        inputPassword.style.color = 'red';
        inputPassword.placeholder = "Введите пароль!";
        isValid = false;
    } else if (passwordVal.length < 8) {
        inputPassword.classList.add("error");
        inputPassword.value = '';  
        inputPassword.style.color = 'red';
        inputPassword.placeholder = "Мин. 8 символов!";
        isValid = false;
    } else if (!validatePassword(passwordVal)) {
        inputPassword.classList.add("error");
        inputPassword.value = '';  
        inputPassword.style.color = 'red';
        inputPassword.placeholder = "Нет цифры или буквы";
        isValid = false;
    }

    if (confirmPasswordVal === '') {
        inputConfirmPassword.classList.add("error");
        inputConfirmPassword.value = '';
        inputConfirmPassword.style.color = 'red';
        inputConfirmPassword.placeholder = "Подтвердите пароль!"
        isValid = false;
    } else if (confirmPasswordVal !== passwordVal) {
        inputConfirmPassword.classList.add("error");
        inputConfirmPassword.value = '';
        inputConfirmPassword.style.color = 'red';
        inputConfirmPassword.placeholder = "Пароли не совпадают!"
        isValid = false;
    }


    if (!isValid) {
        return;  // валидация не пройдена
    }

    // оттправка данных на сервер
    let formData = {
        login: loginVal,
        email: emailVal,
        password: passwordVal
    };

    try {
        let response = await fetch('/api/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let result = await response.json();

        if (response.ok) {
            alert(result.message);  // успешная регистрация
            window.location.href = "../index.html";  // перенаправление на страницу авторизации
        } else {
            alert(result.error || "Ошибка регистрации");
            inputLogin.classList.add("error");
            inputEmail.classList.add("error");
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert("Ошибка соединения с сервером. Попробуйте позже.");
    }
};
