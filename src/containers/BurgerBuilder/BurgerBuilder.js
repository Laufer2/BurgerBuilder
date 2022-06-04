import React, { Component } from 'react';

import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControl from '../../components/Burger/BuildControl/BuildControl';

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
        }
    }

    addIngHandler = (e) => {
        const brojcanoStanje = this.state.ingredients[e.target.value];
        const obj = { ...this.state }
        obj.ingredients[e.target.value] = brojcanoStanje + 1;

        this.setState({ ...obj })
        this.total += this.cijena[e.target.value]

    }

    removeIngHandler = (e) => {
        const brojcanoStanje = this.state.ingredients[e.target.value];
        if (brojcanoStanje > 0) {
            const obj = { ...this.state }
            obj.ingredients[e.target.value] = brojcanoStanje - 1;
            this.setState({ ...obj })
            this.total -= this.cijena[e.target.value]
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControl
                    addIng={this.addIngHandler}
                    removeIng={this.removeIngHandler}
                    ing={this.state.ingredients}
                    total={this.total} />

            </Aux>
        );
    }
}

export default BurgerBuilder;