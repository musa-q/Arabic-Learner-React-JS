import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '/logo_main.png';
import './NavBar.css';

const MyNavBar = ({ onNavigate }) => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={() => onNavigate('home')}>
                    <div className='aref-ruqaa-regular gold nav-title logo-container'>
                        <img src={logo} alt="Logo" className="nav-logo" />
                        متعلمي عربي
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => onNavigate('home')}>Home</Nav.Link>
                        <Nav.Link onClick={() => onNavigate('wordsflashcard')}>Words flashcards</Nav.Link>
                        <Nav.Link onClick={() => onNavigate('wordspractice')}>Words practice</Nav.Link>
                        <Nav.Link onClick={() => onNavigate('verbs')}>Verbs practice</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <span className="me-3">Follow the developer:</span>
                        <a href="https://www.linkedin.com/in/musa-qureshi/" target="_blank" rel="noopener noreferrer">
                            <img
                                src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white"
                                alt="LinkedIn Badge"
                            />
                        </a>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavBar