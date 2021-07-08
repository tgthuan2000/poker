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
        <Switch>
          <Route path='/' exact>
            <Navbar/>
            <div className='app-wrap'>
              <Home/>
            </div>
          </Route>
          <Route path='/users' exact>
            <Navbar/>
            <div className='app-wrap'>
              <Users/>
            </div>
          </Route>
          <Route path='/games' exact>
            <Navbar/>
            <div className='app-wrap'>
              <Games/>
            </div>
          </Route>
          <Route path='/games/:gameId' exact>
            <Navbar/>
            <div className='app-wrap'>
              <GameRooms/>
            </div>
          </Route>
          <Route path='/games/:gameId/:roomId' exact>
            <GamePlay/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
