from flask import Blueprint, jsonify

from utilities.db_executor import get_all_users


users_bp = Blueprint("users", __name__)


@users_bp.route("/users/", methods=["GET"])
def get_users():
    users = get_all_users()

    if users:
        return jsonify(users), 200
    else:
        return jsonify({"error": []}), 400
