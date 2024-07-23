import React, { useState, useEffect } from 'react';

const Maze = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 }); //初期位置設定
  const [enemyPositions, setEnemyPositions] = useState([
    { x: 24, y: 2 },
    { x: 16, y: 14 },
    { x: 8, y: 3 },
    { x: 16, y: 1},
    { x: 10, y: 13},
    { x: 4, y: 12},
    { x: 11, y: 11}
  ]); //敵位置設定
  const [gameOver, setGameOver] = useState(false); //ゲームオーバー設定
  const [enemyPathIndexes, setEnemyPathIndexes] = useState([0, 0, 0, 0, 0, 0, 0]); // 敵の経路インデックス
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false); // ゲームオーバーモーダルの状態設定
  const [isGameClearModalOpen, setIsGameClearModalOpen] = useState(false); //ゴール時のモーダル

  const maze = [
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
    [1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  ]; //迷路生成

  const enemyPaths = [
    [
      { x: 24, y: 2 },
      { x: 24, y: 3 },
      { x: 24, y: 4 },
      { x: 24, y: 5 },
      { x: 23, y: 5 },
      { x: 22, y: 5 },
      { x: 22, y: 6 },
      { x: 22, y: 7 },
      { x: 23, y: 7 },
      { x: 24, y: 7 }
    ],
    [
      { x: 16, y: 14 },
      { x: 17, y: 14 },
      { x: 18, y: 14 },
      { x: 19, y: 14 },
      { x: 20, y: 14 },
      { x: 20, y: 13 },
      { x: 20, y: 12 },
      { x: 20, y: 11 },
      { x: 21, y: 11 },
      { x: 21, y: 10 },
      { x: 21, y: 9 },
      { x: 21, y: 8 },
      { x: 21, y: 7 },
      { x: 22, y: 7}
    ],
    [
      { x: 8, y: 2 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
      { x: 10, y: 3 },
      { x: 10, y: 2 },
      { x: 11, y: 2 },
      { x: 12, y: 2 },
      { x: 12, y: 1 },
      { x: 12, y: 0 }
    ],
    [
      { x: 16, y: 1 },
      { x: 16, y: 2 },
      { x: 17, y: 2 },
      { x: 17, y: 3 },
      { x: 17, y: 4 },
      { x: 18, y: 4 },
      { x: 18, y: 5 },
      { x: 19, y: 5 }
    ],
    [
      { x: 10, y: 13 },
      { x: 10, y: 14 },
      { x: 11, y: 14 },
      { x: 12, y: 14 },
      { x: 12, y: 13 },
      { x: 13, y: 13 },
      { x: 14, y: 13 },
      { x: 14, y: 12 },
      { x: 15, y: 12 },
      { x: 16, y: 12 }
    ],
    [
      { x: 4, y: 12 },
      { x: 4, y: 13 },
      { x: 5, y: 13 },
      { x: 6, y: 13 },
      { x: 6, y: 14 },
      { x: 7, y: 14 },
      { x: 8, y: 14 },
      { x: 8, y: 13 }
    ],
    [
      { x: 11, y: 11 },
      { x: 10, y: 11 },
      { x: 9, y: 11 },
      { x: 8, y: 11 },
      { x: 8, y: 12 },
      { x: 8, y: 13 },
      { x: 9, y: 13 }
    ]
  ]; // 4体の敵の経路

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

      for (let i = 0; i < enemyPositions.length; i++) {
        if (newPosition.x === enemyPositions[i].x && newPosition.y === enemyPositions[i].y) {
          setGameOver(true);
          setIsGameOverModalOpen(true); // ゲームオーバーモーダルを表示
          return;
        }
      }

      if (newPosition.x === 24 && newPosition.y === 14) {
        setGameOver(true);
        setIsGameClearModalOpen(true); //ゲームセットモーダル表示
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => { //0.1秒毎に移動していくsetIntervalを使用
      if (gameOver) return; //gameOverの場合、この関数を修了

      setEnemyPositions(prevPositions => { //現在の敵の位置を変える関数(prePositionsにenemyPositionsを格納)
        return prevPositions.map((pos, i) => { //map関数でprePsitionsの各行を実行
          const nextIndex = (enemyPathIndexes[i] + 1) % enemyPaths[i].length; //次のインデックスの値の定数nextIndex
          const newEnemyPosition = enemyPaths[i][nextIndex]; //敵の新しい位置の定数newEnemyPosition

          if (newEnemyPosition.x === position.x && newEnemyPosition.y === position.y) { //敵とキャラクターが衝突した場合
            setGameOver(true);
            setIsGameOverModalOpen(true); // モーダルを表示
          }

          setEnemyPathIndexes(prevIndexes => { //各敵の次のインデックスを示す関数(preIndexesにenemyPathIndexesを格納)
            const newIndexes = [...prevIndexes]; //コピー
            newIndexes[i] = nextIndex; //i行目のインデックスを+1(nextIndexを代入)
            return newIndexes; //newIndexesを返す
          });

          return newEnemyPosition; //敵の新しいポジションのnewEnemyPositionを敵の数でまとめて返す
        });
      });
    }, 100); //敵の速度

    return () => clearInterval(intervalId); //クリーンアップ関数で以前のインターバルをクリア
  }, [enemyPathIndexes, gameOver]); //この依存配列の値が変わるとEffectを再実行

  useEffect(() => {
    const mazeContainer = document.querySelector('.maze-container'); //maze-containerクラスのDOM要素選択
    mazeContainer.focus(); //フォーカス
  }, []); //空の配列なのでコンポーネントが初めてマウントされたとき

  const handleCloseModal = () => {
    setIsGameOverModalOpen(false);
    setIsGameClearModalOpen(false); // モーダルを閉じる処理
  };

  return (
    <div className="maze-container" tabIndex="0" onKeyDown={handleKeyDown}>
      {maze.map((row, rowIndex) => ( //迷路の各行をプロット(rowは各行の内容、rowIndexは行数)
        <div key={rowIndex} className="maze-row"> {/* 各行のクラスとキーを設定 */}
          {row.map((cell, cellIndex) => ( //迷路の各列をプロット（cellは列の内容、cellIndexは列数）
            <div
              key={cellIndex}
              className={`maze-cell ${cell === 1 ? 'wall' : ''} ${
                position.x === cellIndex && position.y === rowIndex ? 'character' : ''
              } ${
                enemyPositions.some(enemy => enemy.x === cellIndex && enemy.y === rowIndex) ? 'enemy' : ''
              }`} //セルに動的にクラス定義
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
