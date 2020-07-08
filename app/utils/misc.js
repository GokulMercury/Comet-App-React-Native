import AsyncStorage from '@react-native-community/async-storage';
import qs from 'qs';
export const FIREBASEDB = 'https://comet-react.firebaseio.com'
export const FIREBASEURL = 'comet-react.firebaseapp.com';
export const APIKEY ='AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const SIGNUP ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
//export const SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const REFRESH = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const GETUSERFEEDJSON ='https://dev.cometbroadcast.com/appuser/user_home_feed';
export const IMAGEURL ='http://www.cometbroadcast.com/data/image?id=';
// export const GETCHANNELSJSON ='http://dev.cometbroadcast.com/appuser/search_parties';
export const GETCHANNELSJSON ='https://dev.cometbroadcast.com/appuser/parties';
export const SIGNIN = 'https://dev.cometbroadcast.com/appuser/new_user';
export const SUBSCRIBE = 'https://dev.cometbroadcast.com/appuser/user_add_peep';
export const UNSUBSCRIBE = 'https://dev.cometbroadcast.com/appuser/unpeepin';

export const getTokens = (cb) => {

    AsyncStorage.multiGet([
        '@comet_app@message',
        '@comet_app@phone',
        '@comet_app@userId'
    ]).then( value => {
        
        cb(value);
    });
}
    export const setTokens = (values,cb) => {
        console.log('<<<<<SET TOKENS',values)
    AsyncStorage.multiSet([
        ['@comet_app@message',values.message],
        ['@comet_app@phone',values.phone],
        ['@comet_app@userId',values.userId]
    ]).then( response => {
        cb();
    });
}

// export const setTokens = (values,cb) => {
//     const dateNow = new Date();
//     const expiration = dateNow.getTime() + (3600 * 1000);
 
//     AsyncStorage.multiSet([
//         ['@nba_app@token',values.token],
//         ['@nba_app@refreshToken',values.refToken],
//         ['@nba_app@expireToken',expiration.toString()],
//         ['@nba_app@uid',values.uid]
//     ]).then( response => {
//         cb();
//     });
// }