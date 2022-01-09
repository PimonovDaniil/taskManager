import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import TaskCompletingComponent from './TaskComponents/TaskCompletingComponent';
import TaskInformationComponent from './TaskComponents/TaskInformationComponent';
import AddModalForm from '../AddModalForm';

const Task: () => Node = ({el, deleteTask, changeReady, getModalForm}) => {
  const buttonDelitePress = () =>
    Alert.alert('Предупреждение', 'Вы уверены что хотите удалить задачу?', [
      {text: 'Удалить', onPress: () => deleteTask(el.key)},
      {text: 'Отмена'},
    ]);
  //TODO отрефакторить кнопки
  return (
    <SafeAreaView>
      <TouchableHighlight
        style={[{zIndex: 1}]}
        onPress={() => buttonDelitePress()}>
        <View style={[styles.roundStyle, {top: 40}]}>
          <Image source={require('../../icons/Close_16px.png')} />
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        style={[{zIndex: 1}]}
        onPress={() => getModalForm(el)}>
        <View style={[styles.roundStyle, {top: 75}]}>
          <Image source={require('../../icons/edit_16px.png')} />
        </View>
      </TouchableHighlight>
      <View
        style={[
          styles.taskStyle,
          {
            borderColor:
              el.isReady === true
                ? '#A3F06C'
                : new Date(el.deadline) < new Date() &&
                  new Date(el.deadline).getDay() - new Date().getDay() !== 0
                ? 'red'
                : 'black',
          },
        ]}>
        <TaskCompletingComponent el={el} changeReady={changeReady} />
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
    borderRadius: 10,
    border: '1px',
    backgroundColor: '#A3F06C',
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
    backgroundColor: '#65A5D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    zIndex: 2,
    borderWidth: 2,
    border: '1px',
  },
});

export default Task;
