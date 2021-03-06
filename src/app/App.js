//Dependencies
import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { logout } from '../helpers/auth';
import { firebaseAuth } from '../config/constants';

//Components
import Login from '../user/Login';
import Register from '../user/Register';
import Header from './Header';
import Home from './Home';
import MySurveys from '../surveys/MySurveys';
import SurveyDetail from '../surveys/SurveyDetail';
import Loading from 'react-loading-animation';
import Participate from '../participate/Participate';
import Reports from '../reports/Reports';
import Participants from '../participants/Participants';
import Participant from '../participants/Participant';
//Etcs...
import './style/Base.css';


function PrivateRoute ({component: Component, authed, ...rest}) {
  //console.log('props', rest)
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} user={rest.user} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  console.log('authed', authed)
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
      : <Redirect to='/mySurveys' />}
    />
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
      loading: true,
      user: ''
    }
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        //console.log('authed:', user)
        //console.log('emailVerified:', user.emailVerified)
        let authed = true;
        // if(process.env.NODE_ENV === "production"){
        //   if(!user.emailVerified){
        //     authed = false;
        //   }
        // }else{
        //
        // }
        this.setState({
          authed: authed,
          loading: false,
          user: user
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  componentWillUnmount () {
    this.removeListener()
  }

  render() {
    if (this.state.loading) {
      return <div className="u-marginTop10em"><Loading type='balls' color='#F0AD4E' /></div>
    }
    return (
      <div>
        <BrowserRouter>
          <div className="">
            <div className="container">
              <Header
                auth={this.state.authed}
                user={this.state.user}
                onLogout={() =>{
                    logout()
                    this.setState({authed: false, user:''})
                }}
                />
              <div className="u-marginTop10em">
                <Switch>
                  <PublicRoute path='/' exact component={Home} authed={this.state.authed} />
                  <PublicRoute authed={this.state.authed} path='/login' component={Login} />
                  <PublicRoute authed={this.state.authed} path='/register' component={Register} />
                  <PrivateRoute exact authed={this.state.authed} path='/participate/:surveyKey/:uid' component={Participate} user={this.state.user} />
                  <PrivateRoute exact authed={this.state.authed} path='/mySurveys' component={MySurveys} user={this.state.user} />
                  <PrivateRoute exact authed={this.state.authed} path='/reports/:surveyKey/:uid' component={Reports} user={this.state.user} />
                  <PrivateRoute exact authed={this.state.authed} path='/participants/:surveyKey/:uid' component={Participants} user={this.state.user} />
                  <PrivateRoute exact authed={this.state.authed} path='/participants/:surveyKey/:uid/:participateKey' component={Participant} user={this.state.user} />
                  <PrivateRoute authed={this.state.authed} path='/mySurveys/:surveyKey' component={SurveyDetail} user={this.state.user} />
                  <Route render={() => <h3>No Match</h3>} />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
