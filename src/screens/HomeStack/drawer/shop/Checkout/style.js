import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    marginTop: '15@vs',
    paddingHorizontal: '17@s',
  },
  tab: {
    width: '49%',
    paddingVertical: '13@vs',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.grey,
    borderWidth: 1,
    borderRadius: 5,
    
    
  },
  tabText:{
    
    fontSize: '14@ms',
    color: 'grey',
  },
  tab1: {
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight:'30@s'
  },
  tab2: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  boxWrapper: {
    flexDirection: 'row',
    marginHorizontal: '30@s',
    marginTop: '20@vs',
  },
  textWrapper: {
    flexDirection: 'row',
    marginLeft: '20@s',
    marginRight:'30@s',
    marginTop: '10@vs',
    paddingRight: '10@s',
    justifyContent: 'space-between',
  },
  line: {
    width: '30%',
    height: 3,
    backgroundColor: Colors.cadetBlue,
    alignSelf: 'center',
  },
  box: {
    backgroundColor: Colors.Grey,
    paddingVertical: '7@vs',
    paddingHorizontal: '11@s',
    
    borderRadius: 5,
    
  },
  textBox:{
    fontWeight: 'bold',
    color: 'white',
  },
  btnSave: {
    backgroundColor: Colors.lightBlack,
    padding: '12@vs',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  btnText: {
    color: 'white',
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
});
export default styles;
