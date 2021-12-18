import React, {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
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

const TaskCompletingComponent: () => Node = () => {
  return (
    <View style={styles.TaskIsCompletingStyle}>
      <Text style={[{color: 'white'}]}>Готово!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  TaskIsCompletingStyle: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
  },
});

export default TaskCompletingComponent;
