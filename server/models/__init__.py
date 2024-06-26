from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from .user import User
from .vocabword import VocabWord
from .vocabcategories import VocabCategory
from .verb import Verb
from .verbconjugation import VerbConjugation
from .vocabquiz import VocabQuiz
from .verbquiz import VerbQuiz

__all__ = ['User', 'VocabWord', 'VocabCategory', 'Verb', 'VerbConjugation', 'VocabQuiz', 'VerbQuiz']
