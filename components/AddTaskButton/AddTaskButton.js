import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AddModalForm from '../AddModalForm/AddModalForm';

const AddTaskButton: () => Node = ({addTask}) => {
  const [modalWindow, setModalWindow] = useState(false);
  //TODO отрефакторить
  return (
    <View style={styles.addTaskStyle}>
      <TouchableWithoutFeedback onPress={() => setModalWindow(true)}>
        <View
          style={styles.imageWrapper}>
          <Image source={require('../../icons/add_100px.png')} />
          <Text style={styles.textStyle}>Добавить задачу</Text>
        </View>
      </TouchableWithoutFeedback>
      <AddModalForm
        addTask={addTask}
        setModalWindow={setModalWindow}
        modalWindow={modalWindow}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  addTaskStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  textStyle: {
    flex: 3,
    fontSize: 22,
    color: 'black',
  },
  imageWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddTaskButton;
