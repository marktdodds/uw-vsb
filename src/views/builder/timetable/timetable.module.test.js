import React from 'react';
import ReactDOM from 'react-dom';
import HeaderModule from './timetable.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimetableModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
