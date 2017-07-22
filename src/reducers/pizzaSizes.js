const pizzaSizes = (state = [], action) => {
  switch (action.type) {
  case 'UPDATE_PIZZA_SIZES':
    return action.pizzaSizes;
  default:
    return state;
  }
};


export default pizzaSizes;