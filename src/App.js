import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Components/Pages/Home'
import Navbar from './Components/Navbar'
import Games from './Components/Pages/Games';
import Users from './Components/Pages/Users';


function App() {
  return (
    <Router>
      <div className='App'>
      <Navbar/>
      <div id='wrapper'>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/users' exact>
            <Users/>
          </Route>
          <Route path='/games' exact>
            <Games/>
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
