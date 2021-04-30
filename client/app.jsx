import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentBook: {}
    };
  }

  setParam() {
    const bookId = Math.floor(Math.random() * 100);
    const bookTitle = encodeURIComponent('Of Journey My Lead And Begin');
    const param = Math.random() < 0.5 ? `bookId=${bookId}` : `bookTitle=${bookTitle}`;
    let newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${param}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  }

  getPrice() {
    let params = document.location.search.substr(1).split('&');

    params.forEach((item, i) => {
      params[i] = item.split('=');
    });

    for (let param of params) {
      if (param[0] === 'bookId' || param[0] === 'bookTitle') {
        fetch(`http://localhost:3000/api/price/${param[1]}`)
          .then(response => response.json())
          .then(data => {
            console.log('== book data ==>', data);
            this.setState({
              currentBook: data
            });
          });
      }
    }
  }

  componentDidMount() {
    this.setParam();
    this.getPrice();
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