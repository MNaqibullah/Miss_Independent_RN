import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    padding: '15@s',
    flex: 1,
  },
  profileImageWrapper: {
    resizeMode: 'contain',
    height: '170@vs',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  tabWrapper: {
    flexDirection: 'row',
    borderRadius: 7,
    overflow: 'hidden',
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  tab: {
    padding: '15@vs',
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '13@ms',
  },
});
export default styles;
