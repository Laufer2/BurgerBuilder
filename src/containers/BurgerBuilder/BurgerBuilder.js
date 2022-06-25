import React, { useState } from 'react';

import Aux from '../../hoc/_Aux/_Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import withRouter from '../../hoc/withRouter/withRouter';
//import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient } from '../../store/reducers/burgerReducer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    const purchaseHandler = () => setPurchasing(true);

    const purchaseCancelHandler = () => setPurchasing(false);

    const purchaseContinueHandler = () => navigate('checkout');

    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    const burger = (
        <Aux>
            <Burger ingredients={ingredients} />
            <BuildControls
                ingredientAdded={(type) => dispatch(addIngredient({ ingredient: type }))}
                ingredientRemoved={(type) => dispatch(removeIngredient({ ingredient: type }))}
                disabled={disabledInfo}
                purchasable={updatePurchaseState(ingredients)}
                ordered={purchaseHandler}
                price={totalPrice} />
        </Aux>
    );
    const orderSummary = <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler} />;

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default (withErrorHandler(BurgerBuilder, axios));