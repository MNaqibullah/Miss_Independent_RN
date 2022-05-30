import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';

// ...
function webview({ route, navigation }) {
    const uri = route.params.uri;

    return <View style={{flex:1}}>
        

        <WebView source={{ uri }} />
        <View style={styles.container}>
        <TouchableOpacity  onPress={() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'HomeStack' }],
              })
        }} >
            <Ionicons color={'black'} size={30} name='arrow-back' />
        </TouchableOpacity>
        </View>
    </View>;
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black',
        position: 'absolute',
        top: 30,
        width:'100%',
        opacity:0.4,
        padding:10,

    },

});
export default webview