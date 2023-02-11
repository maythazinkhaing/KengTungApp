import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  SafeAreaView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import ButtomNavigator from '../navigation/ButtomNavigator';
import auth from '@react-native-firebase/auth';

const bgImage = require('../assets/img/NongTong.jpg');

export default function Login({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Bottom');
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        <ActivityIndicator size="large" color="#00ff00" />;
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar translucent backgroundColor="rgba(0,0,0,0.2)" />

        <ImageBackground source={bgImage} style={styles.bg}>
          <View style={styles.overlay} />
          <Text style={styles.BigTiltle}>KengTung</Text>
        </ImageBackground>

        <View style={styles.whiteSheet} />

        <SafeAreaView style={styles.form}>
          <Text style={styles.title}>log In</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Email"
            placeholderTextColor="grey"
            autoCapitalize="none"
            autoFocus={true}
            onChangeText={userEmail => setEmail(userEmail)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor="grey"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            onChangeText={userPassword => setPassword(userPassword)}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: 'Nunito-Regular',
              }}>
              {' '}
              Log In
            </Text>
          </TouchableOpacity>
          {/* <View
            style={{
              marginTop: 15,
              marginBottom: 30,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: 'gray',
                fontWeight: '500',
                fontSize: 14,
                fontFamily: 'Nunito-Regular',
              }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity>
              <Text style={{color: '#f57c00', fontWeight: '500', fontSize: 14}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text
              style={{
                color: '#fff',
                fontSize: 17,
                fontFamily: 'Nunito-Regular',
              }}>
              Log In as a Guest
            </Text>
          </TouchableOpacity> */}
        </SafeAreaView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bg: {
    width: '100%',
    height: Dimensions.get('window').height / 2.7,
    position: 'absolute',
    top: 0,
  },
  whiteSheet: {
    width: '100%',
    height: Dimensions.get('window').height / 1.41,
    bottom: 0,
    borderTopLeftRadius: 60,
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
    position: 'absolute',
  },
  overlay: {
    backgroundColor: '#FFBF4B',
    opacity: 0.65,
    width: '100%',
    height: '100%',
  },
  BigTiltle: {
    fontSize: 60,
    color: 'white',
    position: 'absolute',
    width: '100%',
    fontFamily: 'MrDafoe-Regular',
    top: '30%',
    alignSelf: 'center',
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    top: 50,
    position: 'relative',
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 55,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 15,
    padding: 15,
    width: 300,
  },
  title: {
    fontSize: 30,
    textTransform: 'capitalize',
    margin: 30,
    color: '#FFCA6A',
    fontFamily: 'Nunito-Bold',
  },
  button: {
    backgroundColor: '#FFCA6A',
    width: 300,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
