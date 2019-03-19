import React, { Component } from 'react';
import { HashRouter, Switch, Route } from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import Container from 'react-bootstrap/Container';

import BftHeader from './components/BftHeader';
import BftNav from './components/BftNav';
import BftBio from './components/BftBio';
import BftAllProjects from './components/BftAllProjects';
import BftInfoAndContact from './components/BftInfoAndContact';
import BftFooter from './components/BftFooter';

import  Whoops404 from './components/Whoops404';

import './styles/App.sass';

class BftRoutes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pages: {}
    };
  }

  componentDidMount(){
    let defaultOptions = {
      url:'',
      method:'GET',
      mode: 'cors',
      headers:{
        'Access-Control-Allow-Origin':'*'
      },
      body:null,
    };
    fetch('https://bftawfik-github-io.herokuapp.com/', defaultOptions)
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      console.log(JSON.parse(text))
      this.setState({pages : JSON.parse(text)});
    }.bind(this))
    .catch(function(error) {
      console.log('Request failed', error)
    });
  }

  render(){
    // console.log(AllData.contactsGroups)
    const history = createBrowserHistory()
    return(
      <HashRouter history={history}>
        <Container className="App">
          <Route exact path="*" component={BftHeader}/>
          <Route exact path="*" component={BftNav}/>
          <Switch>
            <Route exact path="/" render={(props) => <BftBio {...props} pageData={this.state.pages.home}/>}/>
            <Route exact path="/portfolio" render={(props) => <BftAllProjects {...props} pageData={this.state.pages.portfolio}/>}/>
            <Route exact path="/portfolio/:filter" render={(props) => <BftAllProjects {...props} pageData={this.state.pages.portfolio}/>}/>
            <Route exact path="/infoandcontact" render={(props) => <BftInfoAndContact {...props}  pageData={this.state.pages.infoandcontact}/>}/>
            <Route component={Whoops404}/>
          </Switch>
          <Route exact path="*" component={BftFooter}/>
        </Container>
      </HashRouter>
    )
  }
}

export default BftRoutes
