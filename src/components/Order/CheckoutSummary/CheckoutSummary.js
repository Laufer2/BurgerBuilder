import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {

  const sastojci = Object.keys(props.ingredients).map(el => {
    return <li key={el}>{el} : {props.ingredients[el]} </li>
  })

  return (

    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />
      <ul style={{ 'list-style-type': 'none' }}>
        {sastojci}
      </ul>
      <p>Total price: {props.totalPrice.toFixed(2)}</p>
      <Button btnType='Danger' clicked={props.cancelHandler}>CANCEL</Button>
      <Button btnType='Success' clicked={props.continueHandler} >CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;