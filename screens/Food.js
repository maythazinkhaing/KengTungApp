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
import database from '@react-native-firebase/database';
import COLORS from '../assets/colors';
import SearchField from '../navigation/searchField';
import Details from './Details';

function Food({navigation}) {
  const [SubCategory, setSubCategory] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('S1');
  const [post, setPost] = useState([]);

  const pressHandler = () => {
    navigation.navigate(Details);
  };

  //navBar {fetch Data}
  database()
    .ref('SubCategories')
    .orderByChild('catID')
    .equalTo(1)
    .once('value')
    .then(response => {
      let c = [];
      var r = Object.keys(response.val()).length;
      response.forEach(data => {
        c.push({
          name: data.val().name,
          index: data.key,
        });
      });

      setSubCategory(c);
    });

  // //fetchAllFood
  // useEffect(() => {
  //   const fetchAll = async () => {
  //     try {
  //       const Alldata = [];
  //       database()
  //         .ref('/Items/')
  //         .once('value')
  //         .then(response => {
  //           response.forEach(doc => {
  //             const {Title, images} = doc.val();
  //             Alldata.push({
  //               title: Title,
  //               image: images[0],
  //             });
  //           });

  //           setPost(Alldata);
  //         });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   fetchAll();
  // }, []);

  // fetchFoodData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList = [];
        const i = selectedCategoryIndex;
        database()
          .ref('Items')
          .orderByChild('Sub_Category')
          .equalTo(i)
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
  }, [selectedCategoryIndex]);

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
      </TouchableOpacity>
    );
  };

  // End navBar {fetch Data}
  return (
    <SafeAreaView
      style={{
        backgroundColor: COLORS.base,
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: COLORS.base,
          // borderBottomLeftRadius: 20,
          // borderBottomRightRadius: 20,
          elevation: 2,
          shadowColor: '#171717',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.1,
          shadowRadius: 1,
        }}>
        <SearchField />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{marginHorizontal: 20}}>
          <FlatList
            contentContainerStyle={styles.navBar}
            data={SubCategory}
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectedCategoryIndex(item.index)}>
                <View
                  style={{
                    backgroundColor:
                      selectedCategoryIndex == item.index
                        ? COLORS.white
                        : COLORS.base,

                    ...styles.textBorder,
                  }}>
                  <Text
                    style={{
                      color:
                        selectedCategoryIndex == item.index
                          ? COLORS.base
                          : COLORS.dark,
                      ...styles.navItem,
                    }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <FlatList
          contentContainerStyle={styles.flatContainer}
          style={styles.shadow}
          data={post}
          renderItem={({item}) => <Card place={item} />}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navBar: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    fontSize: 13,
  },
  textBorder: {
    paddingHorizontal: 15,
    paddingVertical: 10,

    borderRadius: 50,
  },
  content: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  ImgCard: {
    height: 170,
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  title: {
    color: COLORS.dark,
    alignSelf: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
    top: 10,
    paddingHorizontal: 10,
  },
  cover: {
    top: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    height: 220,
    elevation: 3,
    borderRadius: 15,
    width: '49%',
  },
  flatContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'red',
  },
});

export default Food;
