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

const TaskInformationComponent: () => Node = ({el}) => {
  const [isOpen, setIsOpen] = useState(0);
  const changeIsOpen = () => {
    isOpen === 0 ? setIsOpen(1) : setIsOpen(0);
  };
  return (
    <TouchableWithoutFeedback onPress={() => changeIsOpen()}>
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
        <View style={[{marginTop: 3}, {marginBottom: 10}]}>
          <Text style={[{color: 'white'}]}>
            {isOpen === 0 && el.descriptionTask.length > 50
              ? el.descriptionTask.slice(0, 50) + '...'
              : el.descriptionTask}
          </Text>
        </View>
        <View>
          {el?.deadline !== undefined && (
            <Text style={[{color: 'white'}, {textAlign: 'right'}]}>
              Сделать до {el?.deadline}
            </Text>
          )}
          {el?.finishDate !== undefined && (
            <Text style={[{color: 'white'}, {textAlign: 'right'}]}>
              Сделано {el?.finishDate}
            </Text>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  TaskInformationStyle: {
    flex: 5,
    backgroundColor: 'green',
    padding: 5,
  },
  FilterStyle: {
    marginRight: 5,
    padding: 2,
    borderWidth: 3,
    borderStyle: 'dashed',
    borderRadius: 5,
  },
});

export default TaskInformationComponent;
