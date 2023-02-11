import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import COLORS from '../assets/colors';

function HomeCatTab(props) {
  return (
    <View style={styles.topContainer}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <HeaderButton
          text={'Shan Noodle'}
          btncolor={COLORS.white}
          textColor={COLORS.base}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <HeaderButton
          text={'Sticky Rice'}
          btncolor={COLORS.base}
          textColor={COLORS.white}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <HeaderButton
          text={'Khao Phun'}
          btncolor={COLORS.base}
          textColor={COLORS.white}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <HeaderButton
          text={'Local Food'}
          btncolor={COLORS.base}
          textColor={COLORS.white}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
        <HeaderButton
          text={'Desserts'}
          btncolor={COLORS.base}
          textColor={COLORS.white}
          activeTab={props.activeTab}
          setActiveTab={props.setActiveTab}
        />
      </ScrollView>
    </View>
  );
}

const HeaderButton = props => (
  <TouchableOpacity
    style={{
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor:
        props.activeTab === props.text ? COLORS.white : COLORS.base,
      marginRight: 2,
      borderRadius: 30,
    }}
    onPress={() => props.setActiveTab(props.text)}>
    <Text
      style={{
        color: props.activeTab === props.text ? COLORS.base : COLORS.white,
        fontSize: 14,
      }}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  topContainer: {
    backgroundColor: COLORS.base,
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  tabStyle: {},
  tabText: {},
});
export default HomeCatTab;
