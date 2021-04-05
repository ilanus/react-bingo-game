/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './BingoCard.less';

const BingoCard = ({ onClick, selected, matched, children, freeSpace }) => {
  return (
    <div role="button" tabIndex={0} onClick={onClick} className={classnames(styles.col)}>
      <div
        className={classnames(styles.card, {
          [styles.active]: selected,
          [styles.match]: matched,
          [styles.freeSpace]: freeSpace,
        })}
      >
        {children}
      </div>
    </div>
  );
};

BingoCard.propTypes = {
  children: PropTypes.node,
  freeSpace: PropTypes.bool,
  matched: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};

export default BingoCard;
