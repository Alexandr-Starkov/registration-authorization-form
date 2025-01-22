# Registration & Authorization Form  

## Описание проекта   

Этот проект представляет собой веб-приложение с формой регистрации и авторизации пользователей. Реализована валидация данных на фронтенде, а также бэкенд на Flask с API-эндпоинтами для работы с пользователями.

## Функционал  

- **Фронтенд:**  
  - Форма регистрации и авторизации пользователей.  
  - Валидация данных на стороне клиента с использованием JavaScript.  

- **Бэкенд:**
  - Регистрация нового пользователя с хешированием пароля и проверкой на уникальность логина.  
  - Авторизация пользователя с проверкой пароля.
  - Получение данных пользователя по логину.
  - Получение списка всех пользователей.


## Технологии

- **Фронтенд:** HTML, CSS, JavaScript
- **Бэкенд:** Python (Flask), SQLite
- **Валидация:** JavaScript
- **Безопасность:** Хеширование пароля с использованием `bcrypt`
- **Веб-сервер:** Nginx (локальный хостинг)

## Установка и запуск

### 1. Клонирование репозитория  
```git clone https://github.com/Alexandr-Starkov/registration-authorization-form.git```  
```cd registration-authorization-form```

### 2. Установка зависимостей
```python -m venv venv```  
```source venv/bin/activate```   # для Linux/Mac  
```venv\Scripts\activate```      # для Windows  
```pip install -r requirements.txt```


### 3. Запуск приложения
```python app.py```  

Приложение будет доступно по адресу: http://127.0.0.1:5000

### 4. Настройка nginx
```
server {
	listen 80;
	server_name localhost;

	#root <path to project folder>;
	index index.html;

	location / {
		try_files $uri $uri/ /index.html;
	}

	location /templates/ {
		#alias <absolute path to templates folder>;
		try_files $uri $uri/ =404;
	}

	location /images/ {
		#alias <absolute path_to_images_folder>;
	}

	location /styles/ {
		#alias <absolute path to styles folder>;
	}

	location /scripts/ {
		#alias <absolute path to scripts folder>;
	}

	location /api/ {
		rewrite ^/api(/.*)$ $1 break;
		proxy_pass http://127.0.0.1:5000/;
		proxy_set_header Host $host;
		proxy_set_header X-Real-IP $remote_addr;
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}

	error_page 405 =200 @405fallback;
	location @405fallback {
		return 200 "Method not allowed workaround";
	}
		
	error_page   500 502 503 504  /50x.html;
	location = /50x.html {
		root   html;
	}
}
```
## API Эндпоинты  
 - ```GET /api/user/<login>``` - Получение пользователя по логину.  
 - ```GET /api/users``` - Получение всех пользователей.  

## TODO (что можно улучшить)
 - Добавить обработку ошибок и логирование.
 - Реализовать защиту от брутфорса и ограничения по IP.
 - Использовать шаблонизатор
 - Улучшить UI формы.
 - Добавить JWT-токены для авторизации.

## Контакты
 - Автор проекта: Алекснадр Старков  
 - GitHub Тестирование: https://github.com/Alexandr-StarkovJr  
 - Google Docks с проектами по тестированию - https://drive.google.com/drive/folders/1Tcj648y9MdwFNRL-OTrIGNK_voaMA1WK?usp=drive_link  
 - Telegram: https://t.me/AlexStarkJr  
 - Email: a.starkovjr@gmail.com  
