const validateMessage = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
    string: "${label} is not a valid string!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export { validateMessage };
