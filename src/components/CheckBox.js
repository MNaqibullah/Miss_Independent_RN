import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../utils/colors';
import icons from "./../assets/icons/";


const CheckBox = ({
    title,
    containerStyle,
    addItem,
    slug,
    setDisableCountry,
    disableCountry
}) => {
    const [pressed, setPressed] = useState(true)
    return (
        <TouchableOpacity
            onPress={() => {
                addItem && addItem(slug)
                setDisableCountry && setDisableCountry(!disableCountry)
                setPressed(!pressed)
            }}
            style={[{ flexDirection: "row", height: 30, marginVertical: 5, }, containerStyle]}
        >
            <Image style={{ width: 20, height: 20, alignSelf: 'center' }} source={pressed ? icons.checkbox_empty : icons.checkbox_tick} />
            <Text style={{ alignSelf: 'center', marginLeft: 15 }}>{title}</Text>
        </TouchableOpacity>
    );
}

export default CheckBox;
