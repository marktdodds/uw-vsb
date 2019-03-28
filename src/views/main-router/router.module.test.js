import React from 'react';
import ReactDOM from 'react-dom';
import RouterModule from './router.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RouterModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
