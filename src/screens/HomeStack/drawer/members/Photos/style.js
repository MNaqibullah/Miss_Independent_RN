import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    marginTop: '10@vs',
  },
  item: {
    width: '32%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
    marginTop: 5,
  },
  images: {
    width: '100%',
    height: '110@vs',
    borderRadius: 5,
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
