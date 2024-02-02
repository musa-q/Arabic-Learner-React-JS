import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import './WordsVerbsPracticePage.css';
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";


// Practice words by typing
const WordsPracticeQuestionPage = ({ wordsList }) => {
    const [pageTitle, setPageTitle] = useState(null);
    const [allWords, setAllWords] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [showAnswerButton, setShowAnswerButton] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/Arabic-Learner-React-JS/arabic/words/${wordsList}`);
                const wordsData = await response.json();
                setAllWords(wordsData.translations);
                setPageTitle(wordsData.title);

                setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const getRandomWord = () => {
        if (!dataLoaded || !allWords.length) {
            return;
        }

        const wordIndex = Math.floor(Math.random() * allWords.length);
        const word = allWords[wordIndex];

        setCorrectAnswer(word.arabic);
        setCurrentQuestion(word);
    }

    const checkAnswer = () => {
        if (currentAnswer.trim().toLowerCase() === correctAnswer) {
            setResultMessage("Correct!");
        } else {
            setResultMessage("Incorrect. Try again.");
            setShowAnswerButton(true);
        }
    };

    const nextQuestion = () => {
        getRandomWord();
        setCurrentAnswer("");
        setResultMessage("");
        setShowAnswerButton(false);
        setRevealAnswer(false);
    };

    const showAnswerClicked = () => {
        setRevealAnswer(!revealAnswer);
    }

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
        }
    };

    useEffect(() => {
        if (dataLoaded) {
            nextQuestion();
        }
    }, [dataLoaded]);

    if (!dataLoaded) {
        return <p>Loading...</p>;
    }

    return (
        <div className="practice-page-container">
            <h1>{pageTitle}</h1>
            <Card className="practice-container">
                <ListGroup variant="flush">
                    <div className="info-text">
                        {currentQuestion && (
                            <>
                                <Card.Header>Translate to Arabic</Card.Header>
                                <h2 className='pt-4'>{currentQuestion.english}</h2>
                            </>
                        )}
                    </div>
                    <div className='bottom-section'>
                        <div id="conjugation-form">
                            <label htmlFor="user-input">Your Answer:</label>
                            <ReactTransliterate
                                type="text"
                                id="user-input"
                                name="user-input"
                                onKeyDown={handleEnterKeyPress}
                                value={currentAnswer}
                                onChangeText={(e) => {
                                    setCurrentAnswer(e);
                                }}
                                lang="ar"
                            />
                            <Button className="con-form-button" variant="primary" type="button" onClick={checkAnswer}>Check</Button>
                            <Button className="con-form-button" variant="secondary" type="button" onClick={nextQuestion}>Next</Button>
                        </div>
                        <p id="result-message">{resultMessage}</p>
                        {showAnswerButton && (
                            <>
                                <Button className="show-answer-button" type="button" variant="secondary" onClick={showAnswerClicked}>Show answer</Button>                                {revealAnswer && (
                                    <p id='correct-answer'>The answer is: {correctAnswer}</p>
                                )}
                            </>
                        )}
                    </div>
                </ListGroup>
            </Card >
        </div>
    );
};

export default WordsPracticeQuestionPage;
