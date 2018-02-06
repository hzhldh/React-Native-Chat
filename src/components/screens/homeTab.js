import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as  appActions from '../../actions/index';

class Hometab extends Component {

  componentDidMount(){
    const {now}=this.props;
    if(now){
      console.log("===========>",now);
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={styles.item}><Text onPress={()=>{
            this.props.navigator.showModal({
              screen: "ChatView", // unique ID registered with Navigation.registerScreen
              title: "关羽", // title of the screen as appears in the nav bar (optional)
              passProps: {}, // simple serializable object that will pass as props to the modal (optional)
              navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
              animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
            });
          }}>关羽</Text></View>
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
    now:state
  };
};

export default connect(mapStateToProps)(Hometab);

