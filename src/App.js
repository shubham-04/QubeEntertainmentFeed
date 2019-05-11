import React from 'react';
import './App.css';
import Home from './HomePage/Homepage.js';
import Search from './movieSearch/Search';
import TitleBar from './titlebar/EntTitleBar'

import { Route, BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div>
      
      <Router>
        <Route component={TitleBar}/>
        <Route exact path="/" component={Home} />
        <Route path="/Search" component={Search} />
      </Router>
    </div>
  );
}

export default App;
