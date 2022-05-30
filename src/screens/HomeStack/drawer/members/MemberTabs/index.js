/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState,useEffect} from 'react';
import Colors from '../../../../../utils/colors';
import {Text, View, Image, ScrollView} from 'react-native';
import Images from '../../../../../assets/images/index';
import Icons from '../../../../../assets/icons/index';
import Header from '../../../../../components/Header';
import styles from './style';
import MemberDetail from '../MemberDetail';
import Photos from '../Photos';
import Videos from '../Videos';
import MemberFriends from '../MemberFriends';
import MemberEditorials from '../MemberEditorials';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { img_BASE_URL } from '../../../../../api/config'



function membersDetail({route,navigation}) {
  const {name,id,image,}=route.params;
  useEffect(() => {
    setTab(0)
  }, [name])
  const [tab, setTab] = useState(0);
  const switchTab = () => {
    switch (tab) {
      case 0:
        return <MemberDetail userID={id} />;
      case 1:
        return <Photos uid={id}  />;
      case 2:
        return <Videos uid={id}  />;
      case 3:
        return <MemberEditorials uid={id}  />;
      case 5:
        return <MemberFriends uid={id} navigation={navigation}/>;
      default:
        break;
    }
  };

  return (
    <View style={{flex:1}}>
      
        <Header
          leftIconOnPress={() => navigation.goBack()}
          leftIcon={Icons.backIcon}
          rightIcon={Icons.cartIcon}
          rightIconOnPress={() => navigation.navigate('Cart')}
          name={name}
        />
        
        <View style={styles.profileImageWrapper}>
          <Image style={styles.profileImage} source={image==null ? Images.palceHolder:{ uri: img_BASE_URL + image }} />
        </View>
      
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={styles.container}>
          <View style={styles.tabWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <Text
                onPress={() => setTab(0)}
                style={[
                  styles.tab,
                  tab === 0
                    ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                    : {backgroundColor: Colors.transparent},
                ]}>
                About
              </Text>
              <Text
                onPress={() => setTab(1)}
                style={[
                  styles.tab,
                  tab === 1
                    ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                    : {backgroundColor: Colors.transparent},
                ]}>
                Photos
              </Text>
              <Text
                onPress={() => setTab(2)}
                style={[
                  styles.tab,
                  tab === 2
                    ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                    : {backgroundColor: Colors.transparent},
                ]}>
                Videos
              </Text>
              <Text
                onPress={() => setTab(3)}
                style={[
                  styles.tab,
                  tab === 3
                    ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                    : {backgroundColor: Colors.transparent},
                ]}>
                Editorials
              </Text>
              
              <Text
                onPress={() => setTab(5)}
                style={[
                  styles.tab,
                  tab === 5
                    ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
                    : {backgroundColor: Colors.transparent},
                ]}>
                Friends
              </Text>
            </ScrollView>
          </View>
          {switchTab()}
        </View>
      </View>
      </View>
  );
}

export default membersDetail;
