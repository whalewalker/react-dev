import React, {useContext} from 'react';
import MealItemForm from "./MealItemForm";
import classes from "./MealItem.module.css"
import CartContext from "../../../store/cart-context";

const MealItem = props => {
    const cartContext = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;

    const addToCartHandler = quantity => {
        cartContext.addItem({
            id: props.id,
            quantity: quantity,
            name: props.name,
            price: props.price
        })
    }

    const removeFromCartHandler = (id, quantity) => {
        cartContext.removeItem(id, quantity);
    }

    return (
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm
                    id={props.id}
                    onAddToCart={addToCartHandler}
                    onRemoveFromCart={removeFromCartHandler}/>
            </div>
        </li>
    );
};

export default MealItem;