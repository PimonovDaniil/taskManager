/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Task from './components/Task/Task';

const App: () => Node = () => {
  const [listOfTasks, setListOfTasks] = useState([
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '1',
    },
    {
      nameTask: 'Постирай вещи',
      descriptionTask:
        'Надо короче пойти, взять тазик, стиральный парашок,' +
        ' бахнуть стирального парашка в тазик, бахунть одежды в тазик, потом' +
        ' залить воды в тазик, помешать, постирать и вытащить на вешалку сушиться',
      deadline: '11.12.2022',
      finishDate: '10.12.2022',
      filter: 'ordinary',
      key: '2',
    },
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '3',
    },
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '4',
    },
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '5',
    },
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '6',
    },
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      key: '7',
    },
  ]);

  const deleteTask = key => {
    setListOfTasks(list => {
      return list.filter(listOfTasks => listOfTasks.key !== key);
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        style={[{flex: 1}]}
        data={listOfTasks}
        renderItem={({item}) => <Task el={item} deleteTask={deleteTask} />}
      />
      <View style={styles.addTaskStyle}>
        <TouchableWithoutFeedback onPress={() => alert('типо добавляю задачу')}>
          <View
            style={[{flex: 1}, {flexDirection: 'row'}, {alignItems: 'center'}]}>
            <Image source={require('./icons/add_100px.png')} />
            <Text style={[{flex: 3}, {fontSize: 22}]}>Добавить задачу</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addTaskStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
});

export default App;
