const initialState = {
    filteredProducts: [],
    isSearchActive: false,
}

const productReducer = (state = initialState, action) => {

    let newState = { ...state };

    // eslint-disable-next-line

    switch (action.type) {
        case 'ADD_SEARCHED_PRODUCTS':            
            newState.filteredProducts = [...action.items];
            newState.isSearchActive = true;
            break;
        case 'NO_Data':
            newState.filteredProducts = [];
            newState.isSearchActive = false;
            break;
        default:
            newState = {...newState};

    }
    return newState;
}

export default productReducer;