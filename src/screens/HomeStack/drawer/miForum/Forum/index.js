/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react';
import {Text, View, ScrollView, Image, FlatList, TextInput} from 'react-native';
import {Picker} from 'native-base';
import Icons from '../../../../../assets/icons';
import Images from '../../../../../assets/images';
import styles from './style';
const componentName = ({params}) => {
  const [selectedLabel, setselectedLabel] = useState('');
  const data = [
    {
      id: 1,
      profileImage: Images.photo,
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industrythe printing and typesetting industry industry industry.',
      mainImage: Images.mainProfile,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      profileImage: Images.photo,
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industrythe printing and typesetting industry industry industry.',
      mainImage: Images.mainProfile,
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.dropdown}>
            <Picker
              onValueChange={(value) => {
                setselectedLabel(value);
              }}
              selectedValue={selectedLabel}>
              <Picker.Item label="Sort By" value="default" />
              <Picker.Item label="name" value="java" />
              <Picker.Item label="member" value="js" />
            </Picker>
          </View>
          <FlatList
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({item}) => {
              return (
                <View style={styles.container}>
                  <View style={styles.firstRow}>
                    <View style={styles.imageWrapper}>
                      <Image
                        style={styles.profileImage}
                        source={item.profileImage}
                      />
                    </View>
                    <View style={styles.textWrapper}>
                      <Text style={styles.text}>{item.text}</Text>
                    </View>
                  </View>
                  <View style={styles.mainImageWrapper}>
                    <Image
                      style={styles.mainImage}
                      source={Images.mainProfile}
                    />
                  </View>
                  <Text style={styles.text}>{item.description}</Text>
                  <Text style={styles.see}>See More {'>>'}</Text>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
      <View style={{width: '100%', maxHeight: 60}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.commentBox}>
            <View style={{width: '90%', maxHeight: 60}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                  multiline={true}
                  style={{flexGrow: 1}}
                  placeholder={'Share your thoughts'}
                />
              </ScrollView>
            </View>
            <Image style={styles.sendIcon} source={Icons.sendIcon} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default componentName;
