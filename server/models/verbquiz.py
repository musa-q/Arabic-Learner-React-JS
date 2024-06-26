from . import db

verbquiz_verb = db.Table('verbquiz_verb',
    db.Column('verbquiz_id', db.Integer, db.ForeignKey('verb_quiz.id'), primary_key=True),
    db.Column('verb_id', db.Integer, db.ForeignKey('verb.id'), primary_key=True)
)

class VerbQuiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    verbs = db.relationship('Verb', secondary=verbquiz_verb, lazy='subquery', backref=db.backref('verbquizzes', lazy=True))
    score = db.Column(db.Integer, nullable=False)
