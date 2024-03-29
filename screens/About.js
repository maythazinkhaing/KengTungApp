import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native';
import COLORS from '../assets/colors';

function About({navigation}) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View>
          <ImageBackground
            source={require('../assets/img/KT.jpg')}
            style={styles.img}>
            <View style={styles.overlay} />
            <Text style={styles.BigTiltle}>KengTung</Text>
          </ImageBackground>
        </View>
        {/* Paragraph */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.parag}>
            {'\t'}
            {'\t'}
            <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
              Keng Tung
            </Text>{' '}
            (also known as Kyaing Tong in Burmese) is situated in the Eastern
            Shan State of Myanmar. It is nestled in a sprawling valley
            surrounded by undulating hills and mountains carpeted in paddy
            fields and tea plantations.
          </Text>
        </View>
        {/* image */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ImageBackground
            source={require('../assets/img/palaung.jpeg')}
            style={styles.Twoimg}></ImageBackground>
          <ImageBackground
            source={require('../assets/img/Akha.jpg')}
            style={styles.Twoimg}></ImageBackground>
        </View>
        {/* paragraph */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.parag}>
            {'\t'}
            {'\t'}
            Kyaing Tong is known for its unique landscape and ethnic tribes such
            as the{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.yellow,
                fontStyle: 'italic',
              }}>
              Wa, Ann, Akha, Akhu, Palaung
            </Text>{' '}
            and{' '}
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.yellow,
                fontStyle: 'italic',
              }}>
              Lahu
            </Text>
            . One will be able to hear the dialect and view the ware of these
            ethnicities at the vibrant central market and day-long hikes into
            the mountains offer the chance to visit the ethnic villages and
            interact with the inhabitants there.
          </Text>
        </View>
        {/* Image */}
        <View>
          <ImageBackground
            source={require('../assets/img/Asiatica.jpeg')}
            style={styles.img}></ImageBackground>
        </View>
        {/* paragraph */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.parag}>
            {'\t'}
            {'\t'}
            Another well-known place to visit in Keng Tung is
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.yellow,
                fontStyle: 'italic',
              }}>
              {' '}
              Naung Tong Lake
            </Text>
            . According to a book written in 1930 that was a copy made from
            early Gon Shan writings, Keng Tung was once a flooded area. Four
            hermits who came down from the north drained the water from the
            flooded area and after 7 years and 7 months, only a small lake
            remains. As the water recedes Hermit Tonga built a pagoda on top of
            Swam Tong hill and the pagoda is called Swam Kham Pagoda.
          </Text>
        </View>
        {/* Image */}
        <View>
          <ImageBackground
            source={require('../assets/img/NongTong.jpg')}
            style={styles.img}></ImageBackground>
        </View>
        {/* paragraph */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.parag}>
            {'\t'}
            {'\t'}
            There is a main market in the down town called
            <Text
              style={{
                fontWeight: 'bold',
                color: COLORS.yellow,
                fontStyle: 'italic',
              }}>
              {' '}
              Myo Mha Zay{' '}
            </Text>
            which you can buy anything and everything here. If you want to see
            the diversity of locals, from breakfast to sweets, from dress to
            utilities, from hand craft to techno, here is the place that you
            shouldn't miss. The market is also a great place to eat. There are a
            number of stalls selling local food (often noodle soup). The market
            starts up early (around 5 am) and closes around noon.
          </Text>
        </View>
        {/* image */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ImageBackground
            source={require('../assets/img/market3.jpg')}
            style={styles.Twoimg}></ImageBackground>
          <ImageBackground
            source={require('../assets/img/market.jpg')}
            style={styles.Twoimg}></ImageBackground>
        </View>
        {/* Paragraph */}
        <View style={{paddingVertical: 10}}>
          <Text style={styles.parag}>
            {'\t'}
            {'\t'}
            If you want to have a nautre or peacful holidays, Keng Tung must be
            your first choice to visit in Eastern Shan State. You can see more
            about travel places, local food and famous pagodas in the town on
            our application. So, feel free to use Keng Tung application.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  img: {
    width: '100%',
    height: 200,
    elevation: 8,
  },
  Twoimg: {
    height: 200,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
    elevation: 2,
    margin: 2,
    borderRadius: 7,
  },
  overlay: {
    backgroundColor: '#075200',
    opacity: 0.5,
    width: '100%',
    height: '100%',
  },
  BigTiltle: {
    fontSize: 60,
    color: 'white',
    position: 'absolute',
    alignSelf: 'center',
    fontFamily: 'MrDafoe-Regular',
    top: '30%',
    opacity: 0.8,
  },
  parag: {
    textAlign: 'justify',
    fontSize: 15,
    lineHeight: 25,
    color: '#1E1E1E',
  },
});

export default About;
