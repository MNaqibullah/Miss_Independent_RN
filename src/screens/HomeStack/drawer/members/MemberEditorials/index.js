import React, { useEffect } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import Images from '../../../../../assets/images';
import styles from './styles';
import usePageApi from '../../../../../components/usePageApi';
import Colors from '../../../../../utils/colors';
import SeeMore from '../../../../../components/Seemore';
const componentName = ({ uid }) => {
  const { getData, data, refresh, onRefresh, onEndReached, loading } = usePageApi('/UserAssets', uid, 1);
  useEffect(() => {
    getData(1)
  }, [])
  return data ? (
    <View style={{backgroundColor:'#f5f7f9'}}>
      <FlatList
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        data={data}
        refreshing={refresh}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
        ListFooterComponent={() => loading && <ActivityIndicator size="large" color={Colors.cadetBlue} />}
        ListEmptyComponent={() => (
          <View style={styles.textWrapper}>
            <Text style={styles.name}>Editorials (0)</Text>
            <Text style={styles.name}>There aren't any editorials yet.</Text>
          </View>
        )}
        renderItem={({ item }) => {
          console.log('item', item);
          return (
            <View style={styles.container}>
              <View style={styles.firstRow}>
                {/* <View style={styles.imageWrapper}>
                <Image style={styles.profileImage} source={item.profileImage} />
              </View> */}
               <SeeMore
                  styles={styles.articletDes}
                  styles2={[styles.articletDes, { color: '#24bdaf' }]}
                  item={item.text}
                />
              </View>
              <View style={styles.mainImageWrapper}>
                <Image style={styles.mainImage} source={{ uri: item.assets[0]?.link }} />
              </View>
              {/* <Text style={styles.text}>{item.description}</Text>
              <Text style={styles.see}>See More {'>>'}</Text> */}
            </View>
          );
        }}
      />

    </View>
  ) : (
    <ActivityIndicator size="large" color={Colors.cadetBlue} />
  )

}
export default componentName;
