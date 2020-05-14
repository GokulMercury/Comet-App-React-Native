import React, {Component} from 'react';
import {
  StyleSheet, 
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { getUpdates } from '../../store/actions/updates_actions';
import Moment from 'moment';
import map from 'lodash/map';

class UpdatesComponent extends Component {
  componentDidMount(){
    this.props.dispatch(getUpdates());
  }

renderUpdates = (updates) => (

  
  updates.news ? 
    updates.news.map((item,i)=>(
      // <View key={i}>
      //   <Text>{item.post_content}</Text>
      // </View>
      <View style = {styles.listItemContainer}>
      <View style= {styles.iconContainer}>
       <Image source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}} style={styles.initStyle} resizeMode='contain' />
      </View>
      <View style = {styles.callerDetailsContainer}>
       <View style={styles.callerDetailsContainerWrap}>
        <View style={styles.nameContainer}>
          <Text>{item.post_content}</Text>
          <View style={styles.dateContainer}>
            {/* <Icon name={person.missed ? "call-missed" : "call-received"} size={15} color={person.missed ? "#ed788b" : "#075e54"} /> */}
            <Text style={{ fontWeight:'400', color:'#666', fontSize:12 }}>DATE</Text>
          </View>
         </View>
       <View style={styles.callIconContainer}>
        {/* <Icon name="phone" color='#075e54' size={23} style={{ padding:5 }} /> */}
       </View>
      </View>
     </View>
    </View>
      // <TouchableOpacity
      //   onPress={()=> this.props.navigation.navigate('Article',{
      //     ...item
      //   })}
      //   key={i}
      // >
      //   <View style={styles.cardContainer}>
      //     <View>
      //       <Image
      //         style={{height:150,justifyContent:'space-around'}}
      //         //source={{uri:`${item.image}`}}
      //         source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
      //         resizeMode='cover'
      //       />
      //     </View>
      //     <View style={styles.contentCard}>
      //         <Text style={styles.titleCard}>{item.post_content}</Text>
      //         <View style={styles.bottomCard}>
      //           <Text style={styles.bottomCardTeam}>{item.user_id} - </Text>
      //           <Text style={styles.bottomCardText}>Posted at {Moment(item.user_id).format('d MMMM')}</Text>
      //         </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>
    ))
  : null
)

render() {
  // const keys = Object.keys(updates.data);
  // //here we are using lodah to create an array from all the objects
  // const newData = _.values(updates.data);
  // console.log(newData)
  return (
    <ScrollView style={{backgroundColor:'#F0F0F0'}}>
        { this.renderUpdates(this.props.Updates)}
    </ScrollView>
  );
}
}
const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor:'#fff',
    margin:10,
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  contentCard:{
    borderWidth:1,
    borderColor:'#dddddd'
  },
  titleCard:{
    fontFamily:'Roboto-Bold',
    color:'#232323',
    fontSize:16,
    padding:10
  },
  bottomCard:{
    flex:1,
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#e6e6e6',
    padding:10
  },
  bottomCardTeam:{
    //fontFamily:'Roboto-Bold',
    color:'#828282',
    fontSize:12
  },
  bottomCardText:{
    fontFamily:'Roboto-Light',
    color:'#828282',
    fontSize:12
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "flex-start",
    marginLeft: 10
  },
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    flex: 1,
    alignItems: "flex-start"
  },
  callerDetailsContainer: {
    flex: 4,
    justifyContent: "center",
    borderBottomColor: "rgba(92,94,94,0.5)",
    borderBottomWidth: 0.25
  },
  callerDetailsContainerWrap: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row"
  },
  nameContainer: {
    alignItems: "flex-start",
    flex: 1
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  callIconContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  initStyle: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
});

function mapStateToProps(state){
  console.log(state)
  return {
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(UpdatesComponent);

// import axios from 'axios';
// import qs from 'qs';
// import React, { Component } from 'react';
// import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
// import {JSONURL} from '../../utils/misc';

// export default class ChannelComponent extends Component{

//     state = {
//         updates: []
//       }

//     componentDidMount(){
//         this.getUpdates();
//       }

      
// getUpdates(){
//   const params = {
//     user_id: "429",
//     start:"0",
//     limit:"25",
//     explore:"10"
// };

// axios.post("http://dev.cometbroadcast.com/appuser/user_home_feed", qs.stringify(params))
//             .then((response) => {
//                 console.log(response.data.data);
//                 const updates = response.data;
//                 this.setState({ updates });
//             })
//             .catch((error) => {
//                 console.log(error);
//             });

    
// }   
// render() {
//     return (
//         <ul>
//           { this.state.updates.map(updates => <li>{updates.post_content}</li>)}
//         </ul>
//     );
// }
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center'
// }
// });