import './App.css';
import {  Route, useLocation } from 'react-router-dom'
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';

function App() {

  const location = useLocation();

  return (
    <div className="App">
       {location.pathname !== '/' && <NavBar />}
        <Route path='/' element={<LandingPage />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/create' element={<Form />} />
        <Route path='/home' element={<Home />} />
  
    </div>
  );
}

export default App;
