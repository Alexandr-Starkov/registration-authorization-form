from flask import Blueprint

from .user import user_bp
from .users import users_bp


v1_bp = Blueprint('v1', __name__)

# Подключаем маршрут для работы с пользователями
v1_bp.register_blueprint(user_bp, url_prefix="/user")

# Подключаем маршрут для получения всех пользователей
v1_bp.register_blueprint(users_bp, url_prefix="/users")
