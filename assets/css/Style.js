import {StyleSheet} from 'react-native';
import COLORS from '../colors';

const Style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 90,
  },

  //Search
  search_container: {
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
  },

  search_textInput: {
    width: '100%',
    color: 'dark',
    fontSize: 12,
    alignSelf: 'center',
    paddingLeft: 20,
    height: 45,
    textTransform: 'capitalize',
  },

  //card

  Card_cover: {
    top: 5,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: 'white',
    height: 270,
    elevation: 2,
    borderRadius: 15,
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
  Card_icon: {
    fontSize: 15,

    paddingRight: 5,
  },

  //card button for admin
  Card_button_container: {
    position: 'absolute',
    flex: 1,
    alignSelf: 'flex-end',
    right: 10,
    top: 10,
  },

  Card_button: {
    padding: 8,
    alignSelf: 'center',
    backgroundColor: 'black',
    marginBottom: 4,
    borderRadius: 7,
    opacity: 0.8,
  },

  itemDescription: {
    color: COLORS.yellow,
    fontSize: 12,

    flex: 1,

    fontFamily: 'Nunito-Bold',
  },

  Card_shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});

export {Style};
