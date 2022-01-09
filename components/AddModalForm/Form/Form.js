import React, {useState, Node} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {Toggle, Text} from '@ui-kitten/components';
import SafeAreaView from 'react-native/Libraries/Components/SafeAreaView/SafeAreaView';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-datetimepicker-modal';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';

const Form: () => Node = ({addTask, setModalWindow, el}) => {
  const handleNotofications = (nameTask, id, deadline) => {
    PushNotification.localNotificationSchedule({
      channelId: 'myChannel',
      title: 'Task manager',
      message: 'Скоро крайний срок для задачи "' + nameTask + '"',
      date: new Date(deadline),
      id: String(Math.trunc(new Date(id).getTime() / 1000)),
      allowWhileIdle: true,
    });
  };
  const deleteNotofications = id => {
    PushNotification.cancelLocalNotifications({
      id: Math.trunc(new Date(id).getTime() / 1000),
    });
  };
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
        deleteNotofications(newTask.key);
        if (el?.isReady) {
          newTask.isReady = el.isReady;
        }
        if (el?.finishDate) {
          newTask.finishDate = el.finishDate;
        }
        newTask.key = el.key;
      }
      if (newTask?.deadline !== undefined && newTask?.isReady === false) {
        handleNotofications(newTask.nameTask, newTask.key, newTask.deadline);
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
  return (
    <SafeAreaView style={styles.areaStyle}>
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
        <View style={{alignItems: 'flex-start'}}>
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
              style={styles.dateStyle}>
              <Text>Крайний срок: </Text>
              <Text style={styles.textStyle}>
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
      <Button
        title={el === undefined ? 'Добавить' : 'Сохранить'}
        onPress={() => onAddTaskPress()}
      />
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
  textStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateStyle: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    fontSize: 14,
  },
  areaStyle: {
    padding: 30,
    backgroundColor: '#e5f4ff',
  },
});

export default Form;
