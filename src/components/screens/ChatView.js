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
import {changeActiveUser, closeSession, loadMoreMessage, sendMessage} from "../../actions/session";
import {getChatMessages} from "../../service";
import uuid from "uuid/v1";
import {genTimeTag} from "../../utils";

/*
*
*/
class ChatView extends React.Component {

  state: {
    inputValue: string,
    pageNum:number,
    appending:boolean,
  };

  constructor() {
    super();
    this.state = {
      inputValue: "",
      pageNum:1,
      appending:false,
    }
  }


  componentDidMount() {
    // getChatMessages(this.props.user.id, this.props.chatUser.id, new Date().getTime(), 15).then((resp) => {
    //   this.props.dispatch(loadMoreMessage(resp, this.props.chatUser.id))
    // }).catch(e => console.log(e))
  }

  componentWillUnmount() {
    //活跃用户置为-1
    this.props.dispatch(closeSession());
  }

  //查更早消息
  _onLoadEarlier = () => {
    const {messages} = this.props;
    const {pageNum,appending} = this.state;
    if(appending) return;
    console.log("======>执行加载更多");
    this.setState({
      appending: true
    },()=>{
      if (!messages[pageNum * 15]) {//需要请求聊天记录
        let max_ts = new Date().getTime();//取最后一条消息的时间，空则取现在
        let lastIndex=messages.length-1;
        if (messages[lastIndex]) {
          max_ts = messages[lastIndex].createTime;
        }
        this.fetchMessages(max_ts);
      } else {
        this.setState({
          appending: false,
          pageNum: pageNum + 1,
        });
      }
    });
  };

  //网络请求聊天记录
  fetchMessages = (max_ts:any) => {
    const {user, chatUser} = this.props;
    const {pageNum} = this.state;
    getChatMessages(user.id, chatUser.id, max_ts, 15).then((resp) => {
      this.setState({
        pageNum: pageNum + 1,
        appending: false,
      });
      this.props.dispatch(loadMoreMessage(resp, chatUser.id));
    }).catch(e => {
      console.log(e);
    });
  };


  //发送点击事件
  onSendPress = () => {
    const {inputValue} = this.state;
    const {user, chatUser} = this.props;
    console.log("=++++++++输入内容：", inputValue);

    let message = {
      senderId: user.id,
      receiverId: chatUser.id,
      content: inputValue,
      uuid: uuid(),
      createTime: new Date().getTime()
    };

    //redux更新消息池
    this.props.dispatch(sendMessage(message));

    client.emit("msg", message, (data) => {
      console.log("===发送成功，回传消息", data);
    });
  };


  //消息渲染
  renderMessages = ({item, index}) => {
    const {user, chatUser, messages} = this.props;

    let lastMsg=messages[index+1];

    if (item.senderId === user.id) {//本人发送的消息
      return <View>
        {/*无上一条或时间间隔大于两分钟*/}
        {(!lastMsg||(item.createTime-lastMsg.createTime)>120000)&&<Text style={styles.time}>{genTimeTag(item.createTime)}</Text>}
        <View style={styles.right}>
          <View style={[styles.messageBox, {backgroundColor: "#feffac"}]}>
            <Text>{item.content}</Text>
          </View>
          <Avatar nickname={user.nickname} style={{marginLeft: 10}}/>
        </View>
      </View>
    } else {//好友一侧消息
      return <View style={styles.left}>
        <Avatar nickname={chatUser.nickname} style={{marginRight: 10}}/>
        <View style={styles.messageBox}>
          <Text>{item.content}</Text>
        </View>
      </View>
    }


  };

  render() {
    const {messages} = this.props;
    const {pageNum} = this.state;
    const showMessages = messages.slice(0,15 * pageNum);
    if (showMessages.length < 1 && pageNum === 1) {//消息池为空则请求15条
      this.fetchMessages(new Date().getTime());
    }
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>

          {
            showMessages.length > 0 && <FlatList
              inverted
              data={showMessages}
              renderItem={this.renderMessages}
              keyExtractor={(item) => item.uuid}
              onEndReachedThreshold={0.1}
              onEndReached={this._onLoadEarlier}
            />
          }

        </View>


        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            onChangeText={(val) => {
              this.setState({inputValue: val})
            }}
          />
          <Text onPress={() => {
            this.onSendPress()
          }}>发送</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  left: {
    flexDirection: 'row',
    padding: 10
  },
  right: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-end'
  },

  messageBox: {
    marginTop: 4,
    justifyContent: 'center',
    borderRadius: 3,
    backgroundColor: '#e5e5e5',//
    minHeight: 42,
    maxWidth: '60%',
    paddingVertical: 5,
    paddingHorizontal: 12
  },


  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: "#999",
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  input: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: "#999",
    marginRight: 15,
  },
  time:{
    textAlign:'center'
  }
});
const mapStateToProps = state => {
  const session = state.session;
  let newMessageList = [];
  if (session.users[session.activeUserId]) {
    session.users[session.activeUserId].messageIds.forEach(item => {
      newMessageList.unshift(session.messages[item]);
    });
  }
  console.log('展示的消息======>', newMessageList);

  return {
    user: state.user,
    messages: newMessageList,
  }
};

export default connect(mapStateToProps)(ChatView);