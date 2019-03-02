let initialState = {
  cityWeather: new Map(),
  gameLog: [],
  score: 0,
  tempUnits: 'celsius'
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CITY_WEATHER':
      return {
        ...state,
        cityWeather: state.cityWeather.set(action.payload.id, action.payload)
      };
    case 'ADD_GAME_LOG_ITEM':
      return {
        ...state,
        gameLog: [...state.gameLog, action.payload]
      };
    case 'INCREMENT_SCORE':
      return {
        ...state,
        score: state.score + 1
      };
    case 'SET_TEMP_UNITS':
      return {
        ...state,
        tempUnits: action.payload.tempUnits
      };
    default:
      return state;
  }
};
