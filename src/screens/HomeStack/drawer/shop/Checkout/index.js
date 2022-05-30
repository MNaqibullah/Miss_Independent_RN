/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Header from '../../../../../components/Header';
import Icons from '../../../../../assets/icons';
import styles from './style';
import PaymentTab from './PaymentTab';
import ShippingTab from './ShippingTab';
import SummaryTab from './SummaryTab';
import Colors from '../../../../../utils/colors';

const componentName = ({navigation}) => {
  const [tab, setTab] = useState(0);
  const switchTab = () => {
    switch (tab) {
      case 0:
        return <ShippingTab />;
      case 1:
        return <SummaryTab />;
      case 2:
        return <PaymentTab />;
      default:
        return;
    }
  };
  
  return (
    <View style={{flex: 1}}>
      <Header
        leftIconOnPress={() => navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'shop'}
      />
      <View style={styles.tabWrapper}>
        <View style={[styles.tab, styles.tab1]}>
        <Text style={styles.tabText}>Item (1)</Text>
        </View>
        <View style={[styles.tab, styles.tab2]}>
        <Text style={styles.tabText}>Total: $20.00</Text>
        </View>
      </View>
      <View style={styles.boxWrapper}>
        <View style={[
            styles.box,
            tab === 0 || tab == 1 || tab == 2
              ? {backgroundColor: Colors.themeGrey}
              : {backgroundColor: Colors.grey},
          ]}>
        <Text style={[
            styles.textBox,
            tab === 0 || tab == 1 || tab == 2
              ? {color: Colors.lightBlack}
              : {backgroundColor: Colors.grey},
          ]}>1</Text>
        </View>
        <View
          style={[
            styles.line,
            tab == 1 || tab == 2
              ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
              : {backgroundColor: Colors.Grey},
          ]}
        />
        <View style={[
            styles.box,
            tab == 1 || tab == 2
              ? {backgroundColor: Colors.themeGrey}
              : {backgroundColor: Colors.grey},
          ]}>
        <Text style={[
            styles.textBox,
            tab == 1 || tab == 2
              ? {color: Colors.lightBlack}
              : {backgroundColor: Colors.grey},
          ]}>2</Text>
        </View>
        <View
          style={[
            styles.line,
            tab === 2
              ? {backgroundColor: Colors.themeGrey, color: Colors.lightBlack}
              : {backgroundColor: Colors.Grey},
          ]}
        />
        <View style={[
            styles.box,
            tab == 2
              ? {backgroundColor: Colors.themeGrey}
              : {backgroundColor: Colors.grey},
          ]}>
        <Text style={[
            styles.textBox,
            tab == 2
              ? {color: Colors.lightBlack}
              : {backgroundColor: Colors.grey},
          ]}>3</Text>
        </View>
      </View>
      <View style={styles.textWrapper}>
        <Text>Shipping</Text>
        <Text>Summary</Text>
        <Text>Payment</Text>
      </View>
      {switchTab()}
      <TouchableOpacity
        style={styles.btnSave}
        onPress={() => (tab === 2 ? setTab(0) : setTab(tab + 1))}>
        <Text style={styles.btnText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default componentName;
