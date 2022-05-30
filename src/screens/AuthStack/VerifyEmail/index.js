
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    ScrollView,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import Icons from './../../../assets/icons/'
import icons from "./../../../assets/icons/";
import colors from "../../../utils/colors";
import { client, BASE_URL } from '../../../api/config';
import { Button } from "react-native-elements";
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';
import axios from 'axios'

const VerifyEmail = ({ navigation, route }) => {

    const [verify, verifychange] = useState("");
    const [loading, setLoading] = useState(false);


    const Verify = () => {

        if (verify === '') {
            SimpleToast.show('Please enter code');
        } else {
            setLoading(true)
            let bodyFormData = new FormData();
            bodyFormData.append('email', Preference.get('email'));
            bodyFormData.append('verfiy_code', verify);
            console.log('bodyFormData', JSON.stringify(bodyFormData))
            axios.post('http://wordpress.appcrates.co/miss-independent/api/verifyEmail', bodyFormData)
                .then(response => {
                    setLoading(false)
                    console.log('response', response.data)
                    if (response.data.status === "Success") {
                        Preference.set('user_id', response.data.data.id);
                        Preference.set('token', response.data.data.token);
                        Preference.set('name', response.data.data.name);
                        Preference.set('goToLogin', 1)
                        navigation.navigate('CreateProfile')
                    }
                })
                .catch(err => {
                    setLoading(false)
                    SimpleToast.show('Something went wrong')
                    console.log('Verify eemail         ', JSON.stringify(err))
                }
                )

        }

    }


    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView>
                <Image
                    source={Icons.flyAuthIcon}
                    style={styles.logoStyle}
                />
                <Text style={styles.loginTxtStyle}>{'Verify your email'}</Text>
                <Text style={styles.independentTxtStyle}>{'Miss Independent'.toUpperCase()}</Text>
                <Text style={styles.passwordText}>
                    Please check your provided email we have sent you a verification code.
                </Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Verification Code'}
                    value={verify}
                    onChangeText={(text) => verifychange(text)}
                    leftIcon={icons.passwordLockIcon}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 40, backgroundColor: "transparent", height: 50 }}
                />
                <Button
                    title="Verify Code"
                    onPress={() => Verify()}
                    buttonStyle={{
                        height: 50,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: colors.themeGrey,
                        borderRadius: 10,
                    }}
                    containerStyle={{ marginTop: '4%' }}
                    loading={loading ? true : false}
                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default VerifyEmail;