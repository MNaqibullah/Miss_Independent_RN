import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Image } from 'react-native';
import Images from '../../../../../../assets/images/index';
import Icons from '../../../../../../assets/icons/index';
import Colors from '../../../../../../utils/colors';
import Header from '../../../../../../components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../../../../components/FloatingLabelInputField';
import CheckBox from '../../../../../../components/CheckBox';
import icons from ".././../../../../../assets/icons/";
import PickerSelect from '../../../../../../components/PickerSelect';
import { Assets } from '@react-navigation/stack';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ConfirmGoogleCaptcha from 'react-native-google-recaptcha-v2';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import AppButton from '../../../../../../components/AppButton';
import Preference from 'react-native-preference';
import { Button } from "react-native-elements";
import { client, BASE_URL } from '../../../../../../api/config';
import SimpleToast from 'react-native-simple-toast';



const CoachesMentor = (props) => {

    const isFocused = useIsFocused();
    useEffect(() => {
    }, [isFocused])
   const id=props.route.params.id
   console.log('id                  ',id)
    const submitApi = () => {
        setLoading(true)
        let bodyFormData = new FormData();
        bodyFormData.append('user_id', id);
        bodyFormData.append('confirmation', email);
        bodyFormData.append('firstname', firstName);
        bodyFormData.append('lastname', lastName);
        bodyFormData.append('phone', phone);
        bodyFormData.append('social_account', link);
        bodyFormData.append('location', location);
        bodyFormData.append('business_name', businessName);
        bodyFormData.append('business_description', desBusiness);
        bodyFormData.append('industry', industry);
        bodyFormData.append('coaching_areas', coachingAreas);
        bodyFormData.append('goals', goals);
        bodyFormData.append('why_choosing', mentor);
        bodyFormData.append('coach_to_know', aboutYou);
        bodyFormData.append('availability', availability);
        client.post('/applications', bodyFormData, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${Preference.get('token')}`,
            }
        })
            .then(response => {
                setLoading(false)
                if (response.data.status === "Success") {
                    setLoading(false)
                    SimpleToast.show('Your Application has been submitted');
                    props.navigation.navigate('HomeScreen')                    
                }
                else {
                    setLoading(false)
                    SimpleToast.show('else ',response.data.status);
                }
            })
            .catch(err => {
                console.log('err         ', err.Error)
                SimpleToast.show('Error  ',response.data.message);
            })
    }

    const [availability, setAvailability] = useState("");
    const [aboutYou, setAboutYou] = useState("");
    const [mentor, setMentor] = useState("");
    const [goals, setGoals] = useState("");
    const [coachingAreas, setCoachingAreas] = useState("");
    const [desBusiness, setDesBusiness] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [link, setLink] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [location, setLocation] = useState("");
    const [requirements, setRequirements] = useState("");
    const [industry, setIndustry] = useState("");
    const [email, emailchange] = useState("");
    const [isCalender, showCalender] = useState(false);
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
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
                <Text style={{ fontWeight: "bold", color: Colors.cadetBlue, marginVertical: 20, fontSize: 20 }}>Coaching Application Form</Text>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Confirm your selection of Coach'}
                    value={email}
                    onChangeText={(text) => emailchange(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, marginTop: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'First Name'}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Last Name'}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <TextInput
                    style={{ borderWidth: 1, borderColor: Colors.mediumGrey, borderRadius: 10, paddingHorizontal: 20 }}
                    placeholder="Phone"
                    keyboardType="numeric"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Social Media Account'}
                    value={link}
                    onChangeText={(text) => setLink(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Location'}
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Business Name'}
                    value={businessName}
                    onChangeText={(text) => setBusinessName(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray', }}
                >
                    <TextInput
                        multiline
                        value={desBusiness}
                        onChangeText={text => setDesBusiness(text)}
                        placeholder='Description of Buisiness'
                    >

                    </TextInput>
                </View>
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Description of your requirements'}
                    value={requirements}
                    onChangeText={(text) => setRequirements(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <FloatingLabelInputField
                    hideLabel
                    placeholder={'Industry'}
                    value={industry}
                    onChangeText={(text) => setIndustry(text)}
                    inputContainer={{ width: "100%", alignSelf: 'center', borderRadius: 10, marginVertical: 10, backgroundColor: "transparent", height: 50 }}
                />
                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray' }}
                >
                    <TextInput
                        value={coachingAreas}
                        onChangeText={text => setCoachingAreas(text)}
                        multiline
                        placeholder='What coaching areas do you require support in? Please specify in details.'
                    >

                    </TextInput>
                </View>

                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray' }}
                >
                    <TextInput
                        value={goals}
                        onChangeText={text => setGoals(text)}
                        multiline
                        placeholder='What goals would you like to achieve from the Coaching/Mentoring Sessions'
                    >

                    </TextInput>
                </View>

                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray' }}
                >
                    <TextInput
                        value={mentor}
                        onChangeText={text => setMentor(text)}
                        multiline
                        placeholder='Why are you choosing this coach/mentor?'
                    >

                    </TextInput>
                </View>

                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray' }}
                >
                    <TextInput
                        value={aboutYou}
                        onChangeText={text => setAboutYou(text)}
                        multiline
                        placeholder='Anything that you would like the coach mentor to know?'
                    >

                    </TextInput>
                </View>

                <View
                    style={{ borderWidth: 1, paddingHorizontal: 14, borderRadius: 10, marginTop: 10, backgroundColor: "transparent", height: 100, borderColor: 'gray' }}
                >
                    <TextInput
                        value={availability}
                        onChangeText={text => setAvailability(text)}
                        multiline
                        placeholder='What is your availability?'
                    >

                    </TextInput>
                </View>


                <Text style={{ fontWeight: "bold", color: Colors.cadetBlue, marginVertical: 20, fontSize: 16 }}>Please verify that you are human *</Text>
                <Image style={{ width: '100%', height: 100, resizeMode: 'cover' }} source={Images.captcha} />
                {/* <ConfirmGoogleCaptcha
                    ref={_ref => captchaForm = _ref}
                    siteKey={siteKey}
                    baseUrl={baseUrl}
                    languageCode='en'
                    onMessage={onMessage()}
                /> */}
                {/* <AppButton
                    buttonText={'Submit'}
                    TextStyle={{ letterSpacing: 1 }}
                    styles={{ height: 50, width: '100%', alignSelf: 'center', backgroundColor: Colors.cadetBlue, borderRadius: 10 }}
                // onPressButton={() => captchaForm.show()}
                /> */}
                <Button
                    title="Submit"
                    onPress={() => submitApi()}
                    buttonStyle={{
                        height: 50,
                        width: '100%',
                        alignSelf: 'center',
                        backgroundColor: Colors.cadetBlue,
                        borderRadius: 10,
                    }}
                    containerStyle={{ marginTop: '4%' }}
                    loading={loading ? true : false}
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
export default CoachesMentor;
