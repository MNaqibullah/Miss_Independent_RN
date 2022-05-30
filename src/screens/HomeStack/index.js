import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

//Screens
import WebView from '../../components/webview';
import FullImage from '../../components/fullImage';
import HomeScreen from './drawer/home';
import Events from './drawer/events';
import Members from './drawer/members';
import MiForum from './drawer/miForum';
import MiServices from './drawer/miServices';
import MyProfile from './drawer/myProfile';
import ChangePassword from './drawer/ChangePassword';
import viewProfile from './drawer/myProfile/';
import editProfile from './drawer/myProfile/editPofile';
import Friends from './drawer/friends/index';
import FriendRequests from './drawer/friends/friendRequests';
import Shop from './drawer/shop';
import Cart from './drawer/shop/Cart';
import Checkout from './drawer/shop/Checkout';
import MemberTabs from './drawer/members/MemberTabs';
import MiForumTabs from './drawer/miForum/MiForumTabs';
import ItemDetail from './drawer/shop/ItemDetail';
import Coaches_Mentors from './drawer/miServices/Coaches_Mentors';
import Consultancy_Training from './drawer/miServices/Constultancy_Training';
import Branding_Services from './drawer/miServices/Branding_Services';
import Legal_Services from './drawer/miServices/Legal_Services';
import consultantDetails from './drawer/miServices/Constultancy_Training/consultantDetails';
import coachDetails from './drawer/miServices/Coaches_Mentors/coachDetails';
import CoachResult from './drawer/miServices/Coaches_Mentors/coachDetails';
import EventDetails from './drawer/events/eventDetails';
import CoachesForm from './drawer/miServices/Coaches_Mentors/coachesForm'
//Utils
import colors from '../../utils/colors';

//Components
import DrawerComponent from '../../components/DrawerComponent';

/** Home Drawer */
const HomeDrawerStack = (props) => {
  const {navigation} = props;
  return (
    <Drawer.Navigator
      drawerStyle={{backgroundColor: '#ffffffb0'}}
      headerMode="none"
      initialRouteName="HomeScreen"
      drawerContent={(props) => <DrawerComponent {...props} />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Members" component={Members} />
      <Drawer.Screen name="MiForum" component={MiForum} />
      <Drawer.Screen name="MiServices" component={MiServices} />
      <Drawer.Screen name="Coaches_Mentors" component={Coaches_Mentors} />
      <Drawer.Screen name="Consultancy_Training" component={Consultancy_Training} />
      <Drawer.Screen name="Branding_Services" component={Branding_Services} />
      <Drawer.Screen name="FriendRequests" component={FriendRequests}/>
      <Drawer.Screen name="Legal_Services" component={Legal_Services} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="MyProfile" component={viewProfile} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
      <Drawer.Screen name="Shop" component={Shop} />
    </Drawer.Navigator>
  );
};

/** Home Stack */
const HomeStack = () => (
  <Stack.Navigator headerMode="none" initialRouteName="HomeDrawerStack">
    <Stack.Screen name="HomeDrawerStack" component={HomeDrawerStack} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="Members" component={Members} />
    <Stack.Screen name="MiForum" component={MiForum} />
    <Stack.Screen name="MiServices" component={MiServices} />
    <Stack.Screen name="MyProfile" component={MyProfile} />
    <Stack.Screen name="ChangePassword" component={ChangePassword} />
    <Stack.Screen name="Friends" component={Friends} />
    <Stack.Screen name="FriendRequests" component={FriendRequests} />
    <Stack.Screen name="viewProfile" component={viewProfile} />
    <Stack.Screen name="editProfile" component={editProfile} />
    <Stack.Screen name="Shop" component={Shop} />
    <Stack.Screen name="Cart" component={Cart} />
    <Stack.Screen name="Checkout" component={Checkout} />
    <Stack.Screen name="ItemDetail" component={ItemDetail} />
    <Stack.Screen name="FullImage" component={FullImage} />
    <Stack.Screen name="Events" component={Events} />
    <Stack.Screen name="MemberTabs" component={MemberTabs} />
    <Stack.Screen name="MiForumTabs" component={MiForumTabs} />
    <Stack.Screen name="Coaches_Mentors" component={Coaches_Mentors} />
    <Stack.Screen name="webview" component={WebView} />
    <Stack.Screen
      name="Consultancy_Training"
      component={Consultancy_Training}
    />
    <Stack.Screen name="Branding_Services" component={Branding_Services} />
    <Stack.Screen name="Legal_Services" component={Legal_Services} />
    <Stack.Screen name="consultantDetails" component={consultantDetails} />
    <Stack.Screen name="coachDetails" component={coachDetails} />
    <Stack.Screen name="CoachesForm" component={CoachesForm} />
    <Stack.Screen name="CoachResult" component={CoachResult} />
    <Stack.Screen name="EventDetails" component={EventDetails} />
  </Stack.Navigator>
);
export default HomeStack;
