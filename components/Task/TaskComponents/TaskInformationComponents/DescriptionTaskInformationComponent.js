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
import TaskCompletingComponent from '../TaskCompletingComponent';
import HeaderTaskInformationComponent from './HeaderTaskInformationComponent';

const DescriptionTaskInformationComponent: () => Node = ({el, isOpen}) => {
  return (
    <View style={styles.DescriptionTaskInformationStyle}>
      <Text style={[{color: 'white'}]}>
        {isOpen === 0 && el.descriptionTask.length > 50
          ? el.descriptionTask.slice(0, 50) + '...'
          : el.descriptionTask}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  DescriptionTaskInformationStyle: {
    marginTop: 3,
    marginBottom: 10,
  },
});

export default DescriptionTaskInformationComponent;
