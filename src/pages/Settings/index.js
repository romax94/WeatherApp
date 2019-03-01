import React from 'react';
import { connect } from 'react-redux';
import CardItem from '../../components/CardItem';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { RadioButton } from '../../components/RadioButton';
import { Icon } from 'antd';
import { setTempUnits } from '../../actions';

const Settings = props => {
  const mapHistoty = props.gameLog.map(item => ({
    cities: item.cityIds.map(id => props.cityWeather.get(id)),
    isWon: item.isWon
  }));
  return (
    <div>
      <Button text="Back" handleClick={() => props.history.goBack()} />
      <Title text="Settings" />
      <div>
        <Title text="Units" />
        <RadioButton
          type="celsius"
          handleChange={props.setTempUnits}
          checked={props.tempUnits === 'celsius'}
        />
        <RadioButton
          type="fahrenheit"
          handleChange={props.setTempUnits}
          checked={props.tempUnits === 'fahrenheit'}
        />
      </div>
      <div>
        {mapHistoty.length !== 0 && <Title text="History" />}
        <ul>
          {mapHistoty.map((item, i) => {
            const [firstCard, secendCard] = item.cities;
            return (
              <div key={i} className="card-list">
                <CardItem
                  city={firstCard.name}
                  country={firstCard.country}
                  id={firstCard.id}
                  temp={firstCard.temp}
                  showTemp={true}
                />
                <CardItem
                  city={secendCard.name}
                  country={secendCard.country}
                  id={secendCard.id}
                  temp={secendCard.temp}
                  showTemp={true}
                />
                <div>
                  <Icon style={{ fontSize: 60 }} type={item.isWon ? 'check' : 'close'} />
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ cityWeather, gameLog, tempUnits }) => ({
  cityWeather,
  gameLog,
  tempUnits
});

const mapDispatchToProps = dispatch => ({
  setTempUnits: tempUnits => dispatch(setTempUnits(tempUnits))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);
