import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route, withRouter, Redirect} from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Logout from './components/Logout'
import Navigationbar from './components/Navigationbar';
import Dashboard from './components/Dashboard';
import {handleGetQuestions} from './actions/questions';
import Poll from './components/Poll';
import PollResult from './components/PollResult';
import LeaderBoard from './components/LeaderBoard';
import NewQuestion from './components/NewQuestion';


class App extends Component { 
  componentDidMount() {
    this.props.dispatch(handleGetQuestions());
  }
  
  render(){
    return(
      <Router>
        <Fragment>        
          <LoadingBar />
            {
              this.props.authenticated == null 
                ? null
                : <Navigationbar loggedInUser={this.props.loggedInUser}/>
            }
          <div>
            {this.props.loading === true
              ? null
              :
                this.props.authenticated 
                ? <div>
                    <Switch>
                      <Route path='/' exact component={Dashboard} />
                      <Route path="/login" exact component={withRouter(Login)} />  
                      <Route path="/logout" exact component={withRouter(Logout)} />
                      <Route path='/question/:id' exact component={Poll} />
                      <Route path='/question/:id/results' exact component={PollResult} />
                      <Route path='/leaderboard' exact component={LeaderBoard} />   
                      <Route path='/add' exact component={NewQuestion}/>             
                    </Switch>  
                  </div>
                :
                  <Route component={withRouter(Login)} /> 
            }        
          </div>
        </Fragment>
      </Router>
    );
  }
 }

function mapStateToProps({users, authedUser}) {
  return {
      loading: false,
      loggedInUser: authedUser.loggedInUser,
      authenticated: authedUser.authenticated
  }
}

export default connect(mapStateToProps)(App);