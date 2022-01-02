import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const AddTaskButton: () => Node = () => {
  return (
    <View style={styles.addTaskStyle}>
      <TouchableWithoutFeedback onPress={() => alert('типо добавляю задачу')}>
        <View
          style={[{flex: 1}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
          <Image source={require('../icons/add_100px.png')} />
          <Text style={[{flex: 3}, {fontSize: 22}]}>Добавить задачу</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
});

export default AddTaskButton;
