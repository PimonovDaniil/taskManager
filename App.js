/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  AsyncStorage,
  FlatList,
  Image,
  SafeAreaView, StyleSheet,
  View,
} from "react-native";
// import {AsyncStorage} from '@react-native-async-storage/async-storage';
import Task from './components/Task/Task';
import AddTaskButton from './components/AddTaskButton/AddTaskButton';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';
import PushNotification from 'react-native-push-notification';
import AddModalForm from './components/AddModalForm/AddModalForm';

export const App = () => {
  console.disableYellowBox = true;
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'myChannel',
      channelName: 'myChannel',
    });
  };
  useEffect(() => {
    createChannels();
  }, []);
  const [listOfTasks, setListOfTasks] = useState([]);
  const [modalWindow, setModalWindow] = useState(false);
  const [elem, setElem] = useState(false);
  const [listOfFilterTasks, setListOfFilterTasks] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [currentFilter, setCurrentFilter] = React.useState('все');
  const getModalForm = el => {
    setModalWindow(true);
    setElem(el);
  };
  const storeData = async list => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(list));
    } catch (error) {
      // Error saving data
    }
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');
      if (value !== null) {
        // We have data!!
        setListOfTasks(JSON.parse(value));
        changeListOfTasks('все', JSON.parse(value));
      }
      await setChecked(false);
    } catch (error) {
      // Error retrieving data
    }
  };
  const deleteNotofications = id => {
    PushNotification.cancelLocalNotifications({
      id: Math.trunc(new Date(id).getTime() / 1000),
    });
  };
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
  const deleteTask = async key => {
    let newTasks = listOfTasks.filter(listOfTasks => listOfTasks.key !== key);
    setListOfTasks(newTasks);
    await storeData(newTasks);
    changeListOfTasks(currentFilter, newTasks);
    deleteNotofications(key);
  };
  const addTask = async el => {
    setListOfTasks(list => {
      return [el, ...list];
    });
    await storeData([el, ...listOfTasks]);
    await changeListOfTasks(currentFilter, [el, ...listOfTasks]);
  };
  const redactTask = async el => {
    for (let i = 0; i < listOfTasks.length; i++) {
      if (listOfTasks[i].key === el.key) {
        listOfTasks[i].nameTask = el.nameTask;
        listOfTasks[i].descriptionTask = el.descriptionTask;
        listOfTasks[i].filter = el.filter;
        if (el?.deadline !== undefined) {
          listOfTasks[i].deadline = el.deadline;
        } else {
          delete listOfTasks[i].deadline;
        }
        break;
      }
    }
    await storeData(listOfTasks);
    changeListOfTasks(currentFilter, listOfTasks);
  };
  const changeReady = key => {
    let i = 0;
    for (; i < listOfTasks.length; i++) {
      if (listOfTasks[i].key === key) {
        break;
      }
    }
    const clonedCard = {...listOfTasks[i]};
    const changeLigic = () => {
      clonedCard.isReady = !clonedCard.isReady;
      if (clonedCard.isReady === true) {
        clonedCard.finishDate = new Date();
      } else {
        clonedCard.finishDate = undefined;
      }
      const clonedState = [...listOfTasks];
      clonedState[i] = clonedCard;
      setListOfTasks(clonedState);
      if (clonedCard?.deadline !== undefined) {
        clonedCard.isReady === true
          ? deleteNotofications(clonedCard.key)
          : handleNotofications(
              clonedCard.nameTask,
              clonedCard.key,
              clonedCard.deadline,
            );
      }
      storeData(clonedState);
      changeListOfTasks(currentFilter, clonedState);
    };
    if (clonedCard.isReady === true) {
      Alert.alert(
        'Предупреждение',
        'Вы уверены что хотите вернуть задаче статус "нерешённой"?',
        [
          {text: 'Да', onPress: () => changeLigic()},
          {
            text: 'Отмена',
          },
        ],
      );
    } else {
      changeLigic();
    }
  };
  const changeListOfTasks = (filter, taskList) => {
    setCurrentFilter(filter);
    const sortDate = (a, b) => {
      return new Date(a.deadline) - new Date(b.deadline);
    };
    const usuall = () => {
      return taskList.filter(function (el) {
        return el.filter === 'обычная';
      });
    };
    const important = () => {
      return taskList.filter(function (el) {
        return el.filter === 'важная';
      });
    };
    const veryImportant = () => {
      return taskList.filter(function (el) {
        return el.filter === 'очень важная';
      });
    };
    if (filter === 'обычные') {
      setListOfFilterTasks(usuall().sort(sortDate));
    } else if (filter === 'важные') {
      setListOfFilterTasks(important().sort(sortDate));
    } else if (filter === 'очень важные') {
      setListOfFilterTasks(veryImportant().sort(sortDate));
    } else if (filter === 'все') {
      setListOfFilterTasks(
        veryImportant().concat(important(), usuall()).sort(sortDate),
      );
    }
  };
  if (checked === true) {
    retrieveData();
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={styles.areaStyle}>
        <View style={styles.pickerSelectStyle}>
          <RNPickerSelect
            placeholder={{}}
            style={styles.pickColorStyle}
            onValueChange={value => changeListOfTasks(value, listOfTasks)}
            items={[
              {label: 'все', value: 'все'},
              {label: 'обычные', value: 'обычные'},
              {label: 'важные', value: 'важные'},
              {label: 'очень важные', value: 'очень важные'},
            ]}
          />
        </View>
        {checked === false && (
          <FlatList
            style={{flex: 1}}
            data={listOfFilterTasks}
            renderItem={({item}) => (
              <Task
                el={item}
                deleteTask={deleteTask}
                changeReady={changeReady}
                getModalForm={getModalForm}
              />
            )}
          />
        )}
        {checked === true && (
          <View style={styles.imageCenter}>
            <Image
              style={styles.imageStyle}
              source={require('./icons/load-a_icon-icons.com_50113.png')}
            />
          </View>
        )}
        <AddTaskButton addTask={addTask} />
        <AddModalForm
          addTask={redactTask}
          setModalWindow={setModalWindow}
          modalWindow={modalWindow}
          el={elem}
        />
      </SafeAreaView>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  areaStyle: {
    flex: 1,
    backgroundColor: '#e5f4ff',
  },
  pickerSelectStyle: {
    marginLeft: 30,
    marginRight: 30,
  },
  pickColorStyle: {
    placeholder: {color: 'black'},
    inputIOS: {color: 'black'},
    inputAndroid: {color: 'black'},
  },
  imageStyle: {
    position: 'relative',
    top: '50%',
    transform: [{translateY: -64}],
  },
  imageCenter: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
