import {
  GET_UPDATES,
  PUSH_UPDATES
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETUSERFEEDJSON} from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';

export function getUpdates(params){
    //   const params = {
    //     user_id: "429",
    //     start:"0",
    //     limit:"25",
    //     explore:"10"
    // };
    // console.log('PARAMS IN GET UPDATES', params)
    return function(dispatch){
 return axios.post(GETUSERFEEDJSON, qs.stringify(params))
                .then((response) => {
                  const news = [];

                 // console.log (response.data);
                  
                 //const keys = Object.keys(news);
//here we are using lodah to create an array from all the objects
//   const newData = _.values(news);
const mapData = map(response.data, 'data');
const mapUserData = map(response.data, 'user');
const mapMergeData = merge(mapData,mapUserData);


                  //console.log(mapMergeData)
                  //console.log (news);
                  // console.log ("USERS END");


                  for(let key in mapData){
                      news.push({
                          ...mapData[key],
                          id: key
                      })
                      
                  }

                  
                  dispatch({
                    type:GET_UPDATES,
                    payload:news,
                });

               
                })
                
            }
    }   

export function pushUpdates(params){
let news = params;
// console.log('PUSH_UPDATES', news);
//news.push(params.data);
  return{
    type:PUSH_UPDATES,
    payload: news
  }
}