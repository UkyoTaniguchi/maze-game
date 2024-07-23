import React, { useState, useEffect } from 'react';

const Maze = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); //初期位置設定
  const [enemyPosition, setEnemyPosition] = useState({ x: 8, y: 0 }); //敵位置設定
  const [gameOver, setGameOver] = useState(false); //ゲームオーバー設定
  const [enemyPathIndex, setEnemyPathIndex] = useState(0); // 敵の経路インデックス
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false); // ゲームオーバーモーダルの状態設定
  const [isGameClearModalOpen, setIsGameClearModalOpen] = useState(false); //ゴール時のモーダル

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

  const enemyPath = [
    { x: 7, y: 0 },
    { x: 6, y: 0 },
    { x: 6, y: 1 },
    { x: 6, y: 2 },
    { x: 5, y: 2 },
    { x: 4, y: 2 },
    { x: 4, y: 1 },
    { x: 4, y: 0 },
    { x: 3, y: 0 },
    { x: 2, y: 0 },
  ]; // 敵の経路

  const handleKeyDown = (e) => { //キーが押されたときの関数
    if (gameOver) return;

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

      if (newPosition.x === enemyPosition.x && newPosition.y === enemyPosition.y) {
        setGameOver(true);
        setIsGameOverModalOpen(true); // ゲームオーバーモーダルを表示
      }
      else if (newPosition.x === 24 && newPosition.y === 14){
        setGameOver(true);
        setIsGameClearModalOpen(true); //ゲームセットモーダル表示
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameOver) return;

      const nextIndex = (enemyPathIndex + 1) % enemyPath.length; //敵のパスのどこを確認するかのnextIndexを定義（最後まで行くと最初に戻る）
      const newEnemyPosition = enemyPath[nextIndex]; //更新したパスをnweEnemyPositionに定義

      setEnemyPosition(newEnemyPosition); //敵の位置を更新
      setEnemyPathIndex(nextIndex); //敵のパス更新

      if (newEnemyPosition.x === position.x && newEnemyPosition.y === position.y) {
        setGameOver(true);
        setIsGameOverModalOpen(true); // モーダルを表示
      }
    }, 100); //敵の速度

    return () => clearInterval(intervalId);
  }, [enemyPathIndex, gameOver, position]);

  useEffect(() => {
    const mazeContainer = document.querySelector('.maze-container');
    mazeContainer.focus();
  }, []);

  const handleCloseModal = () => {
    setIsGameOverModalOpen(false);
    setIsGameClearModalOpen(false);
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
              } ${
                enemyPosition.x === cellIndex && enemyPosition.y === rowIndex ? 'enemy' : ''
              }`}
            ></div>
          ))}
        </div>
      ))}
      {isGameOverModalOpen && (
        <div className="modal">
          <div className="modal-inner">
            <div className="modal-header"></div>
            <div className="modal-introduction">
              <h2>Game Over</h2>
              <p>敵に当たってしまいました。</p>
            </div>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              とじる
            </button>
          </div>
        </div>
      )}

      {isGameClearModalOpen && (
        <div className="modal">
          <div className="modal-inner">
            <div className="modal-header"></div>
            <div className="modal-introduction">
              <h2>Game Clear</h2>
              <p>無事脱出できました。</p>
            </div>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              とじる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maze;
