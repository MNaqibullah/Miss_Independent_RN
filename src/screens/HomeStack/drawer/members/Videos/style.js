import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  item: {
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    marginTop: 5,
  },
  images: {
    width: '100%',
    height: '100@vs',
    borderRadius: 5,
  },
  playIcon: {
    width: 55,
    height: 55,
    position: 'absolute',
  },
  textWrapper: {
    marginTop: 30,
    marginStart: 10,
  },
  name: {
    color: Colors.lightBlack,
  },
});
export default styles;
