import { useState, useEffect } from 'react';
import axios from 'axios';

export const sendPostRequest = async (devInfo, setPage, setSubmitted) => {
    try {
        const formData = {
            ipAddress: devInfo.ip,
            devInfo: devInfo,
        };

        const response = await fetch('https://formspree.io/f/xvoevyvo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            setPage('home');
            setSubmitted(true);
        }
    } catch (error) {
        // do nothing
    }
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
