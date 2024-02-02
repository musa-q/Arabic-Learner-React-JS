import React, { useState, useEffect } from 'react';
import './FlashCards.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const FlashCards = ({ flashcards }) => {
    const [flippedCards, setFlippedCards] = useState(Array(flashcards.length).fill(false));

    const flipCard = (index) => {
        setFlippedCards((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <Row xs={1} md={2} className="g-4">
            {flashcards.map((flashcard, index) => (
                <Col key={index}>
                    <div
                        className={`flashcard ${flippedCards[index] ? 'flipped' : ''}`}
                        onClick={() => flipCard(index)}
                    >
                        <Card>
                            <div className="card-front">
                                <Card.Title>{flashcard.arabic}</Card.Title>
                            </div>
                            <div className="card-back">
                                <Card.Title>{flashcard.english}</Card.Title>
                                <Card.Text>{flashcard.romanized}</Card.Text>
                            </div>
                        </Card>
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default FlashCards;
