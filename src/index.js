import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'core/App';

const MOUNT_NODE = document.getElementById('app-container');

function renderToDOM() {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    MOUNT_NODE,
  );
}

renderToDOM();
