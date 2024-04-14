import { useState } from 'react';
import './FlashCards.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const FlashCards = ({ flashcards }) => {
    const [flippedCards, setFlippedCards] = useState(Array(flashcards.length).fill(false));
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Arabic', value: '1' },
        { name: 'English', value: '2' },
    ];

    const flipCard = (index) => {
        setFlippedCards((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    const changeLanguage = (val) => {
        setRadioValue(val);

        let newFlipped;
        if (val === '1') {
            newFlipped = Array(flashcards.length).fill(false);
        } else {
            newFlipped = Array(flashcards.length).fill(true);
        }

        setFlippedCards(newFlipped);
    };

    return (
        <>
            <br />
            <ButtonGroup>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => changeLanguage(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
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
        </>
    );
};

export default FlashCards;
