import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import BottomNavigator from './navigation/ButtomNavigator';
import Details from './screens/Details';
import About from './screens/About';
import COLORS from './assets/colors';
import AddContent from './admin/addContent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="Home"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Add" component={AddContent} />
        <Stack.Screen
          name="About"
          component={About}
          options={{
            headerStyle: {
              backgroundColor: COLORS.base,
            },
            headerTintColor: COLORS.white,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
