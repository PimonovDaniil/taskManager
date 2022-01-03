import React, {useState} from 'react';
import type {Node} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {IndexPath, Select, SelectItem, Toggle} from '@ui-kitten/components';
import {Datepicker, Text} from '@ui-kitten/components';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-datetimepicker-modal';
import moment from 'moment';

const Form: () => Node = () => {
  const [date, setDate] = React.useState(new Date());
  const [checked, setChecked] = React.useState(false);

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
  };

  const [birthDate, setBirthDate] = useState(new Date());
  const [show, showModal] = useState(false);
  const toggle = () => showModal(!show);
  //TODO тут надо рефакторить конечно
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
          <SafeAreaView style={[{padding: 10}]}>
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
              <View style={[{alignItems: 'flex-start'}]}>
                <Toggle checked={checked} onChange={onCheckedChange}>
                  Установить крайний срок задачи
                </Toggle>
              </View>
              {checked === true && (
                <DateTimePickerModal
                  style={[{disabled: false}]}
                  value={birthDate}
                  onChange={(event, date) => setBirthDate(date)}
                  show={show}
                  toggle={toggle}>
                  <Text>
                    Крайний срок:{' '}
                    {birthDate
                      ? moment(birthDate).format('MMMM DD, YYYY')
                      : '-'}
                  </Text>
                </DateTimePickerModal>
              )}
            </View>
            <RNPickerSelect
              placeholder={{}}
              onValueChange={value => console.log(value)}
              items={[
                {label: 'обычные', value: 'обычные'},
                {label: 'важные', value: 'важные'},
                {label: 'очень важные', value: 'очень важные'},
              ]}
            />

            <View style={[{zIndex: -10}]}>
              <Button title="Добавить" onPress={props.handleSubmit} />
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Form;
