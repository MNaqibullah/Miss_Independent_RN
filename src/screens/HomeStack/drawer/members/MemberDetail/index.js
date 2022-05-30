import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import styles from './style';
import { Right } from 'native-base';
import Icons from '../../../../../assets/icons/';
import CustomInput from "../../../../../components/CustomInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { client } from '../../../../../api/config';
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference'
import { ScrollView } from 'react-native';
const MemberDetail = ({ userID }) => {
  const [profile, setProfile] = useState({});
  const [isFriend, setIsFriend] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total_likes, setTotal_likes] = useState(0)
  const [fbLink, setFbLink] = useState('');
  const [tiktokLink, setTiktokLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instaLink, setInstaLink] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');
  const [webLink,setwebLink] = useState('');
  const [data, setData] = useState([])

  useEffect(() => {
    getMemberDetail()
  }, [])
  const getMemberDetail = async () => {
    setLoading(true)
    let body = new FormData();
    body.append('user_id', userID)
    const res = await client.post('/Profile', body, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      },
    })
    setData([res.data.data])
    const { name, about_me, image, id, business_email, business_name, } = res.data.data.UserProfile;
    setFbLink(res.data.data.UserProfile.social_link_facebook ? res.data.data.UserProfile.social_link_facebook : '')
    setTiktokLink(res.data.data.UserProfile.social_link_tiktok ? res.data.data.UserProfile.social_link_tiktok : '')
    setTwitterLink(res.data.data.UserProfile.social_link_twitter ? res.data.data.UserProfile.social_link_twitter : '')
    setInstaLink(res.data.data.UserProfile.social_link_instagram ? res.data.data.UserProfile.social_link_instagram : '')
    setYoutubeLink(res.data.data.UserProfile.social_link_youtube ? res.data.data.UserProfile.social_link_youtube : '')
    setwebLink(res.data.data.UserProfile.website_link ? res.data.data.UserProfile.website_link : '')

    const { follow_bit, like_bit } = res.data.data
    console.log(res.data.data.isfriend, res.data.data.Request)
    setIsFriend(res.data.data.isfriend == 0 ? false : true)
    setIsRequest(res.data.data.Request == 0 ? false : true)

    setTotal_likes(res.data.data.UserProfile.total_likes)
    setProfile({ business_email, business_name, name, about_me, image, id, isFollow: follow_bit, isLiked: like_bit, isFriend: res.data.data.isfriend })
    //console.log(res.data.data.UserProfile);
    setLoading(false)
  }
  ///////////////////////////////////////////////////////////////////////////////
  const followHandler = (apiPath) => {
    let body = new FormData();
    body.append('follow_by', userID)
    try {
      client.post(apiPath, body, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
      })
      SimpleToast.show(`User ${profile.isFollow == 1 ? 'Unfollowed' : 'Followed'} Successfully`)
      setProfile({ ...profile, isFollow: profile.isFollow == 1 ? 0 : 1 })
    } catch (error) {
      console.log('follow error', error);
      SimpleToast.show('Something went wrong')
    }
  }//followHandler
  //////////////////////////////////////////////////////////////////////////
  const freindRequest = () => {
    setIsRequest(true)
    let body = new FormData();
    body.append('frient_id', userID)
    // console.log(body)
    try {
      client.post('/FriendRequest', body, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
      }).then(response => {
        console.log(response.data)
      })
      SimpleToast.show(`Friend request send`)
    } catch (error) {
      setIsFriend(false)
      console.log('Friend request error', error);
      SimpleToast.show('Something went wrong')
    }
  }//friend request
  //////////////////////////////////////////////////////////////////////////
  const rejectFriendRequest = async () => {
    setIsRequest(false)
    let bodyFormData = new FormData()
    bodyFormData.append('id', userID)
    // console.log(bodyFormData)
    try {
      const response = await client.post('/RejectFriendRequest', bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      })
      SimpleToast.show('Request Rejected')
      console.log('reject', response.data)
    }//try
    catch (error) {
      SimpleToast.show('Network connection unstable')
      console.log('RejectFriendRequest'.JSON.stringify(error))
    }
  }//rejectFriendrequest
  //////////////////////////////////////////////////
  const likeHandler = (apiPath) => {
    let body = new FormData();
    body.append('liked_by', userID)
    try {
      client.post(apiPath, body, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
      })
      // .then(response=>{
      //   console.log(response.data)
      // })
      SimpleToast.show(`User ${profile.isLiked == 1 ? 'Unliked' : 'Liked'} Successfully`)
      setProfile({ ...profile, isLiked: profile.isLiked == 1 ? 0 : 1 })
    } catch (error) {
      console.log('liked error', error);
      SimpleToast.show('Something went wrong')
    }
  }

  return (

    <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, }}>
      {loading ? <ActivityIndicator style={{ paddingTop: 20 }} size={'large'} color='#24BDAF' /> :
        <ScrollView contentContainerStyle={styles.container}>
          <View>
            <View style={{ flexDirection: 'row', marginVertical: 15, justifyContent: 'flex-end', }}>
            {fbLink && data ? (
              <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`fb://facewebmodal/f?href=https://www.facebook.com/${fbLink}/`)
                }}
                style={{ marginHorizontal: 4 }}>
                <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!fbLink ? null : Icons.facebookIcon} />
              </TouchableOpacity>
            ) : (null)}
            {twitterLink && data ? (
              <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`https://www.twitter.com/${twitterLink}`)
                }}
                style={{ marginHorizontal: 4 }}>
                <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!twitterLink ? null : Icons.twitterIcon } />
              </TouchableOpacity>
            ) : (null)}
            {instaLink && data ? (
              <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`http://instagram.com/${instaLink}/`)
                }}
                style={{ marginHorizontal: 4 }}>
                <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!instaLink ? null : Icons.instagramIcon} />
              </TouchableOpacity>
            ) : (null)}
            {youtubeLink && data ? (
              <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`https://www.youtube.com/channel/${youtubeLink}`)
                }}
                style={{ marginHorizontal: 4 }}>
                <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!youtubeLink ? null : Icons.youtubeIcon} />
              </TouchableOpacity>
            ) : (null)}
            {tiktokLink && data ? (
              <TouchableOpacity
                onPress={() => {
                    Linking.openURL(`http://www.tiktok.com/@${tiktokLink}/`)
                }}
                style={{ marginHorizontal: 4 }}>
                <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!tiktokLink ? null : Icons.tiktokIcon} />
              </TouchableOpacity>
            ) : (null)}
            {data.website_link ? (
              <TouchableOpacity
              onPress={() => {
                  Linking.openURL(`https://${webLink}/`)
              }}
              style={{ marginHorizontal: 4 }}>
              <Image style={{ width: 35, height: 35, borderRadius: 35, }} source={!webLink ? null: Icons.webIcon} />
            </TouchableOpacity>
            ) : (null)}
            </View>
            {profile.business_name != null &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {'Business Name : '}
                </Text><Text>
                  {profile.business_name}
                </Text>
              </View>}
            {profile.business_email != null &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>
                  {'Business Email : '}
                </Text><Text>
                  {profile.business_email}
                </Text>
              </View>}
            <Text style={styles.detail}>
              {profile.about_me}
            </Text>
            <View style={styles.icons}>
              <View style={styles.iconsWrapper}>
                {!isFriend && !isRequest
                  ?
                  <TouchableOpacity
                    onPress={() => {
                      freindRequest()

                    }}
                  >
                    <Image style={styles.icon} source={Icons.peopleIcon} />
                  </TouchableOpacity>
                  : isFriend ?
                    <Text>f</Text>
                    : isRequest ?
                      <TouchableOpacity
                        onPress={() => { rejectFriendRequest()}}
                      >
                        <Text>R</Text>
                      </TouchableOpacity>
                      :
                      <TouchableOpacity
                      >
                        <Text>a</Text>
                        {/* <Image style={styles.icon} source={Icons.signalIcon} /> */}
                      </TouchableOpacity>
                }
              </View>

              <View style={styles.iconsWrapper}>
                {profile.isFollow == 0 ?
                  <TouchableOpacity onPress={() => followHandler('/FollowUser')}>
                    <Image style={styles.icon} source={Icons.signalIcon} />

                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => followHandler('/UnFollowUser')}>
                    {/* <Image style={styles.icon} source={Icons.signalIcon} /> */}
                    <Text>a</Text>
                  </TouchableOpacity>}
              </View>

              <View style={styles.iconsWrapper}>
                {profile.isLiked == 0 ?
                  <TouchableOpacity
                    onPress={() => {
                      setTotal_likes(+total_likes + 1)
                      likeHandler('/LikeUser')
                    }}>
                    <View style={[styles.link, { flexDirection: 'row', justifyContent: 'center', }]}>
                      <Image style={styles.icon} source={Icons.unlikedIcon} />
                      <Text style={[styles.likes, { color: 'grey', marginLeft: 8 }]}>{+total_likes < 0 ? +total_likes * -1 : total_likes}</Text>
                    </View>
                  </TouchableOpacity> :
                  <TouchableOpacity onPress={() => {
                    setTotal_likes(+total_likes - 1)
                    likeHandler('/UnLikeUser')
                  }}>
                    <View style={[styles.link, { flexDirection: 'row', justifyContent: 'center' }]}>
                      <Image style={styles.icon} source={Icons.likeIcon} />
                      <Text style={[styles.likes, { marginLeft: 8 }]}>{+total_likes < 0 ? +total_likes * -1 : total_likes}</Text>
                    </View>
                  </TouchableOpacity>}

              </View>
            </View>
          </View>

        </ScrollView>
      }
    </KeyboardAwareScrollView>

  );
}
export default MemberDetail;
