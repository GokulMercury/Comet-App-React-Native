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
import {IMAGEURL} from '../../utils/misc';

class ArticleComponent extends Component {
  componentDidMount(){
    this.props.dispatch(getUpdates());
  }

<<<<<<< Updated upstream
  
renderUpdates = (updates) => (

  
  updates.news ? 
    updates.news.map((item,i)=>(
     
      <TouchableOpacity
        onPress={()=> this.props.navigation.navigate('Article',{
          ...item
        })}
        key={i}
      >
        <View style={styles.cardContainer}>
          <View>
          {item.post_attachment_obj_id ? <Image
              style={{height:150,justifyContent:'space-around'}}
              source={{uri:IMAGEURL+`${item.post_attachment_obj_id}`}}
              //source={{uri:`https://miro.medium.com/max/1400/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg`}}
              resizeMode='cover'
            /> : null}
=======
// async componentWillMount(){
  
  
    
//     const params = {
//       user_id: this.props.User.auth.userId,
//       start:"0",
//       limit:"25",
//       explore:"10"
//   };
//   const paramsChannels = {
//     search_keyword: this.props.User.auth.userId,
//     user_id: '',
//     start:"0",
//     limit:"25"
// }
//    await  getTokens((value)=>{
//       // console.log("IN GET TOKENS", this.props.User.auth.userId);
//       this.state.refreshing=true;
//       if(JSON.stringify(this.props.User.auth.message) !='user already found'){
//         // console.log('TOKEN VALUE',JSON.stringify(this.props.User.auth.phone));
//         // this.state.userId = JSON.stringify(this.props.User.auth.userId);
//         // console.log("PARAMS", params);
//         this.props.dispatch(getUpdates(params));
//         // params.user_id = this.state.userId;
       
//         // const value = AsyncStorage.getItem('@comet_app_firstTimeUser');
        
//         // if(value == 'true') {
//         //   console.log('LOADING NEW NEWS DATA')
         
          
//         //     //console.log('NEW USER FIREBASE SUBSCRIPTION');
//         // }
//         // else {console.log('LOADING PERSISTED DATA')}
//         //this.props.dispatch(getChannels(paramsChannels));
        
//         this.state.refreshing=false
//       }
//     })
    
//   }


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

// async getMessage () {
//   const appNotification = messaging().onMessage(async remoteMessage => {
    
    
    
//     parseData = JSON.parse(remoteMessage.data.payload_post);
//     //Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  
    
//     //this.state.updatesData = this.props.Updates.news;

//     //<<<<<<<<<<<<<<<<<<<<<ENABLE THE FOLLOWING FOR AUTO UPDATE>>>>>>>//
//     // console.log ('>>>>>>>>>>>>>INSIDE FOREGROUND');
//     // this.state.updatesData.post_id = parseData.postid;
//     // this.state.updatesData.name = parseData.cj_name;
//     // this.state.updatesData.party_name = parseData.postchannel;
//     // this.state.updatesData.image = parseData.cj_image;
//     // this.state.updatesData.post_attachment_obj_id = parseData.attachmentimage;
//     // this.state.updatesData.post_content = parseData.postcontent;
//     // this.state.updatesData.post_date_time = parseData.postedtime;

//     // // let joinedUpdates = this.state.copyData.concat(updatesData);
//     // // this.setState({ copyData: joinedUpdates })
    
//     // this.state.copyData = this.props.Updates.news;
//     // this.state.copyData.unshift(this.state.updatesData);
                      
//     // // console.log('UPDATES DATA', this.state.updatesData);
//     // // console.log('COPY DATA', this.state.copyData);
//     // this.props.dispatch(pushUpdates(this.state.copyData));
//     // // console.log ('BEFORE>>>>>>>>>>>>>>>>>', this.props.Updates.news)
//     // this.state.copyData = [];
//     // this.state.updatesData = [];
//     //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

//     Notifications.postLocalNotification({
//       title: parseData.postchannel,
//       body: parseData.postcontent,
//       extra: "data"
//   });

//   Toast.showWithGravity('New message waiting. Swipe down to refresh.', Toast.LONG, Toast.TOP);

//   });

//   return appNotification;
// }
 

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
      // console.log('INSIDE REFRESH')
      switch(this.props.User.auth.message){
        case 'user already found': 
          // console.log("FOUND");
          // console.log('REFRESH TOKEN VALUE',JSON.stringify(this.props.User.auth.userId));
          // let userId = this.props.User.auth.userId;
          // this.setState({userId})
         
          // console.log("REFRESH PARAMS", params);
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
  // console.log("PARTY NAME FROM NAV", this.props.navigation.state.params.partyName)

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
>>>>>>> Stashed changes
            
          </View>
          <View style={styles.contentCard}>
              <Text style={styles.titleCard}>{item.post_content}</Text>
              <View style={styles.bottomCard}>
              <Image 
                  style={{width: 60, height: 60, borderRadius: 60/ 2}} 
                  source={{uri:IMAGEURL+`${item.image}`}}
                />
                <Text style={styles.bottomCardTeam}>{item.name} - </Text>
                <Text style={styles.bottomCardTeam}>{item.party_name} - </Text>
                <Text style={styles.bottomCardText}>Posted at {Moment(item.post_date_time).format('d MMMM')}</Text>
              </View>
          </View>
        </View>
      </TouchableOpacity>
    ))
  : null
)

render() {
 
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
  }
});

function mapStateToProps(state){
  console.log(state)
  return {
    Updates:state.Updates
  }
}


export default connect(mapStateToProps)(ArticleComponent);