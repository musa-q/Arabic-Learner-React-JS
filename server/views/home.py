from flask import Blueprint, request, jsonify
from server.models import db

home_bp = Blueprint('home', __name__)

@home_bp.route('/')
def home():
    return "Welcome to the Home Page"