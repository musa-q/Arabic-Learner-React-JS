import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import COl from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import './VerbsPage.css';
import Col from 'react-bootstrap/Col';

const tenses = ["present", "past", "future"];
const pronouns = ["i", "you_m", "you_f", "he", "she", "they", "we"];

const VerbsPage = () => {
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [verbData, setVerbData] = useState([]);
    const [currentConjugation, setCurrentConjugation] = useState(null);
    const [resultMessage, setResultMessage] = useState("");
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showAnswerButton, setShowAnswerButton] = useState(false);
    const [revealAnswer, setRevealAnswer] = useState(false);

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
            setShowAnswerButton(true);
        }
    };

    const nextQuestion = () => {
        getRandomConjugation();
        setCurrentAnswer("");
        setResultMessage("");
        setShowAnswerButton(false);
        setRevealAnswer(false);
    };

    const showAnswerClicked = () => {
        setRevealAnswer(!revealAnswer);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/Arabic-Learner-React-JS/arabic/verbs/all_verbs.json');
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
        <div className="verbs-page-container">
            <h1>Verb Conjugation Practice</h1>

            <Card className="practice-container">
                <ListGroup variant="flush">
                    <div className="info-text">
                        {currentConjugation && (
                            <>
                                <Card.Header>{currentConjugation.word.english}: <strong>{currentConjugation.word.arabic}</strong></Card.Header>

                                <ListGroup.Item>
                                    <Row className='con-info'>
                                        <Col><Card.Title>Pronoun: {currentConjugation.pronoun}</Card.Title></Col>
                                        <Col><Card.Title>Tense: {currentConjugation.tense}</Card.Title></Col>
                                    </Row>
                                </ListGroup.Item>                            </>
                        )}
                    </div>
                    <div className='bottom-section'>
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
                            <Button className="con-form-button" variant="primary" type="button" onClick={checkAnswer}>Check</Button>
                            <Button className="con-form-button" variant="secondary" type="button" onClick={nextQuestion}>Next</Button>
                        </form>
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

export default VerbsPage;
