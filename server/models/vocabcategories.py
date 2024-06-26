from . import db

class VocabCategory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(120), unique=True, nullable=False)
    vocabwords = db.relationship('VocabWord', backref='category', lazy=True)
