import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

//Screens
import LoginScreen from './LoginScreen';
import ForgotPassword from './ForgotPassword/index';
import VerifyEmail from './VerifyEmail/index';
import SignUp from './SignUp/index';
import CreateProfile from './CreateProfile/index';
import ResetPassword from './ResetPassword/index';

/** Auth Stack of the app */
export default AuthStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="LoginScreen">
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="CreateProfile" component={CreateProfile} />
    <Stack.Screen name="ResetPassword" component={ResetPassword} />
  </Stack.Navigator>
);
