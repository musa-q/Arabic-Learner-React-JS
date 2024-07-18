import { useState, useEffect } from 'react';
import ChooseWordsPage from './ChooseWordsPage';
import WordsPracticeQuestionPage from './WordsPracticeQuestionPage';
import axios from 'axios';

// Renders either choose page or flash cards
const WordsPracticePage = () => {
    const [chosenWordsList, setChosenWordsList] = useState("choose");
    const [quizId, setQuizId] = useState(null);
    const [categoryName, setCategoryname] = useState(null);

    const chooseWordsList = (listChoice) => {
        setChosenWordsList(listChoice);
        createQuiz(listChoice);
    };

    const createQuiz = async (categoryId) => {
        try {
            const response = await axios.post('http://localhost:5000/quiz/create-vocab-quiz', {
                user_id: 1,
                category_id: categoryId
            });
            setQuizId(response.data.quiz_id);
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
        <div className="words-page-container">
            {chosenWordsList === "choose" && <ChooseWordsPage onChoose={chooseWordsList} title={"Practice words"} setCategoryname={setCategoryname} />}
            {chosenWordsList !== "choose" && <WordsPracticeQuestionPage quizId={quizId} pageTitle={categoryName} />}
        </div>
    );
};

export default WordsPracticePage;
