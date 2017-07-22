import React, { Component } from 'react';
import P from 'prop-types';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

import PizzaCart from './PizzaCart';
import PizzaMenu from './PizzaMenu';
import { updatePizzaSizes } from '~/actions/pizzaSizes';
import styles from './App.css';


class App extends Component {
  static propTypes = {
    styles: P.object,
    data: P.object,
    onUpdatePizzaSizes: P.func,
  }

  componentWillReceiveProps({ data: { pizzaSizes }, onUpdatePizzaSizes }) {
    if (pizzaSizes) {
      onUpdatePizzaSizes(pizzaSizes);
    }
  }

  render() {
    const props = this.props;
    return (
      <div styleName="component">
        {props.data.loading && <div styleName="status-message">Loading...</div>}
        {props.data.error && <div styleName="status-message">Error!</div>}
        <div><PizzaMenu pizzaSizes={props.pizzaSizes} /></div>
        <div><PizzaCart pizzaSizes={props.pizzaSizes} /></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pizzaSizes: state.pizzaSizes,
});

const mapDispatchToProps = dispatch => ({
  onUpdatePizzaSizes: pizzaSizes => {
    dispatch(updatePizzaSizes(pizzaSizes));
  }
});

const pizzaSizesQuery = gql`
{
  pizzaSizes {
    name
    maxToppings
    basePrice
    toppings {
      topping {
        name
        price
      }
      defaultSelected
    }
  }
}
`;


export default connect(mapStateToProps, mapDispatchToProps)(
  graphql(pizzaSizesQuery, {
    options: { pollInterval: 20000 }
  })(
    CSSModules(App, styles)
  )
);