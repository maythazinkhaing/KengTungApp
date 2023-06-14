import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
  View,
  RefreshControl,
  FlatList,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import COLORS from '../assets/colors';
import {Style} from '../assets/css/Style';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/Ionicons';
import {handleDelete} from '../admin/AuthProvider';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import LottieScreen from '../navigation/lottie';

// Travel
export default function Hotels({navigation}) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const [input, setInput] = useState('');

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
    fetchData();
  }, []);

  let currentUser = auth().currentUser?.email;

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
    // console.log(post);
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
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              bottom: 10,
              position: 'absolute',
            }}>
            <Icon
              name="location"
              size={10}
              color={COLORS.dark}
              style={Style.Card_icon}
            />
            <Text
              style={{
                fontSize: 10,
                color: COLORS.white,
                fontWeight: '500',
              }}>
              {place.address}
            </Text>
          </View>
        </ImageBackground>
        <Text style={Style.title}>{place.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            paddingLeft: 15,
            paddingTop: 5,
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
