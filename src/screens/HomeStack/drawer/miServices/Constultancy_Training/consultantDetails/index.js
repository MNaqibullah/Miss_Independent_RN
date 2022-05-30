import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import Icons from '../../../../../../assets/icons';
import Header from '../../../../../../components/Header';
import Colors from '../../../../../../utils/colors';
import placeholderImage from './../../../../../../assets/images/index';


const home = (props) => {
  const data = props.route.params
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Consulting and training'}
      />
      <View style={styles.forum}>
        <View>
          <View style={styles.imgContainer}>
            <Image
              source={data.image == null ? placeholderImage.palceHolder : { uri: data.image }}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
              }}
            />
            <Image style={{ width: 25, height: 25, position: 'absolute', bottom: 20, right: 5 }}
              source={placeholderImage.service} />
          </View>


        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.members}>{data.role_id == 6 ? 'Consultant/Trainer' : null}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{ marginTop: 3, marginEnd: 2, width: 13, height: 13 }}
              source={Icons.locationIcon}
            />
            <Text style={styles.location}>
              {data.based_in}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.description}>
        <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: 'center', }}>
        {data.social_link_facebook ? (
          <TouchableOpacity
            onPress={() => {
                Linking.openURL(`fb://facewebmodal/f?href=https://www.facebook.com/${data.social_link_facebook}/`)
            }}
            style={{ marginHorizontal: 4 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.social_link_facebook ? null : Icons.facebookIcon} />
          </TouchableOpacity>
          ):(null)}
          {data.social_link_twitter ? (
          <TouchableOpacity
            onPress={() => {
                Linking.openURL(`https://www.twitter.com/${data.social_link_twitter}`)
            }}
            style={{ marginHorizontal: 4 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.social_link_twitter ? null : Icons.twitterIcon} />
          </TouchableOpacity>
          ) : (null)}
          {data.social_link_instagram ? (
          <TouchableOpacity
            onPress={() => {
                Linking.openURL(`http://instagram.com/${data.social_link_instagram}/`)
            }}
            style={{ marginHorizontal: 4 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.social_link_instagram ? null : Icons.instagramIcon} />
          </TouchableOpacity>
          ) : (null)}
          {data.social_link_youtube ? (
          <TouchableOpacity
            onPress={() => {
                Linking.openURL(`https://www.youtube.com/channel/${data.social_link_youtube}`)
            }}
            style={{ marginHorizontal: 4 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.social_link_youtube ? null : Icons.youtubeIcon} />
          </TouchableOpacity>
          ) : (null)}
          {data.social_link_tiktok ? (
          <TouchableOpacity
            onPress={() => {
                Linking.openURL(`http://www.tiktok.com/@${data.tiktokLink}/`)
            }}
            style={{ marginHorizontal: 4 }}>
            <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.social_link_tiktok ? null : Icons.tiktokIcon} />
          </TouchableOpacity>
          ) : (null)}
          {data.website_link ? (
          <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`https://${data.webLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!data.webLink ? null: Icons.webIcon} />
            </TouchableOpacity>
          ) : (null)}
        </View>
        {data.service_provided_to != null &&
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, paddingVertical: 5, marginBottom: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>
              {'Service Provided To : '}
            </Text><Text>
              {data.service_provided_to}
            </Text>
          </View>}
        <Text>
          {data.about_me}
        </Text>
      </ScrollView>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('webview', { uri: 'https://form.jotform.com/211664667433460' })}
        style={styles.btnSave}>
        <Text style={styles.btnText}>Apply For Services</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  forum: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginTop: 30,
  },
  imgContainer: {
    width: 130,
    height: 130,
    overflow: 'hidden',
    marginEnd: 26,
    borderRadius: 130,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 19,
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  members: {
    marginStart: 3,
    fontSize: 14
  },
  location: {
    fontSize: 14,
    textTransform:'capitalize'
  },
  description: {
    marginTop: 40,
    marginHorizontal: 14,
  },
  btnSave: {
    backgroundColor: Colors.themeGrey,
    padding: 14,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
    marginHorizontal: 14,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
  },
});
export default home;
