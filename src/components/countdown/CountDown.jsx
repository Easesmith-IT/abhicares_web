import React, { useState, useEffect } from 'react';
import classes from "./countdown.module.css";

const CountdownTimer = ({ children, setIsTimer }) => {
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(prevTimer => (prevTimer > 0 ? prevTimer - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
      if (timer === 0) {
        setIsTimer(false);
      }
    }, [timer])
    

    return (
        <div className={classes.countdown}>
            {timer !== 0 && <p>{formatTime(timer)}</p>}
            {children}
        </div>
    );
}

export default CountdownTimer;
