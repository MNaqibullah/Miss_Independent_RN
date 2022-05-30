import { StyleSheet } from 'react-native';
import Colors from '../../../../utils/colors';
const styles = StyleSheet.create({
  container: {},
  forum: {
    flex: 1,
  },
  dropdown: {
    marginHorizontal: 12,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 6,
    paddingStart: 12,
    borderColor: Colors.grey,
  },
  searchContainer: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    width: '76%',
    borderColor: Colors.grey,
  },
  search: {
    width: '90%',
    paddingBottom: 0,
    marginLeft: '3%',
    height: '80%',
  },
  searchedResultText: {
    margin: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
  calendar: {
    width: '14%',
    padding: 8,
    marginLeft: 2,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 12,
    borderColor: Colors.grey,
  },
  calendarLogo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  logoStyle: {
    marginTop: 10,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  imgContainer: {
    width: '94%',
    height: 230,
    alignSelf:'center',
    marginTop: 18,
    borderRadius: 10,
    overflow: 'hidden',
  },
  images: {
    width: '100%',
    height: '100%',
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
  description: {
    marginTop: 14,
    marginHorizontal: 19,
    paddingBottom: 16,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  creator: {
    marginTop: 10,
    color: Colors.cadetBlue,
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
