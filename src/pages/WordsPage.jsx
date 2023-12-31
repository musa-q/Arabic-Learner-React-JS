import { useState, useEffect } from 'react';
import ChooseWordsPage from './ChooseWordsPage';
import FlashCardsPage from './FlashCardsPage';

const WordsPage = () => {
    const [chosenWordsList, setChosenWordsList] = useState("choose");

    const chooseWordsList = (listChoice) => {
        setChosenWordsList(listChoice);
    };

    return (
        <div className="words-page-container">
            {chosenWordsList === "choose" && <ChooseWordsPage onChoose={chooseWordsList} />}
            {chosenWordsList !== "choose" && <FlashCardsPage wordsList={chosenWordsList} />}
        </div>
    );
};

export default WordsPage;
