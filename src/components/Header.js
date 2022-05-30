import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/colors';
import { StatusBarHeight } from '../utils/Dimensions';
import { ScaledSheet } from 'react-native-size-matters';
import Images from '../assets/images';
import { TextInput } from 'react-native';


const Header = ({
  name,
  leftIcon,
  rightIcon,
  rightIconOnPress,
  additionalRightIcon,
  leftIconOnPress,
  AdditionalRightIconOnPress,
  // search,
  // setSearchInput,
  // searchInput,
}) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={leftIconOnPress}>
      <View style={styles.mainLeftButton}>
        <Image style={styles.leftIcon} source={leftIcon} />
      </View>
    </TouchableOpacity>
    {name?.localeCompare('news feeds') === 0 ? <Image style={[styles.rightIcon, styles.headerImg]} source={Images.header} /> : <Text style={styles.name}>{name}</Text>}
    <View style={styles.rightIconWrapper}>
      {additionalRightIcon && <TouchableOpacity onPress={AdditionalRightIconOnPress}>
        <View style={styles.mainLeftButton}>
          <Image style={styles.rightIcon} source={additionalRightIcon} />
        </View>
      </TouchableOpacity>}
      <TouchableOpacity
        onPress={rightIconOnPress}
      >
        <Image style={styles.rightIcon} source={rightIcon} />
      </TouchableOpacity>
    </View>
    {/* {search &&
      <View style={styles.search}>
        <TextInput
          style={{}}
          placeholder="Search Input"
          onChangeText={setSearchInput}
          value={searchInput}
        />
      </View>} */}
  </View>
);
const styles = ScaledSheet.create({
  container: {
    flexDirection: 'row',
    paddingEnd: '10@s',
    backgroundColor: Colors.themeGrey,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '45@vs',
    marginTop: StatusBarHeight,
    paddingVertical: '3@vs',
  },
  headerImg: {
    width: '250@s',
    height: '35@vs',
    
  },
  mainLeftButton: {
    paddingVertical: '7@vs',
    width: '45@s',
    height: '40@vs',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    width: '15@s',
    height: '15@vs',
    padding: '8@ms',
    resizeMode: 'contain',
  },
  rightIcon: {
    width: '18@s',
    height: '18@vs',
    marginHorizontal: 5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rightIconWrapper: {
    paddingVertical: '7@vs',
    flexDirection: 'row',
  },
  name: {
    color: Colors.lightBlack,
    fontSize: '15@ms',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  search: {
    paddingVertical: '10@vs',
    position: 'absolute',
    backgroundColor: 'white',
    right: '40@s',
    width: '65%',
    height: '35@vs',
    borderRadius: '5@s',
  }
});
export default Header;
