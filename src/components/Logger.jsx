import { useState, useEffect } from 'react';
import axios from 'axios';

export const sendPostRequest = async (devInfo, setPage, setSubmitted) => {
    try {
        const currDate = new Date().toLocaleDateString();
        const currTime = new Date().toLocaleTimeString();

        const formData = {
            date: currDate,
            time: currTime,
            ipAddress: devInfo.ip,
            devInfo: devInfo,
        };

        const response = await fetch('https://sheetdb.io/api/v1/ddwti6qszs2pg', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            console.error('Not logged');
        }
    } catch (error) {
        console.error(error);
    }
    setPage('home');
    setSubmitted(true);
};

const Logger = ({ userPage, setPage }) => {
    const [devInfo, setDevInfo] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const fetchDevInfo = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json');
            setDevInfo(response.data);
        } catch (error) {
            // do nothing
        }
    };

    useEffect(() => {
        fetchDevInfo();
    }, []);

    useEffect(() => {
        if (devInfo && userPage === 'start' && !submitted) {
            sendPostRequest(devInfo, setPage, setSubmitted);
        }
    }, [userPage, devInfo, setPage, submitted]);

    return null;
};

export default Logger;
