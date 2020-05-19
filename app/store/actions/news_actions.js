import {
    GET_NEWS
} from '../types';

import axios from 'axios';
import {FIREBASEDB} from '../../utils/misc';
//import {JSONURL} from '../../utils/misc';

export function getNews(){
    
//   const request =   axios.get(`${FIREBASEDB}/appuser/get_updates/`, {
        // params: {
        //     user_id: 666677788899,
        //     explore: 2,
        //     start: 100000,
        //     limit: 1
           
        //     //add other params
        // }
//     }).then( response => {
//                 const articles = [];
                
//                 for(let key in response.data){
//                     articles.push({
//                         ...response.data[key],
//                         id: key
//                     })
                    
//                 }
//                 return articles;
//             }).catch(e=>{
//                 return false
//             })
        
//             return {
//                 type:GET_NEWS,
//                 payload:request
//             }
        
//         }


    const request = axios({
        method:'GET',
        url: `${FIREBASEDB}/news.json`
    }).then( response => {
        const articles = [];
        

        for(let key in response.data){
            articles.push({
                ...response.data[key],
                id: key
            })
            
        }
        return articles;
    }).catch(e=>{
        return false
    })

    return {
        type:GET_NEWS,
        payload:request
    }

}