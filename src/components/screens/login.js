import React, { Component } from 'react';
import {
  AppRegistry,
  TouchableOpacity,
  Text,
  Button,
  View, StyleSheet, TextInput
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';
import {userLogin} from "../../service";

export class Login extends Component {

  render() {
    return (
        <View>


            <TextInput/>

            <Button large onPress={ () => this.onLoginPress()} title="输入昵称，开始聊天"/>

        </View>
        
    );
  }

  //登录点击事件
  onLoginPress() {
    userLogin("周杰伦").then((resp)=>{
      console.log("====>登录返回",resp);
    }).catch(e=>{
      console.log(e);
    });

    this.props.dispatch(appActions.login());
  }
}

const styles = StyleSheet.create({

});


export default connect()(Login);