import './App.css';
import React from 'react';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>NavBar</p>
    );
  }
}

class Mermaid extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>Mermaid</p>
    );
  }
}

class Content extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <p>Content</p>
    );
  }
}

const AppJSX = (
  <div className="App">
    <NavBar />
    <Mermaid />
    <Content />
  </div>
);

function App() {
  return AppJSX;
}

export default App;
