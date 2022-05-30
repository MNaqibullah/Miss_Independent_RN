import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
  },
  logoStyle:{
    width: 180,
    height: 125,
    resizeMode: 'contain',
    marginTop:40,
    alignSelf: "center",
  },
  loginTxtStyle:{
    marginTop:60,
    textAlign:'center',
  },
  text2:{
    marginTop:60,
    textAlign:'center',
  },
  independentTxtStyle:{
    fontSize:22,
    fontWeight:'bold',
    marginTop:5,
    textAlign: "center"
  },
  forgotTxtStyle: {
    color: colors.cadetBlue,
    textAlign: 'center'
  },
  forgotView: {
    height: 40,
    justifyContent: "center",
  }
});
