import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    // marginTop: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.grey,
    marginBottom: 10,
    backgroundColor:'white'
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrapper: {
    width: '70@s',
    height:'70@vs',
    
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode:'contain'
  },
  text: {
    fontSize: '13@ms',
    lineHeight: '24@vs',
    flexShrink: 1,
    color: Colors.lightBlack,
    // marginHorizontal:10,
    // marginVertical:10
  },
  see: {
    fontSize: '14@ms',
    color: Colors.cadetBlue,
    paddingVertical: 10,
  },
  textWrapper: {
    marginTop:10,
    flexShrink: 1,
    paddingLeft: 0,
  },
  mainImageWrapper: {
    height: '180@vs',
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: '15@vs',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  
    
  },
  articletDes: {
    zIndex: 2,
    fontSize: '14@ms',
    marginStart: '20@ms',
    marginEnd: '20@ms',
    color: Colors.lightBlack,
    padding: '10@ms',
    paddingLeft:0,
  },
});
export default styles;
