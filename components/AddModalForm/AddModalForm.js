import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Form from './Form/Form';
import {ModalPanel} from '@ui-kitten/components';

const AddModalForm: () => Node = ({
  addTask,
  setModalWindow,
  modalWindow,
  el,
}) => {
  return (
    <Modal style={[{backgroundColor: '#e5f4ff'}]} visible={modalWindow}>
      <ModalPanel style={[{backgroundColor: '#e5f4ff'}]}>
        <View style={styles.deleteStyle}>
          <TouchableWithoutFeedback
            onPress={() => {
              setModalWindow(false);
            }}>
            <Image source={require('../../icons/icons8-удалить-48.png')} />
          </TouchableWithoutFeedback>
        </View>
        <Form addTask={addTask} setModalWindow={setModalWindow} el={el} />
        <View style={styles.crutchStyle} />
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
  deleteStyle: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5f4ff',
  },
  crutchStyle: {
    flex: 1,
    backgroundColor: '#e5f4ff',
  }
});

export default AddModalForm;
