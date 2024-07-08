from flask import request, abort, current_app
from flask_cors import CORS

def setup_cors_and_ip_restriction(app):
    allowed_ips = app.config.get('ALLOWED_IPS', [])

    def cors_origin_check():
        if request.remote_addr in allowed_ips:
            return True
        return False

    CORS(app, origins=cors_origin_check)

    @app.before_request
    def check_ip():
        if allowed_ips and request.remote_addr not in allowed_ips:
            abort(403)  # Forbidden