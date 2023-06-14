import React, {useState, useEffect, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
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
import HomeLottieScreen from '../navigation/HomeLottie';
import auth from '@react-native-firebase/auth';
import {Style} from '../assets/css/Style';

const category = [
  {
    status: 'All',
    key: 1,
  },
  {
    status: 'Shan Noodle',
    key: 2,
  },
  {
    status: 'Sticky Rice',
    key: 3,
  },
  {
    status: 'Khao Phun',
    key: 4,
  },
  {
    status: 'Local Food',
    key: 5,
  },
  {
    status: 'Dessert',
    key: 6,
  },
];

function Food1({navigation}) {
  const [status, setStatus] = useState('All');
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState(true);
  const [data, setData] = useState(post);
  const statusFilter = status => {
    if (status == 'All') {
      setData(post);
    } else if (status == 'Shan Noodle') {
      console.log(status);
      setData([...post.filter(e => e.Sub_Category == 'S1')]);
    } else if (status == 'Sticky Rice') {
      console.log(status);
      setData([...post.filter(e => e.Sub_Category == 'S2')]);
    } else if (status == 'Khao Phun') {
      console.log(status);
      setData([...post.filter(e => e.Sub_Category == 'S3')]);
    } else if (status == 'Local Food') {
      console.log(status);
      setData([...post.filter(e => e.Sub_Category == 'S4')]);
    } else if (status == 'Dessert') {
      console.log(status);
      setData([...post.filter(e => e.Sub_Category == 'S5')]);
    }

    setStatus(status);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  let currentUser = auth().currentUser?.email;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // fetchFoodData;

  const fetchData = async () => {
    try {
      const dataList = [];

      database()
        .ref('Items')
        .orderByChild('Category_ID')
        .equalTo(1)
        .once('value')
        .then(response => {
          // console.log(response.val());
          response.forEach(doc => {
            const {
              Title,
              images,
              Details,
              Phone,
              Address,
              Short_Description,
              Sub_Category,
            } = doc.val();
            const id = doc.key;
            dataList.push({
              title: Title,
              image: images,
              detail: Details,
              phone: Phone,
              address: Address,
              id: id,
              Short_Description: Short_Description,
              Sub_Category: Sub_Category,
            });
          });

          setPost(dataList);
          setData(dataList);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
          <View style={Style.Card_button_container}>
            {/* Delete item */}
            <TouchableOpacity style={Style.Card_button}>
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
              style={Style.Card_button}
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
    <SafeAreaView style={Style.container}>
      <View
        style={{
          backgroundColor: COLORS.base,

          elevation: 2,
          shadowColor: '#171717',
          // shadowOffset: {width: 0, height: 2},
          // shadowOpacity: 0.1,
          // shadowRadius: 1,
        }}>
        {/* search bar */}
        <View style={Style.search_container}>
          <Icon
            name="search"
            size={10}
            color={COLORS.grayLight}
            style={{fontSize: 23}}
          />
          <TextInput
            style={Style.search_textInput}
            value={input}
            placeholder="Search..."
            placeholderTextColor={COLORS.grayLight}
            onChangeText={text => setInput(text)}
          />
          {input != '' ? (
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: 10,
              }}
              onPress={() => setInput('')}>
              <Icon name="close-circle" size={20} color={COLORS.grayLight} />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{
            marginVertical: 15,
            marginHorizontal: 20,
          }}>
          {category.map(e => (
            <TouchableOpacity
              key={e.key}
              style={[styles.inactive, status === e.status && styles.Bgactive]}
              activeOpacity={0.8}
              onPress={() => statusFilter(e.status)}>
              <Text
                style={[
                  styles.inactive,
                  status === e.status && styles.TextActive,
                ]}>
                {e.status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {/* <View
        style={{backgroundColor: 'white', alignItems: 'center', padding: 10}}>
        <Text style={{color: COLORS.yellow}}>
          Explore Popular KengTung's Local Food Here!
        </Text>
      </View> */}
      {loading ? (
        <HomeLottieScreen />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            display: 'flex',
          }}>
          <FlatList
            scrollEnabled
            contentContainerStyle={styles.flatContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.shadow}
            keyExtractor={(e, i) => i.toString()}
            data={data}
            renderItem={({item, index}) => {
              if (input == '') {
                return (
                  <Card place={item} key={index} onDelete={handleDelete} />
                );
              }
              if (
                item.title.toLowerCase().includes(input.toLocaleLowerCase())
              ) {
                return (
                  <Card place={item} key={index} onDelete={handleDelete} />
                );
              }
            }}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
          />
        </View>
      )}
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
    padding: 10,
    // backgroundColor: 'red',
  },

  scrollView: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  Bgactive: {
    backgroundColor: COLORS.white,
  },
  TextActive: {
    color: COLORS.yellow,
  },
  inactive: {
    color: COLORS.dark,
    margin: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
});

export default Food1;
