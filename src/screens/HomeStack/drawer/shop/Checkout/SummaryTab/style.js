import {StyleSheet} from 'react-native';
import Colors from '../../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal:'10@s',
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  icon: {
    resizeMode: 'contain',
    width: '25@s',
    height: '25@vs',
  },
  address: {
    marginVertical: '20@vs',
    backgroundColor: Colors.Grey,
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '8@s',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
    padding: '15@s',
  },
  headerWrapper: {
    borderBottomWidth: 0,
    paddingRight: '8@s',
    paddingVertical:0
  },
  payableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginHorizontal: 10,
  },
  payableSize: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
});
export default styles;
