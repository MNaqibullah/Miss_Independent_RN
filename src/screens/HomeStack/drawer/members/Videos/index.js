import React, { useEffect } from 'react';
import styles from './style';
import { FlatList, ActivityIndicator, View, Text,Image } from 'react-native';
import VideoPlayer from '../../../../../components/VideoPlayer';
import usePageApi from '../../../../../components/usePageApi';
import Colors from '../../../../../utils/colors';
import Icons from '../../../../../assets/icons';

const componentName = ({ uid }) => {
  const { getData, data, refresh, onRefresh, onEndReached, loading } = usePageApi('/UserAssets', uid, 3);
  useEffect(() => {
    getData(1)
  }, [])
  return (
    <>
      {data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => loading && <ActivityIndicator size="large" color={Colors.cadetBlue} />}
          ListEmptyComponent={() => (
            <View style={styles.textWrapper}>
              <Text style={styles.name}>Videos (0)</Text>
              <Text style={styles.name}>There aren't any videos yet.</Text>
            </View>
          )}
          refreshing={refresh}
          onRefresh={onRefresh}
          onEndReachedThreshold={0.4}
          onEndReached={onEndReached}
          data={data}
          style={styles.container}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.images} source={{ uri: 'https://i.ytimg.com/vi/AzmN9cV-qtQ/maxresdefault.jpg' }} />
              <Image style={styles.playIcon} source={Icons.playIcon} />
            </View>
          )}
        />
      ) : (
        <ActivityIndicator size="large" color={Colors.cadetBlue} />

      )}
    </>
  );
}
export default componentName;
