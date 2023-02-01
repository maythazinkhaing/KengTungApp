import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../assets/colors';

const categories = [
  {
    id: 1,
    name: 'Home',
  },
  {
    id: 2,
    name: 'About',
  },
];

function homeNav({onChange}) {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  const handlePress = id => {
    setActiveCategoryId(id);
    onChange(id);
  };

  return (
    <FlatList
      horizontal={true}
      data={categories}
      keyExtractor={item => item.id}
      contentContainerStyle={{marginVertical: 10}}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => handlePress(item.id)}
          style={{marginRight: 10 * 2, alignItems: 'center'}}>
          <Text
            style={[
              {color: colors.secondary, fontSize: 10 * 2},
              activeCategoryId === item.id && {color: colors.primary},
            ]}>
            {item.name}
          </Text>
          {activeCategoryId === item.id && (
            <View
              style={{
                height: 10,
                width: 10,
                backgroundColor: colors.primary,
                borderRadius: 10 / 2,
                marginTop: 10 / 2,
              }}
            />
          )}
        </TouchableOpacity>
      )}
    />
  );
}

export default homeNav;
