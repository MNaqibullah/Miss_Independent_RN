import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icons from '../../../../../assets/icons';
import Header from '../../../../../components/Header';
import styles from './style';

const componentName = ({route, navigation}) => {
  const {image, name, price} = route.params;
  return (
    <View style={{flex: 1}}>
      <Header
        leftIconOnPress={() => navigation.goBack()}
        leftIcon={Icons.backIcon}
        name={'shop'}
      />
      <Image style={styles.mainImage} source={{uri: image}} />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.nameWrapper}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.price}>$ {price}</Text>
            <View style={styles.starIconWrapper}>
              <Image style={styles.starIcon} source={Icons.filledStarIcon} />
              <Image style={styles.starIcon} source={Icons.filledStarIcon} />
              <Image style={styles.starIcon} source={Icons.filledStarIcon} />
              <Image style={styles.starIcon} source={Icons.filledStarIcon} />
              <Image style={styles.starIcon} source={Icons.emptyIcon} />
            </View>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.header}>Description</Text>
            <Text style={styles.description}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Text>
          </View>
          <View style={styles.nameWrapper}>
            <Text style={styles.header}>Specifications</Text>
            <View style={styles.specsWrapper}>
              <Text style={styles.description}>Weight</Text>
              <Text style={styles.description}>1.3lbs</Text>
            </View>
            <View style={styles.specsWrapper}>
              <Text style={styles.description}>SKU</Text>
              <Text style={styles.description}>10000</Text>
            </View>
          </View>
          <View style={{paddingTop: 10}}>
            <Text style={styles.header}>Reviews</Text>
            <View style={styles.reviewWrapper}>
              <View style={styles.review}>
                <Text style={{marginRight: 10}}>4.5 (19 Votes)</Text>
                <View style={styles.starIconWrapper}>
                  <Image
                    style={styles.starIcon}
                    source={Icons.filledStarIcon}
                  />
                  <Image
                    style={styles.starIcon}
                    source={Icons.filledStarIcon}
                  />
                  <Image
                    style={styles.starIcon}
                    source={Icons.filledStarIcon}
                  />
                  <Image
                    style={styles.starIcon}
                    source={Icons.filledStarIcon}
                  />
                  <Image style={styles.starIcon} source={Icons.emptyIcon} />
                </View>
              </View>
              <Text>No Comments Yet,be the first to</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <TouchableOpacity style={styles.btnSave}>
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={[styles.btnSave, {backgroundColor: 'black'}]}>
          <Text style={styles.btnText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default componentName;
