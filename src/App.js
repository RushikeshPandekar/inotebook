import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import NoteState from './contexts/NoteState';
import Notes from './components/Notes';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import Home from './components/Home';

function App() {
  const [alert, setAlert] = useState(null);
  const giveAlert = (msg,type)=>{
      setAlert({
          message:msg,
          type:type,
      })
      setTimeout(() => {
          setAlert(null)
      }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
            <Navbar/>
            <Alert alert={alert} />
            <Routes>
                <Route path="/login" element={<Login giveAlert={giveAlert}/>}/>
                <Route path="/signup" element={<Signup giveAlert={giveAlert}/>}/>
                <Route path="/" element={<Home giveAlert={giveAlert}/>}/>
                <Route path="/yournotes" element={<Notes giveAlert={giveAlert}/>}/>
                <Route path="/about" element={<About/>}/>
              </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
