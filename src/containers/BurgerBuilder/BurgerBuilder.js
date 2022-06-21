import React, { useState } from 'react';

import Aux from '../../hoc/_Aux/_Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
//import withRouter from '../../hoc/withRouter/withRouter';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import { addIngredient, removeIngredient } from '../../store/reducers/burgerReducer';
//import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

//class BurgerBuilder extends Component {

//state = {
//ingredients: null,
//totalPrice: 4,
//purchasable: false,
//purchasing: false,
//loading: false
//}

// lifecycle hook for geting ingredients from db
// componentDidMount() {
// axios.get('https://burger-builder-69125-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json')
//     .then(response => {
//         this.setState({
//             ingredients: response.data,
//         })
//     })
// }

const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ingredients = useSelector((state) => state.burger.ingredients);
    const totalPrice = useSelector((state) => state.burger.totalPrice);

    //methods for managing local/component state
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

    // sending data to new route/location
    // replaced with redux
    // props.navigate('/checkout', {
    //     state: {
    //         ingredients: this.props.ingredients,
    //         totalPrice: this.props.totalPrice
    //     }
    // })


    const disabledInfo = {
        ...ingredients
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;
    let burger = false ? <p>Ingredients can't be loaded!</p> : <Spinner />;

    if (ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    ingredientAdded={(type) => dispatch(addIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] }))}
                    ingredientRemoved={(type) => dispatch(removeIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] }))}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ingredients)}
                    ordered={purchaseHandler}
                    price={totalPrice} />
            </Aux>
        );
        orderSummary = <OrderSummary
            ingredients={ingredients}
            price={totalPrice}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler} />;
    }
    if (loading) {
        orderSummary = <Spinner />;
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}


// old redux - sending state as props to component with connect()
// const mapStateToProps = (state) => {
//     return {
//         ingredients: state.burger.ingredients,
//         totalPrice: state.burger.totalPrice
//     }
// }

// old redux - connecting component with store 
// sending actions ready to dispatch as a props
// const mapDispatchToProps = dispatch => {
//     return {
//         addIngredientHandler: (type) => dispatch(addIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] })),
//         removeIngredientHandler: (type) => dispatch(removeIngredient({ ingredient: type, price: INGREDIENT_PRICES[type] }))
//     }
// }

export default (withErrorHandler(BurgerBuilder, axios));