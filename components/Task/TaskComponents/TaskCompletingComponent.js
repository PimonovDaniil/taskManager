import React, {useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  Image,
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

const TaskCompletingComponent: () => Node = ({el, changeReady}) => {
  return (
    <View style={styles.TaskIsCompletingStyle}>
      {el.isReady === false && (
        <TouchableWithoutFeedback onPress={() => {changeReady(el.key)}}>
          <Image
            style={styles.imgStyle}
            source={require('../../../icons/ok_80px.png')}
          />
        </TouchableWithoutFeedback>
      )}
      {el.isReady === true && (
        <TouchableWithoutFeedback onPress={() => {changeReady(el.key)}}>
          <Image
            style={styles.imgStyle}
            source={require('../../../icons/ok2_80px.png')}
          />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TaskIsCompletingStyle: {
    flex: 1,
    backgroundColor: '#6A94D4',
    padding: 10,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    position: 'relative',
  },
  imgStyle: {
    position: 'relative',
    top: '50%',
    transform: [{translateY: -20}],
  },
});

export default TaskCompletingComponent;
