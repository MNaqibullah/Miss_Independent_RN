import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../utils/colors';

const PickerSelect = (props) => {

    const {
        style1,
        style2,
        selectedValue,
        placeholder,
        onValueChange,
        dropDownItems,
    } = props

    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <View style={[styles.featureBgStyle1, style1]}>

            <Picker
             
              style={{color: 'red', backgroundColor: 'transparent'}}
                textStyle={{ color: colors.black, fontSize: 10 }}
                itemStyle={{
                    backgroundColor: colors.black,
                    marginLeft: 0,
                    // paddingLeft: 10,
                    fontSize: 10,
                    borderWidth:1
                }}
                itemTextStyle={{ fontSize: 13,borderWidth:1 }}
                style={[styles.pickerViewStyle, style2]}
                selectedValue={selectedLanguage}
                onValueChange={onValueChange}
                mode={'dialog'}
                placeholder={placeholder}
                placeholderStyle={{ fontSize: 13, }}
                onValueChange={onValueChange}>
                {dropDownItems.map((item, index) => {
                    return <Picker.Item  key={`${index}`} label={item.label} value={item.value} />
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    pickerViewStyle: { width: "100%", height: 50 },

    featureBgStyle1: {
        width: '100%',
        height: 50
    },
})

export default PickerSelect