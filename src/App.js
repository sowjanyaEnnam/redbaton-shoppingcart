import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './components/Home';
import Summary from './components/Summary';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div style={{ height: '7vh' }}>
            <Navbar />
          </div>
          <div style={{ height: '89vh', }}>
             {/* style={{ height: '93vh', overflowY: 'scroll', }}> */}
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/summary' exact component={Summary} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
