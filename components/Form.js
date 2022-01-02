import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';

const Form: () => Node = () => {
  return (
    <View>
      <Formik
        initialValues={{
          nameTask: '',
          descriptionTask: '',
          deadline: '',
          filter: '',
        }}
        onSubmit={values => {
          console.log(values);
        }}>
        {props => (
          <View>
            <TextInput
              value={props.values.nameTask}
              placeholder="Введите название задачи"
              onChangeText={props.handleChange('nameTask')}
            />
            <TextInput
              value={props.values.descriptionTask}
              multiline
              placeholder="Введите описание задачи"
              onChangeText={props.handleChange('descriptionTask')}
            />
            <Button title="Добавить" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Form;
