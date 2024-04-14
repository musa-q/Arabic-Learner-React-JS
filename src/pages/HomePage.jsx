import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './HomePage.css';
import '../fonts.css';
import AppFeedback from '../components/AppFeedback';

const HomePage = ({ onNavigate }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="home-page-container">
            <div className="title-container aref-ruqaa-bold gold">
                متعلم عربي
            </div>
            <div className="button-container-left">
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('wordsflashcard')}>
                    Words Flashcards
                </Button>
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('wordspractice')}>
                    Words Practice
                </Button>
            </div>
            <div className="button-container-right">
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('verbs')}>
                    Verbs Practice
                </Button>
                <Button variant="outline-light" size="lg" onClick={handleShow}>
                    Feedback
                </Button>
            </div>
            <AppFeedback data-bs-theme="dark" show={show} handleClose={handleClose} />
        </div>

    );
};

export default HomePage;