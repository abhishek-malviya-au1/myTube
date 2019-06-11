import {createStore , combineReducers} from 'redux';
import videoReducer from './reducers/videoReducer.js';
import currentPlayerVideoReducer from './reducers/currentPlayerVideoReducer.js'

let reducer=combineReducers({
    videos : videoReducer,
    currentPlayerVideo : currentPlayerVideoReducer

})


let store=createStore(reducer);

store.subscribe(function(){
    console.log('store dispatch ==>',store.getState());
})

function stateMapper(state){
 return state;
}

export {store , stateMapper};