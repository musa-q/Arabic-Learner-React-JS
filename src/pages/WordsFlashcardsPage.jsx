import { useState, useEffect } from 'react';
import ChooseWordsPage from './ChooseWordsPage';
import FlashCardsPage from './FlashCardsPage';

// Renders either choose page or flash cards
const WordsFlashcardsPage = () => {
    const [chosenWordsList, setChosenWordsList] = useState("choose");

    const chooseWordsList = (listChoice) => {
        setChosenWordsList(listChoice);
    };

    return (
        <div className="words-page-container">
            {chosenWordsList === "choose" && <ChooseWordsPage onChoose={chooseWordsList} title={"Flashcards"} />}
            {chosenWordsList !== "choose" && <FlashCardsPage wordsList={chosenWordsList} />}
        </div>
    );
};

export default WordsFlashcardsPage;
