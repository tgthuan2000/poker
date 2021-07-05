import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Games from './Pages/Games';
import Users from './Pages/Users';


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
