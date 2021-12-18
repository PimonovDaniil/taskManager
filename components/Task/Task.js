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
import TaskCompletingComponent from './TaskCompletingComponent';
import TaskInformationComponent from "./TaskInformationComponent";

const Task: () => Node = ({el}) => {
  return (
    <SafeAreaView>
      <View style={styles.taskStyle}>
        <TaskCompletingComponent />
        <TaskInformationComponent el={el} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskStyle: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 3,
    borderRadius: 2,
    border: '1px black',
    backgroundColor: '#8652f7',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default Task;
