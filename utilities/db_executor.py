import sqlite3
import os
import bcrypt
from flask import request, jsonify


def get_db_connection():
    db_path = './db/users.db'
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    os.makedirs('./db', exist_ok=True)

    conn = get_db_connection()
    conn.execute("""CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    login TEXT UNIQUE NOT NULL,
                    email TEXT UNIQUE NOT NULL,
                    password TEXT NOT NULL)""")

    conn.commit()
    conn.close()


def registration():
    data = request.get_json()

    login = data.get('login')
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    user = conn.execute(
        'SELECT * FROM users WHERE login = ? OR email = ?', (login, email)).fetchone()

    if user:
        conn.close()
        return jsonify({"error": "User with this login or email already exists"}), 400

    # хеш пароля
    hashed_password = bcrypt.hashpw(password.encode(
        'utf-8'), bcrypt.gensalt()).decode('utf-8')

    conn.execute('INSERT INTO users (login, email, password) VALUES (?, ?, ?)',
                 (login, email, hashed_password))
    conn.commit()
    conn.close()

    return jsonify({"message": "User successfully registered"}), 201


def authorization():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    user = conn.execute(
        'SELECT * FROM users WHERE email = ?', (email,)).fetchone()

    if not user:
        conn.close()
        return jsonify({"message": "This user does not exist"}), 400

    # проверка пароля с введенным
    if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        conn.close()
        return jsonify({"message": "Incorrect password"}), 400

    conn.close()
    return jsonify({"message": "User successfully logged in"}), 200


def get_user_by_login(login: str):
    conn = get_db_connection()

    user = conn.execute(
        "SELECT * FROM users WHERE login = ?", (login,)).fetchone()

    if not user:
        conn.close()
        return None

    user = dict(user)

    # hashed_password = user.pop("password", None)
    user.pop("password", None)
    conn.close()
    return user


def get_all_users():
    conn = get_db_connection()

    users = conn.execute("SELECT * FROM users").fetchall()

    if not users:
        conn.close()
        return None

    conn.close()

    users = [dict(user) for user in users]
    for user in users:
        user.pop("password", None)
    return users
