import React, {Component} from 'react';
import io from "socket.io-client";
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {getUserList, SOCKET_SERVER_URL} from "../../service";
import {addReceiveMessage, changeActiveUser} from "../../actions/session";

global.client = null;//全局变量

class HomeTab extends Component {

  state:{
    userList:any
  };

  constructor(){
    super();
    this.state={
      userList:[]
    }
  }

  componentDidMount(){
    //加载用户列表
    getUserList().then((resp)=>{
      this.setState({userList:resp});
    }).catch(e=>{
      console.log(e);
    });
    console.ignoredYellowBox = ['Setting a timer'];//忽略超时警告
    this.initSocket();
  }

  initSocket() {
    const userId=this.props.user.id;
    client = io(`${SOCKET_SERVER_URL}?userId=${userId}`,{
      transports:['websocket'],

    });
    client.on("connect", () => {// 连接
      console.log("connect:", client);
    });
    client.on("reconnect", () => {//重新连接
      console.log("reconnect:", client);
    });
    client.on("disconnect", () => {//断开连接
      console.log("disconnect:", client);
    });
    client.on("msg", (data) => {//实时收取消息
      console.log("msg:", data);
      this.props.dispatch(addReceiveMessage(data))
    });
  }

  render() {
    const {userList}=this.state;

    console.log("===========>>>",userList);
    return (
      <View>
        <ScrollView>

          {userList.length>0&&userList.filter(item=>item.id!==this.props.user.id).map((item,index)=>
            <View style={styles.item} key={index}>
              <Text onPress={()=>{
                this.props.navigator.showModal({
                  screen: "ChatView",
                  title: item.nickname,
                  passProps: {chatUser:item},
                  navigatorStyle: {},
                  animationType: 'slide-up'
                });
                //设置当前活跃用户
                this.props.dispatch(changeActiveUser(item));
              }}>{item.nickname}</Text>
            </View>)}

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item:{
    flex:1,
    paddingHorizontal:20,
    paddingVertical:15,
    backgroundColor:'#ffffff',
    borderBottomWidth:0.5,
    borderColor:'#999999'
  }
});

const mapStateToProps=state=>{
  return {
    user:state.user
  };
};

export default connect(mapStateToProps)(HomeTab);

