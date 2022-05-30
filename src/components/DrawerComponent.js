import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Images from './../assets/images';
import Icons from './../assets/icons';
import DrawerItem from './DrawerItem';
import { ScaledSheet } from 'react-native-size-matters';
import { BlurView } from '@react-native-community/blur';
import { useIsDrawerOpen } from '@react-navigation/drawer';
import Preference from 'react-native-preference';
import { img_BASE_URL, BASE_URL } from '../api/config';
import SimpleToast from 'react-native-simple-toast';
import axios from 'axios'
import { client } from '../api/config'



const logoutApi = () => {
  axios.post(`${BASE_URL}/logout`, null,
    {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${Preference.get('token')}`,
      }
    }
  ).
    then(response => {
      SimpleToast.show('Loggod Out')
      console.log(response.data.message)
    }).
    catch(err => { console.log('drawer logout         ', err) })
}




const DrawerComponent = ({ navigation }) => {
  const [options, setOptions] = useState(false)
  const [name, setName] = useState('')
  const showBlur = useIsDrawerOpen();
  client.get('/profile', {
    headers: {
      'Authorization': `Bearer ${Preference.get('token')}`
    }
  })
    .then(response => {
      if (Preference.get('name') && Preference.get('name') != null) {
        let stringArray = response.data.data.User.name.split(/(\s+)/);
        setName(stringArray[0])
      }
      else {
        // console.log('name', response.data.data.name)
        Preference.set('name', response.data.data.User.name)
      }
      if (response.data.data.User.image != null) {
        // console.log('image', img_BASE_URL + response.data.data.image)
        Preference.set('image', img_BASE_URL + response.data.data.User.image)
        Preference.set('image_without_baseURL', response.data.data.User.image)
      }

    })
    .catch(error => console.log('drawer components ', error))


  return (
    <View style={{ flex: 1 }}>
      {showBlur && (
        <BlurView
          style={Styles.blurStyle}
          blurType={'light'}
          blurAmount={90}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <View style={Styles.headerView}>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyProfile');
              console.log(Preference.get('image'))
            }}
            style={Styles.memberView}>
            <View style={Styles.img}><Image style={{ width: '100%', height: '100%', overflow: 'hidden', borderWidth: 1, }} source={Preference.get('image') == null ? Images.palceHolder : { uri: Preference.get('image') }} /></View>
            <View style={Styles.nameView}>
              <Text style={Styles.name}>{Preference.get('name') && name}</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>{'View my profile'}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}>
          <View style={Styles.drawerContainer}>
            <DrawerItem
              title={'Home'}
              image={Icons.home}
              onPress={() => {
                navigation.navigate('HomeScreen');
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setOptions(!options)
              }}
              style={{ flexDirection: 'row', }}>
              <DrawerItem
                title={'MI Services'}
                image={Icons.mi_services}
                options={options}
              />
            </TouchableOpacity>
            {
              options ?
                <DrawerItem
                  title={'Coaches And Mentors'}
                  onPress={() => {
                    navigation.navigate('Coaches_Mentors')
                  }} />
                : null
            }
            {
              options ?
                <DrawerItem
                  title={'Consultants And Trainers'}
                  onPress={() => {
                    navigation.navigate('Consultancy_Training')
                  }} />
                : null
            }
            {
              options ?
                <DrawerItem
                  title={'Branding Services'}
                  onPress={() => {
                    navigation.navigate('Branding_Services')
                  }} />
                : null
            }
            {/* {
              options ?
                <DrawerItem
                  title={'Legal Services'}
                  onPress={() => {
                    navigation.navigate('Legal_Services')
                  }} />
                : null
            } */}
            <DrawerItem
              title={'Friend Requests'}
              options={false}
              image={Icons.members}
              onPress={() => {
                navigation.navigate('FriendRequests');
              }}
            />
            <DrawerItem
              title={'Members'}
              options={false}
              image={Icons.members}
              onPress={() => {
                navigation.navigate('Members');
              }}
            />
            <DrawerItem
              title={'MI Forum'}
              image={Icons.mi_forum}
              onPress={() => {
                navigation.navigate('MiForum');
              }}
            />
            <DrawerItem
              title={'Events'}
              image={Icons.events}
              onPress={() => {
                navigation.navigate('Events');
              }}
            />
            {/* <DrawerItem
              title={'My Profile'}
              image={Icons.my_profile}
              onPress={() => {
                navigation.navigate('MyProfile');
              }}
            /> */}
            <DrawerItem
              title={'Change Password'}
              image={Icons.confirm_password}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}
            />
            <DrawerItem
              title={'Shop'}
              image={Icons.shop}
              onPress={() => {
                navigation.navigate('Shop');
              }}
            />
            <View style={{ flex: 1 }} />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            logoutApi();
            Preference.clear();
            navigation.reset({ index: 0, routes: [{ name: 'AuthStack' }] });

          }}
          style={Styles.appButtonContainer}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Image
              source={Icons.logout}
              style={{ width: 11, height: 11, marginEnd: 10 }}
            />
            <Text style={Styles.appButtonText}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const Styles = ScaledSheet.create({
  drawerContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '20@s',

  },
  headerView: { height: '140@vs', justifyContent: 'center' },
  memberView: {
    flexDirection: 'row',
    marginTop: '15@vs'
  },
  img: {
    width: '60@vs',
    height: '60@vs',
    marginLeft: '20@s',
    resizeMode: 'contain',
    borderRadius: '80@vs',
    overflow: 'hidden',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },
  name: {
    fontWeight: 'bold',
    fontSize: '17@ms',
  },
  nameView: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginStart: '15@s',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#b0bcbc',
    borderRadius: 7,
    paddingVertical: 8,
    marginBottom: '6%',
    marginHorizontal: '7%',
  },
  appButtonText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingBottom: 3,
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
export default DrawerComponent;
