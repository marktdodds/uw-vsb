import React from 'react';
import ReactDOM from 'react-dom';
import TimetableModule from './timetable.module';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimetableModule />, div);
  ReactDOM.unmountComponentAtNode(div);
});
