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
import Form from './Form';
import {ModalPanel} from '@ui-kitten/components';

const AddTaskButton: () => Node = ({addTask}) => {
  const [modalWindow, setModalWindow] = useState(false);
  //TODO отрефакторить
  return (
    <View style={styles.addTaskStyle}>
      <TouchableWithoutFeedback onPress={() => setModalWindow(true)}>
        <View
          style={[{flex: 1}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
          <Image source={require('../icons/add_100px.png')} />
          <Text style={[{flex: 3}, {fontSize: 22}]}>Добавить задачу</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalWindow}>
        <ModalPanel>
          <View style={[{alignContent: 'center'}, {alignItems: 'center'}]}>
            <TouchableWithoutFeedback
              onPress={() => {
                setModalWindow(false);
              }}>
              <Image source={require('../icons/icons8-удалить-48.png')} />
            </TouchableWithoutFeedback>
          </View>
          <Form addTask={addTask} setModalWindow={setModalWindow} />
        </ModalPanel>
      </Modal>
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
