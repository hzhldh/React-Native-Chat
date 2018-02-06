/**
 * Created by HuangZhiHao on 2018/2/5.
 * @flow
 */
import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

/*
*
*/
class Avatar extends React.Component {
  props:{
    nickname:?String;
    style?:?View.propTypes.style;
  };

  render() {
    const {nickname,style}=this.props;
    let firstName=nickname.substr(0,1);
    return (
      <View style={[styles.container,style]}>
        <Text style={styles.nickname}>{firstName}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:"#999",
    justifyContent:"center",
    alignItems:"center"
  },
  nickname:{
    color:"#fff",
    fontSize:18,
    fontWeight:"900"
  }
});
export default Avatar;