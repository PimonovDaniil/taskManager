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
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Task from './components/Task';

const App: () => Node = () => {
  const [listOfTasks, setListOfTasks] = useState([
    {
      nameTask: 'Купить воды',
      descriptionTask: 'Надо короче пойти в магаз и купить воды',
      deadline: '12.29.2021',
      filter: 'ordinary',
      index: 1,
    },
    {
      nameTask: 'Постирай вещи',
      descriptionTask:
        'Надо короче пойти, взять тазик, стиральный парашок,' +
        ' бахнуть стирального парашка в тазик, бахунть одежды в тазик, потом' +
        ' залить воды в тазик, помешать, постирать и вытащить на вешалку сушиться',
      deadline: '11.12.2022',
      filter: 'ordinary',
      index: 2,
    },
  ]);
  return (
    <SafeAreaView>
      <FlatList
        data={listOfTasks}
        renderItem={({item}) => <Task el={item} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
