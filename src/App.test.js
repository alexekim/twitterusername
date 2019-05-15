import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Suggestion from './Suggestion';
import Submit from './Submit';
import Loading from './Loading';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders child component Suggestion', ()=> {
  const div = document.createElement('div');
  ReactDOM.render(<App><Suggestion/></App>, div);
  ReactDOM.unmountComponentAtNode(div);

})

it('renders child component Loading', ()=> {
  const div = document.createElement('div');
  ReactDOM.render(<App><Loading/></App>, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders child component Submit', ()=> {
  const div = document.createElement('div');
  ReactDOM.render(<App><Submit/></App>, div);
  ReactDOM.unmountComponentAtNode(div);
})
