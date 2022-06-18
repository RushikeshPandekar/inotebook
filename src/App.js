import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import NoteState from './contexts/NoteState';
function App() {
  return (
    <>
      <NoteState>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/about" element={<About/>}/>
              </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
