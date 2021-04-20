import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import Admin from './pages/admin'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/admin' component={Admin}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
