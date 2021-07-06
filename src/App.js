import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Games from './Pages/Games';
import GameRooms from './Pages/Games/GameRoom.jsx';
import GamePlay from './Pages/Games/GamePlay.jsx';
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
          <Route path='/games/:gameId' exact>
            <GameRooms/>
          </Route>
          <Route path='/games/:gameId/:roomId' exact>
            <GamePlay/>
          </Route>
        </Switch>
      </div>
      </div>
    </Router>
  );
}

export default App;
