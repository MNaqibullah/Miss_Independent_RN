
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

const ForgotPassword = ({ navigation }) => {

    const [email, emailchange] = useState("");
    const [loading, setLoading] = useState(false);


    const forgotApi = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email === '') {
            SimpleToast.show('Please Enter Email');
        } else if (reg.test(email) === false) {
            SimpleToast.show('Email format is not valid')
        }
        else {
            setLoading(true)
            let bodyFormData = new FormData();
            bodyFormData.append('email', email.toLowerCase());
            client.post('/password/mail', bodyFormData)
                .then(response => {
                    SimpleToast.show(response.data.message);
                    if (response.data.status === "Success") {
                        Preference.set('email', email)
                        setLoading(false)
                        navigation.navigate('ResetPassword')
                    }
                    else {
                        setLoading(false)

                    }

                })
                .catch(err => {
                    setLoading(false)
                    SimpleToast.show('Something went wrong')
                    console.log('err         ', err.Error)

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
                <Text style={styles.loginTxtStyle}>{'Forgot Password'}</Text>
                <Text style={styles.independentTxtStyle}>{'Miss Independent'.toUpperCase()}</Text>
                <Text style={styles.passwordText}>
                    Please provide your email address, we will send you instructions to reset your password.
                </Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    leftIcon={icons.emailIcon}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 40, backgroundColor: "transparent", height: 50 }}
                />
                <Button
                    title="Send Email"
                    onPress={() => forgotApi()}
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

export default ForgotPassword;