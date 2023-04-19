const redux = require("redux");
const createStore = redux.createStore;
const produce = require("immer").produce

const initialState = {
    name: "Elijah",
    address: {
        street: "123 Main st",
        city: "Kosofe",
        state: "LAG"
    }
}

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
    return {
        type: STREET_UPDATED,
        payload: street
    }
}

const reducer = (state = initialState, action) => {
    if(action.type == STREET_UPDATED){
        // return {
        //     ...state,
        //     address:{
        //         ...state.address,
        //         street: action.payload
        //     }
        // }
        return produce(state, (draft) => {
            draft.address.street = action.payload
        })
    } else {
        return state;
    }

}

const store = createStore(reducer);
console.log("Initial State", store.getState());
const unsubscribe = store.subscribe(() => {
    console.log("Updated State", store.getState())
})
store.dispatch(updateStreet("456 Main st"));
unsubscribe();
