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

export default class SessionTab extends Component {
  render() {
    return (
      <View>
        <ScrollView>
          <TouchableWithoutFeedback onPress={()=>{
            // this.props.navigator.push({
            //   screen: 'ChatView',
            //   title: '关羽',
            //   passProps:{chatUser:{id:1,nickname:"关羽"}},
            // });

            this.props.navigator.showModal({
              screen: "ChatView", // unique ID registered with Navigation.registerScreen
              title: "关羽", // title of the screen as appears in the nav bar (optional)
              passProps: {}, // simple serializable object that will pass as props to the modal (optional)
              navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });


          }}>
            <View style={styles.item}>
              <Avatar nickname={"关羽"}/>
              <View style={styles.content}>
                <Text style={styles.nickname}>关羽</Text>
                <Text>你好啊</Text>
              </View>
              <View style={styles.rightView}>
                <Text>22:35</Text>
                <View style={styles.unRead}>
                  <Text style={styles.unReadText}>5</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
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
