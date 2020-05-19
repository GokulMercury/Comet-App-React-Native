
import {
    GET_CHANNELS
} from '../types';

export default function(state={},action){
    switch(action.type){
        case GET_CHANNELS:
            return {...state,channels:action.payload}
            
        default:
                return state;
    }
}