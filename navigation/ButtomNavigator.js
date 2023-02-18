import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import COLORS from '../assets/colors';
import Places from '../screens/Places';
import Hotels from '../screens/Hotels';
import Food1 from '../screens/Food1';
import Pagoda from '../screens/Pagoda';
import HomeScreen from '../screens/Home';

import Food from '../screens/Food';

const Tab = createBottomTabNavigator();

//Screen names
const homeName = 'Home';
const FoodName = 'Food';
const PlacesName = 'Places';
const HotelsName = 'Hotels';
const PagodasName = 'Pagodas';

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.base,
          height: '10%',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingBottom: '6%',
          paddingTop: '2%',
          paddingHorizontal: 15,
          elevation: 2,
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: 'Nunito-Bold',
        },
        tabBarInactiveTintColor: COLORS.dark,
        tabBarActiveTintColor: COLORS.white,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'ios-home-outline';
          } else if (rn === FoodName) {
            iconName = focused ? 'fast-food' : 'fast-food-outline';
          } else if (rn === PlacesName) {
            iconName = focused ? 'location' : 'location-outline';
          } else if (rn === HotelsName) {
            iconName = focused ? 'ios-business' : 'ios-business-outline';
          } else if (rn === PagodasName) {
            iconName = focused ? 'ios-map' : 'ios-map-outline';
          }

          // You can return any component that you like here!
          return (
            <Icon
              name={iconName}
              size={size}
              color={color}
              style={{fontSize: 23}}
            />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Food" component={Food1} />

      <Tab.Screen name="Places" component={Places} />
      <Tab.Screen name="Pagodas" component={Pagoda} />
      <Tab.Screen name="Hotels" component={Hotels} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
