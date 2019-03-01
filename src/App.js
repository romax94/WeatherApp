import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import GameField from './pages/GameField';
import Settings from './pages/Settings';
import { fetchWeatherInfo } from './actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchWeatherInfo();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" component={this.props.weatherInfo.isLoading ? () => <p>Loading...</p> : GameField} />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ weatherInfo }) => ({
  weatherInfo
});

const mapDispatchToProps = dispatch => ({
  fetchWeatherInfo: () => dispatch(fetchWeatherInfo())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
