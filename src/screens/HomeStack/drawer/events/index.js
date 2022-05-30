import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Picker } from 'native-base';
import Images from '../../../../assets/images';
import Icons from '../../../../assets/icons';
import Header from '../../../../components/Header';
import Styles from './style';
import { Right } from 'native-base';
import { client, img_BASE_URL } from '../../../../api/config'
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import styles from './style';



export default function PickerEx(props) {
  const [selectedLabel, setselectedLabel] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [data, setData] = useState([]);
  const [mainData, setMainData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [issearchData, setIsSearchData] = useState(false);
  const [isTextSearched, setIsTextSearched] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false)
  const [feature, setFeature] = useState('')


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(strDate);
    let strDate = moment(date).format('YYYY-MM-DD')
    console.warn("A date has been picked: ", strDate);
    let a = false
    setLoading(true)
    searchDataApi(strDate, a);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////

  const dataApi = () => {
    setLoading(true)
    console.log('token members', Preference.get('token'))
    client.post('/Eventlist', null, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        if (response.data.code = 200) {
          setMainData(response.data.data)
          setData(response.data.data)
          console.log('else response.data.data')
        }
        else {
          console.log('else', response.data.data)
        }
        // setLoading(false)
      })
      .catch(error => {
        console.log('error    ', error)
        SimpleToast.show('Something went wrong!')
        // setLoading(false)
      })
  }//dataApi
  ////////////////////////////////////////////////////////////////////////
  const searchDataApi = (strDate, a) => {
    let bodyFormData = new FormData()
    console.log(isTextSearched, '2')
    if (a)
      bodyFormData.append('title', strDate)
    else
      bodyFormData.append('date', strDate)
    console.log(bodyFormData)
    client.post('/EventSearch', bodyFormData, {
      headers: {
        'Authorization': `Bearer ${Preference.get('token')}`
      }
    })
      .then(response => {
        if (response.data.code = 200) {
          setIsTextSearched(false)
          console.log(strDate)
          setData(response.data.data)
          setselectedLabel('')
          console.log('if2', response.data)
          if (response.data.data == null)
            SimpleToast.show('No Event to show')
        }
        else {
          setIsTextSearched(false)
          console.log('else2', response.data.data)
        }
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
        setIsTextSearched(false)
        console.log('error    ', error)
        SimpleToast.show('Something went wrong!')
      })

  }//search Data APi
  //////////////////////////////////////////////////////////////////////////////////////
  const pickerFIlter = () => {

    setLoading(true)
    if (selectedLabel == ('all_events')) {
      setSearchValue('');
      console.log('if')
      setData(mainData)
    }
    else if (selectedLabel == ('feature_events')) {
      setSearchValue('');
      let array = mainData.filter((item) => {
        return moment(moment(new Date()).format('YYYY-MM-DD')).isBefore(moment(item.created_at).format('YYYY-MM-DD'))
      })
      setData(mainData.filter((item) => {
        return moment(moment(new Date()).format('YYYY-MM-DD')).isBefore(moment(item.created_at).format('YYYY-MM-DD'))
      }))
      if (array) {
        SimpleToast.show('There is no feature Events')
      }
    }
    else if (selectedLabel == ('past_events')) {
      setSearchValue('');
      setData(mainData.filter((item) => {
        return !moment(moment(new Date()).format('YYYY-MM-DD')).isBefore(moment(item.created_at).format('YYYY-MM-DD'))
      }))
    }
    else {
      if (!mainData) {
        setData(mainData)
        console.log('else if ae')
      }
    }
    setLoading(false)
  }
  /////////////////////////////////////////////////////////////////////////////////////////
  const topmethod = () => {
    return (
      <View>
        <View style={Styles.dropdown}>
          <TouchableOpacity
            onPress={() => { console.log('touchable') }}
          >
            <Picker
              onValueChange={(value) => {
                setselectedLabel(value);
              }}
              selectedValue={selectedLabel}>
              <Picker.Item label="Select Events" value="default" />
              <Picker.Item label="All Events" value="all_events" />
              <Picker.Item label="Feature Events" value="feature_events" />
              <Picker.Item label="Past Events" value="past_events" />
            </Picker>
          </TouchableOpacity>

        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={Styles.searchContainer}>
            <Image source={Icons.searchBlackIcon} style={Styles.logoStyle} />
            <TextInput placeholder="Search"
              value={searchValue}
              onChangeText={(val) => setSearchValue(val)}
              onEndEditing={() => {
                setLoading(true)
                let a = true
                searchDataApi(searchValue, a)
              }}
              style={Styles.search} />
          </View>
          <View style={Styles.calendar}>
            <TouchableOpacity
              onPress={() => { showDatePicker() }}
            >
              <Image
                source={Icons.calendarIcon}
                style={Styles.calendarLogo}
              />
            </TouchableOpacity>
          </View>
        </View>
        {
          issearchData ?
            <View>
              <Text style={styles.searchedResultText}>
                {`${data.length}`} Searched Results Found
              </Text>
            </View> : null
        }
      </View>
    )
  }
  useEffect(() => {
    dataApi();
  }, []);
  useEffect(() => {
    pickerFIlter()
  }, [selectedLabel]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {mainData == '' ?
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#24bdaf" />
        </View>
        : null}
      <Header
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        name={'Events'}
      />
      <View>
        <View style={Styles.container}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            data={data}
            ListHeaderComponent={topmethod()}
            renderItem={({ item }) => {
              return (
                <View style={Styles.forum}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.navigation.navigate('EventDetails', item.id)}>
                    <View style={Styles.imgContainer}>
                      <Image style={Styles.images} source={{ uri: img_BASE_URL + 'images/events/' + item.image }} />
                      <View style={Styles.textContainer}>
                        <Text style={Styles.title}>{moment(item.fromdate).format('MMMM D, YYYY, dddd')}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={Styles.description}>
                    <Text style={{ paddingBottom: 10 }}>{item.description}</Text>
                    {!item.user.social_link_facebook ? null :
                      <Text>{item.link}</Text>}
                    <Text style={Styles.creator}>
                      Created By : {item.user.name}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View>
        <DateTimePickerModal
          date={date}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      {loading ?
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#24bdaf" />
        </View>
        : null}
    </SafeAreaView>
  );
}
