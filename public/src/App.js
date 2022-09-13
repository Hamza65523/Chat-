import './App.css';
import  {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './screen/Register';
import Login from './screen/Login';
import Chat from './screen/Chat';
import SetAvatar from './screen/SetAvatar';
function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Chat/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/setAvatar' element={<SetAvatar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
