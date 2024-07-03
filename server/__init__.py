import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    basedir = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate = Migrate(app, db)

    from .views import home_bp, testing_bp, users_bp, quiz_bp
    app.register_blueprint(home_bp)
    app.register_blueprint(testing_bp, url_prefix='/testing')
    app.register_blueprint(users_bp, url_prefix='/user')
    app.register_blueprint(quiz_bp, url_prefix='/quiz')

    with app.app_context():
        db.create_all()

    return app