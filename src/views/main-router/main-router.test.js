import React from 'react';
import ReactDOM from 'react-dom';
import MainRouter from './main-router';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainRouter />, div);
  ReactDOM.unmountComponentAtNode(div);
});
