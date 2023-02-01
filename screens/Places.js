import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  Pressable,
  Image,
  FlatList,
  Button,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import COLORS from '../assets/colors';
import {placeList} from '../assets/data/foodlist';
import Travel from './Travel';
import Restaurant from './Restaurant';

const Tab = createMaterialTopTabNavigator();

export default function Places({navigation}) {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarContentContainerStyle: {
          marginTop: insets.top,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'Nunito-Bold',
          fontSize: 13,
          textTransform: 'capitalize',
          letterSpacing: 1,
        },
        swipeEnabled: false,
        tabBarActiveTintColor: COLORS.dark,
        tabBarInactiveTintColor: 'grey',
        tabBarIndicatorStyle: {
          backgroundColor: COLORS.dark,
        },
      }}>
      <Tab.Screen name="Travel Places" component={Travel} />
      <Tab.Screen name="Restaurant & Café" component={Restaurant} />
    </Tab.Navigator>
  );
}
