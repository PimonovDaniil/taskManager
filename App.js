/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text} from 'react-native';
import Task from './components/Task/Task';
import AddTaskButton from './components/AddTaskButton';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IndexPath} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';

export const App = () => {
  const [listOfTasks, setListOfTasks] = useState([
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: new Date(),
      filter: 'ordinary',
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
      filter: 'ordinary',
      key: '2',
    },
  ]);

  const deleteTask = key => {
    setListOfTasks(list => {
      return list.filter(listOfTasks => listOfTasks.key !== key);
    });
  };

  const addTask = el => {
    setListOfTasks(list => {
      return [el, ...list];
    });
  };
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaView style={{flex: 1}}>
        <RNPickerSelect
          placeholder={{}}
          onValueChange={value => console.log(value)}
          items={[
            {label: 'все', value: 'все'},
            {label: 'обычные', value: 'обычные'},
            {label: 'важные', value: 'важные'},
            {label: 'очень важные', value: 'очень важные'},
          ]}
        />
        <FlatList
          style={[{flex: 1}]}
          data={listOfTasks}
          renderItem={({item}) => <Task el={item} deleteTask={deleteTask} />}
        />
        <AddTaskButton addTask={addTask} />
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
