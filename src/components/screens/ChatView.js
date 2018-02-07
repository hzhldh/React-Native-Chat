/**
 * Created by HuangZhiHao on 2018/2/5.
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet, ScrollView, TextInput, FlatList
} from 'react-native';
import Avatar from "../Avatar";
import {connect} from "react-redux";
import {changeActiveUser, loadMoreMessage} from "../../actions/session";
import {getChatMessages} from "../../service";
import uuid from "uuid/v1";

/*
*
*/
class ChatView extends React.Component {

  state:{
    inputValue:string
  };

  constructor(){
    super();
    this.state={
      inputValue:""
    }
  }


  componentDidMount(){
    if(this.props.chatUser){
      console.log("==============>聊天对象",this.props.chatUser);
      console.log("==============>唯一",uuid());
    }

    getChatMessages(this.props.user.id,this.props.chatUser.id,1514739661,15).then((resp)=>{
      this.props.dispatch(loadMoreMessage(resp,this.props.chatUser.id))
    }).catch(e=>console.log(e))
  }

  componentWillUnmount(){
    //活跃用户置为-1
    this.props.dispatch(changeActiveUser(-1));
  }


  //发送点击事件
  onSendPress=()=>{
    const {inputValue}=this.state;
    const {user,chatUser}=this.props;
    console.log("=++++++++输入内容：",inputValue);

    let message={
      senderId:user.id,
      receiverId:chatUser.id,
      content:inputValue,
      uuid:uuid()
    };
    client.emit("msg",message,(data)=>{
      console.log("===发送成功，回传消息",data);
    });
  };



  //消息渲染
  renderMessages=({item,index})=>{
    const {user,chatUser,messages}=this.props;

    if(item.senderId===user.id){//本人发送的消息
      return <View style={styles.right}>
        <View style={[styles.messageBox,{backgroundColor:"#feffac"}]}>
          <Text>{item.content}</Text>
        </View>
        <Avatar nickname={user.nickname} style={{marginLeft:10}}/>
      </View>
    }else {//好友一侧消息
      return <View style={styles.left}>
        <Avatar nickname={chatUser.nickname} style={{marginRight:10}}/>
        <View style={styles.messageBox}>
          <Text>{item.content}</Text>
        </View>
      </View>
    }


  };

  render() {
    const {messages}=this.props;

    return (
      <View style={styles.container}>
        <View style={{flex:1}}>

          {
            messages.length > 0 && <FlatList
              inverted
              ref={list => this._list = list}
              data={messages}
              renderItem={this.renderMessages}
              keyExtractor={(item) => item.uuid}
            />
          }

        </View>

        {/*<ScrollView>*/}

          {/*<View style={styles.left}>*/}
            {/*<Avatar nickname={"大哥"} style={{marginRight:10}}/>*/}
            {/*<View style={styles.messageBox}>*/}
              {/*<Text>你好啊大哥的撒大大说的大大大的达瓦大大安达市大多若群无若请问额大耳朵挖</Text>*/}
            {/*</View>*/}
          {/*</View>*/}

          {/*<View style={styles.right}>*/}
            {/*<View style={[styles.messageBox,{backgroundColor:"#feffac"}]}>*/}
              {/*<Text>你好啊大哥的撒大大说的大大大的达瓦大大安达市大多若群无若请问额大耳朵挖</Text>*/}
            {/*</View>*/}
            {/*<Avatar nickname={"帅哥"} style={{marginLeft:10}}/>*/}
          {/*</View>*/}

        {/*</ScrollView>*/}

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            onChangeText={(val)=>{this.setState({inputValue:val})}}
          />
          <Text onPress={()=>{this.onSendPress()}}>发送</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff"
  },

  left:{
    flexDirection:'row',
    padding:10
  },
  right:{
    flexDirection:'row',
    padding:10,
    justifyContent: 'flex-end'
  },

  messageBox:{
    marginTop: 4,
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#e5e5e5',//
    minHeight: 42,
    maxWidth: '60%',
    paddingVertical: 5,
    paddingHorizontal: 12
  },


  inputView:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    borderWidth:0.5,
    borderColor:"#999",
    paddingVertical:10,
    paddingHorizontal:10
  },
  input:{
    flex:1,
    borderWidth:0.5,
    borderColor:"#999",
    marginRight:15,
  }
});
const mapStateToProps=state=>{
  const session = state.session;
  let newMessageList = [];
  let chatter = null;
  if (session.users[session.activeUserId]) {
    session.users[session.activeUserId].messageIds.forEach(item => {
      newMessageList.unshift(session.messages[item]);
    });
  }
  console.log('展示的消息======>', newMessageList);

  return {
    user:state.user,
    messages:newMessageList,
  }
};

export default connect(mapStateToProps)(ChatView);