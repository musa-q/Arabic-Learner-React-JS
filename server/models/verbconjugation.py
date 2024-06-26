from . import db

class VerbConjugation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    verb_id = db.Column(db.Integer, db.ForeignKey('verb.id'), nullable=False)
    tense = db.Column(db.String(50), nullable=False)
    pronoun = db.Column(db.String(50), nullable=False)
    conjugation = db.Column(db.String(120), nullable=False)
