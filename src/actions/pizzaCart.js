export const addPizzaToCart = pizza => ({
  type: 'ADD_PIZZA_TO_CART',
  pizza
});

export const removePizzaFromCart = index => ({
  type: 'REMOVE_PIZZA_FROM_CART',
  index
});