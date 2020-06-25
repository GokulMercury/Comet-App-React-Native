import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  TextInput,
  FlatList,
  Linking
} from 'react-native';

import { ThemeProvider, Button } from 'react-native-elements';
import { AsyncStorage } from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import qs from 'qs';
import { connect } from 'react-redux';
import { getUpdates, pushUpdates } from '../../store/actions/updates_actions';
import { getChannels } from '../../store/actions/channels_actions';
import Moment from 'moment';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import ChannelsComponent from '../channels/index'
import { color } from 'react-native-reanimated';
import Hyperlink from 'react-native-hyperlink';
//import { ScrollView } from 'react-native-gesture-handler';
import OfflineNotice from '../../utils/OfflineNotice';
import _ from 'lodash';
import {Notifications} from 'react-native-notifications';
import ContentLoader, { Facebook } from 'react-content-loader/native';
import Icon from 'react-native-ionicons'
import FitImage from 'react-native-fit-image';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
    parseData = JSON.parse(remoteMessage.data.payload_post);
    
      Notifications.postLocalNotification({
      title: parseData.postchannel,
      body: parseData.postcontent,
      // extra: "data"
  });
  
  });

class NewsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId:'',
      copyData: [],
      updatesData: [],
      refreshing: false,
      subscribeRefreshing: false,
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
  const paramsChannels = {
    search_keyword: "",
    user_id:this.state.userId,
    start:"0",
    limit:"25"
}
    getTokens((value)=>{
      this.state.refreshing=true
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        this.state.userId = value[2][1];
        params.user_id = this.state.userId;
       
        //this.props.dispatch(getChannels(paramsChannels));
        this.props.dispatch(getUpdates(params));
        this.state.refreshing=false
      }
    })
    
  }


//  Remove listeners allocated in createNotificationListeners()
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
    
    
    
    parseData = JSON.parse(remoteMessage.data.payload_post);
    //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  
    
    //this.state.updatesData = this.props.Updates.news;
    console.log ('>>>>>>>>>>>>>INSIDE FOREGROUND');
    this.state.updatesData.post_id = parseData.postid;
    this.state.updatesData.name = parseData.cj_name;
    this.state.updatesData.party_name = parseData.postchannel;
    this.state.updatesData.image = parseData.cj_image;
    this.state.updatesData.post_attachment_obj_id = parseData.attachmentimage;
    this.state.updatesData.post_content = parseData.postcontent;
    this.state.updatesData.post_date_time = parseData.postedtime;

    // let joinedUpdates = this.state.copyData.concat(updatesData);
    // this.setState({ copyData: joinedUpdates })
    
    this.state.copyData = this.props.Updates.news;
    this.state.copyData.unshift(this.state.updatesData);
                      
    // console.log('UPDATES DATA', this.state.updatesData);
    // console.log('COPY DATA', this.state.copyData);
    this.props.dispatch(pushUpdates(this.state.copyData));
    // console.log ('BEFORE>>>>>>>>>>>>>>>>>', this.props.Updates.news)
    this.state.copyData = [];
    this.state.updatesData = [];
    
    Notifications.postLocalNotification({
      title: parseData.postchannel,
      body: parseData.postcontent,
      extra: "data"
  });

  });

  return appNotification;
}
 

async getToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
     // console.log(fcmToken)
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
    console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ FOREGROUND',notification);
    // const { title, body } = notification;
    // this.displayNotification(title, body);
  });

  // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ BACKGROUND');
    const { title, body } = notificationOpen.notification;
    this.displayNotification(title, body);
  });

  // This listener triggered when app is closed and we click,tapped and opened notification 
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ BACKGROUND-APP-CLOSED');
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

  const paramsChannels = {
    search_keyword: "",
    user_id:this.state.userId,
    start:"0",
    limit:"25"
};
    getTokens((value)=>{
      if(value[0][1]===null){
        console.log("NO TOKENS");
      } else{
        
        params.user_id = this.state.userId;
        //console.log('<<<<<<<<<ASYNC VALUE>>>>', value)
        this.props.dispatch(getUpdates(params));
        this.props.dispatch(getChannels(paramsChannels));
      }
    })
   
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Facebook />
      </View>
    );
  };

//Share to Whatsapp

shareToWhatsApp = (text) => {
  Linking.openURL(`whatsapp://send?text=${text}`);
 }

 //Chat with CJ's Whatsapp
chatWithCJWhatsApp = (text,phone) => {
  Linking.openURL(`whatsapp://send?text=${text}`+ `&phone=${phone}`);
 }
 
render() {
  


  return (

    <View style={styles.container}>
    
    
    
    {/* <ScrollView 
    refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)}
        />
      }> */}
      {/* <View>
        <Text>Channels</Text>
      </View> */}
    {/* <ChannelsComponent/> */}
      

        {/* <Text>Channels</Text> */}
        
    <FlatList
    
      data={this.props.Updates.news}
    //  extraData={this.state.copyData}
      ListHeaderComponent={ChannelsComponent}
      refreshing={this.state.refreshing}
      onRefresh={this.onRefresh.bind(this)}
      keyExtractor={(item, index) => String(index)}
      listEmptyComponent={this.ListEmpty}
      renderItem={({item}) => 
      
      <View style={[styles.card, {borderColor:"#EBEBEB"}]}
      //>>>To share content through WhatsApp
     // onPress={()=>this.shareToWhatsApp(item.post_content)} 
      //>>>Chat with CJ WhatsApp
      onPress={()=>this.chatWithCJWhatsApp(item.post_content,item.cjphone)} 
      //>>>To chat with CJ >>> Chat Page
      // onPress={()=> this.props.navigation.navigate('Article',{
      //   userId:this.state.userId,
      //   cjName:item.name,
      //   cjUserId:item.post_owner_id
      // })} 
      key={qs.stringify(item.post_id)}
    >            
                <View style={styles.cardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={{uri:IMAGEURL+`${item.image}`}}/>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.party}>- {item.party_name}{item.cjUserId}</Text>
                  <Text style={styles.time}> ~ {Moment(item.post_date_time).from(Date.now())}</Text>
                  {/* <Text style={styles.time}> - {Moment(item.post_date_time).from(Date.now())}</Text> */}
                </View>
                <View style={[styles.cardContent, styles.tagsContent]}>
        {/* Adding hyperlinks */}
                <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 18 } }>
                  <Text style={styles.post}>{item.post_content}</Text>
                </Hyperlink>
                </View>
               
                <View>
         {item.post_attachment_obj_id ? 
         <FitImage
         resizeMode="contain"
         source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
       />
        //  <Image
        //       style={styles.postImage}
        //       source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
        //       //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
        //       resizeMode='contain'
        //     /> 
            : null}
            
          </View>
          <View style={styles.fixToText}>
          <ThemeProvider theme={theme}> 
          <Button
          icon={
            <Icon
              name="chatboxes"
              size={16}
              color="#9E9E9E"
            />
          }
            title="CHAT WITH ME"
            onPress={()=>this.chatWithCJWhatsApp(item.post_content,item.cjphone)} 
            type="clear"
            
          />
          </ThemeProvider>

        <ThemeProvider theme={theme}>
          <Button
          
            title="SHARE"
            onPress={()=>this.shareToWhatsApp(item.post_content)}
            type="clear"
            
            icon={
              <Icon
                name="share-alt"
                size={20}
                color="#e02143"
                type="Ionicons"
              />
            }
          />
        </ThemeProvider>
        
        </View>
    </View>

      // <TouchableOpacity
      //   onPress={()=> this.props.navigation.navigate('Article',{
      //     ...item
      //   })}
      //   key={qs.stringify(item.post_id)}
      // >
      //   <View style={styles.cardContainer}>
      //     <View>
      //     {item.post_attachment_obj_id ? <Image
      //         style={{height:150,justifyContent:'space-around'}}
      //         source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
      //         //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
      //         resizeMode='cover'
      //       /> : null}
            
      //     </View>
      //     <View style={styles.contentCard}>
      //         <Text style={styles.titleCard}>{item.post_content}</Text>
      //         <View style={styles.bottomCard}>
      //         <Image 
      //             style={{width: 20, height: 20, borderRadius: 60/ 2}} 
      //             source={{uri:IMAGEURL+`${item.image}`}}
      //           />
      //           <Text style={styles.bottomCardTeam}>{item.name} - </Text>
      //           <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
      //           <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).from(Date.now())}</Text>
      //         </View>
      //     </View>
      //   </View>
      // </TouchableOpacity>
      }
    />
 
    {/* </ScrollView> */}
    <OfflineNotice />   
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

const theme = {
  Button: {
    
    titleStyle: {
      color: '#9E9E9E',
      fontSize:14
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  postImage: {
    height:300,
    justifyContent:'space-around'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  imageCanvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 1,
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    // borderTopWidth:20,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  cardContentBottom:{
    flexDirection:'row',
    marginLeft:10, 
    marginTop:10, 
  },
  imageContent:{
    marginTop:-20,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:40,
    height:40,
    borderRadius:30,
  },
  name:{
    fontSize:14,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center',
    color:'#002768'
  },
  party:{
    fontSize:14,
    marginLeft:3,
    alignSelf: 'center'
  },
  time:{
    fontSize:10,
    //fontWeight: 'bold',
    marginLeft:3,
    alignSelf: 'center'
  },
  post:{
    fontSize:18,
    // fontWeight: 'bold',
    marginLeft:10,
    marginRight:12,
    marginBottom:10,
    alignSelf: 'center'
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
});

function mapStateToProps(state){
  //console.log(state)
  return {
    User: state.User,
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(NewsComponent);