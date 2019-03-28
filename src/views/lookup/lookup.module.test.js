import React from 'react';
import ReactDOM from 'react-dom';
import LookupModule from './lookup.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LookupModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
