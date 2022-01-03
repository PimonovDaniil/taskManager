import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {IndexPath, Select, SelectItem} from '@ui-kitten/components';
import {Datepicker, Text} from '@ui-kitten/components';

const Form: () => Node = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  const [date, setDate] = React.useState(new Date());
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
            <Select
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}>
              <SelectItem title="Option 1" />
              <SelectItem title="Option 2" />
              <SelectItem title="Option 3" />
            </Select>
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
            <Text category="h6">
              Selected date: {date.toLocaleDateString()}
            </Text>
            <Datepicker date={date} onSelect={nextDate => setDate(nextDate)} />

            <Button title="Добавить" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Form;
