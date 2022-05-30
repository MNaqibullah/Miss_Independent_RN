/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import Images from './../../../../assets/images/index';
import Colors from '../../../../utils/colors';
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { Right, Picker } from 'native-base';
import styles from './Styles';
import Icons from '../../../../assets/icons';
import Header from '../../../../components/Header';
import Preference from 'react-native-preference'
import { Button } from "react-native-elements";
import { client, img_BASE_URL } from '../../../../api/config'
// import SimpleToast from 'react-native-simple-toast';
import PickerSelect from '../../../../components/PickerSelect';
import MultiSelect from 'react-native-multiple-select';
import CancelIcon from 'react-native-vector-icons/Entypo';
import SimpleToast from 'react-native-simple-toast';


const Members = (props) => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const [number, onChangeNumber] = useState('');
  const [location, setLocation] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [totalCategories, setTotalCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [fullLoading, setFullLoading] = useState(false)

  const [userType, setUserType] = useState([{ label: 'Tulip', value: 2 }, { label: 'Orchid', value: 3 }, { label: 'Dhalia', value: 4 }]);
  const [userTypeData, setUserTypeData] = useState([]);
  const [selectedRole, setSelectedRole] = useState(2);
  const [tuilp, setTulip] = useState([]);
  const [orchid, setOrchid] = useState([]);
  const [dhalia, setDhalia] = useState([]);
  const [onlineData, setOnlineData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [pageCounter, setPageCounter] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchBox, setSearchBox] = useState(false)


  const reset = () => {
    setTotalPages(1)
    setPageCounter(1)
    setOnlineData([])
    setData([])
    setUserTypeData([])
    setOrchid([])
    setTulip([])
    setDhalia([])
    setSelectedCategory('')
    onChangeNumber('')
    setLocation('')
    setSearchBox(false)
  }
  useEffect(() => {
    categoriesAPI();
    getAllMember(1)
  }, [])

  useEffect(() => {
    reset()
    getAllMemberType(1)
  }, [selectedRole])
  useEffect(() => {
    setRefreshing(false)
    reset()
    setTab(0)
    getAllMember(1)
  }, [refreshing])

  // const getMembershipType = async () => {
  //   try {
  //     const res = await client.get('/ListOfRoles', {
  //       headers: {
  //         'Authorization': `Bearer ${Preference.get('token')}`
  //       }
  //     });
  //     let category = res.data.data.map((item) => {
  //      return {label:item.name,value:item.name}
  //     });
  //     setUserType(category);
  //     //console.log(category);
  //   } catch (error) {
  //     console.log('error in category type', error);
  //   }
  // }

  const getAllMember = async (page) => {
    
    //console.log('in get all member');
    try {
      setLoader(true)
      const res = await client.get('/members', {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
        params: {
          page
        }
      })
      setData([...data, ...res.data.data.data])
      setLoader(false)
      setTotalPages(res.data.data.last_page);
      //console.log('response',res.data.data.last_page);
    } catch (error) {
      console.log('error in all member', error);
    }


  }//getallmember
  /////////////////////////////////////////////////////////////
  const categoriesAPI = () => {

    client.get(`/categories?for=general`, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).then(response => {
      setTotalCategories(response.data.data)

    }).catch(error => console.log('error in member categories', error))
  }//categories
  /////
  // const addcategories = () => {
  //   setTotalCategories(categories.concat(categories2))
  // }//addcategories 



  ///////////////////////////////////////////////////////////
  const getOnline = async (page) => {
    try {
      setLoader(true)
      const res = await client.get('/OnlineMembers', {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
        params: {
          page
        }
      })
      setOnlineData(res.data.data.data)
      //console.log('in getOnline',res.data.data.data);
      setLoader(false)
      setTotalPages(res.data.data.last_page);
      //console.log('response',res.data.data.last_page);
    } catch (error) {
      console.log('error in  onlne member', error);
    }


  }
  const getAllMemberType = async (page) => {
    console.log('in get all member', page);
    try {
      setLoader(true)
      let body = new FormData();
      body.append('role_id', selectedRole)
      // console.log(body);
      const res = await client.post('/RolewiseMember', body, {
        headers: {
          'Authorization': `Bearer ${Preference.get('token')}`
        },
        params: {
          page
        }
      })
      //console.log('user type data',userTypeData);
      if (selectedRole == 2) {
        setTulip([...userTypeData, ...res.data.data.data])
      } else if (selectedRole == 3) {
        setOrchid([...userTypeData, ...res.data.data.data])
      } else if (selectedRole == 4) {
        setDhalia([...userTypeData, ...res.data.data.data])
      }
      //setUserTypeData()
      setLoader(false)
      setTotalPages(res.data.data.last_page);
      //console.log('response',res.data);
    } catch (error) {
      console.log('error in all member', error);
    }
  }//getallmembers
  ////////////////////////////////////////////////////////////////////////////////////////
  const searchApi = () => {
    let cat = totalCategories.filter(item => {
      return selectedCategory[0] == item.id
    })
    let bodyFormData = new FormData();

    if (selectedCategory.length != 0) {
      console.log('if')
      bodyFormData.append('category', cat[0].name)
    }
    else {
      console.log('else')
      bodyFormData.append('category', '')
    }
    bodyFormData.append('name', number)
    bodyFormData.append('location', location)
    if (tab != 0) {
      bodyFormData.append('type', tab == 1 ? 'online' : 'membership')
      if (tab == 2)
        bodyFormData.append('role', selectedRole)
    }

    console.log(bodyFormData)
    client.post(`/SearchMember`, bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    }).then(response => {
      console.log('search', response.data.data)
      setFullLoading(false)
      if (tab == 0)
        setData(response.data.data)
      else if (tab == 1)
        setOnlineData(response.data.data)
      else {
        if (selectedRole == 2) {
          setTulip(response.data.data)
        }
        else if (selectedRole == 3) {
          setOrchid(response.data.data)
        }
        else
          setDhalia(response.data.data)
      }
    }).catch(error => {
      setFullLoading(false)
      console.log('error in member search', error)
    })
  }//searchAPi
  /////////////////////////////////////////////////////////////////////////////////
  const refresh = () => {
    setRefreshing(true);
  } //refresh
  //////////////////////////////////////////////////////////////////////////////////////
  const _endReached = () => {
    if (!loader) {
      if (pageCounter < totalPages) {
        setPageCounter(pageCounter + 1)
        // console.log('totalPages', totalPages, 'pageCounter', pageCounter);
        if (tab === 0) {
          getAllMember(pageCounter)
        } else if (tab == 1) {
          getOnline(pageCounter)
        } else if (tab == 2) {
          getAllMemberType(pageCounter)
        }
      } else {
        // SimpleToast.show('Nothing to show here')
      }
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        rightIcon={Icons.searchIcon}
        rightIconOnPress={() => {
          setSearchBox(!searchBox)
        }}
        name={'Members'}
      />
      <View style={styles.container}>

        {
          searchBox ?
            <View>
              <TextInput
                style={styles.input}
                onChangeText={(val) => onChangeNumber(val)}
                value={number}
                placeholder="Search name"
                keyboardType="default"
              />
              <TextInput
                style={[styles.input, { marginBottom: 10 }]}
                onChangeText={(val) => setLocation(val)}
                value={location}
                placeholder="Location"
                keyboardType="default"
              />
        <View style={[{ borderWidth: 1, borderRadius: 6, borderColor: '#bfbfbfDD', paddingStart: 15, paddingEnd: 7,overflow:'hidden'},]}>
                {selectedCategory != '' &&
                  <TouchableOpacity
                    style={styles.cross}
                    onPress={() =>
                      setSelectedCategory('')
                    }>
                    <CancelIcon name="cross" size={23} color='#bfbfbfDD' />
                  </TouchableOpacity>
                }
                <MultiSelect
                  fixedHeight
                  styleDropdownMenuSubsection={[{ marginTop: 10.5},selectedCategory&&{ marginEnd: 30 }]}
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
                  hideSubmitButton={true}
                  searchInputStyle={{ color: '#CCC' }}
                  single
                />
              </View>
              <Button
                title="Search"
                onPress={() => {
                  if (number == '' && location == '' && selectedCategory == '') {
                    SimpleToast.show('Enter to search member')
                  }
                  else {
                    setFullLoading(true)
                    searchApi()
                  }
                }}//onPress
                buttonStyle={{
                  height: 50,
                  width: '100%',
                  alignSelf: 'center',
                  backgroundColor: Colors.lightBlack,
                  borderRadius: 10,
                }}
                containerStyle={{ marginTop: '4%' }}
              // loading={loading ? true : false}
              />
            </View> :
            null
        }

        <View style={styles.tabWrapper}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Text
              onPress={() => {
                setTab(0)
                reset()
                getAllMember(1)
              }
              }
              style={[
                styles.tab,
                tab === 0
                  ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                  : { backgroundColor: Colors.transparent },
              ]}>
              Latest
            </Text>
            <Text
              onPress={() => {
                setTab(1)
                reset()
                getOnline(1)
              }}
              style={[
                styles.tab,
                tab === 1
                  ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                  : { backgroundColor: Colors.transparent },
              ]}>
              Online
            </Text>
            <Text
              onPress={() => {
                setTab(2)
                reset()
                getAllMemberType(1)
              }}
              style={[
                styles.tab,
                tab === 2
                  ? { backgroundColor: Colors.themeGrey, color: Colors.lightBlack }
                  : { backgroundColor: Colors.transparent },
              ]}>
              Membership Type
            </Text>

          </ScrollView>
        </View>
      </View>
      {tab == 2 ?
        <PickerSelect
          style1={styles.dropdown}
          dropDownItems={userType}
          placeholder={'Select Type'}
          selectedValue={selectedRole}
          onValueChange={(value) => {
            setSelectedRole(value)
          }}
        />
        : null}
      <FlatList
        data={tab == 0 ? data : tab == 1 ? onlineData : selectedRole === 2 ? tuilp : selectedRole === 3 ? orchid : dhalia}
        // onEndReachedThreshold={0.3}
        // onEndReached={_endReached}
        refreshing={refreshing}
        onRefresh={() => refresh()}
        ListFooterComponent={() => loader && <ActivityIndicator size="large" color={Colors.cadetBlue} />
        }
        keyExtractor={(item, i) => item + i}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                props.navigation.navigate('MemberTabs', { name: item.name, id: item.id, image: item.image })
              }>
              <View style={styles.mainListWrapper}>

                <View style={styles.memberView}>
                  <View>
                    <View style={styles.img}>
                      <Image style={[{ width: '100%', height: '100%' }]}
                        source={item.image == null ? Images.palceHolder : { uri: img_BASE_URL + item.image }} />

                    </View>
                    <Image style={{ width: 25, height: 25, position: 'absolute', bottom: -5, right: -5 }}
                      source={item.role_id == 2 ? Images.tulip : item.role_id == 3 ? Images.orchid : item.role_id == 4 ? Images.dhalia : Images.service} />

                  </View>
                  <View style={styles.nameView}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.role_id == 1 ? <Text style={styles.under_name}>{'User'}</Text> :
                      item.role_id == 2 ? <Text style={styles.under_name}>{'Tulip'}</Text> :
                        item.role_id == 3 ? <Text style={styles.under_name}>{'Orchid'}</Text> :
                          item.role_id == 4 ? <Text style={styles.under_name}>{'Dhalia'}</Text> :
                            item.role_id == 5 ? <Text style={styles.under_name}>{'Coach-Mentor'}</Text> :
                              item.role_id == 6 ? <Text style={styles.under_name}>{'Consultant'}</Text> :
                                item.role_id == 7 ? <Text style={styles.under_name}>{'Trainer'}</Text> :
                                  null
                    }
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
export default Members;
