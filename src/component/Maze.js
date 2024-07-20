// src/Maze.js
import React, { useState } from 'react';

const Maze = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); //初期位置設定

  const maze = [
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ]; //迷路生成 今後は自動生成も検討

  const handleKeyDown = (e) => { //キーが押されたときの関数
    let newPosition = { ...position }; //現在の位置を複製
    switch (e.key) { //キーが押されたときの処理
      case 'ArrowUp':
        newPosition.y = Math.max(newPosition.y - 1, 0);
        break;
      case 'ArrowDown':
        newPosition.y = Math.min(newPosition.y + 1, maze.length - 1);
        break;
      case 'ArrowLeft':
        newPosition.x = Math.max(newPosition.x - 1, 0);
        break;
      case 'ArrowRight':
        newPosition.x = Math.min(newPosition.x + 1, maze[0].length - 1);
        break;
      default:
        break;
    }

    if (maze[newPosition.y][newPosition.x] === 0) { //壁じゃないか判定
      setPosition(newPosition);
    }
  };

  return (
    <div className="maze-container" tabIndex="0" onKeyDown={handleKeyDown}> 
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="maze-row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`maze-cell ${cell === 1 ? 'wall' : ''} ${
                position.x === cellIndex && position.y === rowIndex ? 'character' : ''
              }`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
