import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';

import { removePizzaFromCart } from '~/actions/pizzaCart';
import styles from './PizzaCart.css';


class PizzaCart extends Component {
  static propTypes = {
    styles: P.object,
    pizzaSizes: P.array,
    pizzaCart: P.array,
    onRemovePizzaFromCart: P.func,
  }

  // TODO: this seems like it could be slow
  componentWillReceiveProps(nextProps) {
    this.pizzaSizesMap = {};

    nextProps.pizzaSizes.forEach(size => {
      this.pizzaSizesMap[size.name] = {
        price: size.basePrice,
        toppingPrices: {},
      };

      size.toppings.forEach(item => {
        this.pizzaSizesMap[size.name].toppingPrices[item.topping.name] = item.topping.price;
      });
    });
  }

  handleRemoveClick = (event, index) => {
    event.preventDefault();
    this.props.onRemovePizzaFromCart(index);
  }

  computeItemPrice(item) {
    return this.pizzaSizesMap[item.name].price + item.toppings.reduce((sum, toppingName) =>
      sum + (this.pizzaSizesMap[item.name].toppingPrices[toppingName] || 0)
    , 0);
  }

  computeTotalPrice() {
    return this.props.pizzaCart.reduce((sum, item) => sum + this.computeItemPrice(item), 0);
  }

  render() {
    const styles = this.props.styles;
    const pizzaSizes = this.props.pizzaSizes;
    const pizzaCart = this.props.pizzaCart;

    return (
      <div styleName="component">
        {pizzaCart.map((item, i) => this.pizzaSizesMap[item.name] &&
          <div key={i} className={styles['item']}>
            <div className={styles['row-name']}>
              <div>
                {item.name}
                <a href="#" className={styles['remove']} onClick={event => this.handleRemoveClick(event, i)}> remove</a>
              </div>
              <div>{this.computeItemPrice(item).toFixed(2)}</div>
            </div>
            {!item.toppings.length &&
              <div className={styles['row-topping']}>plain</div>
            }
            {item.toppings.map((toppingName, i) =>
              <div key={i} className={styles['row-topping']}>{toppingName}</div>
            )}
          </div>
        )}
        <div styleName="row-total">
          <div>total</div><div>{this.computeTotalPrice().toFixed(2)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pizzaCart: state.pizzaCart,
});

const mapDispatchToProps = dispatch => ({
  onRemovePizzaFromCart: index => {
    dispatch(removePizzaFromCart(index));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(
  CSSModules(PizzaCart, styles)
);