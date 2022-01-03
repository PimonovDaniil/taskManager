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
import DescriptionTaskInformationComponent from './DescriptionTaskInformationComponent';
import moment from 'moment';

const DateTaskInformationComponent: () => Node = ({el}) => {
  return (
    <View>
      {el?.deadline !== undefined && (
        <Text style={[{color: 'white'}, {textAlign: 'right'}]}>
          Сделать до{' '}
          {el?.deadline ? moment(el?.deadline).format('MMMM DD, YYYY') : '-'}
        </Text>
      )}
      {el?.finishDate !== undefined && (
        <Text style={[{color: 'white'}, {textAlign: 'right'}]}>
          Сделано{' '}
          {el?.finishDate
            ? moment(el?.finishDate).format('MMMM DD, YYYY')
            : '-'}
        </Text>
      )}
    </View>
  );
};

export default DateTaskInformationComponent;
