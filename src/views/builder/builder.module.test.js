import React from 'react';
import ReactDOM from 'react-dom';
import BuilderModule from './builder.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BuilderModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
