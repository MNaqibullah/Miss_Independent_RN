import Colors from '../../../../utils/colors';
import FontStyle from '../../../../assets/fonts';
import { ScaledSheet } from 'react-native-size-matters';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const styles = ScaledSheet.create({
  container: {
    padding: '15@s',
    paddingBottom: '5@s',
  },
  addView: {
    height: '70@vs',
    width: '70@vs',
    borderRadius: '70@vs',
    position: 'absolute',
    right: '15@s',
    bottom: '15@s',
    padding: 0,
  },
  addImg: {
    width: '100%',
    height: '100%',
  },
  userData: {
    paddingHorizontal: '5%',
    marginTop: '5%',
    flexDirection: 'row'
  },
  postUserImage: {
    height: '40@s',
    width: '40@s',
    borderRadius: '45@s',
    overflow: 'hidden',
    backgroundColor: 'red'
  },
  linkText: {
    minHeight: 30,
  },
  postLink: {
    marginVertical: '10@vs',
    color: 'green',
    width: '86%',
    marginHorizontal: '7%'
  },
  postUserName: {
    marginStart: '14@s',
    justifyContent: 'center'
  },
  postUserNameText:
  {
    fontWeight: 'bold',
    fontSize: '16@ms'
  },
  postDesc: {
    backgroundColor: Colors.transparentGrey,
    borderColor: Colors.grey,
    margin: '20@s',
    height: '120@vs',
    width: '88%',
    borderWidth: 1,
    borderRadius: '8@s',
    padding: '10@s',
    paddingTop: 0,
  },
  articletDesc: {
    backgroundColor: Colors.transparentGrey,
    borderColor: Colors.grey,
    margin: '20@s',
    height: '320@vs',
    width: '88%',
    borderWidth: 1,
    borderRadius: '8@s',
    padding: '10@s',
    paddingTop: 0,
  },
  reportField: {
    backgroundColor: Colors.transparentGrey,
    borderColor: Colors.grey,
    margin: '20@s',
    height: '120@vs',
    width: '88%',
    borderWidth: 1,
    borderRadius: '8@s',
    padding: '10@s',
    paddingTop: 0,
  },
  postImageVideo: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  mainSelectedImage: {
    marginTop: '10@s',
    marginStart: '20@s',
  },
  viewSelectedImage: {
    width: '307@s',
    height: '307@s',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: '10@s',
    marginBottom: '10@s',
    overflow: 'hidden',
  },
  selectedImageContainer:{
  paddingHorizontal:'5%',
  paddingTop:'3%',
  },
  selectedImages:{
    width: '80@s',
    height: '80@s',
    borderRadius:'5@s',
    marginRight:'5@s',
    borderWidth: 1,
  },
  selectedImageText: {
    color: '#24bdaf',
  },

  selectedImage: {
    marginTop:'3%',
    flexDirection: 'row',
  },
  selectedImageLink: {
    flexDirection: 'row',
    marginStart: '20@s'
  },
  videoOptions: {
    margin: '20@s',
    alignItems: 'center'
  },
  videoButton: {
    backgroundColor: Colors.lightBlack,
    height: '40@vs',
    borderRadius: '10@s',
    width: '140@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5@s',
  },
  videoButtonText: {
    color: 'white',
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  videoOptionar: {
    fontWeight: 'bold',
  },
  videoLinkInput: {
    marginTop: '5@s',
    backgroundColor: Colors.transparentGrey,
    borderRadius: '7@s',
    borderWidth: 1,
    width: '100%',
    borderColor: Colors.grey,
    paddingStart: '15@s'
  },
  postButton: {
    height: 50,
    width: '88%',
    alignSelf: 'center',
    backgroundColor: Colors.themeGrey,
    borderRadius: '10@s',
    margin: '20@s'
  },
  containerComments: {
    flex: 1,
    marginTop: 10,
  },
  commentWrapper: {
    height: '500@vs',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    width: '15@s',
    height: '15@vs',
    padding: '8@ms',
    resizeMode: 'contain',
    backgroundColor: 'red'
  },
  tabWrapper: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: Colors.grey,
    overflow: 'hidden',
    borderWidth: 1,
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingHorizontal: '20@s',
    paddingVertical: '12@vs',
    color: 'grey',
    fontSize: '14@ms',
  },
  firstRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15@s',
    paddingBottom: '0@s',
  },
  profile: {
    flexDirection: 'row',
  },
  dp: {
    width: '40@s',
    height: '40@s',
    borderRadius: '50@vs',
    marginRight: '10@s',
    overflow: 'hidden'
  },
  name: {
    fontFamily: FontStyle.WorkSans,
    marginTop: '4@vs',
    fontSize: '14@ms',
    fontWeight: 'bold',
    textTransform:'capitalize',
  },
  title: {
    zIndex: 2,
    fontFamily: FontStyle.WorkSans,
    fontSize: '14@ms',
    fontWeight: 'bold',
    marginStart: '56@ms',
    marginEnd: '20@ms',
    color: Colors.cadetBlue,
    paddingBottom: '5@ms',
  },
  articletDes: {
    zIndex: 2,
    fontSize: '14@ms',
    marginStart: '20@ms',
    marginEnd: '20@ms',
    color: Colors.lightBlack,
    padding: '10@ms',
    paddingLeft:0,
  },
  time: {
    marginTop: '4@vs',
    color: 'grey',
    fontSize: '13@ms'
  },
  menuWrapper: {
    alignSelf: 'center',
    padding: '5@s',
    paddingTop: '5@s',
  },
  menu: {
    width: '15@s',
    height: '15@vs',
    resizeMode: 'contain',
    marginRight: '10@s',
  },
  mainImageWrapper: {
    minHeight: '200@vs',
    maxHeight: '400@vs',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainImage: {
    height: '300@vs',
    width: windowWidth,
    resizeMode:'contain',
  },
  ReactBox: {
    padding: '15@s',
    paddingTop: '17@vs',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ReactWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'grey',
  },
  likedText: {
    color: Colors.cadetBlue
  },
  backroundContainer: {
    backgroundColor: 'white',
    marginBottom: '8@vs',
  },
  commentBox: {
    backgroundColor: Colors.transparentGrey,
    borderRadius: 5,
    paddingHorizontal: '15@s',
    height: '40@vs',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: '20@vs',
    marginHorizontal: '14@s',

  },
  modalView: {
    backgroundColor: 'transparent'
  },
  modalComments: {
    flex: 1,
    borderTopLeftRadius: '10@vs',
    borderTopRightRadius: '10@vs',
    backgroundColor: 'red',
    width: '100%',
    marginTop: '10%',
    elevation: 60,
    shadowColor: 'red',
  },
  menuModalText: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#24bdaf',
    alignItems: 'center',
    marginHorizontal: 10
  },
  menuItem: {
    marginLeft: '16@ms',
    fontSize: '16@ms'
  },
  pausedIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  videobox: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
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

