import React, {useState} from 'react';
import type {Node} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';

import TaskCompletingComponent from './TaskComponents/TaskCompletingComponent';
import TaskInformationComponent from './TaskComponents/TaskInformationComponent';

const Task: () => Node = ({el}) => {
  return (
    <SafeAreaView>
      <View style={styles.roundStyle} underlayColor="#ccc" />
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
    borderRadius: 20,
    border: '1px black',
    backgroundColor: '#8652f7',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  roundStyle: {
    padding: 0,
    position: 'relative',
    marginTop: -30,
    top: 40,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    zIndex: 2,
  },
});

export default Task;
