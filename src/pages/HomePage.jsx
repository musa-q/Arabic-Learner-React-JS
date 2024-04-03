import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './HomePage.css';
import AppFeedback from '../components/AppFeedback';

const HomePage = ({ onNavigate }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="home-page-container">
            <h1>Arabic Practice</h1>
            <br />
            <br />
            <div className="d-grid gap-5">
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('wordsflashcard')}>
                    Words Flashcards
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('wordspractice')}>
                    Words Practice
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('verbs')}>
                    Verbs Practice
                </Button>
                <Button variant="outline-primary" size="lg" onClick={handleShow}>
                    Feedback
                </Button>
                <Button variant="outline-secondary" size="lg" disabled>
                    Add vocab feature coming soon...
                </Button>
            </div>
            <AppFeedback data-bs-theme="dark" show={show} handleClose={handleClose} />
        </div>
    );
};

export default HomePage;