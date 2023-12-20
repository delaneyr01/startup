// WeekView.js
import React, { useState, useEffect } from 'react';
import './WeekView.css';

const WeekView = () => {
    const [currentEvents, setCurrentEvents] = useState([]);

    useEffect(() => {
        initializePage();
      }, []);

    return (
        
  );
}

export default WeekView;
