import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profileImageWrapper: {
    resizeMode: 'contain',
    height: 200,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  componentContainer: {
    padding: 15,
    flex: 1,
  },
  tabWrapper: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 9,
    overflow: 'hidden',
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  tab: {
    width: '33.333%',
    paddingVertical: 20,
    color: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    textAlign: 'center',
  },
});
export default styles;
