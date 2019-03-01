export const convertTemp = (temp, tempUnits) => {
  if (tempUnits === 'celsius') {
    temp = Math.round(temp - 273.15);
  } else {
    temp = Math.round((temp * 9) / 5 - 459.67);
  }

  let levelTemp = '';
  if (temp > 0) {
    levelTemp = '+';
  }

  return `${levelTemp}${temp} ${tempUnits === 'celsius' ? 'C' : 'F'}`;
};
