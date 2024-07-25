import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp, gameOver }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    let interval = null;
    if (!gameOver && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 || gameOver) {
      clearInterval(interval);
      if (time === 0 && onTimeUp) {
        onTimeUp();
      }
    }
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className='timer'>
      {time}s
    </div>
  );
};

export default Timer;
