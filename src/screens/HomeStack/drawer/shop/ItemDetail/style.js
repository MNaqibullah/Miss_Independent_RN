import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  mainImage: {
    height: '180@vs',
  },
  container: {
    paddingHorizontal: '10@s',
    flex: 1,
  },
  nameWrapper: {
    marginVertical: '5@vs',
    borderBottomColor: Colors.grey,
    borderBottomWidth: 1,
    paddingVertical: '10@vs',
  },
  name: {
    fontSize: '18@ms',
    fontWeight: 'bold',
  },
  price: {
    padding: 4,
    fontSize: 18,
    marginBottom: '10@vs',
  },
  starIconWrapper: {
    flexDirection: 'row',
    marginBottom:'8@vs'
  },
  starIcon: {
    marginHorizontal: 3,
    width: '15@s',
    height: '15@vs',
  },
  header: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginBottom: '5@vs',
  },
  description: {
    color:'#214F4F',
    lineHeight: '30@vs',
    fontSize: '14@ms',
  },
  specsWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
  },
  review: {
    flexDirection: 'row',
    marginTop: '10@vs',
    marginBottom: '15@vs',
  },
  reviewWrapper: {
    paddingHorizontal: 8,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '15@vs',
  },
  btnSave: {
    backgroundColor: Colors.cadetBlue,
    padding: '12@s',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
  },
  btnText: {
    color: 'white',
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
});
export default styles;
