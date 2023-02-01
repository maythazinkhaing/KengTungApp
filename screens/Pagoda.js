import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  Pressable,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Details from './Details';
import {RestaurantList} from '../assets/data/foodlist';
import COLORS from '../assets/colors';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import SearchField from '../navigation/searchField';
const {width} = Dimensions.get('screen');

// Travel
export default function Pagoda({navigation}) {
  const [post, setPost] = useState();
  const pressHandler = () => {
    navigation.navigate(Details);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = [];
        database()
          .ref('Items')
          .orderByChild('Category_ID')
          .equalTo(4)
          .once('value')
          .then(response => {
            // console.log(response.val());
            response.forEach(doc => {
              const {Title, images} = doc.val();

              dataList.push({
                title: Title,
                image: images[0],
              });
            });

            setPost(dataList);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);
  const Card = ({place}) => {
    return (
      <TouchableOpacity
        onPress={{pressHandler, title: place.title}}
        style={{top: 5, marginHorizontal: 20, marginVertical: 10}}>
        <ImageBackground style={styles.ImgCard} source={{uri: place.image}}>
          <Text style={styles.title}>{place.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <StatusBar translucent={false} />
      <SearchField />
      <FlatList
        style={styles.shadow}
        data={post}
        renderItem={({item}) => <Card place={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    flex: 1,
  },
  ImgCard: {
    height: 200,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
  },
  title: {
    color: COLORS.white,
    padding: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 20,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
