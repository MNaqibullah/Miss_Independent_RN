import React from 'react';
import {Text, View, Image, FlatList, ScrollView} from 'react-native';
import {Right} from 'native-base';
import Icons from '../../../../../assets/icons';
import Images from '../../../../../assets/images';
import styles from './style';
function Home({params}) {
  const data = [
    {
      id: 1,
      image: Images.profileImage,
      name: 'Sarah Green',
      type: 'Admin',
    },
    {
      id: 2,
      image: Images.profileImage,
      name: 'Tulip Green',
      type: 'Life Coach',
    },
    {
      id: 3,
      image: Images.profileImage,
      name: 'Sarah Green',
      type: 'Admin',
    },
    {
      id: 4,
      image: Images.profileImage,
      name: 'Tulip Green',
      type: 'Life Coach',
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.description}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
          <View style={styles.memberWrapper}>
            <Text style={styles.memberLabel}>3 Members</Text>
            <Image style={styles.heartIcon} source={Icons.heartIcon} />
          </View>

          <Text style={styles.header}>Members</Text>

          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.mainListWrapper}>
                  <View style={styles.memberView}>
                    <Image style={styles.img} source={item.image} />
                    <View style={styles.nameView}>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.under_name}>{item.type}</Text>
                    </View>
                    <Right>
                      <Image
                        style={styles.heartIcon}
                        source={Icons.peopleIcon}
                      />
                    </Right>
                  </View>
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default Home;
