import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Right, Picker } from 'native-base';
import Images from './../../../../../assets/images';
import { client, img_BASE_URL } from '../../../../../api/config';
import Preference from 'react-native-preference'
import Colors from '../../../../../utils/colors';

import styles from './style';

const componentName = (props) => {
  console.log(props)
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoader(true)
    getAllFriends(1)
    setRefreshing(false)
  }, [refreshing]);
  const getAllFriends = async (page) => {

    try {
      let bodyFormData = new FormData()
      bodyFormData.append('friend_id', props.uid)
      setLoader(true)
      const res = await client.post(`/ListofFriends?page?${page}`, bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      })
      console.log('res', JSON.stringify(res.data.data))
      if (res.data.data.current_page != 1)
        setData([...data, ...res.data.data.Friends.data])
      else
        setData(res.data.data.data)
      setLoader(false)
      setTotalPages(res.data.data.last_page);
      //console.log('response',res.data.data.last_page);
    } catch (error) {
      setLoader(false)
      console.log('error in all friends', error);
    }
  }//getAllFriends
  /////////////////////////////////////////////////////////////
  const refresh = () => {
    setRefreshing(true);
    setData([])
  } //refresh


  return (
    <FlatList
      data={data}
      onEndReachedThreshold={0.3}
      onEndReached={() => {
        let val = pageCounter + 1
        if (val <= totalPages) {
          console.log(val, totalPages)
          setLoading(true)
          setPageCounter(val)
          getAllFriends(val)
        }//nested if
        else {
          // SimpleToast.show('Nothing to show more')
        }//nested else
      }}
      refreshing={refreshing}
      onRefresh={refresh}
      ListFooterComponent={() => loader && <ActivityIndicator size="large" color={Colors.cadetBlue} />
      }
      ListEmptyComponent={(item) => {
        if (!loader) {
          return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 200 }}>
              <Text
                style={styles.emptyListStyle}>
                No Friends to show
              </Text>
            </View>
          )
        }
        else
          return null
      }}
      keyExtractor={(item, i) => item + i}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              props.navigation.navigate('MemberTabs', { name: item.user.name, id: item.user.id, image: item.user.image,})
            }>
            <View style={styles.mainListWrapper}>

              <View style={styles.memberView}>
                <View>
                  <View style={styles.img}>
                    <Image style={[{ width: '100%', height: '100%' }]}
                      source={item.user.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.user.image }} />

                  </View>
                  <Image style={{ width: 25, height: 25, position: 'absolute', bottom: -5, right: -5 }}
                    source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                </View>
                <View style={styles.nameView}>
                  <Text style={styles.name}>{item.user.name}</Text>
                  <Text style={styles.under_name}>{item.user.role.name}</Text>

                </View>
                <Right>
                  <Text style={styles.btnOnline}>{item.is_online != 0 ? <View style={{ width: 13, height: 13, backgroundColor: '#24bdaf', borderRadius: 15 }} />
                    : <View style={{ width: 13, height: 13, backgroundColor: 'grey', borderRadius: 15 }} />}</Text>
                </Right>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />

  );
}

export default componentName;
