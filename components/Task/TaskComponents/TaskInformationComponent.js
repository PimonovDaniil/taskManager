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
import TaskCompletingComponent from './TaskCompletingComponent';
import HeaderTaskInformationComponent from "./TaskInformationComponents/HeaderTaskInformationComponent";
import DescriptionTaskInformationComponent from "./TaskInformationComponents/DescriptionTaskInformationComponent";
import DateTaskInformationComponent from "./TaskInformationComponents/DateTaskInformationComponent";

const TaskInformationComponent: () => Node = ({el}) => {
  const [isOpen, setIsOpen] = useState(0);
  const changeIsOpen = () => {
    isOpen === 0 ? setIsOpen(1) : setIsOpen(0);
  };
  return (
    <TouchableWithoutFeedback onPress={() => changeIsOpen()}>
      <View style={styles.TaskInformationStyle}>
        <HeaderTaskInformationComponent el={el} />
        <DescriptionTaskInformationComponent el={el} isOpen={isOpen} />
        <DateTaskInformationComponent el={el} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  TaskInformationStyle: {
    flex: 5,
    backgroundColor: '#6A94D4',
    padding: 5,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
});

export default TaskInformationComponent;
