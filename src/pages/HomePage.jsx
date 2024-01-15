import Button from 'react-bootstrap/Button';
import './HomePage.css';

const HomePage = ({ onNavigate }) => {
    return (
        <div className="home-page-container">
            <h1>Arabic Practice</h1>
            <br />
            <br />
            <div className="d-grid gap-5">
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('wordsflashcard')}>
                    Go to Words Flashcards
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('wordspractice')}>
                    Go to Words Practice
                </Button>
                <Button variant="outline-primary" size="lg" onClick={() => onNavigate('verbs')}>
                    Go to Verbs Practice
                </Button>
            </div>
        </div>
    );
};

export default HomePage;