import React, {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import TaskCompletingComponent from '../TaskCompletingComponent';

const HeaderTaskInformationComponent: () => Node = ({el}) => {
  return (
    <View style={styles.HeaderTaskInformationStyle}>
      <View style={[{flex: 1}]}>
        <Text style={[{color: 'white'}, {fontSize: 20}]}>{el.nameTask}</Text>
      </View>
      <View style={styles.FilterStyle}>
        <Text style={[{color: 'white'}]}>{el.filter}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderTaskInformationStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  FilterStyle: {
    marginRight: 10,
    padding: 2,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 5,
    borderColor: '#0A64A4',
  },
});

export default HeaderTaskInformationComponent;
