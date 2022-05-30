
import React, { useState, useEffect } from "react";
import {
    Text,
    Image,
    SafeAreaView,
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../../components/FloatingLabelInputField';
import Icons from '../../../../assets/icons/'
import icons from "../../../../assets/icons/";
import colors from "../../../../utils/colors";
import { client, BASE_URL } from '../../../../api/config';
import { Button } from "react-native-elements";
import Header from '../../../../components/Header';
import SimpleToast from 'react-native-simple-toast';
import Preference from 'react-native-preference';



const ForgotPassword = ({ navigation }) => {

    const [oldPassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    


    const changePasswordApi = () => {

        if (oldPassword === '') {
            SimpleToast.show('Please Enter Old Password');
        } else if (oldPassword != Preference.get('password')) {
            console.log(Preference.get('password'))
            SimpleToast.show("Old Password is Incorrect")
        } else if (newpassword === '') {
            SimpleToast.show("New Password Can't be Empty")
        }
        else if (confirmPassword === '') {
            SimpleToast.show("Confirm Password Can't be Empty")
        }
        else if (newpassword.length <= 7) {
            SimpleToast.show("Your new password is less than 8 digits")
        } else if (newpassword === oldPassword) {
            SimpleToast.show("New Password should be different from old Password")
        } else if (newpassword != confirmPassword) {
            SimpleToast.show("Confirm Password is different from new Password you Entered")
        }
        else {
            setLoading(true)
            let bodyFormData = new FormData();
            bodyFormData.append('temporary_password', oldPassword);
            bodyFormData.append('new_password', newpassword);
            client.post('/password/reset', bodyFormData, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${Preference.get('token')}`,
                }
            })
                .then(response => {
                    setLoading(false)
                    console.log(response.data)
                    console.log(Preference.get('token'))
                    Preference.set('password',newpassword)
                    if (response.data.status === "Success") {
                        SimpleToast.show('Password has been Changed');
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
                    console.log('err         ', err.Error)
                })
        }
    }


    return (
        <SafeAreaView style={styles.safeStyle}>
            <Header
                leftIconOnPress={() => navigation.goBack()}
                leftIcon={Icons.backIcon}
                name={'Change Password'}
            />
            <KeyboardAwareScrollView>
                <Image
                    source={Icons.flyAuthIcon}
                    style={styles.logoStyle}
                />
                <Text style={styles.loginTxtStyle}>{'Change Password'}</Text>
                <Text style={styles.independentTxtStyle}>{'Miss Independent'.toUpperCase()}</Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Enter Current Password'}
                    secureTextEntry={true}
                    value={oldPassword}
                    onChangeText={(text) => setOldPassword(text)}
                    leftIcon={icons.confirm_password}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", marginTop: 40, height: 50 }}
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
                    titleStyle={{color:'black'}}
                    loading={loading ? true : false}

                />
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default ForgotPassword;