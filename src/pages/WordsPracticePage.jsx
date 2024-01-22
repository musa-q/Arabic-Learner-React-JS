import { useState, useEffect } from 'react';
import ChooseWordsPage from './ChooseWordsPage';
import WordsPracticeQuestionPage from './WordsPracticeQuestionPage';

// Renders either choose page or flash cards
const WordsPracticePage = () => {
    const [chosenWordsList, setChosenWordsList] = useState("choose");

    const chooseWordsList = (listChoice) => {
        setChosenWordsList(listChoice);
    };

    return (
        <div className="words-page-container">
            {chosenWordsList === "choose" && <ChooseWordsPage onChoose={chooseWordsList} title={"Practice words"} />}
            {chosenWordsList !== "choose" && <WordsPracticeQuestionPage wordsList={chosenWordsList} />}
        </div>
    );
};

export default WordsPracticePage;
