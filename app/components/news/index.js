import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import { AsyncStorage } from 'react-native';
import { Linking } from 'react-native';
import firebase from '@react-native-firebase/app';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import qs from 'qs';
import { connect } from 'react-redux';
import { getUpdates, pushUpdates } from '../../store/actions/updates_actions';
import Moment from 'moment';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import ChannelsComponent from '../channels/index'
import { ScrollView } from 'react-native-gesture-handler';

class NewsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      copyData: [],
      updatesData: [],
      refreshing: false,
    };
  }

  

  componentDidMount(){
    this.checkPermission() ;
    this.createNotificationListeners(); 
    this.getMessage();
    
    const params = {
      user_id: "",
      start:"0",
      limit:"25",
      explore:"10"
  };
    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        
        params.user_id = value[2][1];
        console.log(params)
        this.props.dispatch(getUpdates(params));
      }
    })
  }


 //Remove listeners allocated in createNotificationListeners()
//  componentWillUnmount() {
//   this.notificationListener();
//   this.notificationOpenedListener();
// }

async checkPermission() {
  const enabled = await firebase.messaging().hasPermission();
  // If Premission granted proceed towards token fetch
  if (enabled) {
    this.getToken();
  } else {
    // If permission hasn’t been granted to our app, request user in requestPermission method. 
    this.requestPermission();
  }
}

async getMessage () {
  const appNotification = messaging().onMessage(async remoteMessage => {
    //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    
    //this.state.updatesData = this.props.Updates.news;

    this.state.updatesData.post_id = remoteMessage.data.post_id;
    this.state.updatesData.name = remoteMessage.data.name;
    this.state.updatesData.party_name = remoteMessage.data.party_name;
    this.state.updatesData.image = remoteMessage.data.image;
    this.state.updatesData.post_attachment_obj_id = remoteMessage.data.post_attachment_obj_id;
    this.state.updatesData.post_content = remoteMessage.data.post_content;
    this.state.updatesData.post_date_time = remoteMessage.data.post_date_time;

    // let joinedUpdates = this.state.copyData.concat(updatesData);
    // this.setState({ copyData: joinedUpdates })
    
    this.state.copyData = this.props.Updates.news;
    this.state.copyData.unshift(this.state.updatesData);
                      
    console.log('UPDATES DATA', this.state.updatesData);
    console.log('COPY DATA', this.state.copyData);
    this.props.dispatch(pushUpdates(this.state.copyData));
    
  });

  return appNotification;
}
 

async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken)
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
}

async requestPermission() {
  try {
    await firebase.messaging().requestPermission();
    // User has authorised
    this.getToken();
  } catch (error) {
    // User has rejected permissions
    console.log('permission rejected');
  }
}

async createNotificationListeners() {

  // This listener triggered when notification has been received in foreground
  this.notificationListener = firebase.messaging().onNotification((notification) => {
    const { title, body } = notification;
    this.displayNotification(title, body);
  });

  // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    const { title, body } = notificationOpen.notification;
    this.displayNotification(title, body);
  });

  // This listener triggered when app is closed and we click,tapped and opened notification 
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    const { title, body } = notificationOpen.notification;
    this.displayNotification(title, body);
  }
}


displayNotification(title, body) {
  // we display notification in alert box with title and body
  Alert.alert(
    title, body,
    [
      { text: 'Ok', onPress: () => console.log('ok pressed') },
    ],
    { cancelable: false },
  );
  console.log(title,body)
}
  

  onRefresh() {
    const params = {
      user_id: "",
      start:"0",
      limit:"25",
      explore:"10"
  };

    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        
        params.user_id = value[2][1];
        console.log(params)
        this.props.dispatch(getUpdates(params));
      }
    })
    // this.setState({refreshing: true});
    // this.props.dispatch(getUpdates()).then(() => {
    //   this.setState({refreshing: false});
    
  }
  
// renderUpdates = (updates) => (
  
//   updates.news ? 
//     updates.news.map((item,i)=>(
     
//       <TouchableOpacity
//         onPress={()=> this.props.navigation.navigate('Article',{
//           ...item
//         })}
//         key={i}
//       >
//         <View style={styles.cardContainer}>
//           <View>
//           {item.post_attachment_obj_id ? <Image
//               style={{height:150,justifyContent:'space-around'}}
//               source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
//               //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
//               resizeMode='cover'
//             /> : null}
            
//           </View>
//           <View style={styles.contentCard}>
//               <Text style={styles.titleCard}>{item.post_content}</Text>
//               <View style={styles.bottomCard}>
//               <Image 
//                   style={{width: 60, height: 60, borderRadius: 60/ 2}} 
//                   source={{uri:IMAGEURL+`${item.image}`}}
//                 />
//                 <Text style={styles.bottomCardTeam}>{item.name} - </Text>
//                 <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
//                 <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).format('d MMMM')}</Text>
//               </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     ))
//   : null
// )
//Share to Whatsapp
shareToWhatsApp = (text) => {
  Linking.openURL(`whatsapp://send?text=${text}`);
 }
 
render() {
  


  return (

    <View style={styles.container}>
    
    <ScrollView>
      {/* <View>
        <Text>Channels</Text>
      </View> */}
    <ChannelsComponent/>
      <View>

        {/* <Text>Channels</Text> */}

    <FlatList
      data={this.props.Updates.news}
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh.bind(this)}
      keyExtractor={(item, index) => String(index)}
      renderItem={({item}) => 
        
      <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Article',{
          ...item
        })}
        key={qs.stringify(item.post_id)}
      >
        <View style={styles.cardContainer}>
          <View>
          {item.post_attachment_obj_id ? <Image
              style={{height:150,justifyContent:'space-around'}}
              source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
              //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
              resizeMode='cover'
            /> : null}
            
          </View>
          <View style={styles.contentCard}>
              <Text style={styles.titleCard}>{item.post_content}</Text>
              <View style={styles.bottomCard}>
              <Image 
                  style={{width: 20, height: 20, borderRadius: 60/ 2}} 
                  source={{uri:IMAGEURL+`${item.image}`}}
                />
                <Text style={styles.bottomCardTeam}>{item.name} - </Text>
                <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
                <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).from(Date.now())}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
      }
    />
    </View>
    </ScrollView>
      
  </View>
    // <ScrollView style={{backgroundColor:'#F0F0F0'}} 
    // refreshControl={
    //   <RefreshControl
    //     refreshing={this.state.refreshing}
    //     onRefresh={this._onRefresh.bind(this)}
    //   />
    // }>
    //     { this.renderUpdates(this.props.Updates)}
    // </ScrollView>
  );
}
}

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    paddingTop: 22
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// })

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
  },
  cardContainer: {
    backgroundColor:'#f8f8f8',
    margin:10,
    shadowColor: '#ada96a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 2,
  },
  contentCard:{
    borderWidth:1,
    borderColor:'white'
  },
  titleCard:{
    fontFamily:'Roboto-Bold',
    borderColor: '#fff',
    fontSize:16,
    padding:10
  },
  bottomCard:{
    flex:1,
    flexDirection:'row',
    borderTopWidth:1,
    borderTopColor:'#fff',
    padding:10
  },
  bottomCardTeam:{
    fontFamily:'Roboto-Bold',
    color:'#0c4e8b',
    fontSize:12
  },
  bottomCardText:{
    fontFamily:'Roboto-Light',
    color:'#6b3920',
    fontSize:12
  }
});

function mapStateToProps(state){
  console.log(state)
  return {
    User: state.User,
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(NewsComponent);