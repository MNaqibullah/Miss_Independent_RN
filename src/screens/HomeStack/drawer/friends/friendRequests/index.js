import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  Text,
  Image,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../../../assets/images';
import Icons from '../../../../../assets/icons';
import Colors from '../../../../../utils/colors';
import { Right } from 'native-base';
import styles from './styles';
import Header from '../../../../../components/Header';
import { client, img_BASE_URL } from '../../../../../api/config';
import Preference from 'react-native-preference';
import colors from '../../../../../utils/colors';
import SimpleToast from 'react-native-simple-toast'


const friendRequests = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoader(true)
    getAllFriendRequests(1)
    setRefreshing(false)
  }, [refreshing]);
  const getAllFriendRequests = async (page) => {

    try {
      setLoader(true)
      const res = await client.post(`/ListofFriendRequests?page=${page}`, null, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      })
      // console.log(res.data.data)
      // if (res.data.data.length!=0&&res.data.data.Friends.current_page != 1){
      //   // console.log('res.data.data.current_page != 1',JSON.stringify([...data,...res.data.data.Friends.data]))
      //   setData([...data, ...res.data.data.Friends.data])}
      // else{
        // console.log('else',JSON.stringify(res.data.data.Friends.data))
        // if(res.data.data.length!=0)
        setData(res.data.data)
      // }
      setLoader(false)
      // setTotalPages(res.data.data.last_page);
      //console.log('response',res.data.data.last_page);
    } catch (error) {
      console.log('error in friends requests', JSON.stringify(error));
    }
  }//getAllFriendRequests
  /////////////////////////////////////////////////////////////
  const acceptFriendRequest = async (id) => {
    let bodyFormData = new FormData()
    bodyFormData.append('id', id)
    console.log(bodyFormData)
    try {
      const response = await client.post('/AcceptFriendRequest', bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      })
      SimpleToast.show('Request Accepted')
      console.log('accept',response.data)
      setRefreshing(true)
    }//try
    catch (error) {
      SimpleToast.show('Network connection unstable')
      console.log('acceptFriendRequest'.error)
    }
  }//acceptFriendrequest
  //////////////////////////////////////////////////
  const rejectFriendRequest = async (id) => {
    let bodyFormData = new FormData()
    bodyFormData.append('id', id)
    console.log(bodyFormData)
    try {
      const response = await client.post('/RejectFriendRequest', bodyFormData, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      })
      SimpleToast.show('Request Rejected')
      console.log('reject',response)
      setRefreshing(true)
    }//try
    catch (error) {
      SimpleToast.show('Network connection unstable')
      console.log('RejectFriendRequest'.JSON.stringify(error))
    }
  }//rejectFriendrequest
  //////////////////////////////////////////////////
  const refresh = () => {
    setRefreshing(true);
    setData([])
  } //refresh
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Friend Requests'}
      />

      <FlatList
        data={data}
        ListEmptyComponent={(item) => {
          if (!loader) {
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 200 }}>
                <Text
                  style={styles.emptyListStyle}>
                  No Friend Request
                </Text>
              </View>
            )
          }
          else
            return null
        }}
        // onEndReachedThreshold={0.3}
        // onEndReached={() => {
        //   let val = pageCounter + 1
        //   if (val <= totalPages) {
        //     console.log(val, totalPages)
        //     setLoading(true)
        //     setPageCounter(val)
        //     getAllFriends(val)
        //   }//nested if
        //   else {
        //     // SimpleToast.show('Nothing to show more')
        //   }//nested else
        // }}
        refreshing={refreshing}
        onRefresh={refresh}
        ListFooterComponent={() => loader && <ActivityIndicator size="large" color={Colors.cadetBlue} />
        }
        keyExtractor={(item, i) => item + i}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('MemberTabs', { name: item.users.name, id: item.users.id, image: item.users.image })
              }>
              <View style={styles.mainListWrapper}>

                <View style={styles.memberView}>
                  <View>
                    <View style={styles.img}>
                      <Image style={[{ width: '100%', height: '100%' }]}
                        source={item.users.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.users.image }} />

                    </View>
                    <Image style={{ width: 25, height: 25, position: 'absolute', bottom: -5, right: -5 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View style={styles.nameView}>
                    <Text style={styles.name}>{item.users.name}</Text>
                    <Text style={styles.under_name}>{item.users.role.name}</Text>

                  </View>
                  <Right>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={() => {
                         acceptFriendRequest(item.id)
                        }}
                        style={[styles.responseButton, { marginRight: 6, backgroundColor: colors.cadetBlue }]}
                      >
                        <Text style={{ fontWeight: 'bold' }}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                           rejectFriendRequest(item.id)
                        }}
                        style={styles.responseButton}
                      >
                        <Text style={{ fontWeight: 'bold' }}>Reject</Text>
                      </TouchableOpacity>

                    </View>
                  </Right>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />

    </SafeAreaView>
  );
};
export default friendRequests;
