import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './Form';
import {ModalPanel} from '@ui-kitten/components';

const AddModalForm: () => Node = ({
  addTask,
  setModalWindow,
  modalWindow,
  el,
}) => {
  return (
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
        <Form addTask={addTask} setModalWindow={setModalWindow} el={el} />
      </ModalPanel>
    </Modal>
  );
};

const styles = StyleSheet.create({
  addTaskStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
});

export default AddModalForm;
