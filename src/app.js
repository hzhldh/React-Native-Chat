import React, {Component} from 'react';
import {applyMiddleware, combineReducers, createStore} from "redux";

import {Provider} from "react-redux";
import {Navigation} from 'react-native-navigation';
import registerScreens from './components/screens/screens.js';
import reducers from "./reducers/index";
import * as appActions from "./actions/index";
import thunk from "redux-thunk";
import logger from "redux-logger";
import SessionTab from "./components/screens/SessionTab";

//chrome开发环境开启网络调试
if(__DEV__ && window&&window.navigator&&!!window.navigator.userAgent){
  global.XMLHttpRequest = global.originalXMLHttpRequest ?
    global.originalXMLHttpRequest :
    global.XMLHttpRequest;
  global.FormData = global.originalFormData ?
    global.originalFormData :
    global.FormData;
}


const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

registerScreens(store, Provider);

export default class App extends Component {

  constructor(props) {
    super(props);
    store.subscribe(this.onStoreUpdate.bind(this));
    store.dispatch(appActions.appInitialized());
  }

  onStoreUpdate() {
    let {root} = store.getState().root;
    if (this.currentRoot != root) {
      this.currentRoot = root;
      this.startApp(root);
    }
  }

  startApp(root) {
    switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'Login', // unique ID registered with Navigation.registerScreen
            title: '登录', // title of the screen as appears in the nav bar (optional)
            navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
            navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
          },
        });
        return;

      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: '好友',
              screen: 'HomeTab',
              icon: require('./img/checkmark.png'),
              selectedIcon: require('./img/checkmark.png'),
              title: '好友列表',
              overrideBackPress: false,
              navigatorStyle: {}
            },

            {
              label: '会话',
              screen: 'SessionTab',
              icon: require('./img/checkmark.png'),
              selectedIcon: require('./img/checkmark.png'),
              title: '会话列表',
              navigatorStyle: {}
            }

          ],
        });
        return;

      default:
        console.log("Not Root Found");
    }
  }
}
