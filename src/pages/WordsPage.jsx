import { useState, useEffect } from 'react';
import FlashCards from '../components/FlashCards';
import './WordsPage.css'

const WordsPage = () => {
    const [flashcards, setFlashcards] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/arabic/words/commonWords.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setFlashcards(data.translations);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="words-page-container">
            <h1>Words Practice</h1>
            <div>
                <FlashCards flashcards={flashcards} />
            </div>
        </div>
    );
};

export default WordsPage;
