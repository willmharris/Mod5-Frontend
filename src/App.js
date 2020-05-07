import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, NavLink, Redirect} from 'react-router-dom'
// Cookies
import { withCookies } from 'react-cookie'
// Public pages
import Home from "./Components/PublicPages/Home.js"
import WhatIsMediation from "./Components/PublicPages/WhatIsMediation.js"
import GetInTouch from "./Components/PublicPages/GetInTouch.js"
import ScheduleACall from "./Components/PublicPages/ScheduleACall.js"
import Login from "./Components/PublicPages/Login.js"
import YourCase from "./Components/PublicPages/YourCase.js"
// Private pages
import AdminContainer from "./Components/PrivatePages/AdminContainer.js"
// Semantic 
import { Menu } from 'semantic-ui-react'
// Alert provider
import { useAlert } from 'react-alert'



function App(props) {
  
  const { cookies } = props
  const alert = useAlert()

  function setUser(user) {
    cookies.set('id', user["id"], { path: '/' })
    cookies.set('accountType', user["account_type"], { path: '/' })
  }

  function logout() {
    cookies.remove('id')
    cookies.remove('accountType')
    alert.show("You have logged out")
  }

  return (
    <div >
      <Router>
        <Menu>  
          <NavLink to="/" exact> <Menu.Item>Homepage </Menu.Item></NavLink>
          <NavLink to="/what-is-mediation" exact><Menu.Item>What is mediation </Menu.Item></NavLink>
          <NavLink to="/get-in-touch" exact><Menu.Item>Get in touch</Menu.Item></NavLink>
          <NavLink to="/schedule-a-call" exact><Menu.Item>Schedule a call</Menu.Item></NavLink>
          <NavLink to="/your-case" exact><Menu.Item>Your case </Menu.Item></NavLink>
          <NavLink to="/admin" exact><Menu.Item>Admin</Menu.Item></NavLink>
          <Menu.Menu position="right">
            {cookies.get('id') ?
              <NavLink to="/login" exact><Menu.Item onClick={logout}>Logout</Menu.Item></NavLink>
              : 
              <NavLink to="/login" exact><Menu.Item>Login </Menu.Item></NavLink>
            }
          </Menu.Menu>
        </Menu>
        <React.Fragment>
          <Route exact path="/" render={Home} />
          <Route exact path="/what-is-mediation" render={WhatIsMediation} />
          <Route exact path="/get-in-touch" render={() => <GetInTouch />} />
          <Route exact path="/schedule-a-call" render={() => <ScheduleACall />} />
          <Route exact path="/login" render={() => <Login setUser={setUser}/>} />
          <Route path="/your-case" render={() => { 
            if (cookies.get('accountType') === "2") {
              return <YourCase cookies={props.cookies} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
          <Route path="/admin" render={() => { 
            if (cookies.get('accountType') === "0") {
              return <AdminContainer cookies={props.cookies} />
            } else {
              return <Redirect to="/login" />
            }
          }} />
        </React.Fragment>
      </Router>
    </div>
  )
}

export default withCookies(App)
