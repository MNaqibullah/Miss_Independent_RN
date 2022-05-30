import React from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../../../../assets/images';
import Icons from '../../../../../../assets/icons';
import { ScaledSheet } from 'react-native-size-matters';
import placeholderImage from './../../../../../../assets/images/index';

const styles = ScaledSheet.create({

  container: {},
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
});
export default function Coaches_Mentors({ data, navigateHandler }) {
  
  console.log('searchReultCoach', data)
  let results = []
  if (data != null) {
    results = data.data
  }
  return (
    <View styles={{ flex: 1 }}>
      <View style={{ marginVertical: 14, marginHorizontal: 12 }}>
        <Text style={styles.title}> {results.length} Featured Provides Found</Text>
      </View>
      <FlatList
        keyExtractor={(results, index) => results.id + "" + index.toString()}
        data={results}
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          let val = PageCountPopular + 1
          if (PageCountPopular <= totalPagePopular) {
            setLoading(true)
            setPagePopular(val)
            homeDataApi(type, val)
          }//nested if
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (navigateHandler && typeof navigateHandler === 'function') {
                  navigateHandler(item);
                }
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
    </View>
  );
}
