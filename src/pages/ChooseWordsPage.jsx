import { useState, useEffect } from 'react';

const ChooseWordsPage = ({ onChoose }) => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchFileList = async () => {
            try {
                const response = await fetch('/Arabic-Learner-React-JS/arabic/words/index.json');
                const indexData = await response.json();

                // const files = await Promise.all(
                //     indexData.files.map(async (fileName) => {
                //         const fileResponse = await fetch(`/Arabic-Learner-React-JS/arabic/words/${fileName}`);
                //         const fileData = await fileResponse.json();
                //         return fileData;
                //     })
                // );

                setFileList(indexData.files);
            } catch (error) {
                console.error('Error fetching file list:', error);
            }
        };


        fetchFileList();
    }, []);

    return (
        <div>
            <h2>Choose a Word File:</h2>
            <div className="file-buttons">
                {fileList.map((file, index) => (
                    <button key={index} onClick={() => {
                        onChoose(file.filename);
                    }}>
                        {file.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChooseWordsPage;
