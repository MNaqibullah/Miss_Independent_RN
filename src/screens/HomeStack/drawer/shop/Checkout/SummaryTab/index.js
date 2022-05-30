import React from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import Icons from '../../../../../../assets/icons';
import Images from '../../../../../../assets/images/index'
import styles from './style';
import CartItem from '../../Cart/CartItem'


const list = [
  {
    image: Images.recipies,
    name: 'Italian Sausage Burger',
    price: '20',
  },
];

const componentName = ({params}) => {
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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      {dataRender(list)}
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
            <Text>Contact Number</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
        </View>
        <Text style={styles.header}>Order Details</Text>
        <View style={styles.address}>
          <View style={[styles.textWrapper,{borderBottomWidth:0}]}>
            <Text>Cart Total</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
          <View style={[styles.textWrapper,{borderBottomWidth:0}]}>
            <Text>Shipping Charges</Text>
            <Text>Street ABC,House XYZ</Text>
          </View>
        </View>
        <View style={styles.payableWrapper}>
          <Text style={styles.payableSize}>Total Payable</Text>
          <Text style={styles.payableSize}>$20.00</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default componentName;
