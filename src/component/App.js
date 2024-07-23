// src/App.js
import React, { useState } from 'react';
import Maze from './Maze';
import Title_button from './title-button';

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStart = () => {
    setIsGameStarted(true);
  };

  const handleReset = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="App">
      <Title_button onStart={handleStart} onReset={handleReset} />
      {isGameStarted && <Maze />}
    </div>
  );
}

export default App;
