import 'antd/dist/antd.css';
import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Route,Switch } from 'react-router-dom';
// import axios from 'axios';
// import CryptoJS from 'crypto-js';//md5
import Login from './Login';//登录
import Home from './Home';//Home
// import Ajax from './Ajax';//Ajax

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className='height'>
          <Switch>
            <Route path="/login" component={Login}/>
            <Home />
          </Switch> 
        </div>
      </BrowserRouter>
    )
  }
}

export default App;

