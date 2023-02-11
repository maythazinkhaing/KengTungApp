import {Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchField({text}) {
  const [input, setInput] = useState('');
  return (
    <View
      style={{
        borderRadius: 10,
        overflow: 'hidden',
        border: 2,
        backgroundColor: colors.light,
        marginHorizontal: 20,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
      <Icon
        name="search"
        size={10}
        color={colors.grayLight}
        style={{fontSize: 23}}
      />
      <TextInput
        style={{
          width: '100%',
          color: 'dark',
          fontSize: 12,
          alignSelf: 'center',
          paddingLeft: 20,
          height: 45,
        }}
        placeholder="Search..."
        placeholderTextColor={colors.grayLight}
        onChangeText={text => setInput(text)}
      />
    </View>
  );
}
