import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import Images from '../../../../../assets/images/index';
import Icons from '../../../../../assets/icons/index';
import Colors from '../../../../../utils/colors';
import Header from '../../../../../components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../../../components/FloatingLabelInputField';
import CheckBox from '../../../../../components/CheckBox';
import icons from "./../../../../../assets/icons/";
import PickerSelect from '../../../../../components/PickerSelect';
import { Assets } from '@react-navigation/stack';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AppButton from '../../../../../components/AppButton';



const LegalServices = (props) => {

    const isFocused = useIsFocused();
    useEffect(() => {
        // captchaForm.show()
    }, [isFocused])


    const [email, emailchange] = useState("");
    const [isCalender, showCalender] = useState(false);
    const [date, setDate] = useState('');
    const [code, setCode] = useState(null);
    const siteKey = '6Lf41K0UAAAAAHd3FeZbJsMbL00-Beqyk33NHqtp';
    const baseUrl = 'https://google.com';
    const Options = [
        { label: 'Please Select', value: 'Please Select' },
        { label: 'option1', value: 'option1' },
        { label: 'option2', value: 'option2' },
    ]


    const onMessage = (event) => {
        if (event && event.nativeEvent.data) {
            if (['cancel', 'error', 'expired'].includes(event.nativeEvent.data)) {
                captchaForm.hide();
                return;
            } else {
                console.log('Verified code from Google', event.nativeEvent.data);
                setCode(event.nativeEvent.data)
                // this.setState({ code: event.nativeEvent.data });
                setTimeout(() => {
                    captchaForm.hide();
                    // do what ever you want here
                }, 1500);
            }
        }
    };


    return (
        <View style={{ flex: 1, }}>
            <Header
                leftIconOnPress={() => props.navigation.goBack()}
                leftIcon={Icons.backIcon}
                name={'COACHES AND MENTORS'}
            />
            <KeyboardAwareScrollView style={{ marginHorizontal: 20 }}>
                <Text style={{ fontWeight: "bold", color: Colors.cadetBlue, marginVertical: 20, fontSize: 20 }}>Services Application Form</Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Confirm your selection of Services'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 0, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'First Name'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Last Name'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Phone'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Social Media Account'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Location'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Business Name'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'description of Business'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Description of your requirements'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Industry'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'What coaching areas do you require support in? Please specify in details.'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'What goals would you like to achieve from the  services'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Why are you choosing this service?'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Anything that you would like the services to know?'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'What is your availability?'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 100 }}
                />
                <Text style={{ fontWeight: "bold", color: Colors.cadetBlue, marginVertical: 20, fontSize: 16 }}>Please verify that you are human *</Text>
                <ConfirmGoogleCaptcha
                    ref={_ref => captchaForm = _ref}
                    siteKey={siteKey}
                    baseUrl={baseUrl}
                    languageCode='en'
                    onMessage={onMessage()}
                />
                <AppButton
                    buttonText={'Submit'}
                    TextStyle={{ letterSpacing: 1 }}
                    styles={{ height: 50, width: '100%', alignSelf: 'center', backgroundColor: Colors.cadetBlue, borderRadius: 10 }}
                    onPressButton={() => captchaForm.show()}
                />
            </KeyboardAwareScrollView>
            {code && (
                <Text style={{ alignSelf: 'center' }}>
                    {`Your verification code is `}
                    <Text style={{ color: 'darkviolet', fontWeight: 'bold' }}>
                        {code}
                    </Text>
                </Text>
            )}
        </View>

    );
}
export default LegalServices;