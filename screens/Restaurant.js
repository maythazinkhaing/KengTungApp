import React, {useEffect, useState} from 'react';
import {
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
import {Style} from '../assets/css/Style';
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
        style={Style.Card_cover}>
        <ImageBackground style={Style.ImgCard} source={{uri: place.image[0]}}>
          {currentUser == 'maythazinkhaingmt@gmail.com' ? (
            <View style={Style.Card_button_container}>
              {/* Delete item */}
              <TouchableOpacity
                style={Style.Card_button}
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
        </ImageBackground>
        <Text style={Style.title}>{place.title}</Text>
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
            style={Style.Card_icon}
          />
          <Text style={Style.itemDescription}>{place.Short_Description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={Style.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="white" />
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
      {loading ? (
        <LottieScreen />
      ) : (
        <FlatList
          scrollEnabled
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={Style.Card_shadow}
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
