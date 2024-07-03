from ..models import db, User, Verb, VerbConjugation, VocabWord, VocabCategory, VerbConjugationQuiz, VocabQuiz, VerbConjugationQuizQuestion, VocabQuizQuestion
from sqlalchemy import desc
from typing import Optional, Union

class QuizUtils:
    def get_current_quiz(self, quiz_type: str, user_id: int) -> Optional[Union[VocabQuiz, VerbConjugationQuiz]]:
        if quiz_type == 'VocabQuiz':
            return VocabQuiz.query.filter_by(user_id=user_id).order_by(desc(VocabQuiz.date_taken)).first()
        elif quiz_type == 'VerbConjugationQuiz':
            return VerbConjugationQuiz.query.filter_by(user_id=user_id).order_by(desc(VerbConjugationQuiz.date_taken)).first()
        return None

    def get_next_last_answered(self, quiz_type: str, user_id: int):
        current_quiz = self.get_current_quiz(quiz_type, user_id)
        if current_quiz is None:
            return None

        if quiz_type == 'VocabQuiz':
            next_question_obj = VocabQuizQuestion.query.filter_by(quiz_id=current_quiz.id, is_answered=True).order_by(desc(VocabQuizQuestion.id)).first()
            next_question = {
                'english': next_question_obj.word.english,
                'question_id': next_question_obj.id,
                'quiz_id': next_question_obj.quiz_id,
                'word_id': next_question_obj.word_id
            }
        elif quiz_type == 'VerbConjugationQuiz':
            next_question_obj = VerbConjugationQuizQuestion.query.filter_by(quiz_id=current_quiz.id, is_answered=True).order_by(desc(VerbConjugationQuizQuestion.id)).first()
            next_question = {
                'tense': next_question_obj.verb_conjugation.tense,
                'pronoun': next_question_obj.verb_conjugation.pronoun,
                'question_id': next_question_obj.id,
                'quiz_id': next_question_obj.quiz_id,
                'verb_conjugation_id': next_question_obj.verb_conjugation_id
            }
        else:
            return None
        return next_question_obj, next_question

    def get_next_question(self, quiz_type: str, user_id: int):
        current_quiz = self.get_current_quiz(quiz_type, user_id)
        if current_quiz is None:
            return None

        if quiz_type == 'VocabQuiz':
            next_question_obj = VocabQuizQuestion.query.filter_by(quiz_id=current_quiz.id, is_answered=False).first()
            if not next_question_obj:
                return None, None
            next_question = {
                'english': next_question_obj.word.english,
                'question_id': next_question_obj.id,
                'quiz_id': next_question_obj.quiz_id,
                'word_id': next_question_obj.word_id
            }
        elif quiz_type == 'VerbConjugationQuiz':
            next_question_obj = VerbConjugationQuizQuestion.query.filter_by(quiz_id=current_quiz.id, is_answered=False).first()
            if not next_question_obj:
                return None, None
            next_question = {
                'tense': next_question_obj.verb_conjugation.tense,
                'pronoun': next_question_obj.verb_conjugation.pronoun,
                'question_id': next_question_obj.id,
                'quiz_id': next_question_obj.quiz_id,
                'verb_conjugation_id': next_question_obj.verb_conjugation_id
            }
        else:
            return None
        return next_question_obj, next_question

    def answer_current_quiz_question(self, quiz_type: str, user_id: int, user_answer: str):
        current_quiz = self.get_current_quiz(quiz_type, user_id)
        if not current_quiz:
            return False
        current_question_obj, _ = self.get_next_question(quiz_type, user_id)
        if not current_question_obj:
            return None

        try:
            current_question_obj.is_answered =  True
            if quiz_type == 'VocabQuiz':
                if (user_answer == current_question_obj.word.arabic):
                    current_question_obj.is_correct = True
                    current_quiz.score += 1
            elif quiz_type == 'VerbConjugationQuiz':
                if (user_answer == current_question_obj.verb_conjugation.conjugation):
                    current_question_obj.is_correct = True
                    current_quiz.score += 1

            db.session.commit()
            return True
        except:
            return False


