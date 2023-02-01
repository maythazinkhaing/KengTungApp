import React, {useState, useEffect} from 'react';
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
import {HotelList} from '../assets/data/foodlist';
import COLORS from '../assets/colors';
import SearchField from '../navigation/searchField';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('screen');

// Travel
export default function Hotels({navigation}) {
  const pressHandler = () => {
    navigation.navigate(Details);
  };
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = [];
        database()
          .ref('Items')
          .orderByChild('Category_ID')
          .equalTo(5)
          .once('value')
          .then(response => {
            // console.log(response.val());
            response.forEach(doc => {
              const {Title, images, Details, Phone, Address} = doc.val();

              dataList.push({
                title: Title,
                image: images,
                detail: Details,
                phone: Phone,
                address: Address,
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
        onPress={() =>
          navigation.navigate('Details', {
            title: place.title,
            images: place.image,
            details: place.detail,
            phone: place.phone,
            address: place.address,
          })
        }
        style={styles.cover}>
        <ImageBackground
          style={styles.ImgCard}
          source={{uri: place.image[0]}}></ImageBackground>
        <Text style={styles.title}>{place.title}</Text>
        <View style={{flexDirection: 'row', padding: 10, paddingTop: 5}}>
          <Icon
            name="location"
            size={10}
            color={COLORS.base}
            style={styles.icon}
          />
          <Text
            style={{
              fontSize: 10,
              color: COLORS.dark,
            }}>
            {place.address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
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
    height: 190,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  title: {
    color: COLORS.dark,
    paddingLeft: 15,
    paddingTop: 10,
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  cover: {
    top: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    height: 270,
    elevation: 2,
    borderRadius: 15,
  },
  icon: {
    fontSize: 15,
    color: COLORS.base,
    paddingRight: 5,
  },
});
