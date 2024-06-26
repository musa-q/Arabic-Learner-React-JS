from . import db

class Verb(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    english_verb = db.Column(db.String(120), nullable=False)
    transliteration_verb = db.Column(db.String(120), nullable=False)
    arabic_verb = db.Column(db.String(120), nullable=False)
    conjugations = db.relationship('VerbConjugation', backref='verb', lazy=True)
