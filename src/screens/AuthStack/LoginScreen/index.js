import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { styles } from './Styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingLabelInputField from '../../../components/FloatingLabelInputField';
import AppButton from '../../../components/AppButton';
import Icons from './../../../assets/icons/';
import icons from './../../../assets/icons/';
import colors from '../../../utils/colors';
import SimpleToast from 'react-native-simple-toast';
import { client, BASE_URL, img_BASE_URL } from '../../../api/config';
import { Button } from "react-native-elements";
import Preference from 'react-native-preference';


const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, emailchange] = useState('');
  const [password, passwordchange] = useState('');

  const inputcheck = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email === '') {
      SimpleToast.show('Please enter email');
    } else if (reg.test(email) === false) {
      SimpleToast.show('Email format is not valid');
    } else if (password === '') {
      SimpleToast.show("Please enter password");
    } else if (password.length <= 7) {
      SimpleToast.show("Wrong password");
    }
    else {
      setLoading(true)
      let bodyFormData = new FormData();
      bodyFormData.append('email', email.toLowerCase());
      bodyFormData.append('password', password);
      client.post('/login', bodyFormData,)
        .then(response => {
          setLoading(false)
          if (response.data.status === "Success") {
            Preference.set('user_id', response.data.data.id);
            Preference.set('token', response.data.data.token);
            Preference.set('name', response.data.data.name);
            Preference.set('email', email.toLowerCase())
            Preference.set('password', password);

            if (Preference.get('name') != null) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomeStack' }],
              })
            }
            else {
              Preference.set('goToLogin', 1)
              navigation.navigate('CreateProfile')
            }

          }
          else if (response.data.code == 404) {
            Preference.set('email', email.toLowerCase())
            Preference.set('password', password);
            navigation.navigate('VerifyEmail',email)
          }
          else {
            SimpleToast.show("Username or password is incorrect");
            setLoading(false)

          }
        })
        .catch(err => {
          setLoading(false)
          console.log('err         ', err.Error)
        }
        )
    }
  };
  return (
    <SafeAreaView style={styles.safeStyle}>
      <KeyboardAwareScrollView>
        <Image source={Icons.flyAuthIcon} style={styles.logoStyle} />
        <Text style={styles.loginTxtStyle}>{'Login To'.toUpperCase()}</Text>
        <Text style={styles.independentTxtStyle}>
          {'Miss Independent'.toUpperCase()}
        </Text>
        <FloatingLabelInputField
          hideLabel
          placeholder={'Email'}
          value={email}
          onChangeText={text => emailchange(text)}
          leftIcon={icons.emailIcon}
          inputContainer={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 20,
            marginTop: 40,
            backgroundColor: 'transparent',
            height: 50,
          }}
        />
        <FloatingLabelInputField
          hideLabel
          placeholder={'Password'}
          secureTextEntry={true}
          value={password}
          onChangeText={text => passwordchange(text)}
          leftIcon={icons.passwordLockIcon}
          inputContainer={{
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
            marginVertical: 10,
            marginTop: 0,
            backgroundColor: 'transparent',
            height: 50,
          }}
        />
        <Button
          title="Login"
          onPress={() => inputcheck()}
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

        {/* <AppButton
          buttonText={'Login'}
          onPressButton={() =>
            inputcheck()
          }
          TextStyle={{ letterSpacing: 1 }}
          styles={{
            height: 50,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: colors.lightBlack,
            borderRadius: 10,
          }}
        /> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotView}>
          <Text style={styles.forgotTxtStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={styles.text2}>Don't Have an Account?</Text>
        <AppButton
          buttonText={'Sign Up'}
          TextStyle={{ letterSpacing: 1 }}
          styles={{
            height: 50,
            width: '90%',
            alignSelf: 'center',
            backgroundColor: colors.themeGrey,
            borderRadius: 10,
            marginVertical: 30,
          }}
          onPressButton={() => navigation.navigate('SignUp')}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
export default LoginScreen;
