const redux  = require("redux");
const  createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const middleWare = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger()

//Ation
const CAKE_ORDERED =  "CAKE_ORDERED";
const CAKE_RESTOCK = "CAKE_RESTOCK";
const ICECREAM_ORDERED =  "ICECREAM_ORDERED";
const ICECREAM_RESTOCK = "ICECREAM_RESTOCK";

function orderCake (){
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

function restockCake (qty = 1) {
    return {
        type: CAKE_RESTOCK,
        payload: qty
    }
}

function orderIceCream (qty = 1){
    return {
        type: ICECREAM_ORDERED,
        payload: qty
    }
}

function restockIceCream (qty = 1) {
    return {
        type: ICECREAM_RESTOCK,
        payload: qty
    }
}

//state for our application
// const initialState = {
//     numOfCakes: 10,
//     numOfIceCream: 20
// }

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 20
}

//reducers (where the manipulation takes place)

const cakeReducer =(state = initialCakeState, action) => {
    if(action.type == CAKE_ORDERED){
        return {
            ...state,
            numOfCakes: state.numOfCakes - 1,
        }
    } else if (action.type == CAKE_RESTOCK){
        return {
            ...state,
            numOfCakes: state.numOfCakes + action.payload
        }
    } else {
        return state
    }
}

const IceCreamReducer =(state = initialIceCreamState, action) => {
    if(action.type == ICECREAM_ORDERED){
        return {
            ...state,
            numOfIceCream: state.numOfIceCream - 1,
        }
    } else if (action.type == ICECREAM_RESTOCK){
        return {
            ...state,
            numOfIceCream: state.numOfIceCream + action.payload
        }
    } else {
        return state
    }
}

const rootreducer = combineReducers({
    cake: cakeReducer,
    iceCream: IceCreamReducer
});

const store = createStore(rootreducer, redux.applyMiddleware(logger))
console.log("initial State", store.getState());

//holds the updated state 
const unsubscribe = store.subscribe(() => {})


//sends the updated state to the UI
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3))

const action = bindActionCreators({ orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch);
action.orderCake();
action.orderCake();
action.orderCake();
action.restockCake(3);
action.orderIceCream();
action.orderIceCream();
action.restockIceCream(2);

// Stop changes to the state or UI by calling the unsubscribe
//  function above
unsubscribe();

