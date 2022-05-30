import React, {useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import styles from './style';
import Icons from '../../../../../../assets/icons';
import {Right} from 'native-base';
import {RadioButton} from 'react-native-paper';

const componentName = ({params}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checked, setChecked] = useState('first');
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.textWrapper, styles.headerWrapper]}>
          <Text style={styles.header}>Delivery Address</Text>
          <Image style={styles.icon} source={Icons.editIcon} />
        </View>
        <View style={styles.address}>
          <View style={styles.textWrapper}>
            <Text>Address</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>Company</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>Country</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>State</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>Zip Code</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>Address</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={styles.textWrapper}>
            <Text>Contact Number</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
        </View>
        <Text style={styles.header}>Shipping Charge</Text>
        <View style={styles.charge}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Text style={styles.label}>Shipping Charge</Text>
          <Right>
            <Text>$00.00</Text>
          </Right>
        </View>
      </ScrollView>
    </View>
  );
};

export default componentName;
