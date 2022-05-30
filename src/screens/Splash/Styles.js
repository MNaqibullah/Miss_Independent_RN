import { StyleSheet } from 'react-native';
import colors from './../../utils/colors'
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSplash,
    // justifyContent: "center",
    alignItems: "center",
  },
  imageStyle:{
    width: "100%",
    height: "35%",
    position:'absolute',
    bottom:0,
    resizeMode: 'cover'
  },
  logoStyle:{
    width: "70%",
    height: 190,
    resizeMode: 'contain',
    marginTop:110,
    // backgroundColor:'red'
  },
});
