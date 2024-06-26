from flask import Blueprint, render_template

control_panel_bp = Blueprint('control_panel', __name__, url_prefix='/control_panel')

@control_panel_bp.route('/')
def control_panel():
    return "Welcome to the Control Panel"
