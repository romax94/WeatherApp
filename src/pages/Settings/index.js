import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SettingItem } from '../../components/SettingItem';
import './style.css';

class Settings extends Component {
  componentDidMount() {
    console.log(this.props.weatherInfo);
  }

  render() {
    if (!this.props.weatherInfo.weatherInfo) return null;
    return (
      <div className="settings-container">
        <ul className="settings-wrapper">
          {this.props.weatherInfo.weatherInfo.map(item => (
            <li key={item.id} className="setting-list-item">
              <SettingItem name={item.name} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ weatherInfo }) => ({
  weatherInfo
});

export default connect(mapStateToProps)(Settings);
