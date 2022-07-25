import React, {useContext, useRef} from 'react';
import classes from "./MealItemForm.module.css"
import Input from "../../UI/Input";
import CartContext from "../../../store/cart-context";

const MealItemForm = props => {
    const amountInputRef = useRef();
    const cartContext = useContext(CartContext);
    const quantity = cartContext.items.filter(item => item.id === props.id)[0]?.quantity;


    const onAddHandler = (event) => {
        event.preventDefault();
        console.log(quantity)
        const enteredQuantity = amountInputRef.current.value;
        const enteredQuantityNumber = +enteredQuantity;
        console.log(props.id)
        props.onAddToCart(enteredQuantityNumber);
    }

    const onRemoveHandler = (event) => {
        event.preventDefault();
        const enteredQuantity = amountInputRef.current.value;
        const enteredQuantityNumber = +enteredQuantity;

        props.onRemoveFromCart(props.id, enteredQuantityNumber);
    }

    return (
        <form className={classes.form}>
            <Input
                ref={amountInputRef}
                label='Quantity'
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}/>
            <div>
                <button type="button" onClick={onAddHandler}>+ Add</button>
                {quantity && <button type="button" onClick={onRemoveHandler}>- Remove</button>}
            </div>
        </form>
    );
};

export default MealItemForm;