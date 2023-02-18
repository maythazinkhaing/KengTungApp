import Lottie from 'lottie-react-native';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import COLORS from '../assets/colors';

function LottieScreen() {
  return (
    <View
      style={{
        backgroundColor: 'white',

        justifyContent: 'center',
        alignItems: 'center',

        height: '100%',
        width: '100%',
      }}>
      <Lottie
        source={require('../assets/loading.json')}
        autoPlay
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          position: 'absolute',
          flex: 1,
        }}
      />
      <Text
        style={{
          letterSpacing: 2,
          flex: 1,
          alignSelf: 'center',
          position: 'absolute',
          fontSize: 14,
          fontFamily: 'Nunito-Bold',
          color: COLORS.dark,
          bottom: 250,
        }}>
        LOADING...
      </Text>
    </View>
  );
}

export default LottieScreen;
