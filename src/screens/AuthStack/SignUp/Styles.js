import { StyleSheet } from 'react-native';
import colors from './../../../utils/colors'
export const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    // alignItems:'center' 
  },
  logoStyle: {
    width: 180,
    height: 125,
    resizeMode: 'contain',
    marginTop: 40,
    // marginLeft:10,
    alignSelf: "center"
    // backgroundColor:'red'
  },
  loginTxtStyle: {
    marginTop: 60,
    textAlign: 'center',
  },
  independentTxtStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 5,
    textAlign: "center"
  },
  forgotTxtStyle: {
    color: colors.cadetBlue,
    textAlign: 'center'
  },
  forgotView: {
    height: 40,
    justifyContent: "center",
  },
  PickerSelectView: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: "space-between",

  },
  DateOfBirth: {
    margin: 20,
    fontWeight: "bold"
  },
  dobField: {
    width: '30%',
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent:'center'
  }
});
