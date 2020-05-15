import {
    GET_UPDATES
} from '../types';
import qs from 'qs';
import axios from 'axios';
//import {FIREBASEDB} from '../../utils/misc';
import {GETUSERFEEDJSON} from '../../utils/misc';
// import _ from 'lodash';
import map from 'lodash/map';
import merge from 'lodash/merge';
export function getUpdates(){
        const params = {
          user_id: "429",
          start:"0",
          limit:"25",
          explore:"10"
      };

   const request = axios.post(GETUSERFEEDJSON, qs.stringify(params))
                  .then((response) => {
                    const news = [];
                    const details = [];
                    const uservalue = [];

                    console.log (response.data);
                    
                   const keys = Object.keys(news);
  //here we are using lodah to create an array from all the objects
//   const newData = _.values(news);
  const mapData = map(response.data, 'data');
  const mapUserData = map(response.data, 'user');
  const mapMergeData = merge(mapData,mapUserData);


                    console.log(mapMergeData)
                    //console.log (news);
                    console.log ("USERS END");


                    for(let key in mapData){
                        news.push({
                            ...mapData[key],
                            id: key
                        })
                        
                    }

                    
                    return news;

                 
                  })
                  .catch((error) => {
                      console.log(error);
                  });
                  return {
                    type:GET_UPDATES,
                    payload:request
                }
          
      }   