import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Images from '../../../../../assets/images';
import Icons from '../../../../../assets/icons';
import Header from '../../../../../components/Header';
import Styles from './styles';
import { client, img_BASE_URL } from '../../../../../api/config'
import moment from 'moment'
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';
import styles from '../style';





export default function PickerEx(props) {
  const item = props.route.params
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState('')
  const [liked, setLiked] = useState('')
  const [total_likes, setTotal_likes] = useState(0)
  let strDate = moment(data.updated_at).format('MMM DD, YYYY')

  useEffect(() => {
    dataApi();
  }, []);


  const dataApi = () => {
    let bodyFormData = new FormData();
    bodyFormData.append('eventId', item)
    bodyFormData.append('user_id', Preference.get('user_id'))
    client.post('/ShowEvent', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        if (response.data.code = 200) {
          setLiked(response.data.data.fav_bit)
          setTotal_likes(response.data.data.event.total_likes)
          setData(response.data.data.event)
          console.log('else response.data.data')
        }
        else {
          console.log('else', response.data.data)
        }
      })
      .catch(error => {
        console.log('error    ', error)
        SimpleToast.show('Something went wrong!')
        // setLoading(false)
      })
  }
  const favouriteDataApi = (apiPath) => {
    let bodyFormData = new FormData();
    bodyFormData.append('user_id', Preference.get('user_id'))
    bodyFormData.append('event_id', item)
    try {
      client.post(apiPath, bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
      })
      // SimpleToast.show(`Event ${liked == 1 ? 'removed from' : 'add to'} favorited`)
      setLiked(liked == 1 ? 0 : 1)
    } catch (error) {
      console.log('favoite error', error);
      SimpleToast.show('Something went wrong')
    }
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Event Detail'}
      />
      <ScrollView >
        <View style={Styles.container}>
          <View style={Styles.forum}>
            {console.log('liked', liked)}
            <View style={Styles.imgContainer}>
              <Image style={Styles.images} source={{ uri: img_BASE_URL + 'images/events/' + data.image }} />
              <View style={Styles.textContainer}>
                <Text style={Styles.title}>{moment(data.fromdate).format('MMMM D, YYYY, dddd')}</Text>
              </View>
            </View>
            <View style={Styles.linkContainer}>
              {/* <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                  <View style={Styles.link}>
                    <Image style={Styles.images} source={Icons.twitterIcon} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={Styles.link}>
                    <Image style={Styles.images} source={Icons.facebookIcon} />
                  </View>
                </TouchableOpacity>
              </View> */}
              <View>
                {liked == 0 ? <TouchableOpacity onPress={() => {
                  setTotal_likes(+total_likes+1)
                  favouriteDataApi('/MakeEventFav')
                  }}>
                  <View style={[Styles.link, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={[Styles.likes, { color: 'grey' }]}>{+total_likes<0?+total_likes*-1:total_likes}</Text>
                    <Image style={Styles.image1} source={Icons.unlikedIcon} />
                  </View>
                </TouchableOpacity> :
                  <TouchableOpacity onPress={() => {
                    setTotal_likes(+total_likes-1)
                    favouriteDataApi('/MakeEventUnFav')
                    }}>
                    <View style={[Styles.link, { flexDirection: 'row', alignItems: 'center' }]}>
                      <Text style={Styles.likes }>{+total_likes<0?+total_likes*-1:total_likes}</Text>
                      <Image style={Styles.image1} source={Icons.likeIcon} />
                    </View>
                  </TouchableOpacity>
                }
              </View>
            </View>
            <View style={Styles.description}>
              <Text style={{ paddingBottom: 10 }}>
                {data.description}
              </Text>
              <Text style={Styles.creator}>{`${moment(data.fromdate).format('MMM DD, YYYY')}  to  ${moment(data.todate).format('MMM DD, YYYY')}`}</Text>
              <Text style={Styles.creator}>
                Location : {data.location}
              </Text>
              <Text style={Styles.creator}>
                Latest Activity : {strDate}
              </Text>
              <Text style={Styles.creator}>
                {!data.link ? data.link : null}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {loading ?
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#24bdaf" />
        </View>
        : null}
    </SafeAreaView>
  );
}
