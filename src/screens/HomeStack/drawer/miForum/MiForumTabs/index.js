/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from './styles';
import Header from '../../../../../components/Header';
import Colors from '../../../../../utils/colors';
import Icons from '../../../../../assets/icons';
import Images from '../../../../../assets/images';

import Home from '../MiForumHome';
import Members from '../MiForumMembers';
import Forum from '../Forum';
import Photos from '../Photos';

function componentName(props) {
  const [tab, setTab] = useState(0);
  const switchTab = () => {
    switch (tab) {
      case 0:
        return <Home />;
      case 1:
        return <Members />;
      case 2:
        return <Forum />;
      case 3:
        return <Photos />;
      default:
        break;
    }
  };
  return (
    <View style={styles.mainContainer}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={props.route.params.name}
      />
      <View style={styles.profileImageWrapper}>
        <Image style={styles.profileImage} source={Images.mainProfile} />
      </View>
      <View style={styles.componentContainer}>
        <View style={styles.tabWrapper}>
          <Text
            onPress={() => setTab(0)}
            style={[
              styles.tab,
              tab === 0
                ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                : {backgroundColor: Colors.transparent},
            ]}>
            Home
          </Text>
          <Text
            onPress={() => setTab(1)}
            style={[
              styles.tab,
              tab === 1
                ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                : {backgroundColor: Colors.transparent},
            ]}>
            Members
          </Text>
          <Text
            onPress={() => setTab(2)}
            style={[
              styles.tab,
              tab === 2
                ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                : {backgroundColor: Colors.transparent},
            ]}>
            Forum
          </Text>
          {/* <Text
            onPress={() => setTab(3)}
            style={[
              styles.tab,
              tab === 3
                ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                : {backgroundColor: Colors.transparent},
            ]}>
            Photos
          </Text> */}
        </View>
        {switchTab()}
      </View>
    </View>
  );
}
export default componentName;
