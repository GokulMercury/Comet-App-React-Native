import {
    GET_UPDATES
} from '../types';

export default function(state={},action){
    switch(action.type){
        case GET_UPDATES:
            return {...state,news:action.payload}
            
        default:
                return state;
    }
}