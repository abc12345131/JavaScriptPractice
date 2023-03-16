import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import colors from '../../constants/colors';

const DetailsScreen = () => {
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>Themes</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>React Native Basics</Text>
        </TouchableOpacity>
        <View style={styles.separator}></View>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.text}>React Native by Example</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    color: colors.text
  },
  separator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20, 
  },
});

export default DetailsScreen;