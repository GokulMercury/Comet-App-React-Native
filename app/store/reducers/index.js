import { combineReducers } from 'redux';
import User from './user_reducer'
import News from './news_reducer'
import Updates from './updates_reducer'
const rootReducer = combineReducers(
    {
        User,
        News,
        Updates
    }
)

export default rootReducer;