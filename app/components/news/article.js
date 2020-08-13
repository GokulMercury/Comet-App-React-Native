import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  Linking,
  TouchableOpacity
} from 'react-native';

import { ThemeProvider, Button } from 'react-native-elements';
import { AsyncStorage } from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import qs from 'qs';
import { connect } from 'react-redux';
import { getUpdates } from '../../store/actions/updates_actions';
import { getChannels } from '../../store/actions/channels_actions';
import Moment from 'moment';
import {IMAGEURL} from '../../utils/misc';
import { getTokens } from '../../utils/misc';
import ChannelsComponent from '../channels/index'
import Hyperlink from 'react-native-hyperlink';
import OfflineNotice from '../../utils/OfflineNotice';
import _ from 'lodash';
import {Notifications} from 'react-native-notifications';
import ContentLoader, { Facebook } from 'react-content-loader/native';
import Icon from 'react-native-ionicons'
import FitImage from 'react-native-fit-image';
import Toast from 'react-native-simple-toast';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   //console.log('Message handled in the background!', remoteMessage);
//     parseData = JSON.parse(remoteMessage.data.payload_post);
    
//       Notifications.postLocalNotification({
//       title: parseData.postchannel,
//       body: parseData.postcontent,
//       // extra: "data"
//   });
  
//   });

class ArticleComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userId:'',
      copyData: [],
      updatesData: [],
      refreshing: false,
      subscribeRefreshing: false,
      renderArray: undefined
    };
  }

  
  async componentDidMount(){
  
    // let renderArray = this.props.Updates.news;
    // this.setState({ renderArray });
    // console.log('LOG', this.state.renderArray);
    // Toast.showWithGravity('Comet loading. Please wait..', Toast.LONG, Toast.CENTER);
    //   this.checkPermission() ;
    //   this.createNotificationListeners(); 
    //   this.getMessage();
      
      
      const params = {
        user_id: this.props.User.auth.userId,
        start:"0",
        limit:"25",
        explore:"10"
    };
    const paramsChannels = {
      search_keyword: this.props.User.auth.userId,
      user_id: '',
      start:"0",
      limit:"25"
  }
     await  getTokens((value)=>{
        console.log("IN GET TOKENS", this.props.User.auth.userId);
        this.state.refreshing=true;
        if(JSON.stringify(this.props.User.auth.message) !='user already found'){
          console.log('TOKEN VALUE',JSON.stringify(this.props.User.auth.phone));
          // this.state.userId = JSON.stringify(this.props.User.auth.userId);
          console.log("PARAMS", params);
          this.props.dispatch(getUpdates(params));
          // params.user_id = this.state.userId;
         
          // const value = AsyncStorage.getItem('@comet_app_firstTimeUser');
          
          // if(value == 'true') {
          //   console.log('LOADING NEW NEWS DATA')
           
            
          //     //console.log('NEW USER FIREBASE SUBSCRIPTION');
          // }
          // else {console.log('LOADING PERSISTED DATA')}
          //this.props.dispatch(getChannels(paramsChannels));
          
          this.state.refreshing=false
        }
      })
      
    }

async componentWillMount(){
  
  
    
    const params = {
      user_id: this.props.User.auth.userId,
      start:"0",
      limit:"25",
      explore:"10"
  };
  const paramsChannels = {
    search_keyword: this.props.User.auth.userId,
    user_id: '',
    start:"0",
    limit:"25"
}
   await  getTokens((value)=>{
      console.log("IN GET TOKENS", this.props.User.auth.userId);
      this.state.refreshing=true;
      if(JSON.stringify(this.props.User.auth.message) !='user already found'){
        console.log('TOKEN VALUE',JSON.stringify(this.props.User.auth.phone));
        // this.state.userId = JSON.stringify(this.props.User.auth.userId);
        console.log("PARAMS", params);
        this.props.dispatch(getUpdates(params));
        // params.user_id = this.state.userId;
       
        // const value = AsyncStorage.getItem('@comet_app_firstTimeUser');
        
        // if(value == 'true') {
        //   console.log('LOADING NEW NEWS DATA')
         
          
        //     //console.log('NEW USER FIREBASE SUBSCRIPTION');
        // }
        // else {console.log('LOADING PERSISTED DATA')}
        //this.props.dispatch(getChannels(paramsChannels));
        
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

    //<<<<<<<<<<<<<<<<<<<<<ENABLE THE FOLLOWING FOR AUTO UPDATE>>>>>>>//
    // console.log ('>>>>>>>>>>>>>INSIDE FOREGROUND');
    // this.state.updatesData.post_id = parseData.postid;
    // this.state.updatesData.name = parseData.cj_name;
    // this.state.updatesData.party_name = parseData.postchannel;
    // this.state.updatesData.image = parseData.cj_image;
    // this.state.updatesData.post_attachment_obj_id = parseData.attachmentimage;
    // this.state.updatesData.post_content = parseData.postcontent;
    // this.state.updatesData.post_date_time = parseData.postedtime;

    // // let joinedUpdates = this.state.copyData.concat(updatesData);
    // // this.setState({ copyData: joinedUpdates })
    
    // this.state.copyData = this.props.Updates.news;
    // this.state.copyData.unshift(this.state.updatesData);
                      
    // // console.log('UPDATES DATA', this.state.updatesData);
    // // console.log('COPY DATA', this.state.copyData);
    // this.props.dispatch(pushUpdates(this.state.copyData));
    // // console.log ('BEFORE>>>>>>>>>>>>>>>>>', this.props.Updates.news)
    // this.state.copyData = [];
    // this.state.updatesData = [];
    //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

    Notifications.postLocalNotification({
      title: parseData.postchannel,
      body: parseData.postcontent,
      extra: "data"
  });

  Toast.showWithGravity('New message waiting. Swipe down to refresh.', Toast.LONG, Toast.TOP);

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
    //console.log('permission rejected');
  }
}

async createNotificationListeners() {

  // This listener triggered when notification has been received in foreground
  this.notificationListener = firebase.messaging().onNotification((notification) => {
    //console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ FOREGROUND',notification);
    // const { title, body } = notification;
    // this.displayNotification(title, body);
  });

  // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ BACKGROUND');
    const { title, body } = notificationOpen.notification;
    this.displayNotification(title, body);
  });

  // This listener triggered when app is closed and we click,tapped and opened notification 
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
    //console.log ('>>>>>>>>>>>>>INSIDE LISTENER _ BACKGROUND-APP-CLOSED');
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
  //console.log(title,body)
}
  

 onRefresh() {
    const params = {
      user_id: this.props.User.auth.userId,
      start:"0",
      limit:"25",
      explore:"10"
  };

  const paramsChannels = {
    search_keyword: "",
    user_id:this.props.User.auth.userId,
    start:"0",
    limit:"25"
};
    getTokens(async value=>{
      console.log('INSIDE REFRESH')
      switch(this.props.User.auth.message){
        case 'user already found': 
          console.log("FOUND");
          console.log('REFRESH TOKEN VALUE',JSON.stringify(this.props.User.auth.userId));
          // let userId = this.props.User.auth.userId;
          // this.setState({userId})
         
          console.log("REFRESH PARAMS", params);
          Toast.showWithGravity('Loading. Please wait..', Toast.LONG, Toast.BOTTOM);
          await this.props.dispatch(getUpdates(params));
          this.props.dispatch(getChannels(paramsChannels));
        //default: return null
      }
      
    })
   
  }


//  filteredItems(state) {
//    console.log('STATE>>>>>>>>>>>>>>>>',state.party_name)
//     // const { items, searchText } = state.searchSimple;
//     // return items.filter((item) => item.party_name(searchText));
// }



  
//Share to Whatsapp

shareToWhatsApp = (text) => {
  Linking.openURL(`whatsapp://send?text=*COMET*:: ${text} ::>> *More in COMET App* https://goo.gl/mL4hVW`);
 }

 //Chat with CJ's Whatsapp
chatWithCJWhatsApp = (text,phone) => {
  Linking.openURL(`whatsapp://send?text=${text}`+ `&phone=${phone}`);
 }

//  list(){
  
//     const filterData = this.props.Updates.news;
//     // let filterData = this.props.Updates.news;
//     if (filterData != 'undefined')
//     {
//       const newArray = [];
//       filterData.forEach(obj => {
//         if (!newArray.some(o => o.party_name === obj.party_name)) {
//           newArray.push({ ...obj })
//         }
   
//       });
   
//     //   console.log(this.props.Updates.news);
//     return newArray.map(element => {
//       return (
//         <View style={{ margin: 10 }}>
//           <Text>{element.party_name}</Text>
//           <Text>{element.post_content}</Text>
//         </View>
//       );
//     });
  
 
//     }
    
// };
listHeader = () => {
  return (
    //View to show when list is empty
    <View style={styles.channelHeader}>
      <Text style={styles.listTitle}>{this.props.navigation.state.params.partyName}</Text>

    </View>
  );
};


render() {
  console.log("PARTY NAME FROM NAV", this.props.navigation.state.params.partyName)

//  return <View>{this.list()}</View>;

  // this.fliterData(this.props.Updates.news);
// this.filteredItems(this.props.Updates.news)

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
    ListHeaderComponent={this.listHeader}
    refreshing={this.state.refreshing}
    onRefresh={this.onRefresh.bind(this)}
    keyExtractor={(item, index) => String(index)}
    listEmptyComponent={this.listHeader}
    renderItem={({item}) => {
      if (item.party_name === this.props.navigation.state.params.partyName && item.cjtype != "locovoco" && item.post_content != null){
        return(
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

        //   <View style={[styles.card, {borderColor:"#EBEBEB"}]}
  
        //   onPress={()=>this.chatWithCJWhatsApp(item.post_content,item.cjphone)} 
         
        //   key={qs.stringify(item.post_id)}
        // >            
        //             <View style={styles.cardContent}>
        //               <Image style={[styles.image, styles.imageContent]} source={{uri:IMAGEURL+`${item.image}`}}/>
        //               <Text style={styles.name}>{item.name}</Text>
        //               <Text style={styles.party}>- {item.party_name}{item.cjUserId}</Text>
        //               <Text style={styles.time}> ~ {Moment(item.post_date_time).from(Date.now())}</Text>
                     
        //             </View>
        //             <View style={[styles.cardContent, styles.tagsContent]}>
        //     {/* Adding hyperlinks */}
        //             <Hyperlink linkDefault={ true } linkStyle={ { color: '#2980b9', fontSize: 18 } }>
        //               <Text style={styles.post}>{item.post_content}</Text>
        //             </Hyperlink>
        //             </View>
                   
        //             <View>
        //      {item.post_attachment_obj_id ? 
        //      <FitImage
        //      resizeMode="contain"
        //      source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
        //    />
        //     //  <Image
        //     //       style={styles.postImage}
        //     //       source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
        //     //       //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
        //     //       resizeMode='contain'
        //     //     /> 
        //         : null}
                
        //       </View>
        //       <View style={styles.fixToText}>
        //       <ThemeProvider theme={theme}> 
        //       <Button
        //       icon={
        //         <Icon
        //           name="chatboxes"
        //           size={16}
        //           color="#9E9E9E"
        //         />
        //       }
        //         title="CHAT WITH ME"
        //         onPress={()=>this.chatWithCJWhatsApp(item.post_content,item.cjphone)} 
        //         type="clear"
                
        //       />
        //       </ThemeProvider>
    
        //     <ThemeProvider theme={theme}>
        //       <Button
              
        //         title="SHARE"
        //         onPress={()=>this.shareToWhatsApp(item.post_content)}
        //         type="clear"
                
        //         icon={
        //           <Icon
        //             name="share-alt"
        //             size={20}
        //             color="#e02143"
        //             type="Ionicons"
        //           />
        //         }
        //       />
        //     </ThemeProvider>
            
        //     </View>
        // </View>
        )
       

      }
    }
    
    
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
  listTitle:{
    fontSize:26,
    fontWeight: 'bold',
    color:'#feb40a',
    marginTop:10,
    alignSelf: 'center'
  },
  channelHeader:{
    
    backgroundColor:'#e02143',
    marginTop:0,
  
  },
  listSubTitle:{
    fontSize:16,
    fontWeight: 'bold',
    color:'#fff',
    paddingBottom:10,
    marginTop:10,
    alignSelf: 'center'
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
    marginLeft:0,
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
    fontSize:16,
    // fontWeight: 'bold',
    marginLeft:10,
    marginRight:12,
    marginBottom:10,
    alignSelf: 'center',
    width:270
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#eee",
    marginTop:5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    fontWeight: 'bold',
    color: '#002768',
    fontSize: 15,
    width:170,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: '#000',
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
  },
});

function mapStateToProps(state){
console.log(state)
  return {
    User: state.User,
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(ArticleComponent);

// import React, {Component} from 'react';
// import { GiftedChat } from 'react-native-gifted-chat';
// import database from '@react-native-firebase/database';
// import qs from 'qs';


// export default class ArticleComponent extends Component {
//   state = {
//     messages: [],
//     chatUserId:'',
//     chatCjName:'',
//     chatCjUserId:'',
//   }
 


//   componentDidMount() {
//     const { navigation }  = this.props;
//     this.state.chatUserId = navigation.getParam('userId');
//     this.state.chatCjName = navigation.getParam('cjName');
//     this.state.chatCjUserId = navigation.getParam('cjUserId');
//     this.refOn(message => 
//       this.setState(previousState => ({
//         messages: GiftedChat.append(previousState.messages, message),
//         })
//       )
//     );
//   }

 


//   refOn = callback => {
//     const cjName = this.state.chatCjName
//     const cjNameTrim = cjName.trim();
//     const cjNameTrimSpace = cjNameTrim.replace(/ /g, "_");
    
//     const chatRef = "/Chats/"+this.state.chatCjUserId+"/"+this.state.chatUserId+"/msg";
//     console.log('<<<<<<<<<<<REFERENCE>>>>>>>>',chatRef);
//     const reference = database().ref(chatRef)
//     reference
//       .limitToLast(20)
//       .on('child_added', snapshot => callback(this.parse(snapshot)));
//   }

//   parse = snapshot => {
//     const { timestamp: numberStamp, text, user } = snapshot.val();
//     const { key: _id } = snapshot;
//     const timestamp = new Date(numberStamp);
//     const message = {_id, timestamp, text, user};
//     return message;
//   };

//   send = messages => {
//     const cjName = this.state.chatCjName
//     const cjNameTrim = cjName.trim();
//     const cjNameTrimSpace = cjNameTrim.replace(/ /g, "_");
    
//     const chatRef = "/Chats/"+this.state.chatCjUserId+"/"+this.state.chatUserId+"/msg";
//     console.log('<<<<<<<<<<<REFERENCE>>>>>>>>',this.state.chatCjUserId);
//     const ref = database().ref(chatRef);
//     for (let i = 0; i < messages.length; i++) {
//       const { text, user } = messages[i];
//       const message = {text, user, createdAt: this.timestamp, };
//       ref.push(message);
//     }
//   };


 

//   user() {
    
//     return {
  
//       name: 'Gokul',
//       email: 'g@g.com',
//       avatar: '',
//       _id: '2',
//     };
//   }
  
//   // onSend = messages => {

//   //   const newReference = database()
//   //   .ref('/users')
//   //   .push();
//   //   for (let i = 0; i < messages.length; i++) {
//   //     const { text, user } = messages[i];
//   //     const timestamp = new Date();
//   //     const message = {text, user, createdAt: timestamp, };
//   //     newReference
//   //     .set(message)
//   //     .then(() => console.log('Data updated.'));
//   //     this.setState(previousState => ({
//   //           messages: GiftedChat.append(previousState.messages, messages),
//   //         }))
//   //     // this.ref.push(message);
//   //   }
//   // };

//   get user() {
//     return {
//       name: 'Gokul',
//       channel: 'Kochi',
//       //avatar: this.props.navigation.state.params.avatar,
//       _id:this.state.chatUserId
//     };
//   }
//   // componentDidMount() {
//   //   this.setState({
//   //     messages: [
//   //       {
//   //         _id: 1,
//   //         text: 'Hello developer',
//   //         createdAt: new Date(),
//   //         user: {
//   //           _id: 2,
//   //           name: 'React Native',
//   //           avatar: 'https://placeimg.com/140/140/any',
//   //         },
//   //       },
//   //     ],
//   //   })
//   // }
 
//   // onSend(messages = []) {
//   //   this.setState(previousState => ({
//   //     messages: GiftedChat.append(previousState.messages, messages),
//   //   }))
//   // }
 
//   render() {
//     return (
//       <GiftedChat
//         messages={this.state.messages}
//         onSend={messages => this.send(messages)}
//         user={this.user}
//       />
//     )
//   }
// }