import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControl/BuildControl';
import OrderModal from '../OrderModal/OrderModal';


class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.cijena = {
            salad: 0.7,
            bacon: 1,
            cheese: 0.8,
            meat: 1.2
        }
        this.total = 4;
    }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        orderPossible: false,
        order: false
    }

    addIngHandler = (e) => {
        const brojcanoStanje = this.state.ingredients[e.target.value];
        const obj = { ...this.state }
        obj.ingredients[e.target.value] = brojcanoStanje + 1;
        obj.orderPossible = true;

        this.setState({ ...obj })
        this.total += this.cijena[e.target.value]

    }

    removeIngHandler = (e) => {
        const brojcanoStanje = this.state.ingredients[e.target.value];
        if (brojcanoStanje > 0) {
            const obj = { ...this.state }
            obj.ingredients[e.target.value] = brojcanoStanje - 1;
            this.setState({ ...obj })
            this.total -= this.cijena[e.target.value];
        }
        const sum = Object.values(this.state.ingredients).reduce((sumOfPreValues, currentValue) => {
            return sumOfPreValues + currentValue;
        }, 0)
        if (sum <= 0) {
            this.setState({
                orderPossible: false
            })
        }
    }

    orderHandler = (e) => {
        this.setState({
            order: true
        })
    }

    buyHandler = (e) => {
        this.setState({
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            orderPossible: false,
            order: false
        })
        this.total = 4;
    }

    closeHandler = (e) => {
        this.setState({
            order: false
        })
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControl
                    addIng={this.addIngHandler}
                    removeIng={this.removeIngHandler}
                    ing={this.state.ingredients}
                    total={this.total}
                    order={this.orderHandler}
                    orderPossible={this.state.orderPossible} />
                {this.state.order ?
                    <OrderModal
                        stanje={this.state.ingredients}
                        total={this.total}
                        buy={this.buyHandler}
                        close={this.closeHandler} />
                    : null}
            </Aux>
        );
    }
}

export default BurgerBuilder;