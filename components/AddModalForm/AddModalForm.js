import React, {useState} from 'react';
import type {Node} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ModalPanel} from '@ui-kitten/components';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import Form from './Form/Form';

const AddModalForm: () => Node = ({
  addTask,
  setModalWindow,
  modalWindow,
  el,
}) => {
  return (
    <Modal style={{backgroundColor: '#e5f4ff'}} visible={modalWindow}>
      <ModalPanel style={{backgroundColor: '#e5f4ff'}}>
        <View
          style={styles.buttonStyle}>
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
  crutchStyle: {
    flex: 1,
    backgroundColor: '#e5f4ff',
  },
  buttonStyle: {
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5f4ff',
  }
});

export default AddModalForm;
