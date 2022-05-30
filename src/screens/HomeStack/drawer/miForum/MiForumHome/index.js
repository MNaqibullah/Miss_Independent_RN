import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import Icons from '../../../../../assets/icons';
import Images from '../../../../../assets/images';
import styles from './style';
function Home({params}) {
  const data = [
    {
      id: 1,
      dp: Images.recipies,
      name: 'Alexandra',
      comment:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 2,
      dp: Images.recipies,
      name: 'Amanda',
      comment:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      id: 3,
      dp: Images.recipies,
      name: 'Qaseem',
      comment:
        ' Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
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
          <TouchableOpacity style={styles.btnSave}>
            <Text style={styles.btnText}>Join Us</Text>
          </TouchableOpacity>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
              return (
                <View style={styles.commentSection}>
                  <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={item.dp} />
                  </View>
                  <View style={styles.commentBoxContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.comment}>{item.comment}</Text>
                    <Text style={styles.replyBtn}>Reply</Text>
                  </View>
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
                  placeholder={'Leave a Comment'}
                />
              </ScrollView>
            </View>
            <Image style={styles.sendIcon} source={Icons.sendIcon} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default Home;
