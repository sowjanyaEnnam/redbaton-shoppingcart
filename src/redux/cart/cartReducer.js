import { REHYDRATE } from 'redux-persist';

const initialState = {
    addedItems: [],
    total: 0,
}

const cartReducer = (state = initialState, action) => {

    let newState = { ...state };

    // eslint-disable-next-line

    switch (action.type) {

        case 'ADD_ITEM':
            newState.addedItems = [...newState.addedItems, action.item]
            newState.total = newState.total + +action.item.price;
            break;

        case 'INCREMENT_QUANTITY':
            newState.addedItems = newState.addedItems.filter(eachItem => eachItem.id !== action.item.id);
            action.item.quantity++;
            newState.addedItems = [...newState.addedItems, action.item];
            newState.total = newState.total + +action.item.price;
            break;

        case 'REMOVE_ITEM':
            newState.addedItems = newState.addedItems.filter(eachItem => eachItem.id !== action.item.id);
            action.item.quantity--;
            if (action.item.quantity) {
                newState.addedItems = [...newState.addedItems, action.item];
            }
            newState.total = newState.total - +action.item.price;
            break;

        case 'persist/REHYDRATE':
            if(action.payload) {
                newState.addedItems = action.payload.cart.addedItems;
                newState.total = action.payload.cart.total;
            }
            break;
        default:
        // handle default case
    }
    newState.addedItems.sort((item1, item2) => item1.id - item2.id);
    return newState;
}

export default cartReducer;