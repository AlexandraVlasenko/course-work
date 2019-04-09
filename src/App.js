// /client/App.js
import React, { Component } from 'react'
import Start from './pages/Start'
import { Switch } from 'react-router'
import List from './pages/List'

import { createGlobalStyle } from 'styled-components/macro'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" exact={true} component={Start} />
            <Route path="/list" component={List} />
          </Switch>
        </Router>
        <GlobalStyles />
      </>
    )
  }
}

export default App

const GlobalStyles = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
}
  body {
    @import url('https://fonts.googleapis.com/css?family=Heebo');
    font-family: 'Heebo', sans-serif;
  }
`
