import { combineReducers } from 'redux';
import pizzaSizes from './pizzaSizes';
import pizzaCart from './pizzaCart';


const reducers = combineReducers({
  pizzaSizes,
  pizzaCart,
});


export default reducers;