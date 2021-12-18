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

const Task: () => Node = ({el}) => {
  return (
    <SafeAreaView>
      <View style={styles.taskStyle}>
        <View style={styles.TaskIsCompletingStyle}>
          <Text style={[{color: 'white'}]}>Готово!</Text>
        </View>
        <View style={styles.TaskInformationStyle}>
          <View
            style={[
              {display: 'flex'},
              {flexDirection: 'row'},
              {alignItems: 'flex-start'},
            ]}>
            <View style={[{flex: 1}]}>
              <Text style={[{color: 'white'}, {fontSize: 20}]}>
                {el.nameTask}
              </Text>
            </View>
            <View style={styles.FilterStyle}>
              <Text style={[{color: 'white'}]}>{el.filter}</Text>
            </View>
          </View>
          <View style={[{marginTop: 3}]}>
            <Text style={[{color: 'white'}]}>{el.descriptionTask}</Text>
          </View>
          <View>
            {el?.deadline !== undefined && (
              <Text style={[{color: 'white'}, {textAlign: 'right'}]}>Сделать до {el?.deadline}</Text>
            )}
            {el?.finishDate !== undefined && (
              <Text style={[{color: 'white'}, {textAlign: 'right'}]}>Сделано {el?.finishDate}</Text>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskStyle: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 3,
    borderRadius: 2,
    border: '1px black',
    backgroundColor: '#8652f7',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  TaskIsCompletingStyle: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
  },
  TaskInformationStyle: {
    flex: 5,
    backgroundColor: 'green',
    padding: 5,
  },
  FilterStyle: {
    padding: 2,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
});

export default Task;
