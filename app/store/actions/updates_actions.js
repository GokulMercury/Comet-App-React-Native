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
console.log("IN FETCH")

// fetch('http://dev.cometbroadcast.com/appuser/user_home_feed', {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: qs.stringify({
//         user_id: '429',
//         start:'0',
//         limit:'25',
//         explore:'10'
//     })
//     }).then((response) => response.json())
//     .then(data => console.log(data) )
//     .catch(error => console.log(error));

// var formData = new FormData();
//     formData.append('user_id', '429');
//     formData.append('start', '0');
//     formData.append('limit', '25');
//     formData.append('explore', '0');
//     console.log("INSIDE FETCH")
//   const data1 = fetch('http://dev.cometbroadcast.com/appuser/user_home_feed', {method:'POST',body:formData})
//             .then(response => response.json() )
//             .then(data => {
//                 console.log(data);
//                 const news1 = [];
//                 for(let key in data){
//                     news1.push({
//                         ...data[key],
//                         id: key
//                     })
                    
//                 }
//                 console.log ("NEWS1");
//                     console.log (news1);
//                     let dataCopy = {...news1}
//                     console.log(dataCopy)
                    
//             } )
//             .catch(error => console.log(error));
//             //console.log(response)
            
console.log("OUTSIDE FETCH")
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

                    //   console.log(response.data.data);
                    //   const updates = response.data;
                    //   this.setState({ updates });
                  })
                  .catch((error) => {
                      console.log(error);
                  });
                  return {
                    type:GET_UPDATES,
                    payload:request
                }
          
      }   