import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  safeStyle:{ 
    flex: 1,
    // alignItems:'center' 
  },
  logoStyle:{
    width: 180,
    height: 125,
    resizeMode: 'contain',
    marginTop:40,
    // marginLeft:10,
    alignSelf: "center"
    // backgroundColor:'red'
  },
  loginTxtStyle:{
    fontSize:18,
    marginTop:60,
    textAlign:'center',
  },
  independentTxtStyle:{
    fontSize:22,
    fontWeight:'bold',
    marginTop:5,
    textAlign: "center"
  },
  passwordText: {
      width: '90%',
      alignSelf: "center",
      textAlign: "center",
      marginTop: 10,
      lineHeight: 25
  }
});
