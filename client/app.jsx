import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div id='app'>
        <h1>Hello World!</h1>
      </div>
    );
  }
};

ReactDOM.render(<App />, document.getElementById('body'));