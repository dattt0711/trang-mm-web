import { combineReducers } from 'redux';
import imageReducer from './images';
import productReducer from './products';
import loginReducer from './login';
import cartReducer from './carts';
import orderReducer from './orders';
import userReducer from './users';
import commentReducer from './comments';
const reducer = combineReducers({
    images: imageReducer,
    products: productReducer,
    login: loginReducer,
    carts: cartReducer,
    orders: orderReducer,
    users: userReducer,
    comments: commentReducer,
});
const rootReducer = (state, action) => {
    let stateTemp = state;
    if (action.type === "RESET_INITIAL") {
        stateTemp = undefined;
    }
    return reducer(stateTemp, action);
};

export default rootReducer;
