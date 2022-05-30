import React from 'react';
import {View,TextInput, ScrollView, Image} from 'react-native';
import Colors from '../utils/colors'
import { ScaledSheet } from 'react-native-size-matters';
import Icons from "../assets/icons";

function CustomInput({icon,placeholder,onValueChange,value}) {
    
return(
    
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.commentBox}>
        <TextInput placeholder={placeholder} multiline={true} 
        value={value}
        onChangeText={onValueChange} />
        </View>
        {icon? <Image source={Icons.sendIcon} style={styles.sendIcon} />
        :null}
    </ScrollView>
);
}

const styles = ScaledSheet.create({
    container:{
        backgroundColor:Colors.transparentGrey,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
    },
    commentBox:{
        width:'90%',
        minHeight:'30@vs',
        maxHeight:'70@vs',
        padding:'3@s'
    },
    sendIcon: {
        width: '20@s',
        height: '20@vs',
      },
});
export default CustomInput;