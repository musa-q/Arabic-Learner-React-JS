import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import './WordsVerbsPracticePage.css';
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


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
                const response = await fetch(`/arabic/words/${wordsList}`);
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

    const removeDiacritics = (word) => {
        return word.replace(/[\u0617-\u061A\u064B-\u0652\u0670]/g, '');
    }

    const normaliseText = (word) => {
        word = removeDiacritics(word);
        word = word.replace(/(آ|إ|أ)/g, 'ا');
        word = word.replace(/(ة)/g, 'ه');
        word = word.replace(/(ئ|ؤ)/g, 'ء');
        word = word.replace(/(ى)/g, 'ي');
        return word;
    }

    const processText = (word) => {
        return word.trim().toLowerCase();
    }

    const checkAnswer = () => {
        var guess = processText(currentAnswer);
        var answer = processText(correctAnswer);

        if (guess === answer || guess === removeDiacritics(answer) || guess === normaliseText(answer)) {
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
            if (resultMessage === "Correct!") {
                nextQuestion();
            } else {
                checkAnswer();
            }
        } else if (e.ctrlKey) {
            e.preventDefault();
            if (resultMessage === "Incorrect. Try again.") {
                setRevealAnswer(true);
            }
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
            <ToastContainer position="bottom-end" className="p-3 toast-container" style={{ zIndex: 1, display: window.innerWidth > 768 ? 'block' : 'none' }}>
                <Toast>
                    <Toast.Header>
                        <strong className="me-auto">Keyboard Shortcuts</strong>
                    </Toast.Header>
                    <Toast.Body>
                        Enter: check answer/move to next question
                        <br />
                        Ctrl: reveal the answer
                    </Toast.Body>
                </Toast>
            </ToastContainer>

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
