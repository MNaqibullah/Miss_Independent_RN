import {ScaledSheet} from 'react-native-size-matters';
import Colors from '../../../../utils/colors';
const styles = ScaledSheet.create({
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
  profileWrapper: {
    width: 120,
    height: 120,
    borderRadius: 100,
    overflow: 'hidden',
    marginTop: 20,
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
  heading: {
    color: Colors.lightBlack,
    fontSize: '14@ms',
    fontWeight: 'bold',
    width:'70%'

    
  },
  label: {
    color: Colors.cadetBlue,
    fontSize: 18,
    marginRight:10,
  },
  links: {
    fontSize: '14@ms',
    marginStart: '25@ms',
    color: Colors.lightBlack,
    },
  data: {
    color:'black',
    fontSize: 14,
    marginTop:3,
    },
  
  btnSave: {
    backgroundColor: Colors.themeGrey,
    padding: 14,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',

    bottom: 10,
    right:10,
    left:10,
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default styles;
