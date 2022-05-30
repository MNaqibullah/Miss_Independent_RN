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
    paddingBottom:0
  },
  charge: {
    flexDirection: 'row',
    marginVertical: '10@vs',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  label: {
    marginHorizontal: '10@s',
  },
});
export default styles;
