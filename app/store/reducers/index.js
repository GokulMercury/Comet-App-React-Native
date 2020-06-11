import { combineReducers } from 'redux';
import User from './user_reducer'
import News from './news_reducer'
import Updates from './updates_reducer'
import Channels from './channels_reducer'
import Chat from './chat_reducer'

const rootReducer = combineReducers(
    {
        User,
        News,
        Updates,
        Channels,
        Chat
    }
)

export default rootReducer;