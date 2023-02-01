import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import COLORS from '../assets/colors';
import About from './About';
import Carousel from '../navigation/Carousel';
import Details from './Details';
import {dummyData} from '../jsonFiles/data';
import {ScrollView} from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import Login from './Login';

const {width} = Dimensions.get('screen');

const profile = require('../assets/img/logo.jpg');

export default function Home({navigation}) {
  const [home, setHome] = useState(true);
  const [food, setFood] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [travel, setTravel] = useState([]);
  const [pagoda, setPagoda] = useState([]);
  const [hotel, setHotel] = useState([]);

  const getRandomObject = array => {
    const randomObject = array[Math.floor(Math.random() * array.length)];
    return randomObject;
  };
  let a = getRandomObject(food);

  //fetch All Food
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const Alldata = [];
        database()
          .ref('/Items/')
          .orderByChild('Category_ID')
          .equalTo(1)
          .once('value')
          .then(response => {
            response.forEach(doc => {
              const {Title, images} = doc.val();
              Alldata.push({
                title: Title,
                image: images[0],
              });
            });

            setFood(Alldata);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchFood();
  }, []);

  //Fetch Restuarant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const Alldata = [];
        database()
          .ref('/Items/')
          .orderByChild('Category_ID')
          .equalTo(3)
          .once('value')
          .then(response => {
            response.forEach(doc => {
              const {Title, images} = doc.val();
              Alldata.push({
                title: Title,
                image: images[0],
              });
            });

            setRestaurants(Alldata);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchRestaurant();
  }, []);

  //Fetch Travel Places
  useEffect(() => {
    const fetchTravel = async () => {
      try {
        const Alldata = [];
        database()
          .ref('/Items/')
          .orderByChild('Category_ID')
          .equalTo(2)
          .once('value')
          .then(response => {
            response.forEach(doc => {
              const {Title, images} = doc.val();
              Alldata.push({
                title: Title,
                image: images[0],
              });
            });

            setTravel(Alldata);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchTravel();
  }, []);

  //Fetch Hotel
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const Alldata = [];
        database()
          .ref('/Items/')
          .orderByChild('Category_ID')
          .equalTo(5)
          .once('value')
          .then(response => {
            response.forEach(doc => {
              const {Title, images} = doc.val();
              Alldata.push({
                title: Title,
                image: images[0],
              });
            });

            setHotel(Alldata);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchHotel();
  }, []);

  const pressHandler = () => {
    navigation.navigate(Details);
  };
  //foodcard
  const FoodCard = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={pressHandler}
        style={styles.cover}>
        <ImageBackground
          source={{uri: place.image}}
          style={styles.ImgCard}></ImageBackground>

        <Text style={styles.Foodtitle}>{place.title}</Text>
      </TouchableOpacity>
    );
  };

  const Card = ({place}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={pressHandler}
        style={styles.Cardcover}>
        <ImageBackground
          source={{uri: place.image}}
          style={styles.LongImgCard}></ImageBackground>
        <Text style={styles.Foodtitle}>{place.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.base, flex: 1}}>
      <StatusBar translucent={false} backgroundColor={COLORS.base} />
      <View style={styles.Header}>
        <TouchableOpacity onPress={() => navigation.navigate(Login)}>
          <Image source={profile} style={styles.profile} />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Welcome to KengTung!!</Text>
          <Text style={{fontSize: 13, fontFamily: 'Nunito-Regular'}}>
            Explore Keng Tung...
          </Text>
        </View>
      </View>

      {/* hometopNav */}
      <View
        style={{flexDirection: 'row', marginHorizontal: 15, marginBottom: 15}}>
        <TouchableOpacity onPress={() => setHome(true)}>
          <View
            style={{
              backgroundColor: home ? COLORS.white : COLORS.base,
              borderRadius: 50,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: home ? COLORS.base : COLORS.dark,
                padding: 8,
                fontSize: 13,
              }}>
              Home
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate(About);
          }}>
          <View
            style={{
              backgroundColor: home ? COLORS.base : COLORS.white,
              borderRadius: 50,
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: home ? COLORS.dark : COLORS.primary,
                padding: 8,
                fontSize: 13,
              }}>
              About
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* End Home Nav */}
      <View style={{backgroundColor: 'white', flex: 1}}>
        <View
          style={{
            backgroundColor: COLORS.base,
            height: 10,
            width: '100%',
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
          }}></View>
        <ScrollView>
          <View>
            <Carousel data={dummyData} />
          </View>
          {/* food card */}
          <View
            style={{padding: 20, height: '100%', flex: 1, paddingBottom: 0}}>
            <Text style={styles.Rtitle}>Recommanded Food</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={food}
              renderItem={({item}) => <FoodCard place={item} />}
            />
          </View>
          {/* Restaurants Card */}
          <View
            style={{padding: 20, height: '100%', flex: 1, paddingBottom: 0}}>
            <Text style={styles.Rtitle}>Recommanded Restaurants</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={restaurants}
              renderItem={({item}) => <Card place={item} />}
            />
          </View>
          {/* Travel Card */}
          <View
            style={{padding: 20, height: '100%', flex: 1, paddingBottom: 0}}>
            <Text style={styles.Rtitle}>Recommanded Travel Places</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={travel}
              renderItem={({item}) => <Card place={item} />}
            />
          </View>
          {/* Hotel Card */}
          <View
            style={{padding: 20, height: '100%', flex: 1, paddingBottom: 0}}>
            <Text style={styles.Rtitle}>Recommanded Hotels</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={hotel}
              renderItem={({item}) => <Card place={item} />}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: '100%',
    backgroundColor: COLORS.base,
    position: 'relative',
    flexDirection: 'row',
  },
  profile: {
    width: 60,
    height: 60,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    position: 'relative',
    marginTop: 25,
    marginBottom: 3,
    fontFamily: 'Nunito-Bold',
    color: 'white',
    fontSize: 17,
  },
  navli: {
    marginRight: 28,
    marginBottom: 20,
    textTransform: 'capitalize',
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Nunito-Regular',
  },
  content: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    elevation: 4,
  },
  Rtitle: {
    color: COLORS.dark,
    fontFamily: 'Nunito-Bold',
  },
  cover: {
    top: 20,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 5,
    backgroundColor: 'white',
    height: 220,
    elevation: 3,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    width: width / 2,
  },
  ImgCard: {
    height: 170,
    width: width / 2,
    borderRadius: 15,
    overflow: 'hidden',
  },
  Foodtitle: {
    color: COLORS.dark,
    alignSelf: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    top: 10,
  },
  Cardcover: {
    top: 20,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 5,
    backgroundColor: 'white',
    height: 220,
    elevation: 3,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    width: width / 1.4,
  },
  LongImgCard: {
    height: 170,

    borderRadius: 15,
    overflow: 'hidden',
  },
});
