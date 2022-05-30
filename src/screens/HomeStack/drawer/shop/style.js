import {StyleSheet} from 'react-native';
import Colors from '../../../../utils/colors';
import { ScaledSheet } from 'react-native-size-matters';

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  item: {
    flexShrink: 1,
    margin: 5,
    width: '33%',
    minHeight: '200@vs',
    paddingVertical: 10,
  },
  images: {
    width: '100%',
    height: '140@vs',
    borderRadius: 5,
  },
  shopImages: {
    height: '205@vs',
  },
  name: {
    paddingVertical: 8,
    fontSize: '13@ms',
    fontWeight: 'bold',
  },
  header: {
    color: Colors.cadetBlue,
    fontWeight: 'bold',
    fontSize: '19@ms',
    marginBottom: '10@vs',
    padding: '5@s',
  },
  shopItem: {
    width: '130@s',
    
    margin: 5,
    
  },
  price: {
    paddingBottom: 8,
    color: Colors.cadetBlue,
  },
  btnRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    resizeMode: 'contain',
    width: '35@s',
    height: '35@vs',
  },
  btnCart: {
    backgroundColor: Colors.cadetBlue,
    paddingVertical: '8@vs',
    paddingHorizontal: '10@s',
    borderRadius: 5,
    marginRight: 10,
    
    
  },
});
export default styles;
