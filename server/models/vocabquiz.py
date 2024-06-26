from . import db

vocabquiz_vocabword = db.Table('vocabquiz_vocabword',
    db.Column('vocabquiz_id', db.Integer, db.ForeignKey('vocab_quiz.id'), primary_key=True),
    db.Column('vocabword_id', db.Integer, db.ForeignKey('vocab_word.id'), primary_key=True)
)

class VocabQuiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    vocabwords = db.relationship('VocabWord', secondary=vocabquiz_vocabword, lazy='subquery', backref=db.backref('vocabquizzes', lazy=True))
    score = db.Column(db.Integer, nullable=False)
