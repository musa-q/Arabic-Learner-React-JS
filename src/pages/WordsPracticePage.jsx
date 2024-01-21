import { useState, useEffect } from 'react';
import ChooseWordsPage from './ChooseWordsPage';
import WordsPracticePage from './WordsPractice';

// Renders either choose page or flash cards
const WordsFlashcardsPage = () => {
    const [chosenWordsList, setChosenWordsList] = useState("choose");

    const chooseWordsList = (listChoice) => {
        setChosenWordsList(listChoice);
    };

    return (
        <div className="words-page-container">
            {chosenWordsList === "choose" && <ChooseWordsPage onChoose={chooseWordsList} title={"Practice words"} />}
            {chosenWordsList !== "choose" && <WordsPracticePage wordsList={chosenWordsList} />}
        </div>
    );
};

export default WordsFlashcardsPage;
