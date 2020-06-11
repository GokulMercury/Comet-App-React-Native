import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {SIGN_IN,SIGN_UP, AUTO_SIGN_IN} from '../types';
import { SIGNUP, SIGNIN, REFRESH } from '../../utils/misc';
import qs from 'qs';
import { getTokens, setTokens } from '../../utils/misc';

export function signUp(data){

    const request = axios({
        method:'POST',
        url:SIGNUP,
        data:{
            email:data.email,
            password:data.password,
            returnSecureToken:true
        },
        header:{
            "Content-Type":"application/json"
        }
    }).then(response=>{
        return response.data
    }).catch( e => {
        return false
    });

    return {
        type:SIGN_UP,
        payload:request
    }
}


export function signIn(data){
    const params = {
        phone: data.phone
    };
    console.log(data.phone)
    const request = axios.post(SIGNIN, qs.stringify(params))
        .then(response=>{
            console.log('<<<<<LOGIN RESPONSE>>>', response.data)
           return response.data;
            
        
    }).catch( e => {
        return false
    });

    return {
        type:SIGN_IN,
        payload:request,
    }
}

export const autoSignIn = (refToken) =>{
    const request = axios(
        {
            method:"POST",
            url:REFRESH,
            data: "grant_type=refresh_token&refresh_token=" + refToken,
            header:{
            "Content-Type":"application/x-www-form-urlencoded"
        }

        }
    ).then( response =>{
        return response.data
    }).catch( e => {
        return false
    });

    return{
        type: AUTO_SIGN_IN,
        payload:request
    }
}

// import axios from 'axios';

// import {SIGN_IN,SIGN_UP, AUTO_SIGN_IN} from '../types';
// import { SIGNUP, SIGNIN, REFRESH } from '../../utils/misc';

// export function signUp(data){

//     const request = axios({
//         method:'POST',
//         url:SIGNUP,
//         data:{
//             email:data.email,
//             password:data.password,
//             returnSecureToken:true
//         },
//         header:{
//             "Content-Type":"application/json"
//         }
//     }).then(response=>{
//         return response.data
//     }).catch( e => {
//         return false
//     });

//     return {
//         type:SIGN_UP,
//         payload:request
//     }
// }


// export function signIn(data){

//     const request = axios({
//         method:'POST',
//         url:SIGNIN,
//         data:{
//             email:data.email,
//             password:data.password,
//             returnSecureToken:true
//         },
//         header:{
//             "Content-Type":"application/json"
//         }
//     }).then(response=>{
//         return response.data
//     }).catch( e => {
//         return false
//     });


//     return {
//         type:SIGN_IN,
//         payload:request
//     }
// }

// export const autoSignIn = (refToken) =>{
//     const request = axios(
//         {
//             method:"POST",
//             url:REFRESH,
//             data: "grant_type=refresh_token&refresh_token=" + refToken,
//             header:{
//             "Content-Type":"application/x-www-form-urlencoded"
//         }

//         }
//     ).then( response =>{
//         return response.data
//     }).catch( e => {
//         return false
//     });

//     return{
//         type: AUTO_SIGN_IN,
//         payload:request
//     }
// }