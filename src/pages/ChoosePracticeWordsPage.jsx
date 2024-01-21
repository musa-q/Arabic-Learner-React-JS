import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ChooseWordsPage.css';

// Where choose which words list for practice
const ChoosePracticeWordsPage = ({ onChoose }) => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchFileList = async () => {
            try {
                const response = await fetch('/Arabic-Learner-React-JS/arabic/words/index.json');
                const indexData = await response.json();

                setFileList(indexData.files);
            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };


        fetchFileList();
    }, []);

    return (
        <div className="choose-words-page-container">
            <h1>Choose a Word File:</h1>
            <div className="buttons-list">
                {fileList.map((file, index) => (
                    <Button className="button p-3" variant="outline-light" type="button" key={index} onClick={() => {
                        onChoose(file.filename);
                    }}>
                        {file.title}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default ChoosePracticeWordsPage;
