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
  state:{
    nickname:string
  };

  constructor(){
    super();
    this.state={
      nickname:""
    }
  }

  render() {
    return (
        <View>

          <TextInput onChangeText={(val)=>{this.setState({nickname:val})}}/>

          <Button large onPress={ () => this.onLoginPress()} title="输入昵称，开始聊天"/>

        </View>
        
    );
  }

  //登录点击事件
  onLoginPress() {
    alert("1");
    // const {nickname}=this.state;
    // if(!nickname) return;

    userLogin("张三").then((resp)=>{
      //登录成功
      this.props.dispatch(appActions.login(resp));
    }).catch(e=>{
      alert(e);
      console.log(e);
    });


  }
}

const styles = StyleSheet.create({

});


export default connect()(Login);