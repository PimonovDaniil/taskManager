import React, {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
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

const Task: () => Node = ({el}) => {
  return (
    <SafeAreaView>
      <Text style={styles.taskStyle}>{el.nameTask}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskStyle: {
    padding: 20,
    backgroundColor: "red",
    textAlign: "center",
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default Task;
