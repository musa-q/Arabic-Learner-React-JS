import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Form from 'react-bootstrap/Form';

const AppFeedback = ({ show, handleClose }) => {
    const [rating, setRating] = useState(null);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleRatingClick = (value) => {
        if (rating === value) {
            setRating(null);
        } else {
            setRating(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);

        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();

        const formData = {
            date: currDate,
            time: currTime,
            rating: rating,
            email: email,
            message: message,
        };

        try {
            const response = await fetch('https://sheetdb.io/api/v1/x02nd9a6p29h1', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                console.error('Error submitting form');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
            handleClose();
        }
    };

    return (

        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Please provide feedback!</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group controlId="formRating" className="mb-3">
                        <Form.Label>Rating</Form.Label>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <FontAwesomeIcon
                                    key={value}
                                    icon={faStar}
                                    onClick={() => handleRatingClick(value)}
                                    style={{ color: value <= rating ? '#ffc107' : '#e4e5e9', cursor: 'pointer' }}
                                />
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email Address (optional)</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formMessage">
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter your message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AppFeedback;
