import React from 'react';

import styles from './Header.less';

const Header = () => (
  <header className={styles.header}>
    <h1 className={styles.slogan}>Play every day</h1>
    <h1 className={styles.title}>Conference Bingo</h1>
  </header>
);

export default Header;
