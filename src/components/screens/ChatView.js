/**
 * Created by HuangZhiHao on 2018/2/5.
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet, ScrollView, TextInput
} from 'react-native';
import Avatar from "../Avatar";

/*
*
*/
class ChatView extends React.Component {
  componentDidMount(){
    if(this.props.chatUser){
      console.log("==============>聊天对象",this.props.chatUser);
    }
  }

  componentWillUnmount(){
    //alert("===》离开聊天");
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>


          <View style={styles.left}>
            <Avatar nickname={"大哥"} style={{marginRight:10}}/>
            <View style={styles.messageBox}>
              <Text>你好啊大哥的撒大大说的大大大的达瓦大大安达市大多若群无若请问额大耳朵挖</Text>
            </View>
          </View>


          <View style={styles.right}>
            <View style={[styles.messageBox,{backgroundColor:"#feffac"}]}>
              <Text>你好啊大哥的撒大大说的大大大的达瓦大大安达市大多若群无若请问额大耳朵挖</Text>
            </View>
            <Avatar nickname={"帅哥"} style={{marginLeft:10}}/>
          </View>



        </ScrollView>

        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
          />
          <Text>发送</Text>
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
export default ChatView;