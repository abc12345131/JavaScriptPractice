import './App.css';
import { Component } from 'react';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
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
          <MyNavLink to="/about">About</MyNavLink>
          <MyNavLink to="/home">Home</MyNavLink>
        </div>
        <div className="panel">
          {/* register route */}
          <Switch>
            <Route path="/about" component={About}/>
            <Route path="/home" component={Home}/>
            <Redirect to="/about"/>
          </Switch>
        </div>
      </div>
    )
  }
};

export default class MyNavLink extends Component {
  render() {
    return (
        <NavLink activeClassName="active" className="list-group-item" {...this.props}/>
    )
  }
}
