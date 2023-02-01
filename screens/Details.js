import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
const {width, height} = Dimensions.get('window');
import COLORS from '../assets/colors';
import {dummyData} from '../jsonFiles/data';
import DetailCarousel from '../navigation/DetailCarousel';
import Icon from 'react-native-vector-icons/Ionicons';

function Details({route}) {
  const r = route.params;

  let imageLength = r.images.length;
  let obj = [];

  for (var i = 0; i < imageLength; i++) {
    obj.push({
      id: i + 1,
      url: r.images[i],
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <DetailCarousel data={obj} />
        <View style={styles.content}>
          <Text style={styles.title}> {r.title}</Text>
          <View style={{paddingVertical: 20, flexDirection: 'row'}}>
            <Icon
              name="ios-location"
              size={18}
              color={'black'}
              style={styles.icon}
            />
            <Text style={styles.Address}>{r.address}</Text>
          </View>
          <View style={{paddingVertical: 20, flexDirection: 'row', top: 0}}>
            <Icon
              name="phone-portrait"
              size={18}
              color={COLORS.dark}
              style={styles.icon}
            />
            <Text style={styles.Address}>{r.phone} </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              paddingVertical: 15,
              paddingHorizontal: 10,
            }}>
            Details
          </Text>
          <View style={{paddingHorizontal: 20}}>
            <Text style={{textAlign: 'justify'}}> {r.details} </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 20,
    padding: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  icon: {
    paddingRight: 10,
  },
  Address: {
    paddingRight: 30,
    alignSelf: 'flex-start',
    fontSize: 15,
  },
});

export default Details;
