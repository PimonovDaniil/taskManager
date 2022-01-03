import React, {useState, Node} from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";
import {Formik} from 'formik';
import {Toggle, Text} from '@ui-kitten/components';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-datetimepicker-modal';
import moment from 'moment';

const Form: () => Node = ({addTask, setModalWindow}) => {
  const [nameTask, setNameTask] = React.useState('');
  const [discriptionTask, setDiscriptionTask] = React.useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [priority, setPriority] = useState('обычная');
  const [checked, setChecked] = React.useState(false);

  const onAddTaskPress = () => {
    //TODO отрефакторить
    if (nameTask.trim() === '') {
      Alert.alert('Предупреждение', 'Введите название задачи');
    } else {
      addTask(
        checked
          ? {
              nameTask: nameTask,
              descriptionTask: discriptionTask,
              deadline: deadline,
              filter: priority,
              key: new Date(),
            }
          : {
              nameTask: nameTask,
              descriptionTask: discriptionTask,
              filter: priority,
              key: new Date(),
            },
      );
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
    <View>
      <SafeAreaView style={[{padding: 30}]}>
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
            onChangeText={discriptionTask =>
              setDiscriptionTask(discriptionTask)
            }
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
          <Button title="Добавить" onPress={() => onAddTaskPress()} />
        </View>
      </SafeAreaView>
    </View>
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
