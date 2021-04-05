import React from 'react';
import { BingoBoard, Footer, Header } from 'components';

import styles from './Home.less';

const Home = () => {
  return (
    <div className={styles.root}>
      <Header />
      <BingoBoard />
      <Footer />
    </div>
  );
};

export default Home;
