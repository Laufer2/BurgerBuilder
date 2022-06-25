import React from 'react';
import { useSelector } from 'react-redux';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const BuildControls = (props) => {
    const ingredients = useSelector((state) => Object.keys(state.burger.ingredients));

    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {ingredients.map(ctrl => (
                <BuildControl
                    key={ctrl}
                    label={ctrl}
                    added={() => props.ingredientAdded(ctrl)}
                    removed={() => props.ingredientRemoved(ctrl)}
                    disabled={props.disabled[ctrl]} />
            ))}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}

export default BuildControls;