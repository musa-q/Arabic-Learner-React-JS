from . import db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    vocabquiz_history = db.relationship('VocabQuiz', backref='user', lazy=True)
    verbquiz_history = db.relationship('VerbQuiz', backref='user', lazy=True)
    markedwords = db.relationship('VocabWord', secondary='user_marked_words', backref='marked_by_users')

class UserMarkedWords(db.Model):
    __tablename__ = 'user_marked_words'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    vocabword_id = db.Column(db.Integer, db.ForeignKey('vocab_word.id'), primary_key=True)
