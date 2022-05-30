import React, { useEffect, useState } from 'react';
import { View, Image, SafeAreaView, Linking } from 'react-native';
import { styles } from './Styles';
import Preference from 'react-native-preference';
import { client, img_BASE_URL } from '../../api/config'
import { Platform } from "react-native";

//assets
import Images from './../../assets/images/';
//utils

const Splash = ({ navigation }) => {


  let nextRouteName = 'AuthStack';
  const hassSession = Preference.get('token');
  console.log('hassSession', hassSession, 'name', Preference.get('name'));
  Preference.set('goToLogin', 2)
  if (hassSession && Preference.get('name'))
    nextRouteName = 'HomeStack'
  useEffect(() => {
    if (nextRouteName) {
      const timer = setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: nextRouteName }] });
      }, 3000);
      return () => clearTimeout(timer);
    }//if
    else {
      if (Platform.OS === 'android') {
        Linking.getInitialURL().then((url) => {
          navigate(url);
        });
      } else {
        Linking.addEventListener('url', handleOpenURL); s
      }//else
    }//else
  }, []);

  navigate = (url) => {
    // E
    if (url == null) {
      const timer = setTimeout(() => {
        navigation.reset({ index: 0, routes: [{ name: nextRouteName }] });
      }, 3000);
      return () => clearTimeout(timer);
    }
    else {
      console.log('Url:--', url)
      const { navigate } = navigation;
      const route = url.replace(/.*?:\/\//g, '');
      const id = route.match(/\/([^\/]+)\/?$/)[1];
      const routeName = route.split('/')[0];
      const screenName = route.split('life/')[1];
      const pid = screenName.indexOf('/')
      const screen = screenName.slice(0, pid)
      console.log('routeName:--', id, route, routeName, screen)

      if (routeName == 'app.MI.life') {
        // navigate('PropertyDetailScreen', { itemId: id });
        const timer = setTimeout(() => {
          navigation.reset({ index: 0, routes: [{ name: 'HomeStack' }] });
        }, 3000);
        return () => clearTimeout(timer);
      }
    }//else
  };



  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.splashLogo} style={styles.logoStyle} />
      <Image source={Images.splashBottom} style={styles.imageStyle} />
    </SafeAreaView>
  );
};
export default Splash;
