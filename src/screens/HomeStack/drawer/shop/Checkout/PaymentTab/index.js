import React, {useState} from 'react';
import {Image, View, ScrollView} from 'react-native';
import Icons from '../../../../../../assets/icons';
import {RadioButton} from 'react-native-paper';
import styles from './style';

const componentName = ({params}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [checked, setChecked] = useState('first');
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.charge}>
          <RadioButton
            value="first"
            status={checked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setChecked('first')}
          />
          <Image style={{width: 60, height: 60}} source={Icons.paypalIcon} />
        </View>
      </ScrollView>
    </View>
  );
};

export default componentName;
