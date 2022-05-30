import React from 'react';
import {
  FlatList,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from '../../../../assets/icons';
import Header from '../../../../components/Header';
import styles from './style';
const data = [
  {
    id: 1,
    images: 'https://picsum.photos/id/237/200/200',
    name: 'Food and Recipes',
    price: 200,
  },
  {
    id: 2,
    images: 'https://picsum.photos/id/238/200/200',
    name: 'Food and Recipes',
    price: 200,
  },
  {
    id: 3,
    images: 'https://picsum.photos/id/239/200/200',
    name: 'Health',
    price: 200,
  },
  {
    id: 4,
    images: 'https://picsum.photos/id/240/200/200',
    name: 'Business',
    price: 200,
  },
  {
    id: 5,
    images: 'https://picsum.photos/id/241/200/200',
    name: 'Fitness',
    price: 200,
  },
  {
    id: 6,
    images: 'https://picsum.photos/id/241/200/200',
    name: 'Fitness',
    price: 200,
  },
];
const Shop = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header
        leftIconOnPress={() => props.navigation.openDrawer()}
        leftIcon={Icons.drawerIcon}
        rightIcon={Icons.cartIcon}
        rightIconOnPress={()=>props.navigation.navigate('Cart')}
        name={'shop'}
        {...props}
      />
      <View style={styles.container}>
        <ScrollView>
          <View>
            <FlatList
              numColumns={3}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                return (
                  <View style={styles.item}>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      props.navigation.navigate('ItemDetail', {
                        image: item.images,
                        name: item.name,
                        price: item.price,
                      })
                    }>
                      <Image style={styles.images} source={{ uri: item.images }} />
                      <Text style={styles.name}>{item.name}</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <Text style={styles.header}>Featured Products</Text>
          <FlatList
            data={data}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <View style={styles.shopItem}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      props.navigation.navigate('ItemDetail', {
                        image: item.images,
                        name: item.name,
                        price: item.price,
                      })
                    }>
                    <Image
                      style={[styles.images, styles.shopImages]}
                      source={{ uri: item.images }}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                  </TouchableOpacity>
                  <View style={styles.btnRow}>
                    <TouchableOpacity style={styles.btnCart}>
                      <Text style={{color:"white"}} >Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={styles.heartIcon}
                        source={Icons.heartIcon}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Shop;
