import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './screens/Login';
import BottomNavigator from './navigation/ButtomNavigator';
import Details from './screens/Details';
import About from './screens/About';
import COLORS from './assets/colors';
import AddContent from './admin/addContent';
import {HandleUpdate} from './admin/UpdateData';
const Stack = createNativeStackNavigator();

const App = () => {
  //   const {user, setUser} = useContext(AuthContext);
  //   const [initializing, setInitializing] = useState(true);
  //   const onAuthStateChanged = user => {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   };

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  //   if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom"
          component={BottomNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="handleUpdate"
          component={HandleUpdate}
          options={{title: 'Update Items'}}
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
