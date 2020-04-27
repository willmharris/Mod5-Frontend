import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom'
// Public pages
import Home from "./Components/PublicPages/Home.js"
import WhatIsMediation from "./Components/PublicPages/WhatIsMediation.js"
import Quiz from "./Components/PublicPages/Quiz.js"
import AboutUs from "./Components/PublicPages/AboutUs.js"
import YourMediator from "./Components/PublicPages/YourMediator.js"
import Pricing from "./Components/PublicPages/Pricing.js"
import GetInTouch from "./Components/PublicPages/GetInTouch.js"
import ScheduleACall from "./Components/PublicPages/ScheduleACall.js"
import Login from "./Components/PublicPages/Login.js"
// Private pages
import AdminContainer from "./Components/PrivatePages/AdminContainer.js"


function App() {
  
  return (
    <div>
      <Router>
        <div>  
          <NavLink to="/" exact>Homepage </NavLink>
          <NavLink to="/what-is-mediation" exact>What is mediation? </NavLink>
          <NavLink to="/quiz" exact>Quiz </NavLink>
          <NavLink to="/about-us" exact>About us </NavLink>
          <NavLink to="/your-mediator" exact>Your Mediator </NavLink>
          <NavLink to="/pricing" exact>Pricing </NavLink>
          <NavLink to="/get-in-touch" exact>Get in touch </NavLink>
          <NavLink to="/schedule-a-call" exact>Schedule a call </NavLink>
          <NavLink to="/login" exact>Login </NavLink>
          <NavLink to="/admin" exact>Admin Container</NavLink>
         
        </div>
        <br/>
        <div>
          <Route exact path="/" render={Home} />
          <Route exact path="/what-is-mediation" render={WhatIsMediation} />
          <Route exact path="/quiz" render={Quiz} />
          <Route exact path="/about-us" render={AboutUs} />
          <Route exact path="/your-mediator" render={YourMediator} />
          <Route exact path="/pricing" render={Pricing} />
          <Route exact path="/get-in-touch" render={GetInTouch} />
          <Route exact path="/schedule-a-call" render={ScheduleACall} />
          <Route exact path="/login" render={Login} />
          <Route path="/admin" render={() => <AdminContainer />} />
        </div>
      </Router>
    </div>
  )
}

export default App
