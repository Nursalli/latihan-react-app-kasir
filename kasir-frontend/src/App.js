import React, { Component } from "react";
import { NavbarComponent } from "./Components";
import { Home, Sukses } from "./Pages";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavbarComponent />
          <main>
            <Routes>
              <Route path="/" exact element={ <Home /> } />
              <Route path="/sukses" exact element={ <Sukses /> } />
            </Routes>
          </main>
        </Router>
      </div>
    );
  }
}
