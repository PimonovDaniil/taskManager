import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import TaskCompletingComponent from './TaskComponents/TaskCompletingComponent';
import TaskInformationComponent from './TaskComponents/TaskInformationComponent';

const Task: () => Node = ({el, deleteTask}) => {
  const buttonDelitePress = () =>
    Alert.alert('Предупреждение', 'Вы уверены что хотите удалить задачу?', [
      {text: 'Удалить', onPress: () => deleteTask(el.key)},
      {text: 'Отмена'},
    ]);
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => buttonDelitePress()}>
        <View style={[styles.roundStyle, {top: 40}]}>
          <Image source={require('../../icons/Close_16px.png')} />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.roundStyle, {top: 75}]} />
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
    backgroundColor: 'black',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  roundStyle: {
    padding: 0,
    position: 'relative',
    marginTop: -30,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: '#f00',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    zIndex: 2,
    borderWidth: 2,
    border: '1px black',
  },
});

export default Task;
