import { StyleSheet } from 'react-native';
import Colors from '../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    padding: '15@s',
    paddingTop: 0,
  },
  memberView: {
    borderBottomWidth: 1,
    borderColor: Colors.grey,
    flexDirection: 'row',
    paddingVertical: '15@vs',
  },
  img: {
    width: '36@s',
    height: '36@s',
    borderRadius: '46@s',
    overflow: 'hidden',
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
    marginStart: '12@s',
  },
  btnOnline: {
    paddingHorizontal: '17@s',
    paddingVertical: '4@vs',
    // borderWidth: 1,
    // borderColor: Colors.grey,
    // borderRadius: 5,
    // color: Colors.cadetBlue,
  },
  mainListWrapper: {
    paddingHorizontal: '15@s',
  },
  dropdown: {
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    width: '42%',
    marginLeft: '53.5%'
  },
  fullLoading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    marginTop:10,
    marginEnd:10,
    height:50,
    backgroundColor:Colors.cadetBlue,
    borderRadius:10,
    paddingHorizontal:20,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'flex-end'
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
  },
});
export default styles;
