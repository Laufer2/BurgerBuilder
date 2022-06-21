import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


const Checkout = (props) => {

  const ingredients = useSelector((state) => state.burger.ingredients);
  const totalPrice = useSelector((state) => state.burger.totalPrice);
  const navigate = useNavigate();

  const cancelHandler = (e) => navigate(-1)

  const continueHandler = (e) => navigate('contact-data')

  /*{  
    this.props.navigate('contact-data' , {
      state: {
        ingredients: this.props.location.state.ingredients,
        totalPrice: this.props.location.state.totalPrice
      }
    })*/


  return (
    <div>
      <CheckoutSummary
        //ingredients={this.props.location.state.ingredients}
        //totalPrice={this.props.location.state.totalPrice}
        ingredients={ingredients}
        totalPrice={totalPrice}
        cancelHandler={cancelHandler}
        continueHandler={continueHandler} />
      <Outlet />
    </div>
  )
}

export default Checkout;