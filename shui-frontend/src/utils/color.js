function getRandomIndex(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}


export function getRandomColor() {
  const colorsArr = ['yellow', 'orange', 'pink', 'purple', 'blue'];
  return getRandomIndex(colorsArr);
}

export function getColorShades(color) {
  const colors = {
    yellow: {
      light: '#dac400',
      dark: '#c4b500',
    },
    orange: {
      light: '#d27a00',
      dark: '#bb6700',
    },
    pink: {
      light: '#c50163',
      dark: '#b00057',
    },
    purple: {
      light: '#a800b7',
      dark: '#9400a5',
    },
    blue: {
      light: '#0099bf',
      dark: '#0084a0',
    },
  };
  return colors[color];
}
