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
        <View style={[{flex: 1}, {backgroundColor: 'red'}, {padding: 10}]}>
          <Text>Готово!</Text>
        </View>
        <View style={[{flex: 5}, {backgroundColor: 'green'},{padding:5}]}>
          <Text>{el.nameTask}</Text>
          <Text style={[{marginTop:10}]}>{el.descriptionTask}</Text>
        </View>
      </View>
      {/*<Text>{el.nameTask}</Text>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  taskStyle: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 3,
    borderRadius: 2,
    border: '1px dashed black',
    backgroundColor: '#8652f7',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
});

export default Task;
