import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  RefreshControl,
  FlatList,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import database from '@react-native-firebase/database';
import COLORS from '../assets/colors';
import SearchField from '../navigation/searchField';
import Icon from 'react-native-vector-icons/Ionicons';
import {handleDelete} from '../admin/AuthProvider';
import HomeCatTab from './homeCatTab';

import auth from '@react-native-firebase/auth';

function Food({navigation}) {
  const [SubCategory, setSubCategory] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState('S1');
  const [post, setPost] = useState([]);
  const [activeTab, setActiveTab] = useState('Shan Noodle');

  const [refreshing, setRefreshing] = React.useState(false);

  let currentUser = auth().currentUser?.email;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchData();
  }, []);

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

  // fetchFoodData;

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
            const {Title, images, Details, Phone, Address, Short_Description} =
              doc.val();
            const id = doc.key;
            dataList.push({
              title: Title,
              image: images,
              detail: Details,
              phone: Phone,
              address: Address,
              id: id,
              Short_Description: Short_Description,
            });
          });

          setPost(dataList);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedCategoryIndex, post]);

  const Card = ({place, onDelete}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Details', {
            title: place.title,
            images: place.image,
            details: place.detail,
            phone: place.phone,
            address: place.address,
            Short_Description: place.Short_Description,
          })
        }
        style={styles.cover}>
        <ImageBackground
          style={styles.ImgCard}
          source={{uri: place.image[0]}}
        />
        {currentUser == 'maythazinkhaingmt@gmail.com' ? (
          <View
            style={{
              position: 'absolute',
              flex: 1,
              alignSelf: 'flex-end',
              right: 10,
              top: 10,
            }}>
            {/* Delete item */}
            <TouchableOpacity style={styles.crossButton}>
              <Icon
                style={{top: -1, right: -0.9}}
                name="trash-outline"
                size={18}
                color={'white'}
                onPress={() => onDelete(place.id)}
              />
            </TouchableOpacity>
            {/* Edit Items */}
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() =>
                navigation.navigate('handleUpdate', {id: place.id})
              }>
              <Icon
                name="ios-create"
                size={18}
                color={COLORS.white}
                style={{top: -1, right: -0.9}}
              />
            </TouchableOpacity>
          </View>
        ) : null}
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
        {/* <HomeCatTab activeTab={activeTab} setActiveTab={setActiveTab} /> */}
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
        style={{backgroundColor: 'white', alignItems: 'center', padding: 10}}>
        <Text style={{color: COLORS.base}}>
          Explore Popular KengTung's Local Food Here!
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
        }}>
        <FlatList
          contentContainerStyle={styles.flatContainer}
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.shadow}
          data={post}
          renderItem={({item}) => <Card place={item} onDelete={handleDelete} />}
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
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  flatContainer: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'red',
  },
  crossButton: {
    padding: 8,
    alignSelf: 'center',
    backgroundColor: 'black',
    marginBottom: 4,
    borderRadius: 7,
    opacity: 0.8,
  },
  scrollView: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Food;
