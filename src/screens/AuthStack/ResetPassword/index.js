
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import Icons from '../../../assets/icons'
import icons from "../../../assets/icons/";
import colors from "../../../utils/colors";
import { client, BASE_URL } from '../../../api/config';
import { Button } from "react-native-elements";
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';



const ForgotPassword = ({ navigation }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

  
    const changePasswordApi = async () => {
        if (oldPassword === '') {
            SimpleToast.show('Please enter old password');
        } else if (oldPassword.length <= 7) {
            SimpleToast.show('Temporary password is incorrect');
        } else if (newpassword === '') {
            SimpleToast.show("New password can't be empty")
        }
        else if (confirmPassword === '') {
            SimpleToast.show("Confirm password can't be empty")
        }
        else if (newpassword.length <= 7) {
            SimpleToast.show("Your new password is less than 8 digits")
        } else if (newpassword === oldPassword) {
            SimpleToast.show("New password should be different from old password")
        } else if (newpassword != confirmPassword) {
            SimpleToast.show("Confirm password is different from new password you entered")
        }
        else {

            setLoading(true)
            let bodyFormData1 = new FormData();
            // console.log('email', Preference.get('email'))
            bodyFormData1.append('email', Preference.get('email'));
            bodyFormData1.append('password', oldPassword);
            client.post('/login', bodyFormData1,)
                .then(response => {
                    if (response.data.status === "Success") {
                        Preference.set('token', response.data.data.token);
                        // console.log('login')
                        let bodyFormData2 = new FormData();
                        // console.log('reset token', Preference.get('token'))
                        bodyFormData2.append('temporary_password', oldPassword);
                        bodyFormData2.append('new_password', newpassword);
                        client.post('/password/reset', bodyFormData2, {
                            headers: {
                                "Accept": "application/json",
                                "Authorization": `Bearer ${Preference.get('token')}`,
                            }
                        })
                            .then(response => {
                                // console.log('token in change API', Preference.get('token'))
                                if (response.data.status === "Success") {
                                    SimpleToast.show('Password has been changed');
                                    Preference.set('password',newpassword)
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeStack' }],
                                    })
                                }
                                else {
                                    setLoading(false)
                                    SimpleToast.show(response.data.status);
                                }
                            })
                            .catch(err => {
                                SimpleToast.show('err         ', err.Error)
                            }
                            )

                    }
                    else {
                        SimpleToast.show("Old password is incorrect");
                        setLoading(false)
                    }
                })
                .catch(err => {
                    setLoading(false)
                   SimpleToast.show('err         ', err.Error)
                })

        }
    }


    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView>
                <Image
                    source={Icons.flyAuthIcon}
                    style={styles.logoStyle}
                />
                <Text style={styles.loginTxtStyle}>{'Change Password'}</Text>
                <Text style={styles.independentTxtStyle}>{'Miss Independent'.toUpperCase()}</Text>
                <Text style={styles.passwordText}>
                    Change Password to Login
                </Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter Temporary Password'}
                    secureTextEntry={true}
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    leftIcon={icons.confirm_password}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", marginTop: 30, height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter New Password'}
                    secureTextEntry={true}
                    value={newpassword}
                    onChangeText={(text) => setNewPassword(text)}
                    leftIcon={icons.confirm_password}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Confirm New Passwod'}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    leftIcon={icons.confirm_password}
                    inputContainer={{
                        width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10,
                        backgroundColor: "transparent", height: 50
                    }}
                />
                <Button
                    title="Change Password"
                    onPress={() => changePasswordApi()}
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