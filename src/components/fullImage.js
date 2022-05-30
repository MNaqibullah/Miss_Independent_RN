import React from 'react';
import NativeModal from 'react-native-modal';
import { FlatList, Image, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function FullImage({ navigation, route }) {
    const { data,index } = route.params;
    console.log('data', data);
    return <>
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ padding: 20, marginTop: 30 }}
                onPress={() => navigation.goBack()}
            >
                <Icon name="chevron-back" size={25} color="#24bdaf" />
            </TouchableOpacity>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                <FlatList pagingEnabled
                    style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', }}
                    initialScrollIndex={index}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    data={data}
                    renderItem={({ item }) => {

                        return <Image style={{ width: windowWidth, height: windowHeight - 100, resizeMode: 'contain' }} source={{ uri: item.link }} />

                    }} />

            </View>
        </View>
    </>
}
export default FullImage