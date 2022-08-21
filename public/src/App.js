import './App.css';
import  {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Register from './screen/Register';
import Login from './screen/Login';
import Chat from './screen/Chat';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Chat/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
