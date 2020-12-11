import logo from './logo.svg';
import './App.css';
import Home from './containers/home'
import Header from './containers/header'
import Login from './containers/users/login'
import Register from './containers/users/register'
import {Switch, Route} from 'react-router-dom';
import RequireAuth from './helpers/requireAuth';
import Forgot from './containers/users/forgot';
import Agenda from './containers/agenda/agenda';
import DetailProspect from './containers/prospect/details'
import Dashboard from './containers/prospect/dashboard';
import Logout from './containers/users/logout';
import AddProspect from './containers/prospect/addProspect';
import EditProspect from './containers/prospect/editProspect';
import Stat from './containers/stats'

function App() {
  return (
    <div className="App">
      <Header/>
      <Switch>
      <Route exact path="/"  component={Login}/>
        <Route exact path="/home" component={RequireAuth(Dashboard, true)} />
        <Route exact path="/agenda" component={RequireAuth(Agenda, true)} />
        <Route exact path="/dashboard" component={RequireAuth(Stat, true)} />
        <Route exact path="/logout" component={RequireAuth(Logout, true)} />
        <Route exact path="/addprospect" component={RequireAuth(AddProspect, true)} />
        <Route exact path="/register" component={Register}/>
        <Route exact path='/details/:id' component={RequireAuth(DetailProspect,true)} />
        <Route exact path='/edit/:id' component={RequireAuth(EditProspect,true)} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/forgot" component={Forgot}/>

      </Switch>
    </div>
  );
}

export default App;
