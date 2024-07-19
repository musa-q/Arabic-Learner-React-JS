import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import './WordsVerbsPracticePage.css';
import { ReactTransliterate } from "react-transliterate";
import "react-transliterate/dist/index.css";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { capitaliseWords } from '../utils';
import axios from 'axios';

// Practice words by typing
const WordsPracticeQuestionPage = ({ quizId, pageTitle }) => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [revealAnswer, setRevealAnswer] = useState(false);
    const [showAnswerButton, setShowAnswerButton] = useState(false);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [resultMessage, setResultMessage] = useState("");
    const [hint, setHint] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(null);


    const processText = (word) => {
        return word.trim().toLowerCase();
    }

    const checkAnswer = async () => {
        if (currentAnswer == "" || currentAnswer == null) {
            setResultMessage("Please answer!");
            return;
        }
        if (resultMessage != "Please answer!" && resultMessage == "" || resultMessage == null) {
            console.log(resultMessage, 'ssafsaf');
            return;
        }
        var guess = processText(currentAnswer);
        console.log('daguesss', guess);

        const response = await axios.post('http://localhost:5000/quiz/users/1/send-answer', {
            quiz_type: 'VocabQuiz',
            user_answer: guess,
        });

        const data = response.data;
        console.log(data, 'answerdataaa');
        if (data.answer_response == true) {
            setResultMessage("Correct!");
        } else if (data.answer_response == false) {
            setResultMessage("Incorrect. Try again.");
        } else {
            console.error('Error. Unable to send answer');
        }
    }

    const nextQuestion = async () => {
        if (currentAnswer == "") {
            setResultMessage("Please answer!");
        }
        const response = await axios.post('http://localhost:5000/quiz/users/1/get-next-question', {
            quiz_type: 'VocabQuiz'
        });

        const data = response.data;
        console.log("DADATA", data);
        setHint(data.hint);
        setCurrentQuestion(data.question.english);
        setDataLoaded(true);
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
        if (!dataLoaded) {
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

            <h1>{capitaliseWords(pageTitle)}</h1>
            <Card className="practice-container">
                <ListGroup variant="flush">
                    <div className="info-text">
                        {currentQuestion && (
                            <>
                                <Card.Header>Translate to Arabic</Card.Header>
                                <h2 className='pt-4'>{capitaliseWords(currentQuestion)}</h2>
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
                                    <p id='correct-answer'>The answer is: {hint}</p>
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
