import React, { useEffect } from 'react';
import { FlatList, ActivityIndicator, Image, View, Text } from 'react-native';
import styles from './style';
import usePageApi from '../../../../../components/usePageApi';
import Colors from '../../../../../utils/colors';


const componentName = ({ uid }) => {
  const { getData, data, refresh, onRefresh, onEndReached,loading } = usePageApi('/UserAssets', uid, 2);
  useEffect(() => {
    getData(1)
  }, [])
  return (
    <>
      {data ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={data}
            ListFooterComponent={() => loading && <ActivityIndicator size="large" color={Colors.cadetBlue} />}
            ListEmptyComponent={() => (
              <View style={styles.textWrapper}>
                <Text style={styles.name}>Photos (0)</Text>
                <Text style={styles.name}>There aren't any photos yet.</Text>
              </View>
            )}
            refreshing={refresh}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.4}
            onEndReached={onEndReached}
            numColumns={3}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              return (
                <View style={styles.item}>
                  <Image style={styles.images} source={{ uri: item.link }} />
                </View>
              )
            }}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" color={Colors.cadetBlue} />

      )}
    </>
  )
};

export default componentName;
