import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { styles } from "./Styles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import AppButton from '../../../components/AppButton';
import Icons from './../../../assets/icons/'
import icons from "./../../../assets/icons/";
import colors from "../../../utils/colors";
import { client, BASE_URL } from '../../../api/config';
import Preference from 'react-native-preference';
import SimpleToast from 'react-native-simple-toast';
import { Button } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'


const SignUp = ({ navigation }) => {

    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [day, setDateValue] = useState('Day');
    const [month, setMonthValue] = useState('Month');
    const [year, setYearValue] = useState('Year');
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        setDate(date);
        console.warn("A date has been picked: ", date);
        let strDate = moment(date).format('DD/MM/YYYY')
        setDateValue(strDate.substring(0, 2))
        setMonthValue(strDate.substring(3, 5))
        setYearValue(strDate.substring(6, 10))
        
    };

    const validateRegister = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.length === 0) {
            SimpleToast.show('Please enter email');
        } else if (reg.test(email) === false) {
            SimpleToast.show('Email format is not valid');
        } else if (password.length === 0) {
            SimpleToast.show('Please enter password');
        } else if (password.length < 8) {
            SimpleToast.show('Password must be at least 8 characters long');
        } else if (confirmPassword.length === 0) {
            SimpleToast.show('Please enter confirm password');
        } else if (confirmPassword.length < 8) {
            SimpleToast.show('Confirm password must be at least 8 characters long');
        } else if (password !== confirmPassword) {
            SimpleToast.show('Password do not match');
        } else if (day == null)
            SimpleToast.show('Please enter day');
        else if (month == null)
            SimpleToast.show('Please enter month');
        else if (year == null)
            SimpleToast.show('Please enter year');
        else if (year >= 2005)
            SimpleToast.show('You are less then 16 years old');
        else {
            Register();
        }
    };

    const Register = () => {
        setLoading(true);

        let bodyFormData = new FormData();
        bodyFormData.append('email', email.toLowerCase());
        bodyFormData.append('password', password);
        console.log(`${year}-${month}-${day}`)
        bodyFormData.append('dob', `${year}-${month}-${day}`);
        console.log('log', bodyFormData)
        client.post('/register', bodyFormData,)
            .then(response => {
                if (response.data.status === "Success") {
                    setLoading(false)
                    Preference.set('password', password);
                    Preference.set('user_id', response.data.data.id);
                    Preference.set('token', response.data.data.token);
                    Preference.set('email',email.toLowerCase())
                    Preference.set('name',null)
                    navigation.navigate('VerifyEmail')
                }
                else {
                    SimpleToast.show(response.data.message);
                    setLoading(false)

                }
            })
            .catch(err => {
                setLoading(false)
                SimpleToast.show('Something went wrong')
                console.log('err         ', err)
            })

    };

    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAwareScrollView>
                <Image
                    source={Icons.flyAuthIcon}
                    style={styles.logoStyle}
                />
                <Text style={styles.loginTxtStyle}>{'SIGN UP TO'}</Text>
                <Text style={styles.independentTxtStyle}>{'Miss Independent'.toUpperCase()}</Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Email'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    leftIcon={icons.emailIcon}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 40, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    secureTextEntry={true}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => passwordchange(text)}
                    leftIcon={icons.passwordLockIcon}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 0, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Confirm Password'}
                    secureTextEntry={true}
                    secureTextEntry={true}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    leftIcon={icons.passwordLockIcon}
                    inputContainer={{ width: "90%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 0, backgroundColor: "transparent", height: 50 }}
                />
                <Text style={styles.DateOfBirth}>Date of Birth</Text>
                <View style={styles.PickerSelectView}>
                    <TouchableOpacity
                        onPress={() => {
                            showDatePicker()
                        }}
                        style={styles.dobField}><Text>{day}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            showDatePicker()
                        }}
                        style={styles.dobField}><Text>{month}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            showDatePicker()
                        }}
                        style={styles.dobField}><Text>{year}</Text>
                    </TouchableOpacity>

                    {/* <PickerSelect
                        style1={{ width: '30%', borderWidth: 1, borderRadius: 10, borderColor: 'gray' }}
                        // style2={{width: "30%",borderWidth: 1}}
                        dropDownItems={genderList}
                        placeholder={"Day"}
                        selectedValue={day}
                        onValueChange={(value) => {
                            setDateValue(value)
                        }}
                    />
                    <PickerSelect
                        style1={{ width: '34%', borderWidth: 1, borderRadius: 10, borderColor: 'gray' }}
                        // style2={{width: "30%",borderWidth: 1}}
                        dropDownItems={monthList}
                        placeholder={"Month"}
                        selectedValue={month}
                        onValueChange={(value) => {
                            setMonthValue(value)
                        }}
                    />
                    <PickerSelect
                        mode="dropdown"

                        style1={{ width: '31%', borderWidth: 1, borderRadius: 10, borderColor: 'gray', }}
                        dropDownItems={yearList}
                        placeholder={"Day"}
                        selectedValue={year}
                        onValueChange={(value) => {
                            setYearValue(value)
                        }}
                    /> */}
                </View>
                <Button
                    title="Sign Up"
                    onPress={() => validateRegister()}
                    buttonStyle={{
                        height: 50,
                        width: '90%',
                        alignSelf: 'center',
                        backgroundColor: colors.lightBlack,
                        borderRadius: 10,
                    }}
                    containerStyle={{ marginTop: '4%' }}
                    loading={loading ? true : false}
                />


                <Text style={styles.loginTxtStyle}>Already Have an Account?</Text>
                <AppButton
                    buttonText={'Sign In'}
                    TextStyle={{ letterSpacing: 1 }}
                    styles={{ height: 50, width: '90%', alignSelf: 'center', backgroundColor: colors.themeGrey, borderRadius: 10, marginVertical: 30 }}
                    onPressButton={() => navigation.navigate('LoginScreen')}
                />
            </KeyboardAwareScrollView>
            <View>
                <DateTimePickerModal
                    date={date}
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
        </SafeAreaView>
    );
}

export default SignUp;