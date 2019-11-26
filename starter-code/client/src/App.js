import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import LandingPage from "./components/LandingPage.js";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Project from "./components/Project"
import Profile from "./components/Profile"
import CreateProject from "./components/CreateProject"
import Sendreset from "./auth/Send-reset"
import NucleoIcons from "./views/index-sections/NucleoIcons"
import RoisterMessenger from './components/chat/RoisterMessenger';

class App extends Component {

  state = {
      data: null,
      error: null
  };

  render() {
    return (
      <div className="App">
        <header>
            <Route exact path="/Roister" component={LandingPage} />
            <Route exact path="/" component={Login} />
            <Route exact path="/Profile/:userId" component={Profile} />
            <Route exact path="/Signup" component={Signup} />
            <Route exact path="/Project" component={Project} />
            <Route exact path="/Send-reset" component={Sendreset} />
            <Route exact path="/CreateProject" component={CreateProject} />
            <Route exact path="/icons" component={NucleoIcons} />
            <Route path="/chat" component={RoisterMessenger}></Route>
          </header>
      </div>
    );
  }
}

export default App;
