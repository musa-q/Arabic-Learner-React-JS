import { useState, useEffect } from 'react';
import FlashCards from '../components/FlashCards';
import './FlashCardsPage.css'
import axios from 'axios';
import { capitaliseWords } from '../utils';

const FlashCardsPage = ({ wordsList }) => {
    const [flashcards, setFlashcards] = useState([]);
    const [pageTitle, setPageTitle] = useState("Words Practice");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/flashcards/get-category-flashcards', {
                    category_id: wordsList,
                });
                const data = await response.data;
                setFlashcards(data.words);
                setPageTitle(data.title);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flash-cards-page-container">
            <h1>{capitaliseWords(pageTitle)}</h1>
            <div>
                <FlashCards flashcards={flashcards} />
            </div>
        </div>
    );
};

export default FlashCardsPage;
