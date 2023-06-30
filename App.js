import React from 'react';
import './App.css';
import MainNavigation from './Shared/Page/MainNavigation';
import {BrowserRouter as Router} from 'react-router-dom'
import { Switch,Route,Redirect} from 'react-router-dom';
import Feed from './Feed/Pages/Feed';
import FriendList from './Friends/Components/FriendList';
import FriendsPage from './Friends/Pages/FriendsPage';
import Profilepage from './Profile/Pages/Profilepage';
import Auth from './Auth/Pages/Auth'
import { AuthContext } from './Auth/Components/AuthContext';
import { useState,useCallback } from 'react';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
   
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
 let routes;
 if(isLoggedIn){
  routes=(
    <React.Fragment>
      <Switch>
      <Route path="/feed" exact><Feed/></Route>
        <Route path="/friends" exact><FriendList/></Route>
        <Route path="/profile" exact><Profilepage/></Route>
      <Route path="/:id/profile" exact><FriendsPage/></Route>
    
      <Redirect to='/feed' exact><Feed/></Redirect>

      </Switch>
    </React.Fragment>
  )}else{
    routes=(
      <Switch>
<React.Fragment>
    <Route path="/" exact><Auth/></Route>
    <Redirect to='/' exact><Auth/></Redirect>
    </React.Fragment>
    </Switch>
    )
    
 }
  return (
    <div className="App">
        <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
      <MainNavigation/>
      {routes}
      </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
