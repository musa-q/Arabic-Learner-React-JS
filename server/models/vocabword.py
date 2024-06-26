from . import db

class VocabWord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('vocab_category.id'), nullable=False)
    english = db.Column(db.String(120), nullable=False)
    transliteration = db.Column(db.String(120), nullable=False)
    arabic = db.Column(db.String(120), nullable=False)
