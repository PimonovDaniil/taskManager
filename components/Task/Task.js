import React, {useRef} from 'react';
import type {Node} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  View,
} from 'react-native';

import TaskCompletingComponent from './TaskComponents/TaskCompletingComponent';
import TaskInformationComponent from './TaskComponents/TaskInformationComponent';
import RedactButton from './TaskComponents/RedactButton';

const Task: () => Node = ({el, deleteTask, changeReady, getModalForm}) => {
  const buttonDelitePress = () => {
    Alert.alert('Предупреждение', 'Вы уверены что хотите удалить задачу?', [
      {text: 'Удалить', onPress: () => deleteTask(el.key)},
      {text: 'Отмена'},
    ]);
  };
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
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
  //TODO отрефакторить кнопки
  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}],
      }}
      {...panResponder.panHandlers}
      onResponderEnd={() => {
        if (
          pan.x._value < -Dimensions.get('window').width / 4 ||
          pan.x._value > Dimensions.get('window').width / 4
        ) {
          buttonDelitePress();
        }
      }}>
      <SafeAreaView>
        <RedactButton el={el} getModalForm={getModalForm} />
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
});

export default Task;
