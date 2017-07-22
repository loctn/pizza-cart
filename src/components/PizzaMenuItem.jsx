import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import { connect } from 'react-redux';

import { addPizzaToCart } from '~/actions/pizzaCart';
import styles from './PizzaMenuItem.css';


const booleanObjectToArray = obj => Object.entries(obj).filter(item => item[1]).map(item => item[0]);

class PizzaMenuItem extends Component {
  static propTypes = {
    styles: P.object,
    pizzaSize: P.object,
    onAddPizzaToCart: P.func,
  }

  constructor(props) {
    super(props);
    const toppings = props.pizzaSize.toppings.reduce((toppings, item) => {
      toppings[item.topping.name] = item.defaultSelected;
      return toppings;
    }, {});
    this.state = { toppings };
  }

  handleAddToCartClick = event => {
    event.preventDefault();
    this.props.onAddPizzaToCart({
      name: this.props.pizzaSize.name,
      toppings: booleanObjectToArray(this.state.toppings),
    });
  }

  handleToppingClick = (event, topping) => {
    event.preventDefault();
    // TODO: too many toppings alert
    let maxToppings = this.props.pizzaSize.maxToppings;
    maxToppings = maxToppings === null ? Infinity : maxToppings;

    const toppings = Object.assign({}, this.state.toppings, {
      [topping]: this.state.toppings[topping]
        ? false
        : booleanObjectToArray(this.state.toppings).length < maxToppings
    });

    this.setState({ toppings });
  }

  computeTotalPrice() {
    return this.props.pizzaSize.toppings.reduce((sum, item) =>
      this.state.toppings[item.topping.name] ? sum + item.topping.price : sum
    , this.props.pizzaSize.basePrice);
  }

  render() {
    const styles = this.props.styles;
    const pizzaSize = this.props.pizzaSize;

    return (
      <div styleName="component">
        <div styleName="row-name">
          <div>
            {pizzaSize.name}
            <a href="#" styleName="add-to-cart" onClick={event => this.handleAddToCartClick(event)}> add to cart</a>
          </div>
          <div>{this.computeTotalPrice().toFixed(2)}</div>
        </div>
        <div styleName="row">
          <div styleName="pizza-dough">pizza dough</div><div>{pizzaSize.basePrice.toFixed(2)}</div>
        </div>
        {pizzaSize.toppings.map((item, i) =>
          <a href="#" key={i}
            className={classNames(styles['topping-selector'], styles['row'])}
            onClick={event => this.handleToppingClick(event, item.topping.name)}
          >
            <div className={classNames({
              [styles['topping--selected']]: this.state.toppings[item.topping.name]
            })}>{item.topping.name}</div>
            <div>{item.topping.price.toFixed(2)}</div>
          </a>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAddPizzaToCart: pizza => {
    dispatch(addPizzaToCart(pizza));
  }
});


export default connect(null, mapDispatchToProps)(
  CSSModules(PizzaMenuItem, styles)
);