import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import withRouter from '../../hoc/withRouter/withRouter';

class Checkout extends Component {

  cancelHandler = (e) => {
    this.props.navigate(-1)
  }

  continueHandler = (e) => {

    this.props.navigate('contact-data', {
      state: {
        ingredients: this.props.location.state.ingredients,
        totalPrice: this.props.location.state.totalPrice
      }
    })
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.location.state.ingredients}
          totalPrice={this.props.location.state.totalPrice}
          cancelHandler={this.cancelHandler}
          continueHandler={this.continueHandler} />
        <Outlet />
      </div>
    )
  }
}

export default withRouter(Checkout);