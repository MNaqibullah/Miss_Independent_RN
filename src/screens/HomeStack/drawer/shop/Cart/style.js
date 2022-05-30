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
  cartWrapper: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: '15@ms',
    fontWeight: 'bold',
  },
  price: {
    marginTop: '10@vs',
    marginBottom:3,
  },
  counterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counter: {
    paddingHorizontal: '10@s',
    fontSize: '14@ms',
  },
  increment: {
    backgroundColor: Colors.lightBlack,
    fontSize: '22@ms',
    width:'20@s',
    height:'23@vs',
    color: Colors.lightWhite,
    borderRadius: 5,
    alignItems:'center'
  },
  decrement: {
    backgroundColor: Colors.cadetBlue,
    fontSize: '22@ms',
    width:'20@s',
    height:'23@vs',
    color: Colors.lightWhite,
    borderRadius: 5,
    alignItems:'center'
  },
  icon: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
  productWrapper: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  updateIcons: {
    flexDirection: 'row',
  },
  totalWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.Grey,
    paddingTop: '20@vs',
    minHeight: '100@vs',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginVertical: '15@vs',
  },
  payableWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '6@vs',
    marginHorizontal: 10,
  },
  payableSize: {
    fontSize: '15@ms',
    fontWeight: 'bold',
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
