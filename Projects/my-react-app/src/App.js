import './App.less';
import { Component } from 'react';
import MyNavLink from './components/MyNavLink';
import Header from './components/Header';
import { Route, Switch, Redirect } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import { Button } from 'antd';
import Count from './components/Count';
import Person from './components/Person';

export default class App extends Component {
  render(){
    return (
      <div className="App">
        <Header/>
        <Count/>
        <Person/>
        <Button type="primary">Button</Button>
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
