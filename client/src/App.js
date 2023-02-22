import React from "react";
import './App.css';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Detail from './components/Detail/Detail';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import { Route } from 'react-router-dom';

function App() {

  

  //{location.pathname !== '/' && <NavBar />}
  return ( 
    <div className="App">
        <Route path='/' render={() => <NavBar />} />
        <Route exact path='/' component={ LandingPage} />
        <Route path='/detail/:id' component={Detail} />
        <Route path='/create' component={Form} />
        <Route path='/home' component={Home} />
    </div>
  );
}

export default App;
