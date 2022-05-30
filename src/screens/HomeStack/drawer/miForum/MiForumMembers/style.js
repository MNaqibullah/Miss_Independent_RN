import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    lineHeight: 28,
    fontSize: 16,
  },
  memberWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  heartIcon: {
    resizeMode: 'contain',
    height: 32,
    width: 32,
  },
  memberLabel: {
    fontSize: 18,
    color: Colors.grey,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainListWrapper: {
    paddingHorizontal: 5,
  },
  memberView: {
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingVertical: 20,
  },
  img: {
    width: 60,
    height: 60,
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
    marginStart: 20,
  },
});
export default styles;
