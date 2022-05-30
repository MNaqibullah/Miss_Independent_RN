import React, { Component, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/AntDesign';

const DrawerItem = (props) => {
  const { title, image, onPress, containerStyle, options } = props;
  return (
    title == 'MI Services' ?
      <View
        // activeOpacity={0.4}
        // onPress={onPress}
        style={[styles.drawerItemContainer, containerStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={image}
            style={{ width: 17, height: 17, marginEnd: 10, resizeMode: 'contain' }}
          />
          <Text>{title}</Text>
          {options ? <View style={{ marginTop: 5, flexDirection: 'row' }}>
            <View style={{ flex: 0.7 }} />
            <Icon name="up" size={20} color="#24bdaf" />
          </View> :
            <View style={{ marginTop: 5, flexDirection: 'row' }}>
              <View style={{ flex: 0.7 }} />
              <Icon name="down" size={20} color="#24bdaf" />
            </View>
          }
        </View>
      </View>
      :
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={onPress}
        style={[styles.drawerItemContainer, containerStyle]}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={image}
            style={{ width: 17, height: 17, marginEnd: 10, resizeMode: 'contain' }}
          />
          <Text>{title}</Text>

        </View>
      </TouchableOpacity>

  );
};
const styles = ScaledSheet.create({
  drawerItemContainer: {
    width: '100%',
    height: '35@vs',
    justifyContent: 'center',
    marginTop: '10@vs',
    paddingBottom: 1,
  },
});
export default DrawerItem;
