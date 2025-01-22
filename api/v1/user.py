from flask import Blueprint, jsonify

from utilities.db_executor import get_user_by_login

user_bp = Blueprint("user", __name__)


@user_bp.route('/user/<login>', methods=["GET"])
def get_user(login):
    user = get_user_by_login(login)

    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 400
