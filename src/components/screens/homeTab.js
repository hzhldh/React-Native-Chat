import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
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
      <View style={styles.container}>
        <Text style={styles.welcome}>
            HOME
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps=state=>{
  return {
    now:state
  };
};

export default connect(mapStateToProps)(Hometab);

