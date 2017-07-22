import React from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';

import PizzaMenuItem from './PizzaMenuItem';
import styles from './PizzaMenu.css';


const PizzaMenu = ({ styles, pizzaSizes }) => (
  <div styleName="component">
    <h1 styleName="title">Pizza Menu</h1>
    {pizzaSizes.map((pizzaSize, i) =>
      <PizzaMenuItem key={i} pizzaSize={pizzaSize} />
    )}
  </div>
);

PizzaMenu.propTypes = {
  styles: P.object,
  pizzaSizes: P.array,
};


export default CSSModules(PizzaMenu, styles);