import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    paddingStart: 12,
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageWrapper: {
    width: 75,
    height: 75,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    flexShrink: 1,
    color: Colors.lightBlack,
  },
  see: {
    fontSize: 16,
    color: Colors.cadetBlue,
    paddingVertical: 10,
  },
  textWrapper: {
    flexShrink: 1,
    paddingLeft: 15,
    paddingBottom: 10,
  },
  mainImageWrapper: {
    height: 150,
    borderRadius: 5,
    overflow: 'hidden',
    marginVertical: 20,
  },
  mainImage: {
    width: '100%',
    height: '100%',
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
});
export default styles;
