import React, {useEffect } from 'react';
import { View, } from 'react-native';



const BrandingServices = (props) => {
    useEffect(()=>{
        props.navigation.navigate('webview',{uri:'https://form.jotform.com/201312379386052'})
    })
    return <View />
}
export default BrandingServices;