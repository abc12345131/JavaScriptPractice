import './App.css';
import { Component } from 'react';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import {NavLink, Route} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

export default class App extends Component {
  render(){
    return (
      <div className="App">
        <div className="list-group">
          <Component1/>
          <Component2/>
          {/* route link */}
          <NavLink activeClassName="active" className="list-group-item" to="/about">About</NavLink>
          <NavLink activeClassName="active" className="list-group-item" to="/home">Home</NavLink>
        </div>
        <div className="panel">
          {/* register route */}
          <Route path="/about" component={About}/>
          <Route path="/home" component={Home}/>
        </div>
      </div>
    )
  }
}
