import {
    GET_CHATS
} from '../types';

export default function(state={},action){
    switch(action.type){
        case GET_CHATS:
            console.log('<<<<GET_CHATS>>>>',action.payload)
            return {...state,chats:action.payload}
            
        default:
                return state;
    }
}