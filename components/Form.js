import React, {useState, Node} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {Formik} from 'formik';
import {Toggle, Text} from '@ui-kitten/components';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-datetimepicker-modal';
import moment from 'moment';

const Form: () => Node = ({addTask, setModalWindow, el}) => {
  const [nameTask, setNameTask] = React.useState('');
  const [discriptionTask, setDiscriptionTask] = React.useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState('обычная');
  const [checked, setChecked] = React.useState(false);
  const [isInitialization, setIsInitialization] = React.useState(false);
  if (el !== undefined && isInitialization === false) {
    setIsInitialization(true);
    setNameTask(el.nameTask);
    setDiscriptionTask(el.descriptionTask);
    setPriority(el.filter);
    if (el?.deadline !== undefined) {
      setDeadline(new Date(el.deadline));
      setChecked(true);
    }
  }

  const onAddTaskPress = () => {
    //TODO отрефакторить
    if (nameTask.trim() === '') {
      Alert.alert('Предупреждение', 'Введите название задачи');
    } else {
      let newTask = {
        nameTask: nameTask,
        descriptionTask: discriptionTask,
        filter: priority,
        isReady: false,
        key: new Date(),
      };
      if (checked === true) {
        newTask.deadline = deadline;
      } else {
        delete newTask.deadline;
      }
      if (el !== undefined) {
        if (el?.isReady) {
          newTask.isReady = el.isReady;
        }
        if (el?.finishDate) {
          newTask.finishDate = el.finishDate;
        }
        newTask.key = el.key;
      }
      addTask(newTask);
      setModalWindow(false);
    }
  };
  const onCheckedChange = isChecked => {
    setChecked(isChecked);
  };
  const [show, showModal] = useState(false);
  const toggle = () => showModal(!show);
  //TODO тут надо рефакторить конечно
  return (
    <SafeAreaView style={[{padding: 30}, {backgroundColor: '#e5f4ff'}]}>
      <View>
        <TextInput
          style={styles.input}
          value={nameTask}
          placeholder="Введите название задачи"
          onChangeText={nameTask => setNameTask(nameTask)}
        />
        <TextInput
          style={styles.input}
          value={discriptionTask}
          // multiline
          placeholder="Введите описание задачи"
          onChangeText={discriptionTask => setDiscriptionTask(discriptionTask)}
        />
        <View style={[{alignItems: 'flex-start'}]}>
          <Toggle checked={checked} onChange={onCheckedChange}>
            Установить крайний срок задачи
          </Toggle>
        </View>
        {checked === true && (
          <DateTimePickerModal
            style={[{disabled: false}]}
            value={deadline}
            onChange={(event, date) => setDeadline(date)}
            show={show}
            toggle={toggle}>
            <View
              style={[
                {flexDirection: 'row'},
                {alignItems: 'flex-end'},
                {fontSize: 14},
              ]}>
              <Text>Крайний срок: </Text>
              <Text style={({fontWeight: 'bold'}, {fontSize: 18})}>
                {deadline ? moment(deadline).format('MMMM DD, YYYY') : '-'}
              </Text>
            </View>
          </DateTimePickerModal>
        )}
      </View>
      <View style={[{marginTop: 20}]}>
        <Text>Приоритет задачи:</Text>
        <RNPickerSelect
          value={priority}
          placeholder={{}}
          onValueChange={priority => setPriority(priority)}
          items={[
            {label: 'обычная', value: 'обычная'},
            {label: 'важная', value: 'важная'},
            {label: 'очень важная', value: 'очень важная'},
          ]}
        />
      </View>
      <View>
        <Button
          title={el === undefined ? 'Добавить' : 'Сохранить'}
          onPress={() => onAddTaskPress()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'silver',
    borderRadius: 5,
  },
});

export default Form;
