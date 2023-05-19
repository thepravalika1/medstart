import React from 'react';
import Logo from '../src/assets/logo.png'
import './App.css'
import { Navbar } from 'react-bootstrap';
import Home from './components/Home';
import SecPage from './components/Secpage';
import { Route,Routes } from 'react-router-dom';

function App() {
 
  return (
    <div className="App">
      
      <Navbar className='navbar'>
      
        <Navbar.Brand href="/" style={{display:'flex'}}>
        <img src={Logo} height={50} width={80} />
          <h2>MedStart</h2></Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          
        </Navbar.Collapse>
      
    </Navbar>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/hospital/properties/:name' element={<SecPage />}/>
    </Routes>
    </div>
  )
}

export default App
