import React, {Component} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import database from '@react-native-firebase/database';
import qs from 'qs';


export default class ArticleComponent extends Component {
  state = {
    messages: [],
    chatUserId:'',
    chatCjName:'',
    chatCjUserId:'',
  }
 


  componentDidMount() {
    const { navigation }  = this.props;
    this.state.chatUserId = navigation.getParam('userId');
    this.state.chatCjName = navigation.getParam('cjName');
    this.state.chatCjUserId = navigation.getParam('cjUserId');
    this.refOn(message => 
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
        })
      )
    );
  }

 


  refOn = callback => {
    const cjName = this.state.chatCjName
    const cjNameTrim = cjName.trim();
    const cjNameTrimSpace = cjNameTrim.replace(/ /g, "_");
    
    const chatRef = "/Chats/"+this.state.chatCjUserId+"/"+this.state.chatUserId+"/msg";
    console.log('<<<<<<<<<<<REFERENCE>>>>>>>>',chatRef);
    const reference = database().ref(chatRef)
    reference
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {_id, timestamp, text, user};
    return message;
  };

  send = messages => {
    const cjName = this.state.chatCjName
    const cjNameTrim = cjName.trim();
    const cjNameTrimSpace = cjNameTrim.replace(/ /g, "_");
    
    const chatRef = "/Chats/"+this.state.chatCjUserId+"/"+this.state.chatUserId+"/msg";
    console.log('<<<<<<<<<<<REFERENCE>>>>>>>>',this.state.chatCjUserId);
    const ref = database().ref(chatRef);
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {text, user, createdAt: this.timestamp, };
      ref.push(message);
    }
  };


 

  user() {
    
    return {
  
      name: 'Gokul',
      email: 'g@g.com',
      avatar: '',
      _id: '2',
    };
  }
  
  // onSend = messages => {

  //   const newReference = database()
  //   .ref('/users')
  //   .push();
  //   for (let i = 0; i < messages.length; i++) {
  //     const { text, user } = messages[i];
  //     const timestamp = new Date();
  //     const message = {text, user, createdAt: timestamp, };
  //     newReference
  //     .set(message)
  //     .then(() => console.log('Data updated.'));
  //     this.setState(previousState => ({
  //           messages: GiftedChat.append(previousState.messages, messages),
  //         }))
  //     // this.ref.push(message);
  //   }
  // };

  get user() {
    return {
      name: 'Gokul',
      channel: 'Kochi',
      //avatar: this.props.navigation.state.params.avatar,
      _id:this.state.chatUserId
    };
  }
  // componentDidMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   })
  // }
 
  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }))
  // }
 
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.send(messages)}
        user={this.user}
      />
    )
  }
}