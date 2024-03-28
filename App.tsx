import React from 'react';
import { View} from 'react-native';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';




import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Wheather from './src/screens/Wheather';
import WeatherResult from './src/screens/WeatherResult';


if (!firebase.apps.length) {
  firebase.initializeApp({
    
    apiKey: "AIzaSyBbrS6jqr9XAElRgmXJp_IXS07Mb7sRQ6g",
authDomain: "weather-ae094.firebaseapp.com",
projectId: "weather-ae094",
storageBucket: "weather-ae094.appspot.com",
messagingSenderId: "1064563631",
appId: "1:1064563631:web:b30a02e78f2c4740b9355a",
measurementId: "G-HY84DJZK0X",
databaseURL:"https://weather-ae094.firebaseio.com"
  });
}
const Stack = createNativeStackNavigator();
const App = () => {

  

  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown : false
    }}
  //  initialRouteName='Login'
    >
      {/* <Stack.Screen name='Login' component={Login} /> */}

      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='SignUp' component={SignUp} />
      <Stack.Screen name='Wheather' component={Wheather} />
      <Stack.Screen name='WeatherResult' component={WeatherResult} />

      





    </Stack.Navigator>
  </NavigationContainer>
  // <WeatherResult/>
    );

  };
  export default App;

