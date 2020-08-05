import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import Login from './sessions/Login';
import Logout from './sessions/Logout';

import Resources from './resources/Index';
import NewResource from './resources/New';
import EditResource from './resources/Edit';

function Routes ({user, setUser}) {
  return (
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/about" component={About}/>
      <Route exact path="/login" render={
        renderProps => <Login
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/logout" render={
        renderProps => <Logout
          {...renderProps}
          setUser={setUser}
        />
      }/>
      <Route exact path="/resources" render={
        renderProps => <Resources
          {...renderProps}
          user={user}
        />
      }/>
      <Route exact path="/resources/new" component={NewResource}/>
      <Route exact path="/resources/edit" component={EditResource}/>
    </Switch>
  );
}
export default Routes;
