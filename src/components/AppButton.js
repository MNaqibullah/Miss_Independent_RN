import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

export default class AppButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPressButton !== undefined && this.props.onPressButton();
        }}
        underlayColor="white"
        style={[
          styles.Btn,
          {
            backgroundColor: this.props.btnBackgroundColor,
            marginTop: this.props.btnMarginTop,
          },
          this.props.styles,
        ]}>
        <Text style={[{color: '#fff', fontSize: 14}, this.props.TextStyle]}>
          {this.props.buttonText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  Btn: {
    margin: 10,
    // borderRadius: 7,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
