import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import {CreateAccount} from './Components/CreateAccount' 
import {Login} from './Components/Login'
import {User} from "./Components/User"
import {HelpDesk} from "./Components/HelpDesk"
import {Admin} from "./Components/Admin"



const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* <Login /> */}
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/create" component={CreateAccount} /> */}
        <Route exact path="/user" component={User} />
        <Route exact path="/helpdesk" component={HelpDesk} />
        <Route exact path="/admin" component={Admin} />
      </div>
    </Router>
  );
}

export default App;
