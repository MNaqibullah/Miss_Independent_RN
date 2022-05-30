import React, {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Images from '../../../../../assets/images';
import Icons from '../../../../../assets/icons';
import {Right} from 'native-base';
function CartItem({image, name, price}) {
  const [count, setCount] = useState(1);
  const counter = (value) => {
    if (count + value < 1) {
      return;
    }
    setCount(count + value);
  };
  return (
    <View style={styles.cartWrapper}>
      <Image style={styles.productImage} source={image} />
      <View style={styles.productWrapper}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <View style={styles.counterWrapper}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => counter(-1)}>
            <View style={styles.increment}>
            <Text style={{color:'white',fontSize:19}}>-</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.counter}>{count}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => counter(1)}>
          <View style={styles.decrement}>
            <Text style={{color:'white',fontSize:19}}>+</Text>
            </View>
          </TouchableOpacity>
          <Right>
            <View style={styles.updateIcons}>
              <Image style={styles.icon} source={Icons.editIcon} />
              <Image
                style={[styles.icon, {marginLeft: 8}]}
                source={Icons.deleteIcon}
              />
            </View>
          </Right>
        </View>
      </View>
    </View>
  );
}
export default CartItem;
