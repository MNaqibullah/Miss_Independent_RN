import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    color: Colors.lightBlack,
    lineHeight: 28,
    fontSize: 16,
  },
  memberWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingRight: 10,
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
  btnSave: {
    backgroundColor: Colors.cadetBlue,
    padding: 14,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentSection: {
    flexDirection: 'row',
    borderBottomColor: Colors.Grey,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  imageWrapper: {
    width: 55,
    height: 55,
    borderRadius: 100,
    overflow: 'hidden',
  },
  commentBoxContainer: {
    flexShrink: 1,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  comment: {
    lineHeight: 22,
    color: Colors.lightBlack,
  },
  replyBtn: {
    paddingTop: 15,
    color: Colors.cadetBlue,
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
