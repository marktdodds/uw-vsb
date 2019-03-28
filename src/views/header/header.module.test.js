import React from 'react';
import ReactDOM from 'react-dom';
import HeaderModule from './header.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
