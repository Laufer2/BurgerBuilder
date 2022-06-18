import React, { Component } from 'react';

import Aux from '../../hoc/_Aux/_Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import withRouter from '../../hoc/withRouter/withRouter';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient } from '../../store/reducers';
import { connect } from 'react-redux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        //ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount() {
        // axios.get('https://burger-builder-69125-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
        //     .then(response => {
        //         this.setState({
        //             ingredients: response.data,
        //         })
        //     })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    // addIngredientHandler = (type) => {

    //     // const oldCount = this.state.ingredients[type];
    //     // const updatedCount = oldCount + 1;
    //     // const updatedIngredients = {
    //     //     ...this.state.ingredients
    //     // };
    //     // updatedIngredients[type] = updatedCount;
    //     // const priceAddition = INGREDIENT_PRICES[type];
    //     // const oldPrice = this.state.totalPrice;
    //     // const newPrice = oldPrice + priceAddition;
    //     // this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     // this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {

    //     // const oldCount = this.state.ingredients[type];
    //     // if (oldCount <= 0) {
    //     //     return;
    //     // }
    //     // const updatedCount = oldCount - 1;
    //     // const updatedIngredients = {
    //     //     ...this.state.ingredients
    //     // };
    //     // updatedIngredients[type] = updatedCount;
    //     // const priceDeduction = INGREDIENT_PRICES[type];
    //     // const oldPrice = this.state.totalPrice;
    //     // const newPrice = oldPrice - priceDeduction;
    //     // this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    //     // this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        this.props.navigate('/checkout', {
            state: {
                ingredients: this.state.ingredients,
                totalPrice: this.state.totalPrice
            }
        })
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        totalPrice: state.burger.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientHandler: (type) => dispatch(addIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] })),
        removeIngredientHandler: (type) => dispatch(removeIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] }))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandler(BurgerBuilder, axios)));