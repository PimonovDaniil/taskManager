/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {AsyncStorage, FlatList, Image, SafeAreaView, View} from 'react-native';
// import {AsyncStorage} from '@react-native-async-storage/async-storage';
import Task from './components/Task/Task';
import AddTaskButton from './components/AddTaskButton';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IndexPath} from '@ui-kitten/components';
import RNPickerSelect from 'react-native-picker-select';

export const App = () => {
  console.disableYellowBox = true;
  const [listOfTasks, setListOfTasks] = useState([
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: new Date(),
      filter: 'обычная',
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
    retrieveData();
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
        {checked === false && (
          <FlatList
            style={[{flex: 1}]}
            data={listOfTasks}
            renderItem={({item}) => <Task el={item} deleteTask={deleteTask} />}
          />
        )}
        {checked === true && (
          <View
            style={[
              {flex: 1},
              {alignItems: 'center'},
              {marginVertical: '50%'},
            ]}>
            <Image
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
