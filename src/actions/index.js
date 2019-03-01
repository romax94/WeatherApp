import cities from '../constants/cities.json';

const fetchWeatherByCityId = id => {
  const apiKey = 'f753daaf6addf836b1cbc7134ea2747b';
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&APPID=${apiKey}`)
    .then(response => response.json())
};

export const fetchWeatherInfo = () => async dispatch => {
  dispatch({
    type: 'REQUEST_WEATHER_INFO'
  });
  let cityIndicies = cities.map(city => city.id);
  let response = await Promise.all(cityIndicies.map(cityId => fetchWeatherByCityId(cityId)));
  dispatch({
    type: 'GET_WEATHER_INFO',
    payload: response.map((item, index) => ({
      id: item.city.id,
      name: cities[index].name,
      country: cities[index].country,
      temp: item.list[0].main.temp
    }))
  });
};