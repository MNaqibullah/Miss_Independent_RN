import { StyleSheet } from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    justifyContent: 'space-between',
  },
  detail: {
    marginVertical: '20@vs',
    lineHeight: '25@vs',
    fontSize: '14@ms',
    color: Colors.lightBlack,
  },
  icons: {
    flexDirection: 'row',
  },
  iconsWrapper: {
    resizeMode: 'contain',
    justifyContent: 'space-between',
    flexBasis: '40@s',
  },
  starIconWrapper: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 3,
    width: '15@s',
    height: '15@vs',
  },
  icon: {
    resizeMode: 'contain',
    width: '24@s',
    height: '24@vs',
    alignSelf:'flex-start'

  },
  commentBox: {
    backgroundColor: Colors.transparentGrey,
    borderRadius: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
  },
  likes: {
    fontSize: 16,
    color: Colors.cadetBlue,
  },
  link: {
    marginRight: 10,
    width: 50,
    height: 40,
  },
});
export default styles;
