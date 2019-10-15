import React from 'react';
//import logo from './logo.svg';
import './App.css';
import MainPage from '../MainPage/MainPage'
import { Route, Switch } from 'react-router-dom'
import Welcome from '../Welcome/Welcome'

function App() {
  return (
    <div className="App">
      <main className="App-header">
        <Switch>
            <Route
              exact
              path='/'
              component={Welcome}
            />
            <Route
              path='/main'
              component={MainPage}
            />
            {/*<Route
              component={NotFoundRoute}
            />*/}
          </Switch>
      </main>
    </div>
  );
}

export default App;
