import React from 'react';
import ReactDOM from 'react-dom';
import MDWA from '../components/MDWA';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MDWA />, div);
  ReactDOM.unmountComponentAtNode(div);
});
