import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, FlatList } from 'react-native';
import Icons from '../../../../assets/icons';
import Header from '../../../../components/Header';
import Colors from '../../../../utils/colors'
import { client } from '../../../../api/config';
import Preference from 'react-native-preference';
import SimpleToast from 'react-native-simple-toast';

function Services(props) {
  const [data, setData] = useState([]);

  const navigationScreen = (name, id) => {
    if (name == 'Coaches and Mentors')
      props.navigation.navigate('Coaches_Mentors', { id })
    else if (name == 'Consultancy and Training')
      props.navigation.navigate('Consultancy_Training', { id })
    else if (name == 'Branding Services')
      props.navigation.navigate('Branding_Services', { id })
    else if (name == 'Legal Services') {
      // props.navigation.navigate('Legal_Services')
      SimpleToast.show('Something is wrong with this screen')
    }
    else
      SimpleToast.show('Something is wrong with this screen')
  }

  return (
    <View>
      <Header
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        name={'Mi Services'}
        {...props}
      />
      <View style={Styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.button}
          onPress={() => { props.navigation.navigate('Coaches_Mentors')}}
        >
          <Text style={Styles.text}>{'Coaches And Mentor'}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.button}
          onPress={() => { props.navigation.navigate('Consultancy_Training')}}
        >
          <Text style={Styles.text}>{'Consultancy and Training'}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.button}
          onPress={() => { props.navigation.navigate('Branding_Services')}}
        >
          <Text style={Styles.text}>{'Branding Services'}</Text>
        </TouchableOpacity>
      </View>
      <View style={Styles.buttons}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.button}
          onPress={() => { props.navigation.navigate('Legal_Services')}}
        >
          <Text style={Styles.text}>{'Legal Services'}</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}
const Styles = StyleSheet.create({
  buttons: {},
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 12,
    marginHorizontal: 12,
    color: 'white',
    backgroundColor: Colors.lightBlack,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 7,
  },
});
export default Services;
