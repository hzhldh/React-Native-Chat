/**
 * @flow
 */
import { Navigation } from 'react-native-navigation';
import Login from './login';
import HomeTab from './homeTab';
import SessionTab from './sessionTab';


export default (store, Provider) =>  {
	Navigation.registerComponent('ReactNativeReduxExample.Login', () => Login, store, Provider);
	Navigation.registerComponent('ReactNativeReduxExample.HomeTab', () => HomeTab, store, Provider);
	Navigation.registerComponent('ReactNativeReduxExample.SessionTab', () => SessionTab, store, Provider);
}