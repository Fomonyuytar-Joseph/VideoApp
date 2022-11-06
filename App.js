

import {React,useState,useEffect }from 'react';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/signedIn/Profile';
import Home from './screens/signedIn/Home';
import Apparel from './screens/signedIn/Apparel';
import Notifications from './screens/signedIn/Notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {onAuthStateChanged} from"firebase/auth"
import { authentication } from './firebase/firebase';


const App= () => {
  const [isSignedIn,setIsSignedIn]= useState(false);
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  useEffect(()=>{
    onAuthStateChanged(authentication,user=>{
      // console.log("this user is",user)
        if(user){
          setIsSignedIn(true)
        }
        else{
          setIsSignedIn(false)
        }
       
      }

    )

  },[])
 
    if(isSignedIn){
      return(
        <NavigationContainer>
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Apparel') {
              iconName = focused ? 'shirt' : 'shirt-outline';
            }
             else if (route.name === 'Notifications') {
              iconName = focused ? 'notifications-sharp' : 'notifications-outline';
            }
             else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          } ,
          tabBarActiveTintColor: '#18273f',
          tabBarInactiveTintColor: 'gray',
        })}>
      <Tab.Screen name="Home" component={Home} options={{headerShown:false}} />
      <Tab.Screen name="Apparel" component={Apparel}  options={{headerShown:false}} />
      <Tab.Screen name="Notifications" component={Notifications} options={{headerShown:false}} />
      <Tab.Screen name="Profile" component={Profile} options={{headerShown:false}} />
    </Tab.Navigator>
    </NavigationContainer>
      )

    }else{
      return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="signIn" component={SignIn} options={{headerShown:false}}  />
        <Stack.Screen name="signUp" component={SignUp} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
      )

    }
   
   
   //<SignUp/>
 
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
