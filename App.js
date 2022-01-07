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
  SafeAreaView,
  Text,
  View,
} from 'react-native';
// import {AsyncStorage} from '@react-native-async-storage/async-storage';
import Task from './components/Task/Task';
import AddTaskButton from './components/AddTaskButton';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IndexPath} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';
import {colour} from 'constants';

export const App = () => {
  console.disableYellowBox = true;
  const [listOfTasks, setListOfTasks] = useState([
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: new Date(),
      filter: 'обычная',
      isReady: false,
      key: '1',
    },
    {
      nameTask: 'Постирай вещи',
      descriptionTask:
        'Надо короче пойти, взять тазик, стиральный парашок,' +
        ' бахнуть стирального парашка в тазик, бахунть одежды в тазик, потом' +
        ' залить воды в тазик, помешать, постирать и вытащить на вешалку сушиться',
      deadline: new Date(),
      finishDate: new Date(),
      filter: 'обычная',
      isReady: false,
      key: '2',
    },
  ]);
  const storeData = async list => {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', JSON.stringify(list));
    } catch (error) {
      // Error saving data
    }
  };
  const [checked, setChecked] = React.useState(true);
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@MySuperStore:key');

      if (value !== null) {
        // We have data!!
        setListOfTasks(JSON.parse(value));
      }
      await setChecked(false);
    } catch (error) {
      // Error retrieving data
    }
  };
  if (checked === true) {
    retrieveData(); // это конечно костыль это надо убрать
  }

  const deleteTask = async key => {
    let newTasks = listOfTasks.filter(listOfTasks => listOfTasks.key !== key);
    setListOfTasks(list => {
      return list.filter(listOfTasks => listOfTasks.key !== key);
    });
    await storeData(newTasks);
  };

  const addTask = async el => {
    setListOfTasks(list => {
      return [el, ...list];
    });
    await storeData([el, ...listOfTasks]);
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
    //alert('sdfsdf');
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
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={[{flex: 1}, {backgroundColor: '#e5f4ff'}]}>
        <View style={[{marginLeft: 30}, {marginRight: 30}]}>
          <RNPickerSelect
            placeholder={{}}
            style={{
              placeholder: {color: 'black'},
              inputIOS: {color: 'black'},
              inputAndroid: {color: 'black'},
            }}
            onValueChange={value => console.log(value)}
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
            style={[{flex: 1}]}
            data={listOfTasks}
            renderItem={({item}) => (
              <Task
                el={item}
                deleteTask={deleteTask}
                changeReady={changeReady}
                redactTask={redactTask}
              />
            )}
          />
        )}
        {checked === true && (
          <View style={[{flex: 1}, {alignItems: 'center'}]}>
            <Image
              style={[
                {position: 'relative'},
                {top: '50%'},
                {transform: [{translateY: -64}]},
              ]}
              source={require('./icons/load-a_icon-icons.com_50113.png')}
            />
          </View>
        )}
        <AddTaskButton addTask={addTask} />
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
