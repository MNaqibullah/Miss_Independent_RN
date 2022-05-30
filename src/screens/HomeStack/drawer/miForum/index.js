import React, { useEffect, useState, } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Picker } from 'native-base';
import Images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import Header from '../../../../components/Header';
import Colors from '../../../../utils/colors';
import { client } from '../../../../api/config'
import Preference from 'react-native-preference'
import images from '../../../../assets/images/index';



const styles = StyleSheet.create({
  container: { flex: 1, marginVertical: 10 },

  forum: {
    flex: 1,
  },
  imgContainer: {
    width: '100%',
    height: 190,
    padding: 11,
  },
  dropdown: {
    marginHorizontal: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 6,
    paddingStart: 12,
    marginBottom: 10,
  },
  title: {
    marginHorizontal: 16,
    fontWeight: 'bold',
    fontSize: 17,
  },
  members: {
    marginHorizontal: 16,
  },
  fullLoading: {
    position: 'absolute',
    top: '88@vs',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default function PickerEx(props) {
  const [selectedLabel, setselectedLabel] = useState('');
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1)
  const [PageCount, setPage] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [fullLoading, setFullLoading] = useState(false)


  useEffect(() => {
    setFullLoading(true)
    dataApi(1)
    console.log('useEffect')
  }, [])

  const refresh = () => {
    setRefreshing(true);
    dataApi(1)
  } //refresh

  const dataApi = (page) => {
    client.post(`/LIsfOfCategories?page=${page}`, null, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        console.log('response ',page)
        setRefreshing(false)
        setLoading(false)
        setFullLoading(false)
        if (response.data.data && response.data.data.data != null)
          setTotalPage(response.data.data.last_page)
        if (response.data.data.current_page == 1) {
          setData(response.data.data.data)
        }//if
        else {
          let array = [...data]
          array.push(response.data.data.data)
          setData(array)
        }
      })
      .catch(error => {
        setRefreshing(false)
        setLoading(false)
        setFullLoading(false)
        console.log('error in Mi forum index', error)
      })
  }//dataApi

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        rightIcon={Icons.searchIcon}
        name={'MI Forum'}
      />
      {fullLoading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={Colors.cadetBlue} />
        </View>
        : <View style={styles.container}>
          <View style={styles.dropdown}>
            <Picker
              onValueChange={(value) => {
                setselectedLabel(value);
              }}
              selectedValue={selectedLabel}>
              <Picker.Item label="Sort By" value="default" />
              <Picker.Item label="name" value="java" />
            </Picker>
          </View>

          <FlatList
            keyExtractor={(item) => item.id}
            numColumns={2}
            refreshing={refreshing}
            onRefresh={() => refresh()}
            onEndReachedThreshold={0.4}
            showsHorizontalScrollIndicator={false}
            ListFooterComponent={() => loading && <ActivityIndicator size="large" color={Colors.cadetBlue} />
            }
            onEndReached={() => {
              let val = PageCount + 1
              if (PageCount < totalPage) {
                setLoading(true)
                setPage(val)
                dataApi(val)
              }//nested if
              else {
                // SimpleToast.show('Nothing to show more')
              }//nested else
            }}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.forum}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      props.navigation.navigate('MiForumTabs', { id: item.id })
                    }>
                    <View style={styles.imgContainer}>
                      <Image
                        source={item.image && item.image != null ? images.home : { uri: item.image }}
                        style={{
                          height: '100%',
                          width: '100%',
                        }}
                      />
                    </View>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.members}>{item.total_members} members</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>}
    </SafeAreaView>
  );
}