const redux = require("redux")
const createStore = redux.createStore
const applyMiddleWare = redux.applyMiddleware
const thunkMiddleWare = require("redux-thunk").default
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const FETCH_USER_REQUESTED = "FETCH_USER_REQUESTED";
const FETCH_USER_SUCCESSDED = "FETCH_USER_SUCCESSDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

const fetchUsersRequest = () => {
    return {
        type: FETCH_USER_REQUESTED
    }
}

const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USER_SUCCESSDED,
        payload: users
    }
}

const fetchUsersFailure = (error) => {
    return {
        type: FETCH_USER_FAILED,
        payload: error
    }
}

const reducer = (state = initialState, action) => {
    if(action.type == FETCH_USER_REQUESTED){
        return{
            ...state,
            loading: true
        }
    } else if (action.type == FETCH_USER_SUCCESSDED){
        return{
            loading: false,
            users: action.payload,
            error: ""
        }
    } else if (action.type == FETCH_USER_FAILED){
        return{
            loading: false,
            users: [],
            error: action.payload
        }
    } 
}

const fetchUsers =() => {
    return function(dispatch) {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            const user = response.data.map((user) => user.id);
            dispatch(fetchUsersSuccess(user))
        })
        .catch(error => {
            //console.error(error.message);
            dispatch(fetchUsersFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleWare(thunkMiddleWare));
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers());
