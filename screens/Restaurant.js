import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  View,
  RefreshControl,
  FlatList,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import COLORS from '../assets/colors';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import {handleDelete} from '../admin/AuthProvider';
import {useIsFocused} from '@react-navigation/native';
import LottieScreen from '../navigation/lottie';

import auth from '@react-native-firebase/auth';

// Travel
export default function Travel({navigation}) {
  const [post, setPost] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }

  let currentUser = auth().currentUser?.email;

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const dataList = [];
      database()
        .ref('Items')
        .orderByChild('Category_ID')
        .equalTo(3)
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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <ImageBackground style={styles.ImgCard} source={{uri: place.image[0]}}>
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
              <TouchableOpacity
                style={styles.crossButton}
                onPress={() => onDelete(place.id)}>
                <Icon
                  style={{top: -1, right: -0.9}}
                  name="trash-outline"
                  size={18}
                  color={'white'}
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
        </ImageBackground>
        <Text style={styles.title}>{place.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 15,
            paddingTop: 5,
            paddingRight: 7,
          }}>
          <Icon
            name="alert-circle"
            size={10}
            color={COLORS.yellow}
            style={styles.icon}
          />
          <Text style={styles.itemDescription}>{place.Short_Description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
      <View
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          border: 2,
          backgroundColor: COLORS.light,
          marginHorizontal: 20,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
          marginVertical: 5,
        }}>
        <Icon
          name="search"
          size={10}
          color={COLORS.grayLight}
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
            textTransform: 'capitalize',
          }}
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
      {loading ? (
        <LottieScreen />
      ) : (
        <FlatList
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.shadow}
          data={post}
          renderItem={({item}) => {
            if (input == '') {
              return <Card place={item} onDelete={handleDelete} />;
            }
            if (item.title.toLowerCase().includes(input.toLocaleLowerCase())) {
              return <Card place={item} onDelete={handleDelete} />;
            }
          }}
        />
      )}
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

    paddingRight: 5,
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
  itemDescription: {
    color: COLORS.yellow,
    fontSize: 12,

    flex: 1,

    fontFamily: 'Nunito-Bold',
  },
});
