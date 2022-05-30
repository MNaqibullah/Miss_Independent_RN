import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  ActivityIndicator,
  Modal
} from 'react-native';
import { Picker } from 'native-base';
import Icons from '../../../../../../assets/icons';
import Header from '../../../../../../components/Header';
import Colors from '../../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';
import { client, BASE_URL } from '../../../../../../api/config';
import Preference from 'react-native-preference';
import SimpleToast from 'react-native-simple-toast';
import { Button } from "react-native-elements";
import placeholderImage from '.././../../../../../assets/images/index';




const home = (props) => {
  const [location, setLocation] = useState('');
  const [selectedLabel2, setSelectedLabel2] = useState('Enter language');
  const [showList, setShowList] = useState(true);
  const [number, onChangeNumber] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loaderLoading, setLoaderLoading] = useState(false);
  const [fullLoading, setFullLoading] = useState(false)
  const [filterData, setFilterData] = useState([])
  const [filterData2, setFilterData2] = useState([])
  const [PageCount, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPost, setTotalPost] = useState(1)
  const id = 5

  useEffect(() => {
    serviceProviderData(1);
    setFullLoading(true)
  }, []);
  const serviceProviderData = (page) => {
    console.log('page', page)
    console.log('service provider', id)
    client.get(`/services/6/providers?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        if (response.data.code == 200) {
          if (response.data.data.current_page == 1) {
            setFilterData(response.data.data.data)
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
        console.log('error    ', error)
      }
      )
  }

  const filterDatamethod = (number, location, selectedLabel2) => {
    if (filterData != null) {
      setLoading(true)
      if (number != null) {
        setData(filterData.filter(data => {
          setFilterData2(filterData.filter(data => { return data.name.toUpperCase().indexOf(number.toUpperCase()) !== -1 }))
          console.log('filter data   ', filterData2)
          return data.name.toUpperCase().indexOf(number.toUpperCase()) !== -1;
        }
        ))
      }
      else {
        setFilterData2(filterData)
      }
      if (location) {
        setData(filterData2.filter(data => {
          return data.address.toUpperCase().indexOf(location.toUpperCase()) !== -1;
        }
        ))
      }


      // if (selectedLabel2 != 'Enter language') {
      //   setData(data.filter(data => {
      //     return data.language.indexOf(language) !== -1;
      //   }
      //   ))
      // }
      setLoading(false)
    }//if
    else
      SimpleToast.show("There isn't any service provider to filter")
  }//method

  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'Consulting and training'}
      />
      <ScrollView>
        <Text style={{ fontWeight: 'bold', marginHorizontal: 12, marginTop: 12 }}>
          Find Your ideal Coach/Mentor
        </Text>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(val) => setCategory(val)}
            value={category}
            placeholder="Search Category"
            keyboardType="default"
          />
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
          <View style={styles.dropdown}>
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
          </View>
        </View>

        <Button
          title="Search"
          onPress={() => {
            setData(filterData)
            filterDatamethod(number, location, selectedLabel2)
            setShowList(true);
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
            <View style={{ marginVertical: 14, marginHorizontal: 12 }}>
              <Text style={styles.title}> {totalPost} Featured Provides Found</Text>
            </View>
            <FlatList
              keyExtractor={(data, index) => data.id + "" + index.toString()}
              data={data}
              onEndReachedThreshold={0.8}
              onEndReached={() => {
                let val = +PageCount + 1
                if (PageCount <= totalPage) {
                  setLoaderLoading(true)
                  setPage(val)
                  serviceProviderData(val)
                }//nested if
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('coachDetails', item)
                    }}>
                    <View style={styles.forum}>
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
                      <View style={styles.text}>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.members}>{item.role_id == 5 ? 'Life Coach' : null}</Text>
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
    width: '90@s',
    height: '90@s',
    borderRadius: '90@s',
    marginEnd: '10@s',
    overflow: 'hidden'
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
