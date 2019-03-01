import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Card } from '../../components/card';
import { Alert } from '../../components/Alert';

function createCardGenerator(cards) {
  let nextIndex = 0;
  let usedIndicies = new Set();
  return () => {
    while (usedIndicies.has(nextIndex)) {
      nextIndex += 1;
      if (nextIndex === cards.length) return null;
    }
    let firstCardIndex = nextIndex;
    let secondCardIndex = (firstCardIndex + cards.length / 2) % cards.length;
    usedIndicies.add(firstCardIndex);
    usedIndicies.add(secondCardIndex);
    return [cards[firstCardIndex], cards[secondCardIndex]];
  };
}

class GameField extends Component {
  cardGenerator = createCardGenerator(this.props.weatherInfo.weatherInfo);

  state = {
    currentCards: this.cardGenerator(),
    alertText: null
  };

  selectCard = async id => {
    const { currentCards } = this.state;
    const selectedCard = currentCards.findIndex(item => item.id === id);
    const unSelectedCard = currentCards.findIndex((item, i) => i !== selectedCard);

    this.setState(prevState => ({
      ...prevState,
      alertText: currentCards[selectedCard].temp > currentCards[unSelectedCard].temp ? 'YES' : 'NO'
    }));

    await new Promise(resolve => setTimeout(resolve, 1000));

    this.setState(prevState => ({
      ...prevState,
      currentCards: this.cardGenerator(),
      alertText: null
    }));
  };

  render() {
    const [firstCard, secondCard] = this.state.currentCards;
    return (
      <div>
        <NavLink to="settings">Settings</NavLink>
        <p>Which city is better?</p>
        <p>Score: </p>
        <div>
          <Card
            city={firstCard.name}
            country={firstCard.country}
            id={firstCard.id}
            handleClick={this.selectCard}
          />
          <Card
            city={secondCard.name}
            country={secondCard.country}
            id={secondCard.id}
            handleClick={this.selectCard}
          />
        </div>
        {this.state.alertText && <Alert text={this.state.alertText} />}
      </div>
    );
  }
}

const mapStateToProps = ({ weatherInfo }) => ({
  weatherInfo
});

export default connect(mapStateToProps)(GameField);
