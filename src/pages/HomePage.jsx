import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import './HomePage.css';
import '../fonts.css';
import AppFeedback from '../components/AppFeedback';
import logo from '/logo_main.svg';

const HomePage = ({ onNavigate }) => {
    const [showFeedbackToast, setShowFeedbackToast] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowFeedbackToast(true);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleCloseToast = () => setShowFeedbackToast(false);
    const handleShowModal = () => {
        setShowFeedbackModal(true);
        setShowFeedbackToast(false);
    };
    const handleCloseModal = () => setShowFeedbackModal(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="home-page-container">
            {!imageLoaded &&
                <div className="homepage-logo homepage-logo-placeholder gold">
                    <h1>My Arabic Learner</h1>
                    <h2>متعلمو العربية</h2>
                </div>}

            <img
                src={logo}
                alt="Logo"
                className="homepage-logo"
                loading="lazy"
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? 'block' : 'none' }}
            />

            <div className="button-container-left">
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('wordsflashcard')}>
                    Flashcards
                </Button>
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('wordspractice')}>
                    Vocab Quiz
                </Button>
            </div>
            <div className="button-container-right">
                <Button variant="outline-light" size="lg" onClick={() => onNavigate('verbs')}>
                    Conjugation Quiz
                </Button>
                <Button variant="outline-light" size="lg" onClick={handleShowModal}>
                    Feedback
                </Button>
            </div>
            <AppFeedback data-bs-theme="dark" show={showFeedbackModal} handleClose={handleCloseModal} />

            <ToastContainer
                className="p-3"
                position={"bottom-end"}
                style={{ zIndex: 1 }}
            >
                <Toast show={showFeedbackToast} onClose={handleCloseToast} className="feedback-toast">
                    <Toast.Header>
                        <strong className="me-auto">Feedback</strong>
                    </Toast.Header>
                    <Toast.Body style={{ fontSize: "17px" }}>We&apos;d love to hear your feedback! Click the &quot;Feedback&quot; button to share.</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default HomePage;
