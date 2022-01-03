/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import type {Node} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import Task from './components/Task/Task';
import AddTaskButton from './components/AddTaskButton';

// const App: () => Node = () => {
//   const [listOfTasks, setListOfTasks] = useState([
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '1',
//     },
//     {
//       nameTask: 'Постирай вещи',
//       descriptionTask:
//         'Надо короче пойти, взять тазик, стиральный парашок,' +
//         ' бахнуть стирального парашка в тазик, бахунть одежды в тазик, потом' +
//         ' залить воды в тазик, помешать, постирать и вытащить на вешалку сушиться',
//       deadline: '11.12.2022',
//       finishDate: '10.12.2022',
//       filter: 'ordinary',
//       key: '2',
//     },
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '3',
//     },
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '4',
//     },
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '5',
//     },
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '6',
//     },
//     {
//       nameTask: 'Купить воды',
//       descriptionTask: 'Надо короче пойти в магаз и купить воды',
//       deadline: '12.29.2021',
//       filter: 'ordinary',
//       key: '7',
//     },
//   ]);
//
//   const deleteTask = key => {
//     setListOfTasks(list => {
//       return list.filter(listOfTasks => listOfTasks.key !== key);
//     });
//   };
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <FlatList
//         style={[{flex: 1}]}
//         data={listOfTasks}
//         renderItem={({item}) => <Task el={item} deleteTask={deleteTask} />}
//       />
//       <AddTaskButton />
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     minHeight: 128,
//   },
// });

import * as eva from '@eva-design/eva';
import {
  ApplicationProvider,
  Layout,
  IndexPath,
  Select,
  SelectItem,
} from '@ui-kitten/components';

export const App = () => {
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
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Select
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <SelectItem title="Option 1" />
        <SelectItem title="Option 2" />
        <SelectItem title="Option 3" />
      </Select>
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={[{flex: 1}]}
          data={listOfTasks}
          renderItem={({item}) => <Task el={item} deleteTask={deleteTask} />}
        />
        <AddTaskButton />
      </SafeAreaView>
    </ApplicationProvider>
  );
};

export default App;
