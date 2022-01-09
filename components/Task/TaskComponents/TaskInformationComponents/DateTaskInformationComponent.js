import React from 'react';
import type {Node} from 'react';
import {Text, View} from 'react-native';
import moment from 'moment';

const DateTaskInformationComponent: () => Node = ({el}) => {
  moment.locale('ru');
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
          Сделать до {el?.deadline ? moment(el?.deadline).format('L') : '-'}
        </Text>
      )}
      {el?.finishDate !== undefined && (
        <Text style={[{color: '#A3F06C'}, {textAlign: 'right'}]}>
          Сделано {el?.finishDate ? moment(el?.finishDate).format('L') : '-'}
        </Text>
      )}
    </View>
  );
};

export default DateTaskInformationComponent;
