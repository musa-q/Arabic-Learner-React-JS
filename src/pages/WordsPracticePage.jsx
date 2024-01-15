import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import './WordsVerbsPracticePage.css';
import Col from 'react-bootstrap/Col';

// Practice words by typing
const WordsPracticePage = () => {
    const [fileList, setFileList] = useState([]);
    const [allWords, setAllWords] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [showAnswerButton, setShowAnswerButton] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [resultMessage, setResultMessage] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState("");

    useEffect(() => {
        const fetchFileList = async () => {
            try {
                const response = await fetch('/Arabic-Learner-React-JS/arabic/words/index.json');
                const indexData = await response.json();

                setFileList(indexData.files);
            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };

        fetchFileList();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const wordsArray = [];
                for (const file of fileList) {
                    const response = await fetch(`/Arabic-Learner-React-JS/arabic/words/${file.filename}`);
                    const wordsData = await response.json();
                    const translations = wordsData.translations;
                    wordsArray.push(...translations);
                }

                setAllWords(prevWords => (prevWords.length > 0 ? prevWords : [...prevWords, ...wordsArray]));
                setDataLoaded(true);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (fileList.length > 0) {
            fetchData();
        }
    }, [fileList]);

    const getRandomWord = () => {
        if (!dataLoaded || !allWords.length) {
            return;
        }

        const wordIndex = Math.floor(Math.random() * allWords.length);
        const word = allWords[wordIndex];

        setCorrectAnswer(word.arabic);
        // console.log(word);
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
            <h1>Word Practice</h1>
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
                            <input
                                type="text"
                                id="user-input"
                                name="user-input"
                                value={currentAnswer}
                                onChange={(e) => setCurrentAnswer(e.target.value)}
                                onKeyDown={handleEnterKeyPress}
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

export default WordsPracticePage;
