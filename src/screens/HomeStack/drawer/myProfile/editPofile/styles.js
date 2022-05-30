import { StyleSheet } from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flex: 1,
    paddingHorizontal: 15,
  },
  cameraIcon: {
    width: 35,
    height: 35,
    position: 'absolute',
    bottom: 22,
    right: 0,
  },
  cameraPosition: {
    width: 35,
    height: 35,

  },
  profileWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    marginVertical: 20,
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  smallInput: {
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginVertical: 6,
    height: 50,
    borderColor: 'gray',

  },
  bigInput: {
    minHeight: 120,
  },
  heading: {
    color: Colors.cadetBlue,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    alignItems: 'center',
  },
  checkbox: {
    borderRadius: 5,

    borderColor: Colors.mediumGrey,

  },
  label: {
    marginHorizontal: 22,
  },
  btnSave: {
    backgroundColor: Colors.cadetBlue,
    padding: 14,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  fullLoading: {
    position: 'absolute',
    top: '88@vs',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
export default styles;
