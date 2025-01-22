from flask import Flask

from utilities.db_executor import create_table, registration, authorization
from api.v1 import v1_bp


app = Flask(__name__)


@app.route('/registration', methods=['POST'])
def registration_route():
    return registration()


@app.route('/authorization', methods=['POST'])
def authorization_route():
    return authorization()


app.register_blueprint(v1_bp, url_prefix="/api/v1")


if __name__ == "__main__":
    create_table()
    app.run(debug=True)
