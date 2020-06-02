import {
    GET_UPDATES,
    PUSH_UPDATES
} from '../types';

export default function(state={},action){
    switch(action.type){
        case GET_UPDATES:
            console.log('REDUCER GET_UPDATES', action.payload)
            return {...state,news:action.payload}
        
        case PUSH_UPDATES:
            console.log('REDUCER PUSH_UPDATES', action.payload)
            
            return {...state,news:action.payload}
            
        default:
                return state;
    }
}