// Rendering layer control (React Router)
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Give component the ability to call action creators
import { connect } from 'react-redux';
// Take all the defined action creators and assign them to an object called "actions"
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// We won't use "mapStateToProps" so 1 arg is null, 2nd arg is all the action creators to wire up as props in the component
export default connect(null, actions)(App);
