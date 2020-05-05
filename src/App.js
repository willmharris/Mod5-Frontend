import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
import { withCookies } from 'react-cookie'
// Public pages
import Home from "./Components/PublicPages/Home.js"
import WhatIsMediation from "./Components/PublicPages/WhatIsMediation.js"
import GetInTouch from "./Components/PublicPages/GetInTouch.js"
import ScheduleACall from "./Components/PublicPages/ScheduleACall.js"
import Login from "./Components/PublicPages/Login.js"
// Private pages
import AdminContainer from "./Components/PrivatePages/AdminContainer.js"


function App(props) {
  
  const { cookies } = props

  function setUser(user) {
    cookies.set('id', user["id"], { path: '/' })
    cookies.set('accountType', user["account_type"], { path: '/' })
  }

  function logout() {
    cookies.remove('id')
    cookies.remove('accountType')
    alert("You have been logged out")
  }

  return (
    <div>
      <Router>
        <div>  
          <NavLink to="/" exact>Homepage </NavLink>
          <NavLink to="/what-is-mediation" exact>What is mediation? </NavLink>
          <NavLink to="/get-in-touch" exact>Get in touch </NavLink>
          <NavLink to="/schedule-a-call" exact>Schedule a call </NavLink>
          <NavLink to="/login" exact>Login </NavLink>
          <NavLink to="/admin" exact>Admin Container</NavLink>
          <button onClick={logout}>Logout</button>
        </div>
        <br/>
        <div>
          <Route exact path="/" render={Home} />
          <Route exact path="/what-is-mediation" render={WhatIsMediation} />
          <Route exact path="/get-in-touch" render={() => <GetInTouch />} />
          <Route exact path="/schedule-a-call" render={ScheduleACall} />
          <Route exact path="/login" render={() => <Login setUser={setUser}/>} />
          <Route path="/admin" render={() => { 
            if (cookies.get('accountType') === "0") {
              return <AdminContainer cookies={props.cookies} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
        </div>
      </Router>
    </div>
  )
}

export default withCookies(App)
