import {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + (+action.item.price),
                quantity: existingCartItem.quantity + action.item.quantity
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem
        } else {
            updatedItems = state.items.concat({...action.item, amount: action.item.price});
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    }
    if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedTotalAmount
        let updatedItems;

        if (existingCartItem.quantity >= +action.payload.quantity) {
            updatedTotalAmount = state.totalAmount - (existingCartItem.price * +action.payload.quantity);
            if (existingCartItem.quantity === 1) {
                updatedItems = state.items.filter(item => item.id !== action.payload.id);
            } else {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - (existingCartItem.price * (+action.payload.quantity)),
                    quantity: existingCartItem.quantity - (+action.payload.quantity)
                }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }
        }else {
            updatedTotalAmount = state.totalAmount
            updatedItems = [...state.items]
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}

const CartProvider = props => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCart({type: 'ADD', item: item})
    }

    const removeItemFromCartHandler = (id, quantity = 1) => {
        dispatchCart({type: 'REMOVE', payload: {id, quantity}})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;