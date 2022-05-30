import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  FlatList,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Picker } from 'native-base';
import Icons from '../../../../../assets/icons';
import Header from '../../../../../components/Header';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';
import { client, BASE_URL } from '../../../../../api/config';
import Preference from 'react-native-preference';
import SimpleToast from 'react-native-simple-toast';
import { Button } from "react-native-elements";
import placeholderImage from './../../../../../assets/images/index';
import MultiSelect from 'react-native-multiple-select';
import CancelIcon from 'react-native-vector-icons/Entypo';




const home = (props) => {
  const [location, setLocation] = useState('');

  const [number, onChangeNumber] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderLoading, setLoaderLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fullLoading, setFullLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [categories2, setCategories2] = useState([])
  const [totalCategories, setTotalCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [toggle, setToggle] = useState(false)
  const [PageCount, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPost, setTotalPost] = useState(1)
  const id = 5

  useEffect(() => {
    categoriesAPI();
    serviceProviderData(1);
    setFullLoading(true)
    setRefreshing(false)
    setSelectedCategory('')
    onChangeNumber('')
    setLocation('')
  }, [refreshing]);

  useEffect(() => {
    addcategories()
  }, [categories, categories2]);

  const serviceProviderData = (page) => {
    console.log('page', page)
    console.log('service provider', id)
    client.get(`/services/5/providers?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        if (response.data.code == 200) {
          if (response.data.data.current_page == 1) {
            setData(response.data.data.data)
            setTotalPage(response.data.data.last_page)
            setTotalPost(response.data.data.total)
            console.log('1sts Page')
            setFullLoading(false)
          }
          else {
            console.log('2nds Page')
            let array = data
            array.push(...response.data.data.data)
            setData(array)
            setFilterData(array)
            setTotalPage(response.data.data.last_page)
            setTotalPost(response.data.data.total)
            setLoaderLoading(false)

          }
        }//if
        else {
          setLoaderLoading(false)
          console.log('Service Provider else')
        }
      })
      .catch(error => {
        setLoaderLoading(false)
        console.log('error   in service provider ', error)
      }
      )
  }//service provider
  /////////////////////////////////////////////////////////////////////////////////
  const categoriesAPI = () => {

    client.get(`/categories?for=coaching-training`, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).then(response => {
      setCategories(response.data.data)
      client.get(`/categories?for=soft-skills-coaching-training`, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        }
      }).then(response => {
        setCategories2(response.data.data)
        addcategories();
      }).catch(error => console.log('error inner categories', error))
    }).catch(error => console.log('error in categories', error))
  }//categories
  /////
  const addcategories = () => {
    if (categories && categories2)
      setTotalCategories(categories.concat(categories2))
  }//addcategories
  ////////////////////////////////////////////////////////////////////////////////////////
  const searchApi = () => {
    let cat = totalCategories.filter(item => {
      return selectedCategory[0] == item.id
    })
    let bodyFormData = new FormData();

    if (selectedCategory.length != 0) {
      console.log('if')
      bodyFormData.append('category_name', cat[0].name)
    }
    else {
      console.log('else')
      bodyFormData.append('category_name', '')
    }
    bodyFormData.append('text', number)
    bodyFormData.append('location', location)
    console.log(bodyFormData)
    client.post(`/SearchUser`, bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).then(response => {
      setFullLoading(false)
      setData(response.data.data)
    }).catch(error => {
      setFullLoading(false)
      console.log('error in search coach', error)
    })

  }//searchAPi
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  const onReefresh = () => {
    setRefreshing(true)
  }

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Coaches And Mentors'}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            onRefresh={onReefresh}
            refreshing={refreshing}
          />
        }
      >
        <Text style={{ fontWeight: 'bold', marginHorizontal: 12, marginTop: 12 }}>
          Find Your ideal Coaches/Mentors
        </Text>
        <View>
          <View style={[{ borderWidth: 1, borderRadius: 6, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7, marginHorizontal: 12, marginTop: 5, overflow: 'hidden' },]}>
            {selectedCategory != '' &&
              <TouchableOpacity
                style={styles.cross}
                onPress={() =>
                  setSelectedCategory('')
                }>
                <CancelIcon name="cross" size={23} color='bfbfbfDD' />
              </TouchableOpacity>
            }
            <MultiSelect
              fixedHeight
              styleDropdownMenuSubsection={[{ marginTop: 10.5 }, selectedCategory && { marginEnd: 30 }]}
              styleRowList={{ padding: 10 }}
              hideTags
              items={totalCategories}
              uniqueKey="id"
              onSelectedItemsChange={(value) => setSelectedCategory(value)}
              selectedItems={selectedCategory}
              selectText="Pick Category"
              searchInputPlaceholderText="Search Categories..."
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="name"
              searchInputStyle={{ color: '#CCC' }}
              single
            />
          </View>
          <TextInput
            style={styles.input}
            onChangeText={(val) => onChangeNumber(val)}
            value={number}
            placeholder="Search name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={(val) => setLocation(val)}
            value={location}
            placeholder="Location"
            keyboardType="default"
          />
          {/* <View style={styles.dropdown}>
            <Picker
              mode="dropdown"
              placeholder="Language"
              style={{ color: 'black', backgroundColor: 'transparent', width: '97%' }}
              selectedValue={selectedLabel2}
              onValueChange={(value) => {
                setSelectedLabel2(value);
              }}>
              <Picker.Items label="Language" value="as" />
              <Picker.Item label="name" value="java" />
              <Picker.Item label="member" value="js" />
            </Picker>
          </View> */}
        </View>

        <Button
          title="Search"
          onPress={() => {
            if (number == '' && location == '' && selectedCategory == '') {
              setFullLoading(true)
              serviceProviderData(1);
            }
            else {
              setFullLoading(true)
              searchApi()
            }
          }}
          buttonStyle={{
            height: 50,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: Colors.lightBlack,
            borderRadius: 10,
          }}
          containerStyle={{ marginTop: '4%' }}
          loading={loading ? true : false}
        />

        {data && data.length != 0 && (
          <View styles={{ flex: 1 }}>
            {/* <View style={{ marginVertical: 14, marginHorizontal: 12 }}>
              <Text style={styles.title}> {totalPost} Featured Provides Found</Text>
            </View> */}
            <FlatList
              keyExtractor={(data, index) => data.id + "" + index.toString()}
              data={data}
              // onEndReachedThreshold={0.8}
              // onEndReached={() => {
              //   let val = +PageCount + 1
              //   if (PageCount <= totalPage) {
              //     setLoaderLoading(true)
              //     setPage(val)
              //     serviceProviderData(val)
              //   }//nested if
              // }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('coachDetails', item)
                    }}>
                    <View style={styles.forum}>
                      <View>
                        <View style={styles.imgContainer}>
                          <Image
                            source={item.image == null ? placeholderImage.palceHolder : { uri: item.image }}
                            style={{
                              height: '100%',
                              width: '100%',
                              resizeMode: 'contain',
                            }}
                          />
                        </View>
                        <Image style={{ width: 25, height: 25, position: 'absolute', bottom: 0, right: 0 }}
                          source={placeholderImage.service} />

                      </View>
                      <View style={styles.text}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.members}>{item.business_name.split(' ').slice(0,2).join(' ')}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Image
                            style={{
                              marginTop: 2,
                              width: 12,
                              height: 12,
                            }}
                            source={Icons.locationIcon}
                          />
                          <Text style={styles.location}>
                            {item.based_in}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            {loaderLoading ? <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color={Colors.cadetBlue} />
            </View> :
              null
            }

          </View>
        )
        }
      </ScrollView>
      {fullLoading ? <Modal
        visible={fullLoading}
        animationType="none"
        transparent={true}
      >
        <View style={styles.fullLoading}>
          <ActivityIndicator size="large" color={Colors.cadetBlue} />
        </View>
      </Modal>
        :
        null
      }
    </View>
  );
};

const styles = ScaledSheet.create({

  input: {
    padding: 0,
    height: '45@vs',
    marginHorizontal: '12@s',
    marginTop: '10@vs',
    borderWidth: '1@s',
    borderRadius: 6,
    paddingHorizontal: '20@s',
    borderColor: Colors.grey,
  },
  cross: {
    position: 'absolute',
    right: -5,
    paddingHorizontal: 15,
    paddingVertical: 15,
    zIndex: 12,
  },
  button: {
    backgroundColor: Colors.lightBlack,
    marginHorizontal: '12@vs',
    marginTop: '13@vs',
    borderRadius: 6,
    paddingVertical: '15@vs',
    marginBottom: '10@vs',
    alignItems: 'center',
  },
  buttonText:
  {
    color: 'white', fontWeight: 'bold', fontSize: '17@ms',
  },
  dropdown: {
    marginHorizontal: '11@vs',
    marginTop: '11@vs',
    borderWidth: 1,
    borderRadius: 6,
    paddingStart: '12@s',
    borderColor: Colors.grey,
  },
  forum: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    marginHorizontal: '20@vs',
    paddingBottom: '10@vs',
  },
  imgContainer: {
    width: '50@s',
    height: '50@s',
    borderRadius: '90@s',
    overflow: 'hidden',
    marginEnd: '10@s',
    marginTop: 10,

  },

  title: {
    fontWeight: 'bold',
    fontSize: '16@ms',
    marginBottom: '1@vs',
  },
  text: {
    flexDirection: 'column',
    justifyContent: 'center',

  },
  members: {
    fontSize: '12@ms',
    marginBottom: '1@vs',
    paddingStart: '3@vs'
  },
  location: {
    fontSize: '11@ms',
    textTransform:'capitalize'
  },
  fullLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default home;
