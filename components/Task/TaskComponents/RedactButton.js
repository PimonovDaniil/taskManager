import type {Node} from 'react';
import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';

const RedactButton: () => Node = ({el, getModalForm}) => {
  return (
    <TouchableHighlight style={{zIndex: 1}} onPress={() => getModalForm(el)}>
      <View style={[styles.roundStyle, {top: 40}]}>
        <Image source={require('../../../icons/edit_16px.png')} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  roundStyle: {
    padding: 0,
    position: 'relative',
    marginTop: -30,
    borderRadius: 50,
    width: 30,
    height: 30,
    backgroundColor: '#65A5D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 20,
    zIndex: 2,
    borderWidth: 2,
    border: '1px',
  },
});

export default RedactButton;
