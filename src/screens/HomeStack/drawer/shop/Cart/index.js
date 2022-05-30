import React from 'react';
import Images from '../../../../../assets/images';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import Icons from '../../../../../assets/icons';
import CartItem from './CartItem';
import Header from '../../../../../components/Header';
import styles from './style';
const list = [
  {
    image: Images.recipies,
    name: 'Italian Sausage Burger',
    price: '20',
  },
];
function componentName({navigation}) {
  const dataRender = (data) => {
    let components = [];
    for (let index = 0; index < data.length; index++) {
      components.push(
        <CartItem
          image={data[index].image}
          name={data[index].name}
          price={data[index].price}
        />,
      );
    }
    return components;
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
      <ScrollView>
        {dataRender(list)}

        <View style={styles.orderDetail}>
          <Text style={[styles.name, {paddingHorizontal: 10}]}>
            Order Detail
          </Text>
          <View style={styles.totalWrapper}>
            <Text>Cart Total</Text>
            <Text>$ 20.00</Text>
          </View>
        </View>
        <View style={styles.payableWrapper}>
        <Text style={styles.payableSize}>Total Payable</Text>
        <Text style={styles.payableSize}>$20.00</Text>
      </View>
      </ScrollView>
      
      
      <TouchableOpacity
        style={styles.btnSave}
        onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
}

export default componentName;
