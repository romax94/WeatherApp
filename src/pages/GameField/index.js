import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import cities from '../../constants/cities';
import { fetchWeatherInfo, addGameLogItem, incrementScore } from '../../actions';
import './style.css';

class GameField extends Component {
  state = {};

  componentDidMount() {
    this.nextCards();
  }

  nextCards = async () => {
    let randomIndex1 = Math.floor(Math.random() * cities.length);
    let randomIndex2 = (randomIndex1 + 1) % cities.length;
    let cityIds = [cities[randomIndex1].id, cities[randomIndex2].id];

    await Promise.all(cityIds.map(id => this.props.fetchWeatherInfo(id)));

    this.setState(prevState => ({
      ...prevState,
      cityIds,
      statusText: 'Which city is hotter?',
      isCardSelected: false
    }));
  };

  selectCard = id => {
    if (this.state.isCardSelected) return;

    let { cityIds } = this.state;

    let selectedCard = this.props.cityWeather.get(id);
    let unselectedCard = this.props.cityWeather.get(id === cityIds[0] ? cityIds[1] : cityIds[0]);

    let isWon = selectedCard.temp > unselectedCard.temp;

    this.setState(prevState => ({
      ...prevState,
      statusText: isWon ? 'You WON!' : 'You LOST!',
      isCardSelected: true
    }));

    this.props.addGameLogItem({ cityIds, isWon });

    if (isWon) {
      this.props.incrementScore();
    }
  };

  redirectToSettings = () => {
    this.props.history.push('/settings');
  };

  render() {
    let { cityIds, isCardSelected, statusText } = this.state;

    if (!cityIds) return null;

    let firstCard = this.props.cityWeather.get(cityIds[0]);
    let secondCard = this.props.cityWeather.get(cityIds[1]);

    return (
      <div className="game-field">
        <Button text="Setting" handleClick={this.redirectToSettings} />
        <Title text={statusText} />
        <p>Score: {this.props.score}</p>
        <div className="card-list">
          <CardItem
            city={firstCard.name}
            country={firstCard.country}
            id={firstCard.id}
            temp={firstCard.temp}
            showTemp={isCardSelected}
            handleClick={this.selectCard}
          />
          <CardItem
            city={secondCard.name}
            country={secondCard.country}
            id={secondCard.id}
            temp={secondCard.temp}
            showTemp={isCardSelected}
            handleClick={this.selectCard}
          />
        </div>
        {isCardSelected && (
          <div className="button-wrapper">
            <Button text="Next cities" handleClick={this.nextCards} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cityWeather, score }) => ({ cityWeather, score });

const mapDispatchToProps = dispatch => ({
  fetchWeatherInfo: id => dispatch(fetchWeatherInfo(id)),
  addGameLogItem: gameLogItem => dispatch(addGameLogItem(gameLogItem)),
  incrementScore: () => dispatch(incrementScore())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameField);
