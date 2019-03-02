const fetchWeatherByCityId = id => {
  const apiKey = 'f753daaf6addf836b1cbc7134ea2747b';
  return fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${id}&APPID=${apiKey}`)
    .then(response => response.json())
};

export const fetchWeatherInfo = (id) => async (dispatch, getState) => {
  let state = getState();

  if (state.cityWeather.has(id)) {
    return Promise.resolve();
  }

  let response = await fetchWeatherByCityId(id);

  return dispatch({
    type: 'GET_CITY_WEATHER',
    payload: {
      id: response.city.id,
      name: response.city.name,
      country: response.city.country,
      temp: response.list[0].main.temp
    }
  });
};

export const addGameLogItem = (gameLogItem) => ({
  type: 'ADD_GAME_LOG_ITEM',
  payload: gameLogItem
});

export const incrementScore = () => ({
  type: 'INCREMENT_SCORE'
});

export const setTempUnits = (tempUnits) => ({
  type: 'SET_TEMP_UNITS',
  payload: { tempUnits }
});
