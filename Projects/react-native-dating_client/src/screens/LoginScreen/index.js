import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import styles from './styles'

const LoginScreen = () => {
  return (
    <View style={styles.view}>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Image source={require('../../assets/login.jpg')} style={styles.img} />
      <View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Cell Phone Login/Register
          </Text>
        </View>
      </View>
    </View>
  )
};



export default LoginScreen;