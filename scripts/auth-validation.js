let form = document.querySelector('#auth-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPassword = document.querySelector('.js-input-password');

function validateEmail(email) {
    let re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    let re = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return re.test(password);
}

// удаление ошибок при фокусе на поле ввода
formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.value = '';
            this.style.color = '';
            this.placeholder = this.dataset.placeholder;  // оригинальный плейсхолдер вернуть
        }
    });
});

form.onsubmit = async function (event) {
    event.preventDefault(); 

    let emailVal = inputEmail.value.trim(),
        passwordVal = inputPassword.value.trim(),
        isValid = true;

    // очистка ошибок перед проверкой
    formInputs.forEach(function(input) {
        input.classList.remove("error");
        input.placeholder = input.dataset.placeholder;
    });

    // проверка полей на валидность
    if (emailVal === '') {
        inputEmail.classList.add("error");
        inputEmail.placeholder = "Введите email!";
        isValid = false;
    } else if (!validateEmail(emailVal)) {
        inputEmail.classList.add("error");
        inputEmail.placeholder = "Некорректный email!";
        isValid = false;
    }

    if (passwordVal === '') {
        inputPassword.classList.add("error");
        inputPassword.placeholder = "Введите пароль!";
        isValid = false;
    } else if (!validatePassword(passwordVal)) {
        inputPassword.classList.add("error");
        inputPassword.placeholder = "Пароль: мин. 8 символов, 1 цифра и 1 буква";
        isValid = false;
    }

    if (!isValid) {
        return;  // прерываем выполнение, если валидация не пройдена
    }

    // подготовка данных для отправки на сервер
    let formData = {
        email: emailVal,
        password: passwordVal
    };

    try {
        let response = await fetch('/api/authorization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        let result = await response.json();

        if (response.ok) {
            alert(result.message);  // успешный вход
            window.location.href = "../index.html";  // перенаправляем на страницу после авторизации
        } else {
            inputEmail.classList.add("error");
            inputPassword.classList.add("error");
            alert(result.message);  // вывод ошибки авторизации
        }
    } catch (error) {
        console.error('Ошибка запроса:', error);
        alert("Ошибка соединения с сервером. Попробуйте позже.");
    }
};
