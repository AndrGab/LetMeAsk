import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import { Home } from "./pages/Home";
import { Room } from './pages/Room';
import { RoomList } from './pages/RoomList';
import { Login } from './pages/Login';
import { AdminRoom } from './pages/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext'

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <PublicRoute path="/" exact component={Login} />
          <PublicRoute path="/login" exact component={Login} />

          <PrivateRoute path="/home" exact component={Home} />
          <PrivateRoute path="/rooms/:id" component={Room} />
          <PrivateRoute path="/roomslist" component={RoomList} />
          <PrivateRoute path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );

  function PrivateRoute({ component, ...rest }: any) {
    const { user } = useAuth();
    console.log({ user })

    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/",
             
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }: any) {
    const { user } = useAuth();
    return (
      < Route
        {...rest}
        render={
          props =>
            user ? (
              <Redirect
                to={{
                  pathname: "/home",
                }}
              />
            ) : (
              React.createElement(component, props)
            )
        }
      />
    );
  }
}
export default App;
