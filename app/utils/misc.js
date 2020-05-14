import AsyncStorage from '@react-native-community/async-storage';
export const FIREBASEDB = 'https://comet-react.firebaseio.com'
export const FIREBASEURL = 'comet-react.firebaseapp.com';
export const APIKEY ='AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const SIGNUP ='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const SIGNIN = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const REFRESH = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyCH2ZiBuIiXNwIOH0-r6aCNFgM0zBYb6yQ';
export const GETUSERFEEDJSON ='http://dev.cometbroadcast.com/appuser/user_home_feed';
export const IMAGEURL ='https://www.cometbroadcast.com/data/image?id=';

export const getTokens = (cb) => {

    AsyncStorage.multiGet([
        '@nba_app@token',
        '@nba_app@refreshToken',
        '@nba_app@expireToken',
        '@nba_app@uid'
    ]).then( value => {
        
        cb(value);
    });

}

export const setTokens = (values,cb) => {
    const dateNow = new Date();
    const expiration = dateNow.getTime() + (3600 * 1000);
 
    AsyncStorage.multiSet([
        ['@nba_app@token',values.token],
        ['@nba_app@refreshToken',values.refToken],
        ['@nba_app@expireToken',expiration.toString()],
        ['@nba_app@uid',values.uid]
    ]).then( response => {
        cb();
    });
}