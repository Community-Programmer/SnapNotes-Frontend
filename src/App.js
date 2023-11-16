import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Note from './pages/Note';
import './App.css'
import NoteContext from './context/NoteContext';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';
import Reset from './pages/Reset';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  const [progress, setProgress] = useState(0)
  return (
    <NoteContext>
    <BrowserRouter>
    <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    <Routes>
      <Route path='/' element={<Navbar/>}>
      <Route index element={<Home setProgress={setProgress}/>}/>
      <Route path='/login' element={<Login setProgress={setProgress}/>}/>
      <Route path='/signup' element={<Signup setProgress={setProgress}/>}/>
      <Route path='/notes' element={<Note setProgress={setProgress}/>}/>
      <Route path='/reset' element={<Reset setProgress={setProgress}/>}/>
      <Route path='/about' element={<About setProgress={setProgress}/>}/>
      <Route path='/contact' element={<Contact setProgress={setProgress}/>}/>

      </Route>
    </Routes>
   
    
    </BrowserRouter>
    </NoteContext>
  );
}

export default App;
