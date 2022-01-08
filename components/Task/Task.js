import React, {useRef, useState} from 'react';
import type {Node} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  View,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';

import TaskCompletingComponent from './TaskComponents/TaskCompletingComponent';
import TaskInformationComponent from './TaskComponents/TaskInformationComponent';
import AddModalForm from '../AddModalForm';

const Task: () => Node = ({el, deleteTask, changeReady, redactTask}) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isActive, setIsActive] = useState(false);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderEnd: () => {
        if (
          pan.x._value < -Dimensions.get('window').width / 4 ||
          pan.x._value > Dimensions.get('window').width / 4
        ) {
          buttonDelitePress();
        }
        Animated.spring(
          pan, // Auto-multiplexed
          {toValue: {x: 0, y: 0}}, // Back to zero
        ).start();
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        Animated.spring(
          pan, // Auto-multiplexed
          {toValue: {x: 0, y: 0}}, // Back to zero
        ).start();
      },
    }),
  ).current;

  const buttonDelitePress = () =>
    Alert.alert('Предупреждение', 'Вы уверены что хотите удалить задачу?', [
      {text: 'Удалить', onPress: () => deleteTask(el.key)},
      {text: 'Отмена'},
    ]);
  //TODO отрефакторить кнопки
  const [modalWindow, setModalWindow] = useState(false);
  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}],
      }}
      {...panResponder.panHandlers}>
      <SafeAreaView>
        <TouchableHighlight
          style={[{zIndex: 1}]}
          onPress={() => setModalWindow(true)}>
          <View style={[styles.roundStyle, {top: 40}]}>
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
        <AddModalForm
          addTask={redactTask}
          setModalWindow={setModalWindow}
          modalWindow={modalWindow}
          el={el}
        />
      </SafeAreaView>
    </Animated.View>
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
