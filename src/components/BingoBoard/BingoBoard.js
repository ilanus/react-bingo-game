import React, { useEffect, useState, useCallback, useRef } from 'react';
import useSound from 'use-sound';
import Reward from 'react-rewards';
import classnames from 'classnames';
import {
  makeBingoBoard,
  getWinningRows,
  getWinningCols,
  getWinningDiagDownCols,
  getWinningDiagUpCols,
} from 'utils/bingoBoard';
import { getGreeting } from 'utils/greeting';
import BingoCard from 'components/BingoCard';

import bingoSfx from 'assets/sounds/bingo.mp3';

import styles from './BingoBoard.less';
import cardStyles from '../BingoCard/BingoCard.less';

const BingoBoard = () => {
  const [board, setBoard] = useState(makeBingoBoard());
  const [selectedCells, setSelectedCells] = useState([]);
  const [rowsWon, setRowsWon] = useState([]);
  const [colsWon, setColsWon] = useState([]);
  const [diagDownWon, setDiagDownWon] = useState([]);
  const [diagUpWon, setDiagUpWon] = useState([]);

  const [playSound] = useSound(bingoSfx);
  const rewardRef = useRef();

  const rowCount = board.length;
  const colCount = board[0].length;

  const handleReset = useCallback(() => {
    setBoard(makeBingoBoard());
    setSelectedCells([]);
    setRowsWon([]);
    setColsWon([]);
    setDiagDownWon([]);
    setDiagUpWon([]);
  }, []);

  const handleCellClick = useCallback(
    (rowIndex, cellIndex) => {
      setSelectedCells(cells => {
        const { id } = board[rowIndex][cellIndex];

        return cells.includes(id) ? cells.filter(cellId => cellId !== id) : [...cells, id];
      });

      setBoard(boardState => {
        const cellData = boardState[rowIndex][cellIndex];
        const isSelected = cellData.selected;

        const board = boardState.map((row, i) => {
          const cells = row.map((cell, j) => {
            const match = i === rowIndex && j === cellIndex;

            return match ? { ...cellData, selected: !isSelected } : cell;
          });
          return cells;
        });

        return board;
      });
    },
    [board],
  );

  const rewardUser = useCallback(() => {
    playSound();
    rewardRef.current.rewardMe();
  }, [playSound]);

  // check winning rows
  const checkRows = useCallback(() => {
    const winningRows = getWinningRows(rowCount, board);

    setRowsWon(winningRows);

    if (winningRows.length > rowsWon.length && winningRows.length > 0) {
      rewardUser();
    }
  }, [board, rewardUser, rowCount, rowsWon.length]);

  // check winning cols
  const checkCols = useCallback(() => {
    const winningCols = getWinningCols(colCount, board);

    setColsWon(winningCols);

    if (winningCols.length > colsWon.length && winningCols.length > 0) {
      rewardUser();
    }
  }, [board, colCount, colsWon.length, rewardUser]);

  // check winning diagonal down
  const checkDiagDown = useCallback(() => {
    const winningDiagDown = getWinningDiagDownCols(board);

    setDiagDownWon(winningDiagDown.map(cell => cell.id));

    if (winningDiagDown.length > diagDownWon.length && winningDiagDown.length > 0) {
      rewardUser();
    }
  }, [board, diagDownWon.length, rewardUser]);

  // check winning diagonal up
  const checkDiagUp = useCallback(() => {
    const winningDiagUp = getWinningDiagUpCols(rowCount, board);

    setDiagUpWon(winningDiagUp.map(cell => cell.id));

    if (winningDiagUp.length > diagUpWon.length && winningDiagUp.length > 0) {
      rewardUser();
    }
  }, [board, diagUpWon.length, rewardUser, rowCount]);

  const checkMatches = useCallback(() => {
    checkRows();
    checkCols();
    checkDiagDown();
    checkDiagUp();
  }, [checkRows, checkCols, checkDiagDown, checkDiagUp]);

  useEffect(() => {
    checkMatches();
  }, [selectedCells, checkMatches]);

  const renderCard = useCallback(
    (cell, cellIndex, rowIndex) => {
      if (cell.id === 12) {
        return (
          <BingoCard key={cell.id} freeSpace>
            F R E E
            <br />
            S P A C E
          </BingoCard>
        );
      }

      return (
        <BingoCard
          key={cell.id}
          selected={board[rowIndex][cellIndex].selected}
          matched={
            colsWon.includes(cellIndex) ||
            diagDownWon.includes(cell.id) ||
            diagUpWon.includes(cell.id)
          }
          onClick={() => handleCellClick(rowIndex, cellIndex)}
        >
          {cell.phrase}
        </BingoCard>
      );
    },
    [board, colsWon, diagDownWon, diagUpWon, handleCellClick],
  );

  const greeting = getGreeting();

  return (
    <div>
      <div className={styles.actions}>
        <div className={styles.score}>
          {greeting}
        </div>
        <button
          type="button"
          className={styles.reset}
          onClick={handleReset}
        >
          Reset Game
        </button>
      </div>
      <Reward
        ref={rewardRef}
        type="memphis"
        config={{
          type: 'memphis',
          fakingRequest: false,
          lifetime: 200,
          zIndex: 10,
          springAnimation: false,
        }}
      >
        <div className={styles.board}>
          {board.map((row, rowIndex) => {
            return (
              <div
                key={rowIndex}
                className={classnames(cardStyles.row, {
                  [cardStyles.match]: rowsWon.includes(rowIndex),
                })}
              >
                {row.map((cell, cellIndex) => {
                  return renderCard(cell, cellIndex, rowIndex);
                })}
              </div>
            );
          })}
        </div>
      </Reward>
    </div>
  );
};

export default BingoBoard;
