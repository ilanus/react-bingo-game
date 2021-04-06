import { phrases } from 'constants/phrases';
import { shuffle } from './shuffle';

/**
 * @param {number} size
 * @returns 2D array with phrases.
 */
export const makeBingoBoard = (size = 5) => {
  let id = 0;
  const midPoint = 12;
  const result = [];
  const shuffledPhrases = shuffle(phrases);

  for (let i = 0; i < shuffledPhrases.length; i += size) {
    const data = shuffledPhrases.slice(i, i + size);
    const arr = [];

    for (let j = 0; j < data.length; j += 1) {
      const phrase = data[j];

      arr.push({
        phrase,
        id,
        selected: id === midPoint,
        match: false,
      });

      id += 1;
    }

    result.push(arr);
  }

  return result;
};

/**
 * @param {number} rowCount
 * @param {array} board
 * @returns array with winning rows.
 */
export const getWinningRows = (rowCount, board) => {
  const winningRows = [];

  for (let i = 0; i < rowCount; i += 1) {
    const rowValues = board[i];
    const rowWin = rowValues.every(val => val.selected);

    if (rowWin) {
      winningRows.push(i);
    }
  }

  return winningRows;
};

/**
 * @param {number} colCount
 * @param {array} board
 * @returns array with winning cols.
 */
export const getWinningCols = (colCount, board) => {
  const winningCols = [];

  for (let i = 0; i < colCount; i += 1) {
    const colValues = board.map(row => row[i]);
    const colWin = colValues.every(val => val.selected);

    if (colWin) {
      winningCols.push(i);
    }
  }

  return winningCols;
};

/**
 * @param {array} board
 * @returns array with winning diag down cols.
 */
export const getWinningDiagDownCols = board => {
  const winningDiagDown = [];

  const diagDownValues = board.map((_, i) => board[i][i]);
  const diagDownWin = diagDownValues.every(val => val.selected);

  if (diagDownWin) {
    winningDiagDown.push(...diagDownValues);
  }

  return winningDiagDown;
};

/**
 * @param {number} rowCount
 * @param {array} board
 * @returns array with winning diag up cols.
 */
export const getWinningDiagUpCols = (rowCount, board) => {
  const winningDiagUp = [];

  const diagUpValues = board.map((_, i) => board[i][rowCount - i - 1]);
  const diagUpWin = diagUpValues.every(val => val.selected);

  if (diagUpWin) {
    winningDiagUp.push(...diagUpValues);
  }

  return winningDiagUp;
};
