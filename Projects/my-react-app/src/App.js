import './App.css';
import { Component } from 'react';
import MyNavLink from './components/MyNavLink';
import Header from './components/Header';
import {Route, Switch, Redirect} from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';

export default class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
        <div className="list-group">
          <MyNavLink to="/about">About</MyNavLink>
          <MyNavLink to="/home">Home</MyNavLink>
        </div>
        <div className="panel">
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
