/**
 * @flow
 */
import { Navigation } from 'react-native-navigation';
import Login from './Login';
import HomeTab from './HomeTab';
import SessionTab from './SessionTab';
import ChatView from "./ChatView";


export default (store, Provider) =>  {
	Navigation.registerComponent('Login', () => Login, store, Provider);
	Navigation.registerComponent('HomeTab', () => HomeTab, store, Provider);
	Navigation.registerComponent('SessionTab', () => SessionTab, store, Provider);
  Navigation.registerComponent('ChatView', () => ChatView, store, Provider);
}