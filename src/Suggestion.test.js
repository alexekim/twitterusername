import React from 'react';
import ReactDOM from 'react-dom';
import Suggestion from './Suggestion';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Suggestion />, div);
  ReactDOM.unmountComponentAtNode(div);
});
