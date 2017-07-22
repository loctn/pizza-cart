const pizzaCart = (state = [], action) => {
  switch (action.type) {
  case 'ADD_PIZZA_TO_CART':
    return [...state, action.pizza];
  case 'REMOVE_PIZZA_FROM_CART':
    return [
      ...state.slice(0, action.index),
      ...state.slice(action.index + 1)
    ]
  default:
    return state;
  }
};


export default pizzaCart;