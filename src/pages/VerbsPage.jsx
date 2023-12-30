import { useEffect, useState } from 'react';

const tenses = ["present", "past", "future"];
const pronouns = ["i", "you_m", "you_f", "he", "she", "they", "we"];

const VerbsPage = () => {
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [verbData, setVerbData] = useState([]);
    const [currentConjugation, setCurrentConjugation] = useState(null);
    const [resultMessage, setResultMessage] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);

    const getRandomConjugation = () => {
        if (!dataLoaded || !verbData.length) {
            return;
        }

        const wordIndex = Math.floor(Math.random() * verbData.length);
        const word = verbData[wordIndex];
        const tense = tenses[Math.floor(Math.random() * tenses.length)];
        const pronoun = pronouns[Math.floor(Math.random() * pronouns.length)];

        setCorrectAnswer(word.conjugations[tense][pronoun]);
        console.log(word.conjugations[tense][pronoun]);
        setCurrentConjugation({ word, tense, pronoun });
    };

    const checkAnswer = () => {
        if (currentAnswer.trim().toLowerCase() === correctAnswer) {
            setResultMessage("Correct!");
        } else {
            setResultMessage("Incorrect. Try again.");
        }
    };

    const nextQuestion = () => {
        getRandomConjugation();
        setCurrentAnswer("");
        setResultMessage("");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Arabic-Learner-React-JS/arabic/verbs/initial_verbs.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setVerbData(data);
                setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            nextQuestion();
        }
    }, [dataLoaded]);

    if (!dataLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Verb Conjugation Practice</h1>

            <div id="practice-container">
                <div className="info-text">
                    {currentConjugation && (
                        <>
                            <h2>{currentConjugation.word.english}: <strong>{currentConjugation.word.arabic}</strong></h2>
                            <p id="pronoun-display">Pronoun: <strong>{currentConjugation.pronoun}</strong></p>
                            <p id="verb-display">Tense: <strong>{currentConjugation.tense}</strong></p>
                        </>
                    )}
                </div>
                <form id="conjugation-form" method="POST">
                    <label htmlFor="user-input">Your Answer:</label>
                    <input
                        type="text"
                        id="user-input"
                        name="user-input"
                        value={currentAnswer}
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        required
                    />
                    <button type="button" onClick={checkAnswer}>Check</button>
                    <button type="button" id="next-button" onClick={nextQuestion}>Next</button>
                </form>
                <p id="result-message">{resultMessage}</p>
            </div>
        </>
    );
};

export default VerbsPage;
