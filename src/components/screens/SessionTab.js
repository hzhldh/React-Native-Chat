import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import Avatar from "../Avatar";
import {connect} from "react-redux";
import {getRecentSessions} from "../../service";
import {changeActiveUser, loadSession} from "../../actions/session";

class SessionTab extends Component {

  componentDidMount(){
    const {user}=this.props;
    //获取会话列表
    getRecentSessions(user.id).then((resp)=>{
      console.log("====>会话列表",resp);

      //delete obj.key1 可以去掉session属性
      this.props.dispatch(loadSession(resp));

    }).catch(e=>{
      console.log(e)
    })
  }

  render() {
    const {sessionList}=this.props;
    console.log("===>页面的会话==》：",this.props.sessionList);
    return (
      <View>
        <ScrollView>

          {
            sessionList.map((item,index)=>
              <TouchableWithoutFeedback
                onPress={()=>{
                  this.props.navigator.showModal({
                    screen: "ChatView",
                    title: item.chatUser.nickname,
                    passProps: {chatUser:item.chatUser},
                    navigatorStyle: {},
                    animationType: 'slide-up'
                  });

                  //设置当前活跃用户
                  this.props.dispatch(changeActiveUser(item.chatUser.id));
                }}
                key={index}
              >
                <View style={styles.item}>
                  <Avatar nickname={item.chatUser.nickname}/>
                  <View style={styles.content}>
                    <Text style={styles.nickname}>{item.chatUser.nickname}</Text>
                    <Text>{item.lastMsg.content}</Text>
                  </View>
                  <View style={styles.rightView}>
                    <Text>{item.lastMsg.createTime}</Text>

                    {item.unRead>0&&<View style={styles.unRead}>
                      <Text style={styles.unReadText}>{item.unRead}</Text>
                    </View>}

                  </View>
                </View>
              </TouchableWithoutFeedback>
            )
          }



          {/*<TouchableWithoutFeedback onPress={()=>{*/}
            {/*this.props.navigator.showModal({*/}
              {/*screen: "ChatView",*/}
              {/*title: "关羽", */}
              {/*passProps: {},*/}
              {/*navigatorStyle: {},*/}
              {/*animationType: 'slide-up'*/}
            {/*});*/}
          {/*}}>*/}
            {/*<View style={styles.item}>*/}
              {/*<Avatar nickname={"1"}/>*/}
              {/*<View style={styles.content}>*/}
                {/*<Text style={styles.nickname}>关羽</Text>*/}
                {/*<Text>你好啊</Text>*/}
              {/*</View>*/}
              {/*<View style={styles.rightView}>*/}
                {/*<Text>22:35</Text>*/}
                {/*<View style={styles.unRead}>*/}
                  {/*<Text style={styles.unReadText}>5</Text>*/}
                {/*</View>*/}
              {/*</View>*/}
            {/*</View>*/}
          {/*</TouchableWithoutFeedback>*/}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'#fff',
    borderBottomWidth:0.5,
    borderColor:'#999',
    flexDirection:'row',
  },
  content:{
    flex:1,
    paddingLeft:8
  },
  nickname:{
    fontSize:15,
    color:"#333"
  },
  rightView:{
    alignItems:"flex-end"
  },
  unRead:{
    width:20,
    height:20,
    borderRadius:10,
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center'
  },
  unReadText:{
    color:"#fff",
    fontSize:15
  }
});


const mapStateToProps=state=>{
  let newSessionList = [];
  if (state.session.users) {
    const sessionMap = state.session.users;
    Object.keys(sessionMap).forEach(item => {
      newSessionList.push(sessionMap[item].session);
    });
    newSessionList.sort((a, b) => b.lastChatTime - a.lastChatTime);
  }

  return {
    user:state.user,
    sessionList:newSessionList
  };
};

export default connect(mapStateToProps)(SessionTab);
