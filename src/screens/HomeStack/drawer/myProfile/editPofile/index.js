import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Picker } from 'native-base';
import Images from '../../../../../assets/images';
import Icons from '../../../../../assets/icons';
import styles from './styles';
import Header from '../../../../../components/Header';
import FloatingLabelInputField from '../../../../../components/FloatingLabelInputField';
// import CheckBox from '../../../../components/CheckBox';
import { client, img_BASE_URL } from '../../../../../api/config';
import { ListItem, CheckBox, Body } from 'native-base';
import { launchImageLibrary, } from "react-native-image-picker";
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';
import { Platform } from "react-native";
import { Button } from "react-native-elements";
import moment from 'moment'


const Profile = (props) => {
  const { name: nameProp, businessName: businessNameProp, business: businessProp, aboutMe: aboutMeProp, memberShip: memberShipProp, memberShipId: memberShipIdProp, fbLink: fbLinkProp, tiktokLink: tiktokLinkProp, twitterLink: twitterLinkProp, instaLink: instaLinkProp, youtubeLink: youtubeLinkProp,webLink:webLinkProp, photo: photoProp } = props.route.params;
  console.log('iddd',memberShipIdProp)
  const [photo, setPhoto] = useState('');
  const [updated, setUpdated] = useState(false)
  const [name, setName] = useState(nameProp);
  const [businessName, setBusinessName] = useState(businessNameProp);
  const [realName, setRealName] = useState('nameProp');
  const [business, setBusiness] = useState(businessProp);
  const [aboutMe, setAboutMe] = useState(aboutMeProp);
  // const [memberShip, setMembership] = useState(memberShipProp);
  const [memberShip, setMembership] = useState(memberShipIdProp)
  const [list, setList] = useState('');
  const [fbLink, setFbLink] = useState(fbLinkProp);
  const [tiktokLink, setTiktokLink] = useState(tiktokLinkProp);
  const [twitterLink, setTwitterLink] = useState(twitterLinkProp);
  const [instaLink, setInstaLink] = useState(instaLinkProp);
  const [youtubeLink, setYoutubeLink] = useState(youtubeLinkProp);
  const [webLink,setwebLink] = useState(webLinkProp);
  const [loading, setLoading] = useState(false);
  const [isDisable, setDisable] = useState(false);
  //////////////////////////////////////////////////////////


  const profileApi = () => {
    setLoading(true)
    let bodyFormData = new FormData();
    bodyFormData.append('name', name);
    bodyFormData.append('business_name', businessName);
    bodyFormData.append('business_email', business);
    bodyFormData.append('about_me', aboutMe);
    bodyFormData.append('role_id', memberShip); 
    bodyFormData.append('social_link_facebook', fbLink != '' ? fbLink.toLowerCase() : fbLink);
    bodyFormData.append('social_link_twitter', twitterLink != '' ? twitterLink.toLowerCase() : twitterLink);
    bodyFormData.append('social_link_instagram', instaLink != '' ? instaLink.toLowerCase() : instaLink);
    bodyFormData.append('social_link_youtube', youtubeLink);
    bodyFormData.append('social_link_tiktok', tiktokLink != '' ? tiktokLink.toLowerCase() : tiktokLink);
    bodyFormData.append('website_link',webLink);


    // console.log(bodyFormData);
    if (updated)
      bodyFormData.append('image', photo)
    client.post('/profile/update', bodyFormData, {
      headers: {
        "Authorization": `Bearer ${Preference.get('token')}`,
      }
    })
      .then(response => {
        setLoading(false)
        if (response.data.status === "Success") {
          Preference.set('name', name)
          SimpleToast.show('Profile Updated Successfully');
          props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomeStack' }],
          })
        }
        else {
          SimpleToast.show(response.data);
        }
      })
      .catch(err => {
        setLoading(false)
        console.log('edit profile err         ', err)
      })
  }// client.post
  //////////////////////////////////////////////////////////////////

  const openPicker = () => {
    const pickerOptions = {
      quality: 0.5,
    };
    launchImageLibrary(pickerOptions, (response) => {
      console.log(response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("Error: ", response.errorMessage);
      } else {
        const source = {
          uri:
            Platform.OS === 'ios'
              ? 'File:///' + response.uri.replace("file://", "")
              : response.uri,
          name: moment().format('x') + '.jpeg',
          type: 'image/jpeg',
        };
        console.log("uploaded", photo);
        setPhoto(source)
        setUpdated(true)
      }
    });
  }



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Edit profile'}
        {...props}
      />

      <View style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <View style={styles.profileWrapper}>
              <Image style={styles.profileImg} source={photoProp ? updated ? photo : { uri: img_BASE_URL + photoProp } : Images.palceHolder} />
            </View>
            <TouchableOpacity
              onPress={openPicker}
              style={styles.cameraIcon}>
              <Image style={styles.cameraPosition} source={Icons.cameraIcon} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView

          showsHorizontalScrollIndicator={false}>
          <FloatingLabelInputField
            // hideLabel
            placeholder={'Name '}
            // isRequired
            value={name}
            onChangeText={(text) => setName(text)}
            inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
          />
          <FloatingLabelInputField
            // hideLabel
            placeholder={'Business Name'}
            value={businessName}
            onChangeText={(text) => setBusinessName(text)}
            inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
          />
          <FloatingLabelInputField
            // hideLabel
            placeholder={'Business Email'}
            value={business}
            onChangeText={(text) => { setBusiness(text) }}
            inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
          />
          <FloatingLabelInputField
            // hideLabel
            placeholder={'About Me'}
            isMultiline={true}
            multiline={true}
            value={aboutMe}
            onChangeText={(text) => { setAboutMe(text) }}
            inputStyle={{ flex: 1, textAlignVertical: 'top', height: '100%' }}
            inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", minHeight: 100 }}
          />
          {/* <View style={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", borderColor: 'gray', height: 50, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
            <Text style={{ fontWeight: 'bold' }}>Role:</Text>
            <Text style={{ textTransform: 'capitalize', marginStart: 10 }}>{memberShip}</Text>
          </View> */}

          <View style={{ borderRadius: 10, marginVertical: 10, borderWidth: 1, borderColor: 'gray', }}>
            <Picker
              onValueChange={(value) => {
                setMembership(value);
              }}
              selectedValue={memberShip}
              // placeholder={'Membership Category'}
            >
              {/* <Picker.Item style={{ color: 'grey' }} label="Membership Category *" value="default" /> */}
              <Picker.Item label="Tulip" value="2" />
              <Picker.Item label="Orchid" value="3" />
              <Picker.Item label="Dhalia" value="4" />
              <Picker.Item label="Coach/Mentor" value="5" />
              <Picker.Item label="Consultant/Trainer" value="6" />
            </Picker>
          </View>
        
          <Text style={styles.heading}>Social Links</Text>
          <TextInput
            placeholder={'Enter facebook username here'}
            value={fbLink}
            onChangeText={(text) => { setFbLink(text) }}
            style={styles.smallInput}

          />
          <TextInput
            placeholder={'Enter tiktok username here'}
            value={tiktokLink}
            onChangeText={(text) => { setTiktokLink(text) }}
            style={styles.smallInput}

          />
          <TextInput
            value={twitterLink}
            onChangeText={(text) => { setTwitterLink(text) }}
            style={styles.smallInput}
            placeholder={'Enter twitter username here'}
          />
          <TextInput
            value={instaLink}
            onChangeText={(text) => { setInstaLink(text) }}
            style={styles.smallInput}
            placeholder={'Enter instagram username here'}
          />
          <TextInput
            value={youtubeLink}
            onChangeText={(text) => { setYoutubeLink(text) }}
            placeholder={'Enter youtube channel id  here'}
            style={styles.smallInput}
          />
          <TextInput
            value={webLink}
            onChangeText={(text) => { setwebLink(text) }}
            placeholder={'Enter website link  here'}
            style={styles.smallInput}
          />

          <Button
            title="Save"
            onPress={profileApi}
            buttonStyle={{
              height: 50,
              width: '100%',
              alignSelf: 'center',
              backgroundColor: '#b0bcbc',
              borderRadius: 10,
            }}
            containerStyle={{ marginTop: '4%' }}
            loading={loading ? true : false}
          />
          <Text style={{ height: '15%' }}></Text>
          <Text style={{ height: '15%' }}></Text>
          <Text style={{ height: '15%' }}></Text>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Profile;
