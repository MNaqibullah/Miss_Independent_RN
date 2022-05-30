import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  memberView: {
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingVertical: '10@vs',
  },
  img: {
    width: '46@s',
    height: '46@s',
    borderRadius:'46@s',
    overflow:'hidden',
    resizeMode:'contain'
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  under_name: {
    color: Colors.grey,
  },
  nameView: {
    justifyContent: 'center',
    marginStart: '12@s',
  },
  btnOnline: {
    paddingHorizontal: '17@s',
    paddingVertical: '4@vs',
    // borderWidth: 1,
    // borderColor: Colors.grey,
    // borderRadius: 5,
    // color: Colors.cadetBlue,
  },
  mainListWrapper: {
    paddingHorizontal: '15@s',
  },
  dropdown: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width:'42%',
    marginLeft:'53.5%'
  },
});
export default styles;
