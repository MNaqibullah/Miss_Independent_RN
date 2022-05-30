import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Picker } from 'native-base';
import Images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import SeeMore from '../../../../components/Seemore';
import styles from './styles';
import Header from '../../../../components/Header';
import FloatingLabelInputField from '../../../../components/FloatingLabelInputField';
// import CheckBox from '../../../../components/CheckBox';
import { client, img_BASE_URL } from '../../../../api/config';
import { ListItem, CheckBox, Body, Right, List } from 'native-base';
import Preference from 'react-native-preference';
import colors from '../../../../utils/colors';


const Profile = ({ navigation }) => {
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [business, setBusiness] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [memberShip, setMembership] = useState('');
  const [memberShipId, setMembershipId] = useState('');
  const [fbLink, setFbLink] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instaLink, setInstaLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [webLink, setwebLink] = useState('');
  useEffect(() => {
    dataApi();
  }, []);
  const dataApi = () => {
    console.log(Preference.get('token'))
    client.get('/profile', {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        console.log(response.data.data)
        setName(response.data.data.User.name)
        setBusinessName(response.data.data.User.business_name)
        setBusiness(response.data.data.User.business_email)
        setMembership(response.data.data.User.user_role)
        setMembershipId(response.data.data.User.role_id)
        setAboutMe(response.data.data.User.about_me)
        setFbLink(response.data.data.User?.social_link_facebook ? response.data.data.User.social_link_facebook : '')
        setTiktokLink(response.data.data.User.social_link_tiktok ? response.data.data.User.social_link_tiktok : '')
        setTwitterLink(response.data.data.User.social_link_twitter ? response.data.data.User.social_link_twitter : '')
        setInstaLink(response.data.data.User.social_link_instagram ? response.data.data.User.social_link_instagram : '')
        setYoutubeLink(response.data.data.User.social_link_youtube ? response.data.data.User.social_link_youtube : '')
        setwebLink(response.data.data.User.website_link ? response.data.data.User.website_link : '')

        setPhoto(response.data.data.User.image)
      })
      .catch(error => console.log('error    ', error))
  }//dataApi
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() =>navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        name={'My Profile'}
      />
      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <View style={styles.profileWrapper}>
              <Image style={styles.profileImg} source={photo ? { uri: img_BASE_URL + photo } : Images.palceHolder} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginVertical: 4 }}>
            {fbLink && name != '' ? (
            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`fb://facewebmodal/f?href=https://www.facebook.com/${fbLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!fbLink ? null : Icons.facebookIcon} />
            </TouchableOpacity>
            ) : (null)}
            {twitterLink && name != '' ? (
            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`https://www.twitter.com/${twitterLink}`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!twitterLink ? null : Icons.twitterIcon } />
            </TouchableOpacity>
            ) : (null)}
            {instaLink && name != '' ? (
            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`http://instagram.com/${instaLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!instaLink ? null : Icons.instagramIcon} />
            </TouchableOpacity>
            ) : (null)}
            {youtubeLink && name != '' ? (
            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`https://www.youtube.com/channel/${youtubeLink}`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!youtubeLink ? null : Icons.youtubeIcon} />   
            </TouchableOpacity>
            ) : (null)}
            {tiktokLink && name != '' ? (
            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`http://www.tiktok.com/@${tiktokLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!tiktokLink ? null :Icons.tiktokIcon} />
            </TouchableOpacity>
            ) : (null)}
            {webLink && name != '' ? (

            <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`https://${webLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!webLink ? null: Icons.webIcon} />
            </TouchableOpacity>
            ) : (null)}
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <ListItem style={{ justifyContent: 'space-between', }}>
            <Text style={[styles.heading, { marginRight: 15 }]}>Name</Text>
            {/* <Right> */}
            <Text style={[styles.heading, { fontWeight: 'normal' }]}>
              {name}
            </Text>
            {/* </Right> */}
          </ListItem>
          <ListItem style={{ justifyContent: 'space-between', }}>
            <Text style={[styles.heading, { marginRight: 15 }]}>Business Name</Text>
            <Text style={[styles.heading, { fontWeight: 'normal'}]}>
              {businessName}
            </Text>

          </ListItem>
          <ListItem style={{ justifyContent: 'space-between', }}>
            <Text style={[styles.heading, { marginRight: 15,}]}>Business Email</Text>

            <Text style={[styles.heading, { fontWeight: 'normal',width:'40%' }]}>
              {business}
            </Text>
          </ListItem>
          <ListItem>
            <View>
              <Text style={styles.heading}>About me</Text>
              <SeeMore
                styles={styles.articletDes}
                styles2={[styles.articletDes, { color: '#24bdaf' }]}
                item={aboutMe ? aboutMe : 'Not Set'} />
            </View>
          </ListItem>
          <ListItem style={{ justifyContent: 'space-between', marginBottom: 60 }}>
            <Text style={styles.heading}>MemberShip Category</Text>
            <Text style={{ textTransform: 'capitalize' }}
            >{memberShip}</Text>

          </ListItem>
          {/* <ListItem style={{ borderBottomWidth: 0 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heading}>Social Links</Text>
              <ListItem style={{ justifyContent: 'space-between', }}>
                <Text style={styles.heading}>Facebook</Text>
                <Text style={[styles.links, { marginTop: 5 }]}>{fbLink ? fbLink : 'Not Set'}</Text>
              </ListItem>
              <ListItem style={{ justifyContent: 'space-between', }}>
                <Text style={styles.heading}>Twitter</Text>
                <Text style={[styles.links, { marginTop: 5 }]}>{twitterLink ? twitterLink : 'Not Set'}</Text>
              </ListItem>
              <ListItem style={{ justifyContent: 'space-between', }}>
                <Text style={styles.heading}>Instagram</Text>
                <Text style={[styles.links, { marginTop: 5 }]}>{instaLink ? instaLink : 'Not Set'}</Text>
              </ListItem>
              <ListItem style={{ justifyContent: 'space-between', }}>
                <Text style={styles.heading}>Youtube</Text>
                <Text style={[styles.links, { marginTop: 5 }]}>{youtubeLink ? youtubeLink : 'Not Set'}</Text>
              </ListItem>

            </View>
          </ListItem> */}
          {/* <View style={{ flex: 1 }} /> */}
        </ScrollView>
        {!name &&
          <View style={{ position: 'absolute', top: 0, bottom: 0,right:0,left:0,justifyContent:'center',alignItems:'center', backgroundColor: colors.lightWhite,opacity:0.8 }}>
            <ActivityIndicator size="large" color={colors.cadetBlue} />
          </View>
        }
        <TouchableOpacity
          onPress={() => {
            console.log('membership_id', memberShipId)
            if (name != '') {
              navigation.navigate('editProfile', { name, businessName, business, aboutMe, memberShip, fbLink, memberShipId, tiktokLink, twitterLink, instaLink, youtubeLink,webLink,photo })
            }
          }}
          style={styles.btnSave}>
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
