import {StyleSheet} from 'react-native';
import Colors from '../../../../../utils/colors';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  forum: {
    flex: 1,
  },

  imgContainer: {
    width: '94%',
    height: 230,
    marginHorizontal: 14,
    marginTop: 18,
    borderRadius: 7,
    overflow: 'hidden',
  },
  images: {
    width: '100%',
    height: '100%',
    overflow:'hidden',
  },
  image1: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    overflow:'hidden'
  },
  linkContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 14,
    paddingVertical: 10,
  },
  link: {
    marginRight: 10,
    width: 50,
    height: 40,
  },
  textContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: 12,
  },
  title: {
    marginHorizontal: 16,
    fontSize: 15,
    color: 'white',
  },
  likes:{
   fontSize:14,
   color:Colors.cadetBlue,
  },
  description: {
    marginTop: 14,
    marginHorizontal: 19,
    paddingBottom: 16,
    marginBottom: 10,
    flex: 1,
  },
  creator: {
    marginTop: 5,
    color:Colors.cadetBlue,
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'rgba(0,0,0,0.1)'
  }
});

export default styles;
