import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';

import styles from './App.less';

const App = () => {
  return (
    <div className={styles.appContainer}>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </div>
  );
};

export default App;
