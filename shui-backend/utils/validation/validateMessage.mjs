export const validateMessage = (data) => {
  const validColors = ['yellow', 'orange', 'pink', 'purple', 'blue'];

  const fields = [
    { name: 'username', type: 'string', min: 1, max: 50 },
    { name: 'text', type: 'string', min: 1, max: 1000 },
  ];

  let success = null;

  for (const field of fields) {
    const currentData = data[field.name];

    success = validateText(currentData, field);

    if (success != null) {
      return success;
    }
  }

  return success;
};

const capitalizedFirstLetter = (word) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// datatyp funktion
function validateType(data, field) {
  if (typeof data !== field.type) {
    return `${capitalizedFirstLetter(field.name)} must be a ${field.type}`;
  }
}

// min max funktion

function validateText(data, field) {
  validateType(typeof data, field);

  if (data.length < field.min) {
    return `${capitalizedFirstLetter(field.name)} must be at least ${
      field.min
    } characters`;
  }
  if (data.length > field.max) {
    return `${capitalizedFirstLetter(field.name)} must be at most ${
      field.max
    } characters`;
  }

  return null;
}