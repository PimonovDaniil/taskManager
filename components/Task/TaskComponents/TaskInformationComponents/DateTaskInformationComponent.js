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
        <Text
          style={[
            {
              color:
                new Date(el.deadline) < new Date() &&
                new Date(el.deadline).getDay() - new Date().getDay() !== 0 &&
                el.isReady === false
                  ? '#FD7279'
                  : 'white',
            },
            {textAlign: 'right'},
          ]}>
          Сделать до{' '}
          {el?.deadline ? moment(el?.deadline).format('MMMM DD, YYYY') : '-'}
        </Text>
      )}
      {el?.finishDate !== undefined && (
        <Text style={[{color: '#A3F06C'}, {textAlign: 'right'}]}>
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
